"use client";

import * as React from "react";
import Image from "next/image";
import { pageMap } from "@/lib/company";

const titleForPage = (page: number) =>
  pageMap.find((entry) => entry.page === page)?.title ?? `Page ${page}`;

const imageForPage = (page: number) =>
  `/brochure/p${String(page).padStart(2, "0")}.webp`;

export function BrochureViewer({ pages }: { pages: number[] }) {
  const dialog = React.useRef<HTMLDialogElement>(null);
  const opener = React.useRef<HTMLButtonElement | null>(null);
  const pointerStart = React.useRef<number | null>(null);
  const [activePage, setActivePage] = React.useState(pages[0] ?? 1);
  const [zoomed, setZoomed] = React.useState(false);

  const close = React.useCallback(() => {
    dialog.current?.close();
  }, []);

  const changePage = React.useCallback(
    (direction: -1 | 1) => {
      const index = pages.indexOf(activePage);
      const nextIndex = (index + direction + pages.length) % pages.length;
      setActivePage(pages[nextIndex] ?? pages[0] ?? 1);
      setZoomed(false);
    },
    [activePage, pages],
  );

  const openAt = (page: number, button: HTMLButtonElement) => {
    opener.current = button;
    setActivePage(page);
    setZoomed(false);
    if (!dialog.current?.open) dialog.current?.showModal();
  };

  const onDialogKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      changePage(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      changePage(1);
    } else if (event.key === "Tab") {
      const focusable = Array.from(
        event.currentTarget.querySelectorAll<HTMLButtonElement>(
          "button:not([disabled])",
        ),
      );
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  const onDialogPointerDown = (event: React.PointerEvent<HTMLDialogElement>) => {
    pointerStart.current = event.clientX;
  };

  const onDialogPointerUp = (event: React.PointerEvent<HTMLDialogElement>) => {
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(distance) > 60) changePage(distance > 0 ? -1 : 1);
  };

  if (!pages.length) return null;

  return (
    <section className="space-y-4" aria-label="Brochure pages">
      <h3 className="text-xl font-bold text-[var(--text)]">Brochure pages</h3>
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3">
        {pages.map((page) => (
          <button
            key={page}
            id={`brochure-page-${page}`}
            type="button"
            className="group w-[min(72vw,280px)] shrink-0 snap-start text-left"
            aria-label={`Open brochure page ${page}: ${titleForPage(page)}`}
            onClick={(event) => openAt(page, event.currentTarget)}
          >
            <span className="relative block aspect-[656/926] overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)]">
              <Image
                src={imageForPage(page)}
                alt={`Brochure page ${page}: ${titleForPage(page)}`}
                width={656}
                height={926}
                sizes="(max-width: 768px) 72vw, 280px"
                className="h-full w-full object-contain transition-transform group-hover:scale-[1.02]"
              />
            </span>
            <span className="mt-2 block text-xs font-medium text-[var(--text-secondary)]">
              Page {page} · {titleForPage(page)}
            </span>
          </button>
        ))}
      </div>

      <div className="flex gap-2 overflow-x-auto py-1" aria-label="Brochure page thumbnails">
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            className="w-16 shrink-0 overflow-hidden rounded border border-[var(--border)] focus-visible:outline-2 focus-visible:outline-[var(--focus-ring)]"
            aria-label={`Open page ${page}: ${titleForPage(page)}`}
            onClick={(event) => openAt(page, event.currentTarget)}
          >
            <Image
              src={imageForPage(page)}
              alt=""
              width={656}
              height={926}
              sizes="64px"
              className="aspect-[656/926] h-auto w-full object-contain"
            />
          </button>
        ))}
      </div>

      <dialog
        ref={dialog}
        className="brochure-lightbox fixed inset-0 m-0 h-dvh max-h-none w-dvw max-w-none bg-black/95 p-3 text-white backdrop:bg-black/90 sm:p-6"
        aria-label={`Brochure page ${activePage}: ${titleForPage(activePage)}`}
        onKeyDown={onDialogKeyDown}
        onPointerDown={onDialogPointerDown}
        onPointerUp={onDialogPointerUp}
        onClose={() => {
          setZoomed(false);
          opener.current?.focus();
        }}
      >
        <div className="flex h-full min-h-0 flex-col">
          <div className="flex shrink-0 items-center justify-between gap-4">
            <p className="text-sm font-medium">
              Page {activePage} · {titleForPage(activePage)}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded border border-white/40 px-3 py-2 text-sm"
                onClick={() => setZoomed((current) => !current)}
                aria-label={zoomed ? "Zoom out" : "Zoom in"}
              >
                {zoomed ? "Zoom out" : "Zoom in"}
              </button>
              <button
                type="button"
                autoFocus
                className="rounded border border-white/40 px-3 py-2 text-sm"
                onClick={close}
                aria-label="Close brochure viewer"
              >
                Close
              </button>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto py-3">
            <Image
              key={activePage}
              src={imageForPage(activePage)}
              alt={`Brochure page ${activePage}: ${titleForPage(activePage)}`}
              width={656}
              height={926}
              sizes="100vw"
              priority
              className={`max-h-full w-auto max-w-full object-contain ${
                zoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"
              }`}
              onClick={() => setZoomed((current) => !current)}
            />
          </div>

          <div className="flex shrink-0 items-center justify-center gap-3">
            <button
              type="button"
              className="rounded border border-white/40 px-4 py-2 text-sm"
              onClick={() => changePage(-1)}
              aria-label="Previous brochure page"
            >
              Previous
            </button>
            <button
              type="button"
              className="rounded border border-white/40 px-4 py-2 text-sm"
              onClick={() => changePage(1)}
              aria-label="Next brochure page"
            >
              Next
            </button>
          </div>
        </div>
      </dialog>
    </section>
  );
}
