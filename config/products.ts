import { products } from "@/lib/company";

export { products as PRODUCTS, products as PRODUCT_LIST };
export type { Product, ProductId } from "@/lib/company";

export const PRODUCTS_MAP = Object.fromEntries(
  products.map((product) => [product.slug, product]),
) as Record<(typeof products)[number]["slug"], (typeof products)[number]>;
