import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/company";

const metricRows = [
  {
    label: "Floor-space saving",
    factLabels: ["Floor-space saving"],
  },
  {
    label: "Tray load classes",
    factLabels: ["Tray load classes"],
  },
  {
    label: "Machine / storage height",
    factLabels: ["Machine height", "Storage height"],
  },
  {
    label: "Cycles",
    factLabels: ["Dual cycles", "Double cycles"],
  },
  {
    label: "Designed machine capacity",
    factLabels: ["Designed machine capacity"],
  },
  {
    label: "Motion axes",
    factLabels: ["Motion axes"],
  },
  {
    label: "Compactor illustrated example",
    factLabels: ["Illustrated example"],
  },
  {
    label: "Manual block weight",
    factLabels: ["Manual block"],
  },
  {
    label: "Crank-drive maximum base weight",
    factLabels: ["Crank drive"],
  },
  {
    label: "Brochure comparison",
    factLabels: ["Comparison stated in brochure"],
  },
];

function factForProduct(product: (typeof products)[number], labels: string[]) {
  return product.facts.find((fact) => labels.includes(fact.label))?.value ?? "—";
}

export function ProductComparisonTable() {
  return (
    <section className="bg-[var(--bg)] py-16 transition-colors md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <div className="mb-3 inline-block rounded-full bg-[var(--accent-soft)] px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
            Brochure comparison
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-[var(--text)] sm:text-3xl">
            Compare the product range
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
            Only details stated in the company brochure are shown; unavailable comparisons are marked “—”.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)]">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--bg)]">
                <th scope="col" className="sticky left-0 z-10 min-w-48 bg-[var(--bg)] p-4 text-xs font-mono uppercase text-[var(--text-muted)]">
                  Fact
                </th>
                {products.map((product) => (
                  <th key={product.slug} scope="col" className="min-w-40 p-4 align-top">
                    <span className="block text-sm font-bold text-[var(--text)]">{product.name}</span>
                    <span className="mt-1 block text-xs font-normal text-[var(--text-muted)]">{product.type}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {metricRows.map((row, index) => (
                <tr key={row.label} className={`border-b border-[var(--border)] last:border-0 ${index % 2 ? "bg-[var(--bg-subtle)]" : "bg-[var(--bg)]"}`}>
                  <th scope="row" className="sticky left-0 bg-inherit p-4 text-xs font-semibold text-[var(--text)]">
                    {row.label}
                  </th>
                  {products.map((product) => (
                    <td key={product.slug} className="p-4 text-sm text-[var(--text-secondary)]">
                      {factForProduct(product, row.factLabels)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-[var(--border)] bg-[var(--bg)]">
                <th scope="row" className="sticky left-0 bg-[var(--bg)] p-4 text-xs font-mono text-[var(--text-muted)]">
                  Product details
                </th>
                {products.map((product) => (
                  <td key={product.slug} className="p-4">
                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[var(--accent)] hover:underline"
                    >
                      Details <ArrowRight size={12} aria-hidden="true" />
                    </Link>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
}
