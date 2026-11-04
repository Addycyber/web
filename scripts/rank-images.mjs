import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import sharp from "sharp";

const publicDir = path.resolve("public");
const excludedPath = /(?:^|[\\/])(?:brochure|customers|factory|facility|home-hero|icons?|logos?|screenshots?|diagrams?)(?:[\\/._-]|$)/i;
const excludedName = /(?:^|[_\-. ])(?:logo|icon|favicon|screenshot|screen|diagram|wireframe|poster)(?:[_\-. ]|$)/i;
const extensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const chosenFiles = new Set([
  "/images/hero/hero-5.jpg",
  "/gallery/img_asrs_13_1600w.webp",
  "/gallery/img_storder_132_1600w.webp",
  "/gallery/img_carousel_50_1600w.webp",
  "/gallery/img_compactors_74_1600w.webp",
]);

async function imagePaths(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return imagePaths(fullPath);
      if (!entry.isFile() || !extensions.has(path.extname(entry.name).toLowerCase())) return [];
      const relativePath = path.relative(publicDir, fullPath);
      if (excludedPath.test(relativePath) || excludedName.test(entry.name)) return [];
      return [fullPath];
    }),
  );
  return nested.flat();
}

function scoreResolution(width) {
  if (width >= 1920) return 40;
  if (width >= 1280) return 25 + (width - 1280) * (15 / 640);
  return 0;
}

function sharpnessScore(variance) {
  return Math.min(25, (Math.log1p(variance) / Math.log1p(8000)) * 25);
}

function exposureScore(mean) {
  if (mean >= 60 && mean <= 200) return 10;
  return Math.max(0, 10 - Math.min(Math.abs(mean - 60), Math.abs(mean - 200)) / 6);
}

function orientationScore(width, height) {
  const ratio = width / height;
  return ratio <= 1 ? 0 : Math.min(15, (ratio / 1.6) * 15);
}

async function inspect(filePath) {
  const metadata = await sharp(filePath).rotate().metadata();
  if (!metadata.width || !metadata.height) throw new Error(`Image has no dimensions: ${filePath}`);
  const { data, info } = await sharp(filePath)
    .rotate()
    .resize(64, 64, { fit: "inside", withoutEnlargement: true })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const pixels = Array.from(data);
  let mean = 0;
  let laplacianTotal = 0;
  let laplacianSquared = 0;
  const histogram = new Uint16Array(16);
  let flatPixels = 0;

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const index = y * info.width + x;
      const value = pixels[index];
      mean += value;
      histogram[value >> 4]++;
      if (x === 0 || y === 0 || x === info.width - 1 || y === info.height - 1) continue;
      const laplacian =
        4 * value -
        pixels[index - 1] -
        pixels[index + 1] -
        pixels[index - info.width] -
        pixels[index + info.width];
      laplacianTotal += laplacian;
      laplacianSquared += laplacian * laplacian;
      if (
        Math.abs(value - pixels[index - 1]) < 3 &&
        Math.abs(value - pixels[index + 1]) < 3 &&
        Math.abs(value - pixels[index - info.width]) < 3 &&
        Math.abs(value - pixels[index + info.width]) < 3
      ) {
        flatPixels++;
      }
    }
  }

  const count = info.width * info.height;
  const variance =
    laplacianSquared / Math.max(1, (info.width - 2) * (info.height - 2)) -
    (laplacianTotal / Math.max(1, (info.width - 2) * (info.height - 2))) ** 2;
  const dominantShare = Math.max(...histogram) / count;
  const flatShare = flatPixels / count;
  const fileSanity = Math.max(0, 10 - Math.max(0, dominantShare - 0.3) * 20 - Math.max(0, flatShare - 0.65) * 8);
  const orientation = orientationScore(metadata.width, metadata.height);
  const resolution = scoreResolution(metadata.width);
  const score =
    resolution +
    sharpnessScore(variance) +
    orientation +
    exposureScore(mean / count) +
    fileSanity;

  return {
    file: `/${path.relative(publicDir, filePath).replaceAll(path.sep, "/")}`,
    sourcePath: filePath,
    width: metadata.width,
    height: metadata.height,
    bytes: (await fs.stat(filePath)).size,
    score: Math.round(score),
    resolution,
    sharpness: Math.round(sharpnessScore(variance)),
    orientation,
    exposure: Math.round(exposureScore(mean / count)),
    sanity: Math.round(fileSanity),
    mean: Math.round(mean / count),
    thumb: data,
    thumbWidth: info.width,
    thumbHeight: info.height,
  };
}

