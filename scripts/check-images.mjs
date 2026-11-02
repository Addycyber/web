import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const publicRoot = path.resolve(root, "public");
const { products } = JSON.parse(
  readFileSync(path.resolve(root, "data/company-data.json"), "utf8"),
);
const failures = [];
const primaryImages = new Map();

for (const product of products) {
  const expectedPrimary = `/brochure/p${String(product.brochurePages[0]).padStart(2, "0")}.webp`;
  if (product.heroImage !== expectedPrimary) {
    failures.push(`${product.name}: primary image must be ${expectedPrimary}.`);
  }

  const previousProduct = primaryImages.get(product.heroImage);
  if (previousProduct && previousProduct !== product.slug) {
    failures.push(
      `${previousProduct} and ${product.slug} share primary image ${product.heroImage}.`,
    );
  }
  primaryImages.set(product.heroImage, product.slug);

  const images = new Set([
    product.heroImage,
    ...product.galleryImages,
    ...product.brochurePages.map(
      (page) => `/brochure/p${String(page).padStart(2, "0")}.webp`,
    ),
  ]);
  for (const image of images) {
    if (!image.startsWith("/") || image.includes("?") || image.includes("#")) {
      failures.push(`${product.name}: invalid public image path ${image}.`);
      continue;
    }
    const filePath = path.resolve(publicRoot, ...image.slice(1).split("/"));
    if (!filePath.startsWith(`${publicRoot}${path.sep}`) || !existsSync(filePath)) {
      failures.push(`${product.name}: image path does not exist: ${image}.`);
    }
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Checked ${products.length} product primaries and brochure galleries.`);
}
