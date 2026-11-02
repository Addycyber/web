"use client";

import * as React from "react";

type AsrsAppHandle = {
  paused: boolean;
  speed: number;
  setActive(active: boolean): void;
  setPaused(paused: boolean): void;
  home(): void;
  restart(): void;
  destroy(): void;
};

type AsrsModule = {
  AsrsApp: new (
    canvas: HTMLCanvasElement,
    options: { auto: boolean; hint: boolean; autoRate: number; render: { maxDpr: number } },
  ) => AsrsAppHandle;
};

type AsrsAnimationProps = {
  mode: "hero" | "simulator";
};

const SPEEDS = [0.5, 1, 2] as const;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const subscribeToMotionPreference = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const getReducedMotion = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;
const getServerReducedMotion = () => true;

export function AsrsAnimation({ mode }: AsrsAnimationProps) {
  const shellRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const appRef = React.useRef<AsrsAppHandle | null>(null);
  const [inView, setInView] = React.useState(false);
  const reducedMotion = React.useSyncExternalStore(
    subscribeToMotionPreference,
    getReducedMotion,
    getServerReducedMotion,
  );
  const [ready, setReady] = React.useState(false);
  const [error, setError] = React.useState("");
  const [paused, setPaused] = React.useState(false);
  const [speed, setSpeed] = React.useState<number>(1);
  const [fullscreen, setFullscreen] = React.useState(false);

  React.useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;
    if (!("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "100px" },
    );
    observer.observe(shell);
    return () => observer.disconnect();
  }, [mode]);

  React.useEffect(() => {
    const updateVisibility = () => {
      appRef.current?.setActive(inView && !document.hidden);
    };
    document.addEventListener("visibilitychange", updateVisibility);
    updateVisibility();
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, [inView, ready]);

  React.useEffect(() => {
    const shell = shellRef.current;
    const canvas = canvasRef.current;
    if (!shell || !canvas || !inView || (mode === "hero" && reducedMotion)) return;
    let cancelled = false;
    let app: AsrsAppHandle | null = null;
    let moduleUrl = "";

    const start = async () => {
      const testCanvas = document.createElement("canvas");
      const context = testCanvas.getContext("webgl2");
      if (!context) {
        setError("WebGL2 is unavailable. Showing a static illustration.");
        return;
      }
      context.getExtension("WEBGL_lose_context")?.loseContext();

      const response = await fetch("/asrs/asrs-simulator.esm.js");
      if (!response.ok) throw new Error(`ASRS simulator asset returned HTTP ${response.status}.`);
      moduleUrl = URL.createObjectURL(
        new Blob([await response.text()], { type: "text/javascript" }),
      );
      const simulator = (await import(
        /* webpackIgnore: true */ moduleUrl
      )) as AsrsModule;
      URL.revokeObjectURL(moduleUrl);
      moduleUrl = "";
      if (cancelled || !canvasRef.current) return;

      app = new simulator.AsrsApp(canvasRef.current, {
        auto: true,
        autoRate: 6,
        hint: mode === "simulator",
        render: { maxDpr: mode === "hero" ? 1.5 : 2 },
      });
      appRef.current = app;
      app.setActive(!document.hidden && (mode === "simulator" || inView));
      setPaused(app.paused);
      setSpeed(app.speed);
      setReady(true);
    };

    void start().catch((cause: unknown) => {
      if (cancelled) return;
      console.error("ASRS simulator could not start.", cause);
      setError("The interactive 3D view is unavailable. Showing a static illustration.");
    });

    return () => {
      cancelled = true;
      if (moduleUrl) URL.revokeObjectURL(moduleUrl);
      app?.destroy();
      if (appRef.current === app) appRef.current = null;
      setReady(false);
    };
  }, [inView, mode, reducedMotion]);

  React.useEffect(() => {
    const update = () => setFullscreen(document.fullscreenElement === shellRef.current);
    document.addEventListener("fullscreenchange", update);
    return () => document.removeEventListener("fullscreenchange", update);
  }, []);

  const togglePlayback = () => {
    const nextPaused = !paused;
    appRef.current?.setPaused(nextPaused);
    setPaused(nextPaused);
  };

  const changeSpeed = (nextSpeed: number) => {
    const supportedSpeed = SPEEDS.find((value) => value === nextSpeed);
    if (!supportedSpeed) return;
    if (appRef.current) appRef.current.speed = supportedSpeed;
    setSpeed(supportedSpeed);
  };

  const restart = () => {
    try {
      appRef.current?.restart();
      setPaused(false);
      setError("");
    } catch (cause) {
      console.error("ASRS simulation could not restart.", cause);
      setError("The simulation could not be restarted.");
    }
  };

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await shellRef.current?.requestFullscreen();
      }
    } catch (cause) {
      console.error("Fullscreen could not be changed.", cause);
      setError("Fullscreen is unavailable in this browser.");
    }
  };

  const isHero = mode === "hero";

  return (
    <div
      ref={shellRef}
      className={`asrs-animation asrs-animation--${mode}`}
      role={isHero ? undefined : "group"}
      aria-label={isHero ? undefined : "ASRS simulation"}
    >
      <div className="asrs-animation__viewport">
        <div
          aria-hidden="true"
          className={`asrs-animation__poster${ready ? " is-hidden" : ""}`}
        />
        <canvas
          ref={canvasRef}
          aria-label="Interactive three-dimensional automated storage and retrieval system"
          className={`asrs-animation__canvas${ready ? " is-ready" : ""}`}
          role="img"
          tabIndex={isHero ? undefined : 0}
        />
        {error && mode === "simulator" && (
          <p className="asrs-animation__status" role="status">
            {error}
          </p>
        )}
      </div>

      {!isHero && (
        <div
          className="asrs-animation__controls"
          role="group"
          aria-label="Simulation controls"
        >
          <button type="button" onClick={togglePlayback} disabled={!ready}>
            {paused ? "Play" : "Pause"}
          </button>
          <button
            type="button"
            onClick={restart}
            disabled={!ready}
          >
            Restart
          </button>
          <label>
            Speed
            <select
              aria-label="Simulation speed"
              value={speed}
              onChange={(event) => changeSpeed(Number(event.currentTarget.value))}
              disabled={!ready}
            >
              {SPEEDS.map((value) => (
                <option key={value} value={value}>
                  {value}×
                </option>
              ))}
            </select>
          </label>
          <button type="button" onClick={() => appRef.current?.home()} disabled={!ready}>
            Reset view
          </button>
          <button type="button" onClick={() => void toggleFullscreen()}>
            {fullscreen ? "Exit fullscreen" : "Fullscreen"}
          </button>
        </div>
      )}
    </div>
  );
}
