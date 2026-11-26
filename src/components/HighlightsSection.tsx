'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Pause, Play } from 'lucide-react';
import { CAMPAIGN_HIGHLIGHTS } from '../data/salon';
import { RevealHeadline } from './RevealHeadline';

gsap.registerPlugin(ScrollTrigger);

interface HighlightsSectionProps {
  onWatchFilm: (startIndex?: number) => void;
}

export const HighlightsSection: React.FC<HighlightsSectionProps> = ({
  onWatchFilm,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const current = CAMPAIGN_HIGHLIGHTS[activeIndex];

  useEffect(() => {
    if (!isPlaying) return;
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CAMPAIGN_HIGHLIGHTS.length);
    }, 5200);
    return () => window.clearInterval(id);
  }, [isPlaying]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !imgRef.current) return;

    gsap.fromTo(
      imgRef.current,
      { scale: 1.04, opacity: 0.72 },
      { scale: 1, opacity: 1, duration: 0.85, ease: 'power3.out', clearProps: 'transform' }
    );
  }, [activeIndex]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !frameRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        frameRef.current,
        {
          y: 24,
          opacity: 0.85,
          clipPath: 'inset(6% 0% 6% 0% round 28px)',
        },
        {
          y: 0,
          opacity: 1,
          clipPath: 'inset(0% 0% 0% 0% round 28px)',
          duration: 0.95,
          ease: 'power3.out',
          clearProps: 'transform,clipPath',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="highlights"
      ref={sectionRef}
      className="surface-carbon-band px-5 py-20 sm:px-8 sm:py-24 lg:px-12"
    >
      <div className="mx-auto max-w-[1380px]">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <RevealHeadline
            text="Get the atelier highlights."
            className="type-section-headline text-porcelain"
          />
          <button
            type="button"
            onClick={() => onWatchFilm(activeIndex)}
            className="group type-section-nav inline-flex items-center gap-1.5 self-start text-primary hover:underline sm:self-auto"
          >
            <span>Open fullscreen gallery</span>
            <ArrowRight
              size={16}
              strokeWidth={1.8}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* Wide Contained 28px Cinematic Media Frame */}
        <div
          ref={frameRef}
          onClick={() => onWatchFilm(activeIndex)}
          className="group relative cursor-pointer overflow-hidden rounded-[28px] bg-obsidian"
        >
          <div className="relative aspect-[4/5] min-h-[420px] w-full overflow-hidden bg-obsidian sm:aspect-[16/9] sm:max-h-[640px]">
            <img
              ref={imgRef}
              key={current.id}
              src={current.image}
              alt={current.imageAlt}
              className="img-hover-zoom h-full w-full object-cover object-center"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/95 via-obsidian/35 to-obsidian/20"
            />

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-10 lg:p-14">
              <p className="type-body-strong numr-tabular text-primary">
                {current.specTag}
              </p>
              <h3 className="mt-2 max-w-[18ch] font-sf-pro-display text-[24px] leading-[1.12] font-semibold tracking-[-0.24px] text-porcelain sm:text-[40px] lg:text-[48px]">
                {current.headline}
              </h3>
              <p className="type-body mt-2.5 max-w-[54ch] text-porcelain/85">
                {current.subcopy}
              </p>
            </div>
          </div>
        </div>

        {/* Translucent #333336 Playback & Pagination Pill */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setIsPlaying((prev) => !prev)}
            aria-label={isPlaying ? 'Pause campaign highlights' : 'Play campaign highlights'}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-steel/85 text-porcelain backdrop-blur-md transition-colors hover:bg-steel"
          >
            {isPlaying ? <Pause size={14} strokeWidth={2} /> : <Play size={14} strokeWidth={2} className="ml-0.5" />}
          </button>

          <div
            role="tablist"
            aria-label="Campaign chapters"
            className="flex items-center gap-2 rounded-full bg-steel/85 px-4 py-2.5 backdrop-blur-md"
          >
            {CAMPAIGN_HIGHLIGHTS.map((item, idx) => {
              const active = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={item.label}
                  onClick={() => {
                    setActiveIndex(idx);
                    setIsPlaying(false);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    active ? 'w-7 bg-primary' : 'w-2 bg-ash/60 hover:bg-porcelain/70'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
