import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import ffmpegPath from 'ffmpeg-static';
import sharp from 'sharp';

const root = process.cwd();
const publicRoot = path.resolve(root, 'public');
const postersDir = path.resolve(publicRoot, 'posters');

if (!existsSync(postersDir)) {
  mkdirSync(postersDir, { recursive: true });
}

function findVideos(dir) {
  const results = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findVideos(fullPath));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.mp4')) {
      results.push(fullPath);
    }
  }
  return results;
}

function extractFrame(videoPath, timestamp = '00:00:01.500') {
  return new Promise((resolve, reject) => {
    const ff = spawn(ffmpegPath, [
      '-ss', timestamp,
      '-i', videoPath,
      '-vframes', '1',
      '-f', 'image2pipe',
      '-vcodec', 'png',
      'pipe:1',
    ]);

    const chunks = [];
    ff.stdout.on('data', (chunk) => chunks.push(chunk));
    ff.stderr.on('data', () => {});
    ff.on('error', reject);
    ff.on('close', (code) => {
      if (code !== 0) {
        return reject(new Error(`ffmpeg exited with code ${code} on ${videoPath}`));
      }
      const buffer = Buffer.concat(chunks);
      if (buffer.length === 0) {
        return reject(new Error(`No frame extracted for ${videoPath}`));
      }
      resolve(buffer);
    });
  });
}

async function processVideo(videoPath) {
  const baseName = path.basename(videoPath, path.extname(videoPath));
  const outPath = path.join(postersDir, `${baseName}.webp`);

  if (existsSync(outPath)) {
    const stats = statSync(outPath);
    if (stats.size > 0 && stats.size <= 120 * 1024) {
      return { baseName, cached: true, size: stats.size };
    }
  }

  // Extract at 1.5s, fallback to 0.5s if 1.5s fails
  let frameBuffer;
  try {
    frameBuffer = await extractFrame(videoPath, '00:00:01.500');
  } catch {
    frameBuffer = await extractFrame(videoPath, '00:00:00.500');
  }

  let quality = 80;
  let webpBuffer = await sharp(frameBuffer)
    .resize({ width: 1280, withoutEnlargement: true })
    .webp({ quality, effort: 4 })
    .toBuffer();

  // Ensure < 120 KB per prompt spec
  while (webpBuffer.length > 120 * 1024 && quality > 40) {
    quality -= 10;
    webpBuffer = await sharp(frameBuffer)
      .resize({ width: 1280, withoutEnlargement: true })
      .webp({ quality, effort: 4 })
      .toBuffer();
  }

  writeFileSync(outPath, webpBuffer);
  return { baseName, cached: false, size: webpBuffer.length };
}

async function run() {
  const videos = findVideos(publicRoot);
  console.log(`[make-posters] Found ${videos.length} videos to verify/generate posters...`);

  let generated = 0;
  let cached = 0;

  for (const video of videos) {
    try {
      const res = await processVideo(video);
      if (res.cached) {
        cached++;
      } else {
        generated++;
        console.log(`  ✓ Generated poster for ${res.baseName} (${Math.round(res.size / 1024)} KB)`);
      }
    } catch (err) {
      console.error(`  ✗ Error processing ${video}:`, err.message);
    }
  }

  console.log(`[make-posters] Finished. ${generated} generated, ${cached} cached.`);
}

run().catch((err) => {
  console.error('[make-posters] Fatal error:', err);
  process.exit(1);
});
