import * as React from "react";
import { haloOf } from "./kit/iso-kit";
import { MOVING_PARTS, STATIC_PARTS, TOP_SEAMS } from "./geometry";
import { BASE, HEIGHT, P, WIDTH } from "./view";

function Part({
  paths,
  tone,
  lit,
}: {
  paths: (typeof STATIC_PARTS)[number]["paths"];
  tone: (typeof STATIC_PARTS)[number]["tone"];
  lit?: boolean;
}) {
  return (
    <g className="iso-solid" data-lit={lit ? "" : undefined}>
      <path className="iso-fill" d={paths.fill} />
      {paths.shades.map((shade, index) =>
        shade ? <path key={index} className="iso-shade" data-shade={index} d={shade} /> : null,
      )}
      {paths.top ? <path className="iso-top" d={paths.top} /> : null}
      {paths.crease ? <path className="iso-line iso-crease" data-tone="faint" d={paths.crease} /> : null}
      {paths.bevel ? <path className="iso-line iso-bevel" data-tone="faint" d={paths.bevel} /> : null}
      <path className="iso-line iso-edge" data-tone={tone} d={paths.outline} />
    </g>
  );
}

export function AsrsArt() {
  const carriageParts = MOVING_PARTS.filter((part) => !part.id.startsWith("moving-tray"));
  const trayParts = MOVING_PARTS.filter((part) => part.id.startsWith("moving-tray"));

  return (
    <svg
      className="iso-svg asrs-svg"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      role="img"
      aria-label="Isometric STOLIFT shuttle storage system with tall tray racks, a moving lift carriage, and an operator opening."
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
    >
      <path className="iso-halo" d={haloOf(BASE, -10, 8, P)} />
      {STATIC_PARTS.map((part) => (
        <Part key={part.id} paths={part.paths} tone={part.tone} lit={part.lit} />
      ))}
      {TOP_SEAMS.map((line) => (
        <path key={line.id} className="iso-line" data-tone="faint" d={line.d} />
      ))}
      <g id="asrs-lift">
        {carriageParts.map((part) => (
          <Part key={part.id} paths={part.paths} tone={part.tone} lit={part.lit} />
        ))}
        <g id="asrs-payload">
          {trayParts.map((part) => (
            <Part key={part.id} paths={part.paths} tone={part.tone} lit={part.lit} />
          ))}
        </g>
      </g>
    </svg>
  );
}
