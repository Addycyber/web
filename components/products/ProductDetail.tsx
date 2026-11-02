import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Product } from "@/lib/company";
import { BrochureViewer } from "@/components/brochure/BrochureViewer";

const listSections = [
  ["Features", "features"],
  ["Controller", "controller"],
  ["Safety", "safety"],
  ["Applications", "applications"],
  ["Variants", "variants"],
  ["Trays", "trays"],
  ["Drives", "drives"],
  ["Other product range", "otherRange"],
] as const;

export function ProductDetail({ product, id }: { product: Product; id?: string }) {
  return (
    <article id={id} className="min-h-screen scroll-mt-24 bg-[var(--bg)] text-[var(--text)]">
      <header className="border-b border-[var(--border)] bg-[var(--bg-subtle)] py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="space-y-5 lg:col-span-7">
            <nav className="flex items-center gap-2 text-xs text-[var(--text-muted)]" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[var(--text)]">Home</Link>
              <span aria-hidden="true">/</span>
              <Link href="/products" className="hover:text-[var(--text)]">Products</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="font-semibold text-[var(--accent)]">{product.name}</span>
            </nav>
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
              {product.type}
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{product.name}</h1>
            <p className="max-w-3xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
              {product.summary}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href={`/get-a-quote?product=${product.slug}`}
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--accent-hover)]"
              >
                Request quote for {product.name}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--bg)] px-4 py-3 text-sm font-semibold"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                All products
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-muted)] lg:col-span-5">
            <Image
              src={product.heroImage}
              alt={`${product.name} – brochure page ${product.brochurePages[0]}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-contain"
            />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-14 px-4 py-12 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold">Concept</h2>
            <p className="leading-relaxed text-[var(--text-secondary)]">{product.concept}</p>
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-bold">Where to use</h2>
            <p className="leading-relaxed text-[var(--text-secondary)]">{product.whereToUse}</p>
          </div>
        </section>

        {product.facts.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Brochure facts</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {product.facts.map((fact) => (
                <article key={fact.label} className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-5">
                  <p className="font-mono text-xl font-bold text-[var(--accent)]">{fact.value}</p>
                  <h3 className="mt-2 text-sm font-semibold">{fact.label}</h3>
                </article>
              ))}
            </div>
          </section>
        )}

        {product.benefits.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Benefits</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {product.benefits.map((benefit) => (
                <article key={benefit} className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-5">
                  <p className="leading-relaxed text-[var(--text-secondary)]">{benefit}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {listSections.map(([title, key]) => {
          const items = product[key];
          if (!items.length) return null;
          return (
            <section key={key} className="space-y-4">
              <h2 className="text-2xl font-bold">{title}</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {items.map((item) => (
                  <li key={item} className="rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] p-4 leading-relaxed text-[var(--text-secondary)]">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        {product.specs.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Specifications</h2>
            <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
              <table className="w-full min-w-[520px] text-left text-sm">
                <tbody>
                  {product.specs.map((spec) => (
                    <tr key={spec.label} className="border-b border-[var(--border)] last:border-0">
                      <th scope="row" className="bg-[var(--bg-subtle)] p-3 font-semibold">{spec.label}</th>
                      <td className="p-3">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <BrochureViewer pages={product.brochurePages} productName={product.name} />

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border)] pt-8">
          <p className="text-sm text-[var(--text-secondary)]">
            Discuss a {product.name} configuration with the Space Magnum team.
          </p>
          <Link
            href={`/get-a-quote?product=${product.slug}`}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--accent-hover)]"
          >
            Request quote for {product.name}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
