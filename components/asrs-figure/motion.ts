import { translateAlong } from "./kit/iso-kit";
import { LIFT_HOME_Z, LIFT_TRAVEL, P } from "./view";

const CYCLE_MS = 11_000;
const smooth = (value: number) => {
  const t = Math.max(0, Math.min(1, value));
  return t * t * (3 - 2 * t);
};

const phasePosition = (elapsed: number, travel: number) => {
  if (elapsed < 2_000) return LIFT_HOME_Z + travel * smooth(elapsed / 2_000);
  if (elapsed < 3_600) return LIFT_HOME_Z + travel * (1 - smooth((elapsed - 2_000) / 1_600));
  if (elapsed < 6_500) return LIFT_HOME_Z;
  if (elapsed < 8_500) return LIFT_HOME_Z + travel * smooth((elapsed - 6_500) / 2_000);
  return LIFT_HOME_Z + travel * (1 - smooth((elapsed - 8_500) / 2_500));
};

const phaseLabel = (elapsed: number) => {
  if (elapsed < 3_600) return "Retrieving";
  if (elapsed < 6_500) return "Ready";
  return "Storing";
};

export function mount(root: HTMLElement) {
  const lift = root.querySelector<SVGGElement>("#asrs-lift");
  const payload = root.querySelector<SVGGElement>("#asrs-payload");
  const figure = root.closest("figure");
  const readout = figure?.querySelector<HTMLOutputElement>("[data-readout]");
  if (!lift || !payload || !readout) {
    throw new Error("The STOLIFT figure is missing its motion or readout elements.");
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let visible = false;
  let frame = 0;
  let cycleStarted = performance.now();
  let requestedLevel: number | null = null;
  let selectedLevel = 0;
  let requestStarted = 0;
  let lastLabel = "";
  let disposed = false;

  const announce = (label: string) => {
    if (readout.textContent !== label) readout.textContent = label;
  };

  const showRest = () => {
    lift.setAttribute("transform", translateAlong(P, [0, 0, 0]));
    payload.setAttribute("transform", translateAlong(P, [0, 0, 0]));
    announce("Ready · 250 / 500 kg tray class");
  };

  const tick = (now: number) => {
    frame = 0;
    if (disposed || !visible || document.hidden || reducedMotion.matches) return;

    const elapsed = requestedLevel === null
      ? (now - cycleStarted) % CYCLE_MS
      : Math.min(now - requestStarted, CYCLE_MS - 1);
    const level = requestedLevel ?? Math.floor(now / CYCLE_MS) % LIFT_TRAVEL.length;
    const travel = LIFT_TRAVEL[level] ?? 0;
    const liftZ = phasePosition(elapsed, travel);
    const payloadOut = elapsed >= 3_600 && elapsed < 6_500;
    const payloadProgress = payloadOut
      ? smooth(Math.min((elapsed - 3_600) / 450, 1))
      : elapsed >= 6_500 && elapsed < 7_000
        ? 1 - smooth((elapsed - 6_500) / 500)
        : 0;

    lift.setAttribute("transform", translateAlong(P, [0, 0, liftZ - LIFT_HOME_Z]));
    payload.setAttribute("transform", translateAlong(P, [0, payloadProgress * 38, 0]));

    const label = `${phaseLabel(elapsed)} · 250 / 500 kg tray class`;
    if (label !== lastLabel) {
      lastLabel = label;
      announce(label);
    }

    if (requestedLevel !== null && now - requestStarted >= CYCLE_MS) {
      requestedLevel = null;
      cycleStarted = now;
    }

    frame = window.requestAnimationFrame(tick);
  };

  const start = () => {
    if (!frame && visible && !document.hidden && !reducedMotion.matches) {
      frame = window.requestAnimationFrame(tick);
    }
  };

  const chooseLevel = (clientY: number) => {
    if (reducedMotion.matches) return;
    const bounds = root.getBoundingClientRect();
    const fraction = Math.max(0, Math.min(0.999, (clientY - bounds.top) / bounds.height));
    const nextLevel = Math.min(
      LIFT_TRAVEL.length - 1,
      Math.floor((1 - fraction) * LIFT_TRAVEL.length),
    );
    if (requestedLevel === nextLevel) return;
    selectedLevel = nextLevel;
    requestedLevel = selectedLevel;
    requestStarted = performance.now();
    lastLabel = "";
    start();
  };

  const onPointerMove = (event: PointerEvent) => chooseLevel(event.clientY);
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      const direction = event.key === "ArrowUp" ? 1 : -1;
      selectedLevel = (selectedLevel + direction + LIFT_TRAVEL.length) % LIFT_TRAVEL.length;
      announce("Ready · 250 / 500 kg tray class");
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      requestedLevel = selectedLevel;
      requestStarted = performance.now();
      lastLabel = "";
      start();
    }
  };
  const onVisibilityChange = () => {
    if (document.hidden && frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    } else {
      start();
    }
  };
  const onMotionChange = () => {
    if (reducedMotion.matches) {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      requestedLevel = null;
      showRest();
    } else {
      cycleStarted = performance.now();
      start();
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      visible = Boolean(entries.at(-1)?.isIntersecting);
      if (!visible && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else {
        start();
      }
    },
    { rootMargin: "120px 0px" },
  );
  observer.observe(root);
  root.addEventListener("pointermove", onPointerMove);
  root.addEventListener("keydown", onKeyDown);
  document.addEventListener("visibilitychange", onVisibilityChange);
  reducedMotion.addEventListener("change", onMotionChange);

  showRest();
  start();

  return () => {
    disposed = true;
    if (frame) cancelAnimationFrame(frame);
    observer.disconnect();
    root.removeEventListener("pointermove", onPointerMove);
    root.removeEventListener("keydown", onKeyDown);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    reducedMotion.removeEventListener("change", onMotionChange);
  };
}
