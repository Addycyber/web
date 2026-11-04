import { createHash } from 'node:crypto'
import { execFileSync, spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import ffmpegPath from 'ffmpeg-static'
import sharp from 'sharp'
import companyData from '../data/company-data.json'

type SlideCopy = {
  line1: string
  line2: string
  text: string
  cta: string
  href: string
}

type RankedImage = {
  sourcePath: string
  width: number
  height: number
  score: number
}

type SliderManifestItem = SlideCopy & {
  originalFilename: string
  type: 'image' | 'video'
  src: string
  sources: { webp: Record<string, string>; avif: Record<string, string> }
  poster?: string
  width: number
  height: number
  blurDataURL: string
  objectPosition: string
}

const root = process.cwd()
const assetDir = [path.resolve(root, '../assets/slider'), path.resolve(root, 'assets/slider')]
  .find((candidate) => fs.existsSync(candidate))
const outputDir = path.resolve(root, 'public/slider')
const manifestPath = path.resolve(root, 'content/slider.manifest.json')
const statePath = path.resolve(root, '.slider-build-state.json')
const rankScript = path.resolve(root, 'scripts/rank-images.mjs')
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif'])
const videoExtensions = new Set(['.mp4', '.webm'])
const defaultCopy = companyData.heroSlides as SlideCopy[]

function getOverrides(directory: string): Record<string, Partial<SlideCopy>> {
  const file = path.join(directory, 'slides.json')
  if (!fs.existsSync(file)) return {}
  const value: unknown = JSON.parse(fs.readFileSync(file, 'utf8'))
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${file} must contain a filename-to-slide-object mapping.`)
  }
  for (const [filename, slide] of Object.entries(value)) {
    if (!slide || typeof slide !== 'object' || Array.isArray(slide)) {
      throw new Error(`${file}: slide override for ${filename} must be an object.`)
    }
    const override = slide as Record<string, unknown>
    for (const key of ['line1', 'line2', 'text', 'cta', 'href'] as const) {
      if (override[key] !== undefined && typeof override[key] !== 'string') {
        throw new Error(`${file}: ${filename}.${key} must be a string.`)
      }
    }
    if (typeof override.href === 'string' && !override.href.startsWith('/') && !override.href.startsWith('#')) {
      throw new Error(`${file}: ${filename}.href must be a local path or fragment.`)
    }
    if (typeof override.href === 'string' && override.href.startsWith('//')) {
      throw new Error(`${file}: ${filename}.href must not be protocol-relative.`)
    }
  }
  return value as Record<string, Partial<SlideCopy>>
}

function getFingerprint(files: string[]): string {
  return createHash('sha256')
    .update(files
      .map((file) => {
        const stats = fs.statSync(file)
        return `${path.basename(file)}\0${stats.size}\0${stats.mtimeMs}`
      })
      .sort()
      .join('\n'))
    .digest('hex')
}

function outputsExist(items: SliderManifestItem[]): boolean {
  return items.every((item) => {
    const paths = item.type === 'image'
      ? Object.values(item.sources.webp)
      : [item.src, ...(item.poster ? [item.poster] : [])]
    return paths.every((asset) =>
      fs.existsSync(path.resolve(root, 'public', asset.slice(1))),
    )
  })
}

function imageRankings(directory: string): RankedImage[] {
  const result = execFileSync(
    process.execPath,
    [rankScript, `--directory=${directory}`, '--json'],
    { encoding: 'utf8' },
  )
  return JSON.parse(result) as RankedImage[]
}

function extractVideoPoster(source: string): Buffer {
  if (!ffmpegPath) throw new Error('ffmpeg-static did not provide an executable path.')
  for (const timestamp of ['00:00:01.500', '00:00:00.500']) {
    const result = spawnSync(ffmpegPath, [
      '-ss', timestamp,
      '-i', source,
      '-vframes', '1',
      '-f', 'image2pipe',
      '-vcodec', 'png',
      'pipe:1',
    ], { maxBuffer: 20 * 1024 * 1024 })
    if (result.error) throw result.error
    if (result.status === 0 && result.stdout.length) return result.stdout
  }
  throw new Error(`Could not extract a poster from ${source}.`)
}

function slugify(filename: string): string {
  return path.basename(filename, path.extname(filename))
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

async function build(): Promise<void> {
  fs.mkdirSync(path.dirname(manifestPath), { recursive: true })
  fs.mkdirSync(outputDir, { recursive: true })

  if (!assetDir) {
    console.warn('[Slider Build] assets/slider was not found; writing an empty manifest.')
    fs.writeFileSync(manifestPath, '[]\n')
    return
  }

  const files = fs.readdirSync(assetDir)
    .map((name) => path.join(assetDir, name))
    .filter((file) => {
      const extension = path.extname(file).toLowerCase()
      return imageExtensions.has(extension) || videoExtensions.has(extension)
    })
    .sort((a, b) => path.basename(a).localeCompare(path.basename(b), undefined, { numeric: true, sensitivity: 'base' }))
  const fingerprintFiles = [
    ...files,
    ...(fs.existsSync(path.join(assetDir, 'slides.json')) ? [path.join(assetDir, 'slides.json')] : []),
  ]
  const fingerprint = getFingerprint(fingerprintFiles)
  if (fs.existsSync(statePath) && fs.existsSync(manifestPath)) {
    const state = JSON.parse(fs.readFileSync(statePath, 'utf8')) as { fingerprint?: string }
    const existing = JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as SliderManifestItem[]
    if (state.fingerprint === fingerprint && outputsExist(existing)) {
      console.log('[Slider Build] Sources unchanged; using the existing manifest and assets.')
      return
    }
  }

  const overrides = getOverrides(assetDir)
  const rankedImages = imageRankings(assetDir)
  const rankings = new Map(rankedImages.map((image) => [path.resolve(image.sourcePath), image]))
  const rejected: string[] = []
  const eligibleImages: Array<{ file: string; rank: RankedImage }> = []
  const videos: string[] = []

  for (const file of files) {
    const extension = path.extname(file).toLowerCase()
    if (videoExtensions.has(extension)) {
      videos.push(file)
      continue
    }
    const rank = rankings.get(path.resolve(file))
    if (!rank || rank.width < 1600) {
      rejected.push(`${path.basename(file)}${rank ? ` (${rank.width}px)` : ''}`)
      continue
    }
    eligibleImages.push({ file, rank })
  }

  const selected = [
    ...eligibleImages
      .sort((a, b) => b.rank.score - a.rank.score || a.file.localeCompare(b.file))
      .slice(0, 8)
      .map(({ file }) => file),
    ...videos.slice(0, Math.max(0, 8 - Math.min(eligibleImages.length, 8))),
  ].sort((a, b) => path.basename(a).localeCompare(path.basename(b), undefined, { numeric: true, sensitivity: 'base' }))

  if (selected.length > 8 || selected.some((file) => {
    if (!imageExtensions.has(path.extname(file).toLowerCase())) return false
    const rank = rankings.get(path.resolve(file))
    return !rank || rank.width < 1600
  })) {
    throw new Error('Slide selection failed its eight-slide or 1600px image-size limit.')
  }

  if (rejected.length) console.log(`[Slider Build] Rejected images under 1600px: ${rejected.join(', ')}`)
  console.log(`[Slider Build] Selected ${selected.length} of ${files.length} source files.`)

  const manifest: SliderManifestItem[] = []
  const usedNames = new Set<string>()
  for (const [index, file] of selected.entries()) {
    const originalFilename = path.basename(file)
    const override = overrides[originalFilename] ?? {}
    const copy = { ...defaultCopy[index % defaultCopy.length], ...override }
    let name = slugify(originalFilename) || `slide-${index + 1}`
    if (usedNames.has(name)) name = `${name}-${index + 1}`
    usedNames.add(name)

    if (imageExtensions.has(path.extname(file).toLowerCase())) {
      const image = sharp(file).rotate()
      const metadata = await image.metadata()
      if (!metadata.width || !metadata.height) throw new Error(`Image dimensions are missing: ${file}`)
      const webp: Record<string, string> = {}
      for (const width of [960, 1920]) {
        const outputName = `${name}-${width}.webp`
        const outputPath = path.join(outputDir, outputName)
        await sharp(file).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(outputPath)
        webp[width] = `/slider/${outputName}`
      }
      const blur = await sharp(file).rotate().resize(24).webp({ quality: 20 }).toBuffer()
      manifest.push({
        ...copy,
        originalFilename,
        type: 'image',
        src: webp['1920'],
        sources: { webp, avif: {} },
        width: metadata.width,
        height: metadata.height,
        blurDataURL: `data:image/webp;base64,${blur.toString('base64')}`,
        objectPosition: '50% 50%',
      })
      continue
    }

    const videoName = `${name}${path.extname(file).toLowerCase()}`
    const videoPath = path.join(outputDir, videoName)
    fs.copyFileSync(file, videoPath)
    const posterName = `${name}-poster.webp`
    const posterPath = path.join(outputDir, posterName)
    const poster = await sharp(extractVideoPoster(file)).webp({ quality: 80 }).toBuffer()
    fs.writeFileSync(posterPath, poster)
    const metadata = await sharp(poster).metadata()
    if (!metadata.width || !metadata.height) throw new Error(`Video poster dimensions are missing: ${file}`)
    manifest.push({
      ...copy,
      originalFilename,
      type: 'video',
      src: `/slider/${videoName}`,
      sources: { webp: {}, avif: {} },
      poster: `/slider/${posterName}`,
      width: metadata.width,
      height: metadata.height,
      blurDataURL: `data:image/webp;base64,${(await sharp(poster).resize(24).webp({ quality: 20 }).toBuffer()).toString('base64')}`,
      objectPosition: '50% 50%',
    })
  }

  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
  fs.writeFileSync(statePath, JSON.stringify({ fingerprint }))
  console.log(`[Slider Build] Wrote ${manifest.length} slides to ${manifestPath}.`)
}

build().catch((error: unknown) => {
  console.error('[Slider Build] Failed:', error)
  process.exitCode = 1
})
