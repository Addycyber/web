"use client";

import * as React from "react";

const PARTS = [
  { id: "rack-rows", label: "Rack rows" },
  { id: "aisle", label: "Aisle" },
  { id: "crane", label: "Stacker crane" },
  { id: "station", label: "Input/output station" },
  { id: "bays", label: "Storage bays" },
  { id: "levels", label: "Storage levels" },
] as const;

type PartId = (typeof PARTS)[number]["id"];

export function StorageLayoutIllustration() {
  const [active, setActive] = React.useState<PartId | null>(null);
  const [pinned, setPinned] = React.useState<PartId | null>(null);
  const partLabel = (id: PartId) => PARTS.find((part) => part.id === id)?.label ?? "";

  const highlight = (id: PartId) => setActive(id);
  const release = () => setActive(pinned);
  const toggle = (id: PartId) => setPinned((current) => (current === id ? null : id));

  const partProps = (id: PartId) => ({
    className: `asrs-layout__part${active === id || pinned === id ? " is-active" : ""}`,
    "data-part": id,
    role: "button" as const,
    tabIndex: 0,
    "aria-label": `Highlight ${partLabel(id)}`,
    "aria-pressed": pinned === id,
    onMouseEnter: () => highlight(id),
    onMouseLeave: release,
    onFocus: () => highlight(id),
    onBlur: release,
    onClick: () => toggle(id),
    onKeyDown: (event: React.KeyboardEvent<SVGGElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggle(id);
      }
    },
  });

  return (
    <figure className="asrs-layout">
      <svg
        viewBox="0 0 960 470"
        role="img"
        aria-label="Side-view ASRS storage layout with rack rows, an aisle, stacker crane, input/output station, storage bays, and levels."
        className="asrs-layout__drawing"
      >
        <rect className="asrs-layout__paper" x="1" y="1" width="958" height="468" rx="20" />
        <path className="asrs-layout__floor" d="M56 374h848" />

        <g {...partProps("rack-rows")}>
          <path className="asrs-layout__frame" d="M90 118v250M164 118v250M238 118v250M312 118v250M386 118v250M574 118v250M648 118v250M722 118v250M796 118v250M870 118v250" />
          <path className="asrs-layout__frame" d="M90 118h296M90 368h296M574 118h296M574 368h296" />
        </g>

        <g {...partProps("aisle")}>
          <rect className="asrs-layout__aisle" x="398" y="112" width="164" height="256" rx="12" />
          <path className="asrs-layout__track" d="M447 129v224M513 129v224" />
        </g>

        <g {...partProps("levels")}>
          <path className="asrs-layout__beam" d="M90 180h296M90 242h296M90 304h296M574 180h296M574 242h296M574 304h296" />
        </g>

        <g {...partProps("bays")}>
          {[0, 1, 2, 3].map((column) =>
            [0, 1, 2].map((row) => {
              const xLeft = 100 + column * 74;
              const xRight = 584 + column * 74;
              const y = 130 + row * 62;
              return (
                <React.Fragment key={`${column}-${row}`}>
                  <rect className="asrs-layout__bay" x={xLeft} y={y} width="52" height="40" rx="4" />
                  <rect className="asrs-layout__bay" x={xRight} y={y} width="52" height="40" rx="4" />
                </React.Fragment>
              );
            }),
          )}
        </g>

        <g {...partProps("crane")}>
          <path className="asrs-layout__crane" d="M466 139h28v211h-28zM451 346h58v17h-58zM458 246h44v14h-44zM458 253h-28v12h28" />
          <circle className="asrs-layout__wheel" cx="463" cy="369" r="7" />
          <circle className="asrs-layout__wheel" cx="497" cy="369" r="7" />
        </g>

        <g {...partProps("station")}>
          <path className="asrs-layout__station" d="M426 389h108v18H426z" />
          <path className="asrs-layout__roller" d="M438 389v18M458 389v18M478 389v18M498 389v18M518 389v18" />
        </g>

        <g className="asrs-layout__leaders" aria-hidden="true">
          <path d="M164 104V70H55M452 126V70h-6M494 238l44-168h-53M480 408v26h118M196 151 55 394h102M754 242 803 76h-70" />
          <circle cx="164" cy="104" r="4" />
          <circle cx="452" cy="126" r="4" />
          <circle cx="494" cy="238" r="4" />
          <circle cx="480" cy="408" r="4" />
          <circle cx="196" cy="151" r="4" />
          <circle cx="754" cy="242" r="4" />
        </g>
        <g className="asrs-layout__labels">
          <text x="54" y="60">{partLabel("rack-rows")}</text>
          <text x="422" y="60">{partLabel("aisle")}</text>
          <text x="542" y="60">{partLabel("crane")}</text>
          <text x="604" y="441">{partLabel("station")}</text>
          <text x="54" y="414">{partLabel("bays")}</text>
          <text x="805" y="66" textAnchor="end">{partLabel("levels")}</text>
        </g>
      </svg>

      <figcaption className="asrs-layout__legend" aria-label="ASRS layout parts">
        {PARTS.map((part) => (
          <button
            key={part.id}
            type="button"
            aria-pressed={pinned === part.id}
            onMouseEnter={() => highlight(part.id)}
            onMouseLeave={release}
            onFocus={() => highlight(part.id)}
            onBlur={release}
            onClick={() => toggle(part.id)}
            className={active === part.id || pinned === part.id ? "is-active" : ""}
          >
            <span aria-hidden="true">{PARTS.indexOf(part) + 1}</span>
            {part.label}
          </button>
        ))}
      </figcaption>
    </figure>
  );
}
