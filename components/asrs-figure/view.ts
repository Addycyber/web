import {
  boxCorners,
  fitProjection,
  type Plan,
  type Projection,
} from "./kit/iso-kit";

export const WIDTH = 760;
export const HEIGHT = 680;

export const BASE: Plan = { x: -116, y: -70, w: 232, d: 156, r: 8 };
export const BAY_PLANS: Plan[] = [
  { x: -98, y: -48, w: 76, d: 90, r: 2 },
  { x: 22, y: -48, w: 76, d: 90, r: 2 },
];
export const LEVELS = [38, 76, 114, 152, 190, 228] as const;
export const RACK_TOP = 272;
export const LIFT_HOME_Z = 17;
export const LIFT_TRAY_Z = 24;
export const LIFT_TRAVEL = LEVELS.map((level) => level - LIFT_TRAY_Z);

const structuralPlans: Plan[] = [
  BASE,
  ...BAY_PLANS,
  { x: -16, y: -43, w: 32, d: 78, r: 1 },
  { x: -18, y: 43, w: 36, d: 15, r: 1 },
];

const bounds = structuralPlans.flatMap((plan) => [
  ...boxCorners(plan, 0, RACK_TOP),
  ...boxCorners(plan, -10, 0),
]);

export const P: Projection = fitProjection(bounds, WIDTH, HEIGHT, {
  pad: 44,
  azimuth: 48,
  elevation: 29,
});
