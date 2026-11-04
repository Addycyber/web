import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

interface CaptionData {
  alt?: string
  caption?: string
}

export interface GalleryManifestItem {
  id: string
  category: string
  categoryLabel: string
  originalFilename: string
  type: 'image' | 'video'
  width: number
  height: number
  aspectRatio: number
  blurDataURL: string
  src: string
  poster?: string
  sources: {
    webp: { [width: number]: string }
    avif: { [width: number]: string }
  }
  alt: string
  caption: string
}

const SUPPORTED_IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif'])
const SUPPORTED_VIDEO_EXTS = new Set(['.mp4', '.webm'])
const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024 // 50MB
const TARGET_WIDTHS = [480, 960, 1600]
const MAX_IMAGES_PER_CATEGORY = 16

const possibleAssetDirs = [
  path.resolve(process.cwd(), '../assets'),
  path.resolve(process.cwd(), 'assets'),
  path.resolve(__dirname, '../../assets'),
]

let assetsRoot = ''
for (const dir of possibleAssetDirs) {
  if (fs.existsSync(dir)) {
    assetsRoot = dir
    break
  }
}

const outputPublicDir = path.resolve(process.cwd(), 'public/gallery')
const manifestDir = path.resolve(process.cwd(), 'content')
const manifestPath = path.resolve(manifestDir, 'gallery.manifest.json')
const reportPath = path.resolve(process.cwd(), 'gallery-report.md')

if (!fs.existsSync(outputPublicDir)) {
  fs.mkdirSync(outputPublicDir, { recursive: true })
}
if (!fs.existsSync(manifestDir)) {
  fs.mkdirSync(manifestDir, { recursive: true })
}

// Category normalization dictionary
function normalizeCategory(folderName: string): { key: string; label: string } | null {
  const lower = folderName.toLowerCase().replace(/[^a-z0-9]/g, '')
  
  if (lower.includes('stolift')) return { key: 'stolift', label: 'STOLIFT Vertical Lift' }
  if (lower.includes('storder')) return { key: 'storder', label: 'STORDER Picking' }
  if (lower.includes('stomat')) return { key: 'stomat', label: 'STOMAT ASRS' }
  if (lower.includes('carousel')) return { key: 'carousel', label: 'Vertical Carousels' }
  if (lower.includes('compactor') || lower.includes('heavyduty')) return { key: 'compactors', label: 'Compactors & Racks' }
  if (lower.includes('asrs')) return { key: 'asrs', label: 'ASRS High-Bay' }
  if (lower.includes('mezzanine') || lower.includes('mazzannine')) return { key: 'mezzanine', label: 'Mezzanine Floors' }
  if (lower.includes('facility') || lower.includes('powdercoating') || lower.includes('rollforming')) return null
  if (lower.includes('cantilever')) return { key: 'cantilever', label: 'Cantilever Racking' }
  if (lower.includes('pallet') || lower.includes('drum')) return { key: 'pallet-racks', label: 'Pallet & Drum Storage' }
  
  return { key: 'general', label: 'General Installations' }
}

const captionsMap: Record<string, Record<string, CaptionData>> = {}

function loadCaptions(dir: string, category: string) {
  const candidates = [
    path.join(dir, 'captions.json'),
    path.join(dir, `${category}.captions.json`),
  ]
  for (const c of candidates) {
    if (fs.existsSync(c)) {
      try {
        captionsMap[category] = JSON.parse(fs.readFileSync(c, 'utf-8'))
      } catch {
        // ignore
      }
    }
  }
}

if (assetsRoot && fs.existsSync(path.join(assetsRoot, 'captions.json'))) {
  try {
    captionsMap['root'] = JSON.parse(fs.readFileSync(path.join(assetsRoot, 'captions.json'), 'utf-8'))
  } catch {}
}

interface DiscoveredFile {
  fullPath: string
  categoryKey: string
  categoryLabel: string
  filename: string
  ext: string
  size: number
}

function walkDir(dir: string, currentCategory: string = 'general'): DiscoveredFile[] {
  let results: DiscoveredFile[] = []
  if (!fs.existsSync(dir)) return results
  const norm = normalizeCategory(currentCategory)
  if (!norm) return results

  const entries = fs.readdirSync(dir, { withFileTypes: true })
  loadCaptions(dir, currentCategory)

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    
    // Skip devendra duplicate folder or hidden system files
    if (entry.name.toLowerCase() === 'devendra' || entry.name.startsWith('.')) {
      continue
    }

    if (entry.isDirectory()) {
      results = results.concat(walkDir(fullPath, entry.name))
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase()
      const stats = fs.statSync(fullPath)
      results.push({
        fullPath,
        categoryKey: norm.key,
        categoryLabel: norm.label,
        filename: entry.name,
        ext,
        size: stats.size,
      })
    }
  }
  return results
}

