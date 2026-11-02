"use client";

import Image from "next/image";
import * as React from "react";
import { getProduct } from "@/lib/company";

const SLIDES = [
  {
    src: "/images/hero/hero-5.jpg",
    mobileSrc: "/home-hero/slide-1-mobile.webp",
    alt: "STOMAT vertical carousel storage unit with its retrieval opening visible",
    objectPosition: "50% 50%",
  },
  {
    src: "/gallery/img_asrs_13_1600w.webp",
    mobileSrc: "/home-hero/slide-2-mobile.webp",
    alt: "Automated storage racks installed inside an industrial warehouse",
    objectPosition: "50% 50%",
  },
  {
    src: "/gallery/img_storder_132_1600w.webp",
    mobileSrc: "/home-hero/slide-3-mobile.webp",
    alt: "Automated vertical storage shelves holding parts and containers",
    objectPosition: "50% 50%",
  },
  {
    src: "/gallery/img_carousel_50_1600w.webp",
    mobileSrc: "/home-hero/slide-4-mobile.webp",
    alt: "Vertical carousel storage shelves inside an industrial unit",
    objectPosition: "50% 50%",
  },
  {
    src: "/gallery/img_compactors_74_1600w.webp",
    mobileSrc: "/home-hero/slide-5-mobile.webp",
    alt: "Mobile shelving units with handwheels in a storage area",
    objectPosition: "50% 50%",
  },
] as const;

const TRUSTED_STATS = [
  {
    slug: "stomat",
    label: "Floor-space saving",
    detail: "STOMAT and STOLIFT",
  },
  {
    slug: "stolift",
    factLabel: "Tray load classes",
    label: "Tray capacity",
    detail: "STOLIFT tray load classes",
  },
  {
    slug: "stopick",
    label: "Machine height",
    detail: "STOPICK",
  },
  {
    slug: "stolong",
    label: "Storage height",
    detail: "STOLONG",
  },
] as const;

const SPEED = 5000;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const subscribeToMotionPreference = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const getReducedMotion = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;
const getServerReducedMotion = () => true;

export function HeroSlider() {
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [interacted, setInteracted] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const [documentHidden, setDocumentHidden] = React.useState(false);
  const reducedMotion = React.useSyncExternalStore(
    subscribeToMotionPreference,
    getReducedMotion,
    getServerReducedMotion,
  );

  React.useEffect(() => {
    const updateVisibility = () => setDocumentHidden(document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  const goTo = React.useCallback(
    (index: number) => {
      const boundedIndex = (index + SLIDES.length) % SLIDES.length;
      setActiveIndex(boundedIndex);
      viewportRef.current?.scrollTo({
        left: viewportRef.current.clientWidth * boundedIndex,
        behavior: reducedMotion ? "auto" : "smooth",
      });
    },
    [reducedMotion],
  );

  React.useEffect(() => {
    if (reducedMotion || interacted || hovered || focused || documentHidden) return;
    const timer = window.setTimeout(() => goTo(activeIndex + 1), SPEED);
    return () => window.clearTimeout(timer);
  }, [activeIndex, documentHidden, focused, goTo, hovered, interacted, reducedMotion]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    setInteracted(true);
    goTo(activeIndex + (event.key === "ArrowRight" ? 1 : -1));
  };

  return (
    <>
      <section
        className="home-hero-slider"
        role="region"
        aria-roledescription="carousel"
        aria-label="Company and product images"
        aria-live={interacted ? "polite" : "off"}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onFocusCapture={() => {
          setFocused(true);
          setInteracted(true);
        }}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
        }}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onPointerDown={() => setInteracted(true)}
      >
        <h1 className="sr-only">
          Automated Storage &amp; Retrieval Systems (ASRS) Manufacturer Pune India
        </h1>
        <div
          ref={viewportRef}
          className="home-hero-slider__viewport"
          onScroll={(event) => {
            const viewport = event.currentTarget;
            setActiveIndex(
              Math.min(
                SLIDES.length - 1,
                Math.max(0, Math.round(viewport.scrollLeft / viewport.clientWidth)),
              ),
            );
          }}
        >
          {SLIDES.map((slide, index) => (
            <div
              className="home-hero-slider__slide"
              key={slide.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${SLIDES.length}`}
            >
              <picture className="home-hero-slider__picture">
                <source
                  media="(max-width: 640px)"
                  srcSet={slide.mobileSrc}
                  type="image/webp"
                />
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="100vw"
                  quality={80}
                  priority={index === 0}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  loading={index === 0 ? "eager" : "lazy"}
                  draggable={false}
                  style={{ objectFit: "cover", objectPosition: slide.objectPosition }}
                />
              </picture>
            </div>
          ))}
        </div>
        <div className="home-hero-slider__controls" aria-label="Slide controls">
          <button
            className="home-hero-slider__arrow home-hero-slider__arrow--previous"
            type="button"
            aria-label="Previous slide"
            onClick={() => {
              setInteracted(true);
              goTo(activeIndex - 1);
            }}
          >
            <span aria-hidden="true">‹</span>
          </button>
          <div className="home-hero-slider__dots">
            {SLIDES.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => {
                  setInteracted(true);
                  goTo(index);
                }}
              >
                <span aria-hidden="true" />
              </button>
            ))}
          </div>
          <button
            className="home-hero-slider__arrow home-hero-slider__arrow--next"
            type="button"
            aria-label="Next slide"
            onClick={() => {
              setInteracted(true);
              goTo(activeIndex + 1);
            }}
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </section>
      <section
        className="asrs-trusted-stats"
        aria-label="Product facts from the company brochure"
      >
        {TRUSTED_STATS.map((stat) => {
          const value = getProduct(stat.slug)?.facts.find(
            (fact) => fact.label === ("factLabel" in stat ? stat.factLabel : stat.label),
          )?.value;
          if (!value) {
            throw new Error(`Missing brochure fact "${stat.label}" for ${stat.slug}.`);
          }
          return (
            <article key={stat.label}>
              <strong>{value}</strong>
              <span>{stat.label}</span>
              <small>{stat.detail}</small>
            </article>
          );
        })}
      </section>
    </>
  );
}
