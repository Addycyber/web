import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const publicRoot = path.resolve(root, "public");
const { products } = JSON.parse(
  readFileSync(path.resolve(root, "data/company-data.json"), "utf8"),
);
const failures = [];
const primaryImages = new Map();
const missingPrimaryImages = [];

for (const product of products) {
  if (!product.heroImage) {
    if (product.heroImageAlt) {
      failures.push(`${product.name}: hero image alt text exists without an image.`);
    }
    missingPrimaryImages.push(product.name);
  } else {
    if (!product.heroImage.startsWith("/")) {
      failures.push(`${product.name}: invalid heroImage path "${product.heroImage}".`);
      continue;
    }

    if (!product.heroImageAlt?.trim() || product.heroImageAlt.trim().length < 20) {
      failures.push(`${product.name}: hero image needs descriptive alt text.`);
    }

    const heroFilePath = path.resolve(publicRoot, ...product.heroImage.slice(1).split("/"));
    if (!existsSync(heroFilePath)) {
      failures.push(`${product.name}: hero image does not exist: ${product.heroImage}`);
    } else {
      const previousProduct = primaryImages.get(product.heroImage);
      if (previousProduct && previousProduct !== product.slug) {
        failures.push(
          `${previousProduct} and ${product.slug} share primary image ${product.heroImage}.`,
        );
      }
      primaryImages.set(product.heroImage, product.slug);

      try {
        const meta = await sharp(heroFilePath).metadata();
        if (!meta.width || meta.width < 1200) {
          failures.push(
            `${product.name}: hero image width is ${meta.width}px, which is < 1200px: ${product.heroImage}`,
          );
        }
      } catch (err) {
        failures.push(`${product.name}: failed to read image metadata for ${product.heroImage}: ${err.message}`);
      }
    }
  }

  // Check gallery and brochure pages
  const images = new Set([
    ...product.galleryImages,
    ...product.brochurePages.map(
      (page) => `/brochure/p${String(page).padStart(2, "0")}.webp`,
    ),
  ]);

  for (const image of images) {
    if (!image.startsWith("/") || image.includes("?") || image.includes("#")) {
      failures.push(`${product.name}: invalid image path ${image}.`);
      continue;
    }
    const filePath = path.resolve(publicRoot, ...image.slice(1).split("/"));
    if (!filePath.startsWith(`${publicRoot}${path.sep}`) || !existsSync(filePath)) {
      failures.push(`${product.name}: image path does not exist: ${image}.`);
    }
  }
}

if (failures.length) {
  console.error("Image verification failed:\n" + failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`✓ Verified ${primaryImages.size} unique product primaries (>= 1200px), alt text, and brochure galleries.`);
  if (missingPrimaryImages.length) {
    console.warn(`[CONFIRM] Missing primary product image: ${missingPrimaryImages.join(", ")}.`);
  }
}