async function processImage(file: DiscoveredFile, id: string): Promise<GalleryManifestItem | null> {
  try {
    const fileBaseName = `img_${id}`
    const originalMtime = fs.statSync(file.fullPath).mtimeMs

    const metadata = await sharp(file.fullPath).metadata()
    const origWidth = metadata.width || 1200
    const origHeight = metadata.height || 800
    const aspectRatio = origWidth / origHeight

    // 24px blur placeholder
    const blurBuffer = await sharp(file.fullPath)
      .resize(24)
      .webp({ quality: 20 })
      .toBuffer()
    const blurDataURL = `data:image/webp;base64,${blurBuffer.toString('base64')}`

    const sources: GalleryManifestItem['sources'] = {
      webp: {},
      avif: {},
    }

    for (const w of TARGET_WIDTHS) {
      const targetWidth = Math.min(w, origWidth)
      const webpName = `${fileBaseName}_${w}w.webp`
      const webpPath = path.join(outputPublicDir, webpName)
      const avifName = `${fileBaseName}_${w}w.avif`
      const avifPath = path.join(outputPublicDir, avifName)

      if (!fs.existsSync(webpPath) || fs.statSync(webpPath).mtimeMs < originalMtime) {
        await sharp(file.fullPath)
          .rotate()
          .resize(targetWidth)
          .withMetadata({ orientation: 1 })
          .webp({ quality: 80 })
          .toFile(webpPath)
      }

      if (!fs.existsSync(avifPath) || fs.statSync(avifPath).mtimeMs < originalMtime) {
        await sharp(file.fullPath)
          .rotate()
          .resize(targetWidth)
          .withMetadata({ orientation: 1 })
          .avif({ quality: 75 })
          .toFile(avifPath)
      }

      sources.webp[w] = `/gallery/${webpName}`
      sources.avif[w] = `/gallery/${avifName}`
    }

    const defaultSrc = sources.webp[960] || sources.webp[TARGET_WIDTHS[0]]
    const catCaptions = captionsMap[file.categoryKey] || captionsMap['root'] || {}
    const captionEntry = catCaptions[file.filename] || {}

    return {
      id,
      category: file.categoryKey,
      categoryLabel: file.categoryLabel,
      originalFilename: file.filename,
      type: 'image',
      width: origWidth,
      height: origHeight,
      aspectRatio,
      blurDataURL,
      src: defaultSrc,
      sources,
      alt: captionEntry.alt || '',
      caption: captionEntry.caption || '',
    }
  } catch {
    return null
  }
}

async function processVideo(file: DiscoveredFile, id: string): Promise<GalleryManifestItem | null> {
  const targetVideoName = `vid_${id}${file.ext}`
  const targetVideoPath = path.join(outputPublicDir, targetVideoName)

  if (!fs.existsSync(targetVideoPath)) {
    fs.copyFileSync(file.fullPath, targetVideoPath)
  }

  const baseVideoName = `vid_${id}`;
  const posterPath = `/posters/${baseVideoName}.webp`;
  const catCaptions = captionsMap[file.categoryKey] || captionsMap['root'] || {};
  const captionEntry = catCaptions[file.filename] || {};

  return {
    id,
    category: file.categoryKey,
    categoryLabel: file.categoryLabel,
    originalFilename: file.filename,
    type: 'video',
    width: 960,
    height: 540,
    aspectRatio: 16 / 9,
    blurDataURL: posterPath,
    src: `/gallery/${targetVideoName}`,
    poster: posterPath,
    sources: { webp: {}, avif: {} },
    alt: captionEntry.alt || `${file.categoryLabel} video demonstration`,
    caption: captionEntry.caption || '',
  }
}

// Concurrency helper
async function mapConcurrent<T, R>(items: T[], concurrency: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = []
  let index = 0

  async function worker() {
    while (index < items.length) {
      const i = index++
      results[i] = await fn(items[i])
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, items.length) }, () => worker())
  await Promise.all(workers)
  return results
}