function difference(a, b) {
  if (a.thumbWidth !== b.thumbWidth || a.thumbHeight !== b.thumbHeight) return 1;
  let total = 0;
  for (let i = 0; i < a.thumb.length; i++) total += Math.abs(a.thumb[i] - b.thumb[i]);
  return total / a.thumb.length / 255;
}

function formatBytes(bytes) {
  return `${(bytes / 1024).toFixed(0)} KB`;
}

async function main() {
  const directoryArg = process.argv.find((arg) => arg.startsWith("--directory="));
  const inputDir = directoryArg ? path.resolve(directoryArg.slice("--directory=".length)) : publicDir;
  const jsonOutput = process.argv.includes("--json");
  const paths = await imagePaths(inputDir);
  const inspected = await Promise.all(paths.map(inspect));
  if (jsonOutput) {
    console.log(JSON.stringify(
      inspected
        .sort((a, b) => b.score - a.score || a.file.localeCompare(b.file))
        .map(({ sourcePath, width, height, score }) => ({ sourcePath, width, height, score })),
    ));
    return;
  }

  const eligible = inspected
    .filter((image) => image.width >= 1280 && image.orientation > 0)
    .sort((a, b) => b.score - a.score || a.file.localeCompare(b.file));
  const unique = [];

  for (const candidate of eligible) {
    const duplicate = unique.find((image) => difference(candidate, image) < 0.025);
    if (!duplicate) unique.push(candidate);
  }

  console.log(`Scored ${paths.length} eligible images; ${unique.length} unique landscape candidates pass the 1280px minimum.`);
  console.log("| Rank | File | Size | Score | Resolution | Sharpness | Orientation | Exposure | Chosen | Reason |");
  console.log("|---:|---|---:|---:|---:|---:|---:|---:|:---:|---|");
  for (const [index, image] of unique.entries()) {
    const reasons = [
      `${image.width}×${image.height}`,
      `${image.sharpness}/25 sharpness`,
      `mean luminance ${image.mean}`,
      image.bytes > 500 * 1024 ? "source exceeds 500 KB" : "compact source",
    ];
    console.log(
      `| ${index + 1} | \`${image.file}\` | ${formatBytes(image.bytes)} | ${image.score} | ${Math.round(image.resolution)}/40 | ${image.sharpness}/25 | ${Math.round(image.orientation)}/15 | ${image.exposure}/10 | ${chosenFiles.has(image.file) ? "Yes" : "No"} | ${reasons.join("; ")} |`,
    );
  }

  const rejected = inspected.filter((image) => image.width < 1280 || image.orientation === 0);
  console.log(`\nRejected for hero resolution/orientation (${rejected.length}):`);
  for (const image of rejected) {
    console.log(`- \`${image.file}\` — ${image.width}×${image.height}${image.width < 1280 ? ", below 1280px" : ", square/portrait orientation"}`);
  }

  const top = unique;
  if (top.length) {
    const cells = await Promise.all(
      top.map(async (image, index) => {
        const label = Buffer.from(
          `<svg width="320" height="44"><rect width="100%" height="100%" fill="#fff"/><text x="8" y="18" font-size="12">#${index + 1} ${image.score} — ${image.file}</text><text x="8" y="36" font-size="11">${image.width}×${image.height} · ${formatBytes(image.bytes)}</text></svg>`,
        );
        const thumb = await sharp(image.file.startsWith("/") ? path.join(publicDir, image.file.slice(1)) : image.file)
          .resize(320, 190, { fit: "inside" })
          .png()
          .toBuffer();
        return [
          { input: label, left: (index % 3) * 340, top: Math.floor(index / 3) * 240 },
          { input: thumb, left: (index % 3) * 340, top: Math.floor(index / 3) * 240 + 44 },
        ];
      }),
    );
    const sheet = await sharp({
      create: {
        width: 1020,
        height: Math.ceil(top.length / 3) * 240,
        channels: 3,
        background: "#e5e7eb",
      },
    })
      .composite(cells.flat())
      .jpeg({ quality: 82 })
      .toBuffer();
    const sheetPath = path.join(os.tmpdir(), "hero-image-candidates.jpg");
    await fs.writeFile(sheetPath, sheet);
    console.log(`\nTop-candidate contact sheet: ${sheetPath}`);
  }

  if (unique.length < 3) {
    console.log("\nSTOP: fewer than three unique landscape images meet the 1280px minimum.");
  }
}

main().catch((error) => {
  console.error("Could not rank public images:", error);
  process.exitCode = 1;
});
