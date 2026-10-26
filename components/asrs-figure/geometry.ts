import {
  depthOf,
  lineOnTop,
  slabOf,
  type Plan,
  type SolidPaths,
  type Tone,
} from "./kit/iso-kit";
import { BASE, BAY_PLANS, LEVELS, LIFT_HOME_Z, P, RACK_TOP } from "./view";

export interface SolidPart {
  id: string;
  paths: SolidPaths;
  tone: Tone;
  depth: number;
  lit?: boolean;
}

export const solid = (
  id: string,
  plan: Plan,
  z: number,
  height: number,
  tone: Tone = "mid",
  lit = false,
): SolidPart => {
  const center = [plan.x + plan.w / 2, plan.y + plan.d / 2, z + height / 2] as const;
  return {
    id,
    paths: slabOf(plan, z, height, P, 4, 0.8),
    tone,
    depth: depthOf([...center], P),
    ...(lit ? { lit: true } : {}),
  };
};

const bayRails = (bay: Plan, index: number): SolidPart[] => {
  const frontY = bay.y + bay.d - 5;
  const rearY = bay.y + 3;
  const postWidth = 4;
  const postDepth = 4;
  const posts = [
    { x: bay.x, y: rearY },
    { x: bay.x + bay.w - postWidth, y: rearY },
    { x: bay.x, y: frontY },
    { x: bay.x + bay.w - postWidth, y: frontY },
  ];
  return posts.map((post, postIndex) =>
    solid(
      `bay-${index}-upright-${postIndex}`,
      { ...post, w: postWidth, d: postDepth, r: 0.5 },
      12,
      RACK_TOP - 12,
      "lo",
    ),
  );
};

const storageLevels = (): SolidPart[] =>
  BAY_PLANS.flatMap((bay, bayIndex) =>
    LEVELS.flatMap((level, levelIndex) => {
      const tier = levelIndex + 1;
      const shelf = solid(
        `bay-${bayIndex}-shelf-${tier}`,
        { x: bay.x + 1, y: bay.y + 2, w: bay.w - 2, d: bay.d - 4, r: 1 },
        level,
        3,
        "mid",
      );
      const carrier = solid(
        `bay-${bayIndex}-carrier-${tier}`,
        { x: bay.x + 5, y: bay.y + 8, w: bay.w - 10, d: bay.d - 16, r: 1 },
        level + 3,
        3,
        "hi",
      );
      const bins = [0, 1, 2].map((binIndex) =>
        solid(
          `bay-${bayIndex}-bin-${tier}-${binIndex}`,
          {
            x: bay.x + 7 + binIndex * 21,
            y: bay.y + 12,
            w: 17,
            d: bay.d - 24,
            r: 1,
          },
          level + 6,
          8,
          "mid",
        ),
      );
      return [shelf, carrier, ...bins];
    }),
  );

const FRAME = [
  solid("foundation", BASE, 0, 11, "mid"),
  solid("foundation-inlay", { x: -110, y: -64, w: 220, d: 144, r: 5 }, 11, 2, "lo"),
  ...[
    [-108, -63],
    [99, -63],
    [-108, 68],
    [99, 68],
  ].map(([x, y], index) =>
    solid(`foot-${index}`, { x, y, w: 10, d: 10, r: 2 }, -8, 8, "lo"),
  ),
  ...BAY_PLANS.flatMap(bayRails),
  solid("elevator-left-guide", { x: -17, y: -41, w: 3, d: 78, r: 1 }, 12, RACK_TOP - 12, "lo"),
  solid("elevator-right-guide", { x: 14, y: -41, w: 3, d: 78, r: 1 }, 12, RACK_TOP - 12, "lo"),
  solid("operator-sill", { x: -21, y: 40, w: 42, d: 8, r: 1 }, 15, 5, "mid"),
  solid("operator-jamb-left", { x: -21, y: 43, w: 4, d: 9, r: 1 }, 19, 20, "lo"),
  solid("operator-jamb-right", { x: 17, y: 43, w: 4, d: 9, r: 1 }, 19, 20, "lo"),
  solid("operator-hood", { x: -21, y: 43, w: 42, d: 9, r: 1 }, 38, 4, "mid"),
  solid("control-pedestal", { x: 112, y: 27, w: 15, d: 13, r: 2 }, 0, 27, "lo"),
  solid("control-panel", { x: 110, y: 38, w: 17, d: 3, r: 1 }, 27, 7, "mid"),
  solid("control-screen", { x: 114, y: 39, w: 8, d: 1.5, r: 0.5 }, 30, 1.2, "hi"),
  solid("control-stop", { x: 123, y: 39, w: 2.5, d: 2, r: 0.8 }, 30, 2, "lo"),
];

export const STATIC_PARTS = [...FRAME, ...storageLevels()].sort((a, b) => a.depth - b.depth);

export const MOVING_PARTS = [
  solid("elevator-bed", { x: -18, y: -39, w: 36, d: 76, r: 2 }, LIFT_HOME_Z, 5, "lo"),
  solid("elevator-back-guard", { x: -18, y: -39, w: 36, d: 4, r: 1 }, LIFT_HOME_Z + 5, 12, "mid"),
  solid("elevator-side-guard-left", { x: -18, y: -39, w: 3, d: 76, r: 1 }, LIFT_HOME_Z + 5, 12, "mid"),
  solid("elevator-side-guard-right", { x: 15, y: -39, w: 3, d: 76, r: 1 }, LIFT_HOME_Z + 5, 12, "mid"),
  solid("moving-tray", { x: -15, y: -34, w: 30, d: 65, r: 1 }, LIFT_HOME_Z + 5, 4, "hi", true),
  solid("moving-tray-left-wall", { x: -15, y: -34, w: 2, d: 65, r: 0.5 }, LIFT_HOME_Z + 9, 5, "mid"),
  solid("moving-tray-right-wall", { x: 13, y: -34, w: 2, d: 65, r: 0.5 }, LIFT_HOME_Z + 9, 5, "mid"),
  solid("moving-tray-end-stop", { x: -15, y: -34, w: 30, d: 2, r: 0.5 }, LIFT_HOME_Z + 9, 5, "lo"),
].sort((a, b) => a.depth - b.depth);

export const TOP_SEAMS = [
  {
    id: "foundation-seam",
    d: lineOnTop(
      [BASE.x, BASE.y + BASE.d / 2],
      [BASE.x + BASE.w, BASE.y + BASE.d / 2],
      11,
      P,
    ),
  },
];