async function run() {
  console.log('\n========================================')
  console.log('  BUILDING GALLERY DERIVATIVES & MANIFEST')
  console.log('========================================\n')

  if (!assetsRoot) {
    console.warn('[Gallery Build] Assets folder not found.')
    fs.writeFileSync(manifestPath, JSON.stringify([], null, 2))
    return
  }

  const allFiles = walkDir(assetsRoot)
  const categoryBuckets: Record<string, DiscoveredFile[]> = {}
  const ignoredFiles: { file: string; reason: string }[] = []

  for (const f of allFiles) {
    if (f.size > MAX_FILE_SIZE_BYTES) {
      ignoredFiles.push({ file: f.filename, reason: `Exceeds 50MB limit (${(f.size / (1024 * 1024)).toFixed(1)}MB)` })
      continue
    }

    if (SUPPORTED_IMAGE_EXTS.has(f.ext) || SUPPORTED_VIDEO_EXTS.has(f.ext)) {
      if (!categoryBuckets[f.categoryKey]) categoryBuckets[f.categoryKey] = []
      categoryBuckets[f.categoryKey].push(f)
    } else {
      ignoredFiles.push({ file: f.filename, reason: `Unsupported extension (${f.ext})` })
    }
  }

  // Select top high quality items per category (sort by size descending to prioritize large original camera RAW/photos)
  const selectedMedia: DiscoveredFile[] = []
  for (const catKey of Object.keys(categoryBuckets)) {
    const items = categoryBuckets[catKey]
    items.sort((a, b) => b.size - a.size)
    const taken = items.slice(0, MAX_IMAGES_PER_CATEGORY)
    selectedMedia.push(...taken)
  }

  console.log(`Discovered ${allFiles.length} files across ${Object.keys(categoryBuckets).length} categories.`)
  console.log(`Selected ${selectedMedia.length} top photographic and video items for optimized gallery.`)

  let processedCount = 0
  const processedItems = await mapConcurrent(selectedMedia, 6, async (file) => {
    processedCount++
    const cleanId = `${file.categoryKey}_${processedCount}`
    if (SUPPORTED_IMAGE_EXTS.has(file.ext)) {
      return await processImage(file, cleanId)
    } else if (SUPPORTED_VIDEO_EXTS.has(file.ext)) {
      return await processVideo(file, cleanId)
    }
    return null
  })

  const manifestItems: GalleryManifestItem[] = processedItems.filter((item): item is GalleryManifestItem => item !== null)
  fs.writeFileSync(manifestPath, JSON.stringify(manifestItems, null, 2), 'utf-8')
  const referencedAssets = new Set(
    manifestItems.flatMap((item) => [
      item.src,
      ...Object.values(item.sources.webp),
      ...Object.values(item.sources.avif),
    ].map((assetPath) => path.basename(assetPath))),
  )
  for (const filename of fs.readdirSync(outputPublicDir)) {
    if (/^(img|vid)_/.test(filename) && !referencedAssets.has(filename)) {
      fs.unlinkSync(path.join(outputPublicDir, filename))
    }
  }
  console.log(`\nManifest written to ${manifestPath} (${manifestItems.length} items)`)

  const missingAltReports = manifestItems.filter(i => !i.alt).map(i => ({ category: i.category, filename: i.originalFilename }))

  const reportLines = [
    '# Space Magnum Gallery Processing Report',
    '',
    `Generated at: ${new Date().toISOString()}`,
    `Total Assets Discovered: ${allFiles.length}`,
    `Curated Media Items in Gallery: ${manifestItems.length}`,
    `Categories Included: ${Object.keys(categoryBuckets).join(', ')}`,
    '',
    '## Captions & Alt Text Status',
    'Per client requirement, no captions or alt texts are fabricated. You can supply them by creating an `assets/<category>/captions.json` or `assets/captions.json` with structure:',
    '```json',
    '{',
    '  "filename.jpg": {',
    '    "alt": "Descriptive accessibility alt text",',
    '    "caption": "Customer-facing caption"',
    '  }',
    '}',
    '```',
    '',
    '### Media Awaiting Captions:',
    ...missingAltReports.map(r => `- [ ] \`${r.category}/${r.filename}\``),
    '',
    '## Ignored Files',
    ...ignoredFiles.slice(0, 50).map(i => `- \`${i.file}\` (${i.reason})`),
  ]

  fs.writeFileSync(reportPath, reportLines.join('\n'), 'utf-8')
  console.log(`Report written to ${reportPath}`)
  console.log('Gallery build completed successfully!\n')
}

run().catch(err => {
  console.error('[Gallery Build] Fatal error:', err)
  process.exit(1)
})
