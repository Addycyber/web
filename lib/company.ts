import rawCompanyData from "../data/company-data.json";
import { z } from "zod";

const companySchema = z.object({
  name: z.string(),
  founded: z.number().int(),
  tagline: z.string(),
  about: z.string(),
  unit1: z.string(),
  unit2: z.string(),
  phones: z.array(z.string()),
  fax: z.string(),
  emails: z.array(z.email()),
  brochurePage: z.number().int().positive(),
});

const factSchema = z.object({
  label: z.string(),
  value: z.string(),
});

const productSchema = z.object({
  slug: z.enum(["stomat", "stolift", "storder", "stopick", "stolong", "compactors-racking"]),
  name: z.string(),
  type: z.string(),
  summary: z.string(),
  concept: z.string(),
  whereToUse: z.string(),
  benefits: z.array(z.string()),
  features: z.array(z.string()),
  controller: z.array(z.string()),
  safety: z.array(z.string()),
  applications: z.array(z.string()),
  variants: z.array(z.string()),
  trays: z.array(z.string()),
  drives: z.array(z.string()),
  facts: z.array(factSchema),
  specs: z.array(factSchema),
  otherRange: z.array(z.string()),
  brochurePages: z.array(z.number().int().positive()),
  heroImage: z.string(),
  galleryImages: z.array(z.string()),
  accentColor: z.string(),
});

const companyDataSchema = z.object({
  company: companySchema,
  pageMap: z.array(
    z.object({
      page: z.number().int().positive(),
      title: z.string(),
    }),
  ),
  products: z.array(productSchema).length(6),
});

const companyData = companyDataSchema.parse(rawCompanyData);

export type Company = z.infer<typeof companySchema>;
export type Product = z.infer<typeof productSchema>;
export type ProductId = Product["slug"];

export const company = companyData.company;
export const products = companyData.products;
export const pageMap = companyData.pageMap;

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
