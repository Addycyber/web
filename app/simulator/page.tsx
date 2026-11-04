import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import { AsrsAnimation } from "@/components/asrs/AsrsAnimation";
import { AsrsAnatomyFigure } from "@/components/anatomy";
import { constructMetadata } from "@/lib/metadata";
import { getProduct } from "@/lib/company";

function getStopickSummary(): string {
  const stopick = getProduct("stopick");
  if (!stopick) throw new Error("Company data must include STOPICK.");
  return stopick.summary;
}

const stopickSummary = getStopickSummary();

export const metadata = constructMetadata({
  title: "ASRS Simulation",
  description: stopickSummary,
  path: "/simulator",
});

export default function SimulatorPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] py-12 text-[var(--text)] transition-colors md:py-16">
      <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl space-y-3">
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
            Interactive Web Experience
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            ASRS Simulation
          </h1>
          <p className="text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
            {stopickSummary}
          </p>
        </header>

        <section aria-labelledby="anatomy-heading" className="space-y-4">
          <h2 id="anatomy-heading" className="text-2xl font-bold">
            Storage anatomy and footprint
          </h2>
          <AsrsAnatomyFigure mode="interactive" />
        </section>

        <section aria-labelledby="motion-heading" className="space-y-4">
          <h2 id="motion-heading" className="text-2xl font-bold">
            Crane motion
          </h2>
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(17rem,0.8fr)]">
            <AsrsAnimation />
            <aside className="space-y-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)] p-6">
              <h3 className="text-lg font-bold">Explore the crane cycle</h3>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                Drag to orbit, use two fingers or right-drag to pan, and scroll or pinch to zoom.
                Select a storage location to store or retrieve a load.
              </p>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                The scene illustrates an automated storage and retrieval layout; it is not a
                product configuration or engineering drawing.
              </p>
              <Link
                href="/get-a-quote?product=stopick"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--accent-hover)]"
              >
                Request quote <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/tools/calculator"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[var(--border-strong)] px-5 py-3 text-sm font-semibold hover:border-[var(--accent)]"
              >
                Floor-space illustration <Calculator size={16} aria-hidden="true" />
              </Link>
            </aside>
          </div>
        </section>
      </div>
    </div>
  );
}
