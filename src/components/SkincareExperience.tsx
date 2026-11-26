'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROTOCOL_STAGES } from '../data/salon';
import { RevealHeadline } from './RevealHeadline';

gsap.registerPlugin(ScrollTrigger);

export const SkincareExperience: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const stageRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const plateWrapRef = useRef<HTMLDivElement>(null);
  const plateImgRef = useRef<HTMLImageElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.protocol-step-card',
        { y: 36, opacity: 0.85 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      if (plateWrapRef.current) {
        gsap.fromTo(
          plateWrapRef.current,
          { scale: 0.92, y: 36 },
          {
            scale: 1,
            y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 88%',
              end: 'top 30%',
              scrub: 0.7,
            },
          }
        );
      }

      stageRefs.current.forEach((el, idx) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => setActiveStage(idx),
          onEnterBack: () => setActiveStage(idx),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Zoom-settle transition on active protocol photo
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !plateImgRef.current) return;

    gsap.fromTo(
      plateImgRef.current,
      { opacity: 0.65, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out' }
    );
  }, [activeStage]);

  const current = PROTOCOL_STAGES[activeStage];

  return (
    <section
      id="skincare-experience"
      ref={containerRef}
      className="relative bg-obsidian px-5 py-20 sm:px-8 sm:py-24 lg:px-12"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 max-w-[820px]">
          <RevealHeadline
            text="Four clinical stages. One restorative sequence."
            className="type-section-headline text-porcelain"
          />
          <p className="type-section-nav mt-4 text-ash">
            Every facial follows a calibrated progression from lipid-safe cleansing through deep myofascial lifting and barrier sealing.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Protocol Steps */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            {PROTOCOL_STAGES.map((stage, index) => {
              const active = index === activeStage;
              return (
                <button
                  key={stage.step}
                  ref={(el) => {
                    stageRefs.current[index] = el;
                  }}
                  type="button"
                  onClick={() => setActiveStage(index)}
                  className={`protocol-step-card w-full rounded-[28px] p-6 text-left transition-all duration-300 ${
                    active
                      ? 'bg-carbon keyline-slate'
                      : 'bg-graphite/70 keyline-subtle hover:bg-carbon/60'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="type-body-strong text-primary">{stage.step}</span>
                    <span className="numr-tabular type-body-strong text-secondary">
                      {stage.metric}
                    </span>
                  </div>
                  <h3 className="mt-2 font-sf-pro-display text-[24px] leading-[1.16] font-semibold tracking-[0.12px] text-porcelain">
                    {stage.title}
                  </h3>
                  <p className="type-body mt-2 text-ash">{stage.summary}</p>
                  <p className="type-utility-nav mt-2.5 text-porcelain/75">{stage.detail}</p>
                </button>
              );
            })}
          </div>

          {/* Right Sticky 28px Visual Frame */}
          <div className="lg:sticky lg:top-28 lg:col-span-7">
            <div
              ref={plateWrapRef}
              className="group overflow-hidden rounded-[28px] bg-carbon keyline-subtle will-change-transform"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-obsidian">
                <img
                  ref={plateImgRef}
                  key={current.step}
                  src={current.image}
                  alt={current.imageAlt}
                  className="img-hover-zoom h-full w-full object-cover object-center will-change-transform"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 bg-carbon px-6 py-5 sm:px-8">
                <div>
                  <p className="type-product-label text-porcelain">{current.title}</p>
                  <p className="type-body mt-1 text-ash">{current.detail}</p>
                </div>
                <span className="type-feature-stat text-primary">{current.metric}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
