import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import { AsrsArt } from "./art";
import { MotionStage } from "./motion-stage";

export function AsrsFigure() {
  return (
    <figure className="asrs-home-figure">
      <h1 className="sr-only">
        Automated Storage &amp; Retrieval Systems (ASRS) Manufacturer Pune India
      </h1>
      <MotionStage>
        <AsrsArt />
      </MotionStage>
      <figcaption className="asrs-caption">
        <p>Hover or press Enter/Space to request a tray</p>
        <output aria-live="polite" data-readout>
          Ready · 250 / 500 kg tray class
        </output>
      </figcaption>
      <nav className="asrs-actions" aria-label="Home actions">
        <Link href="/get-a-quote" className="asrs-action asrs-action-primary">
          Request Facility Quote
          <ArrowRight aria-hidden="true" size={16} />
        </Link>
        <Link href="/tools/calculator" className="asrs-action asrs-action-secondary">
          <Calculator aria-hidden="true" size={16} />
          Calculate Floor-Space Illustration
        </Link>
      </nav>
    </figure>
  );
}
