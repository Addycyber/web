import { existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const publicRoot = path.resolve(root, 'public');
const productsDir = path.resolve(publicRoot, 'products');

if (!existsSync(productsDir)) {
  mkdirSync(productsDir, { recursive: true });
}

// Only product-matched sources are generated; STOLONG needs a verified source.
const PRODUCT_IMAGE_SOURCES = {
  stomat: {
    source: path.resolve(publicRoot, 'gallery/img_carousel_50_1600w.webp'),
  },
  stolift: {
    source: path.resolve(publicRoot, 'gallery/img_stolift_121_1600w.webp'),
  },
  storder: {
    source: path.resolve(publicRoot, 'gallery/img_storder_132_1600w.webp'),
  },
  stopick: {
    source: path.resolve(publicRoot, 'gallery/img_asrs_13_1600w.webp'),
  },
  'compactors-racking': {
    source: path.resolve(publicRoot, 'gallery/img_compactors_74_1600w.webp'),
  },
};

async function buildImages() {
  console.log(`[build-product-images] Generating ${Object.keys(PRODUCT_IMAGE_SOURCES).length} hero images into public/products/ ...`);
  console.warn('[CONFIRM] STOLONG image source unavailable; no hero image generated.');

  for (const [slug, config] of Object.entries(PRODUCT_IMAGE_SOURCES)) {
    const outPath = path.join(productsDir, `${slug}-hero.webp`);

    await sharp(config.source)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 85, effort: 4 })
      .toFile(outPath);

    const meta = await sharp(outPath).metadata();
    console.log(`  ✓ Created hero image for ${slug}: ${meta.width}x${meta.height} (${outPath})`);
  }

  console.log('[build-product-images] Completed successfully.');
}

buildImages().catch((err) => {
  console.error('[build-product-images] Failed:', err);
  process.exit(1);
});
