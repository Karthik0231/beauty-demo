'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Play } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { RevealHeadline } from './RevealHeadline';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onBookClick: () => void;
  onWatchFilm: () => void;
}

const HERO_SLIDES = [
  {
    src: '/images/hero-beauty-stage.jpg',
    fallback: '/images/complexion-editorial-dark.jpg',
    alt: 'Maison Aurélia Sculptural Facial 01 and cellular skincare campaign portrait',
    label: 'Sculptural Facial 01',
  },
  {
    src: '/images/serum-campaign-alt.jpg',
    fallback: '/images/hero-beauty-stage.jpg',
    alt: 'Maison Aurélia luminous hydrated skin beside dark smoked glass serum vessel',
    label: 'Botanical Matrix',
  },
  {
    src: '/images/sculptural-facial-dark.jpg',
    fallback: '/images/complexion-editorial-dark.jpg',
    alt: 'Specialist hands performing serene facial sculpting ritual',
    label: 'Myofascial Lift',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBookClick,
  onWatchFilm,
}) => {
  const stageRef = useRef<HTMLElement>(null);
  const frameOuterRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const copyBlockRef = useRef<HTMLDivElement>(null);
  const [slideIdx, setSlideIdx] = useState(0);
  const [srcOverrides, setSrcOverrides] = useState<Record<number, string>>({});

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const timer = window.setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5600);
    return () => window.clearInterval(timer);
  }, []);

  // Scroll-driven Hero depth + mouse-follow parallax
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (copyBlockRef.current) {
        gsap.fromTo(
          copyBlockRef.current.children,
          { y: 24, opacity: 0.1 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.08,
            delay: 0.12,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          }
        );
      }

      if (frameOuterRef.current && stageRef.current) {
        gsap.fromTo(
          frameOuterRef.current,
          { scale: 1, y: 0 },
          {
            scale: 0.94,
            y: -28,
            ease: 'none',
            scrollTrigger: {
              trigger: stageRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.6,
            },
          }
        );
      }
    }, stageRef);

    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    const stageEl = stageRef.current;
    const imgEl = imgRef.current;
    if (!isTouch && stageEl && imgEl) {
      const xTo = gsap.quickTo(imgEl, 'x', { duration: 0.9, ease: 'power3.out' });
      const yTo = gsap.quickTo(imgEl, 'y', { duration: 0.9, ease: 'power3.out' });

      const onMouseMove = (e: MouseEvent) => {
        const rect = stageEl.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        xTo(nx * -14);
        yTo(ny * -10);
      };

      const onMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      stageEl.addEventListener('mousemove', onMouseMove);
      stageEl.addEventListener('mouseleave', onMouseLeave);
      return () => {
        stageEl.removeEventListener('mousemove', onMouseMove);
        stageEl.removeEventListener('mouseleave', onMouseLeave);
        ctx.revert();
      };
    }

    return () => ctx.revert();
  }, []);

  // Dramatic zoomed-in entrance (1.14 -> 1.0) on each hero slide change
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !imgRef.current) return;

    gsap.fromTo(
      imgRef.current,
      { scale: 1.14, opacity: 0.72 },
      { scale: 1.02, opacity: 1, duration: 1.35, ease: 'power3.out' }
    );
  }, [slideIdx]);

  const currentSlide = HERO_SLIDES[slideIdx];
  const activeSrc = srcOverrides[slideIdx] ?? currentSlide.src;

  return (
    <section
      id="hero"
      ref={stageRef}
      className="relative flex min-h-[calc(100svh-82px)] flex-col items-center justify-center gap-5 overflow-hidden bg-obsidian px-5 pt-4 pb-8 sm:px-8 sm:pt-6 sm:pb-10 lg:px-12"
    >
      {/* Wide Centered Obsidian Stage Photography */}
      <div
        ref={frameOuterRef}
        className="relative mx-auto flex w-full max-w-[1400px] items-center justify-center will-change-transform"
      >
        <div className="relative aspect-[16/9] max-h-[42vh] w-full overflow-hidden rounded-[28px] bg-obsidian sm:max-h-[48vh] lg:max-h-[52vh]">
          <img
            ref={imgRef}
            key={slideIdx}
            src={activeSrc}
            alt={currentSlide.alt}
            onError={() => {
              if (activeSrc !== currentSlide.fallback) {
                setSrcOverrides((prev) => ({ ...prev, [slideIdx]: currentSlide.fallback }));
              }
            }}
            className="h-full w-full object-cover object-center will-change-transform"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-obsidian/20"
          />

          {/* Slide Dots */}
          <div className="absolute right-4 bottom-4 z-10 flex items-center gap-1.5 rounded-full bg-obsidian/75 px-3 py-1.5 backdrop-blur-md">
            {HERO_SLIDES.map((s, idx) => {
              const active = idx === slideIdx;
              return (
                <button
                  key={s.label}
                  type="button"
                  aria-label={`Show ${s.label}`}
                  onClick={() => setSlideIdx(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    active ? 'w-6 bg-primary' : 'w-1.5 bg-ash/70 hover:bg-porcelain'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Lower Display Anchor */}
      <div className="relative z-10 mx-auto flex max-w-[960px] flex-col items-center text-center">
        <div ref={copyBlockRef} className="flex flex-col items-center">
          <h2 className="type-hero-product-name text-porcelain">
            Sculptural Facial 01 &amp; Skin Atelier
          </h2>

          <RevealHeadline
            text="Radiance, sculpted."
            as="h1"
            immediate
            className="type-display mt-1.5 text-balance text-porcelain"
          />

          <p className="type-body mt-3 max-w-[56ch] text-ash">
            Myofascial buccal lifting, cold-pressed copper tripeptides, and botanical hair architecture inside private suites.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <div className="numr-tabular rounded-[36px] bg-[rgba(66,66,69,0.72)] px-4 py-[7px] text-[12px] leading-[16px] tracking-[-0.12px] text-secondary">
              Rituals from $175 · 90-min Sculptural Facial $295
            </div>

            <MagneticButton
              onClick={onBookClick}
              className="type-utility-nav inline-flex items-center gap-1.5 rounded-[170px] bg-primary px-[16px] py-[7px] font-semibold text-on-primary hover:bg-tertiary"
            >
              <span>Book</span>
              <ArrowRight
                size={12}
                strokeWidth={2.2}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </MagneticButton>

            <button
              type="button"
              onClick={onWatchFilm}
              className="group type-utility-nav inline-flex items-center gap-1.5 rounded-[10px] px-2.5 py-[7px] text-primary hover:underline"
            >
              <Play size={12} strokeWidth={2} className="fill-current" />
              <span>Watch the film</span>
              <ArrowRight
                size={13}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
