"use client";

import * as React from "react";

export function MotionStage({ children }: { children: React.ReactNode }) {
  const stage = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let dispose = () => {};
    let cancelled = false;

    void import("./motion").then(({ mount }) => {
      if (cancelled || !stage.current) return;
      dispose = mount(stage.current);
    });

    return () => {
      cancelled = true;
      dispose();
    };
  }, []);

  return (
    <div
      ref={stage}
      className="asrs-stage"
      role="group"
      tabIndex={0}
      aria-label="STOLIFT interactive illustration. Hover to request a tray or press Enter or Space."
    >
      {children}
    </div>
  );
}
