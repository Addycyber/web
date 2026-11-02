import { AsrsAnimation } from "@/components/asrs/AsrsAnimation";
import { getProduct } from "@/lib/company";

function factValue(slug: string, label: string) {
  const fact = getProduct(slug)?.facts.find((entry) => entry.label === label);
  if (!fact) throw new Error(`Missing brochure fact "${label}" for ${slug}.`);
  return fact.value;
}

const TRUSTED_STATS = [
  {
    value: factValue("stomat", "Floor-space saving"),
    label: "Floor space saving",
    detail: "STOMAT and STOLIFT",
  },
  {
    value: factValue("stolift", "Tray load classes"),
    label: "Tray capacity",
    detail: "STOLIFT tray load classes",
  },
  {
    value: factValue("stopick", "Machine height"),
    label: "Machine height",
    detail: "STOPICK",
  },
  {
    value: factValue("stolong", "Storage height"),
    label: "Storage height",
    detail: "STOLONG",
  },
];

export function AsrsHero() {
  return (
    <>
      <section className="asrs-home-figure">
        <h1 className="sr-only">
          Automated Storage &amp; Retrieval Systems (ASRS) Manufacturer Pune India
        </h1>
        <AsrsAnimation mode="hero" />
      </section>
      <section
        className="asrs-trusted-stats"
        aria-label="Product facts from the company brochure"
      >
        {TRUSTED_STATS.map((stat) => (
          <article key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
            <small>{stat.detail}</small>
          </article>
        ))}
      </section>
    </>
  );
}
