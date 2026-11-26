'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, MoveHorizontal } from 'lucide-react';
import {
  BEAUTY_RITUALS,
  BeautyRitual,
  BEFORE_AFTER_STUDIES,
  CLIENT_PERSPECTIVES,
} from '../data/salon';
import { MagneticButton } from './MagneticButton';
import { RevealHeadline } from './RevealHeadline';

gsap.registerPlugin(ScrollTrigger);

interface CompareWorkspaceProps {
  onReserveRitual: (ritualId: string) => void;
  onInspectRitual: (ritual: BeautyRitual) => void;
}

export const CompareWorkspace: React.FC<CompareWorkspaceProps> = ({
  onReserveRitual,
  onInspectRitual,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [leftId, setLeftId] = useState(BEAUTY_RITUALS[0].id);
  const [rightId, setRightId] = useState(BEAUTY_RITUALS[1].id);
  const [studyIdx, setStudyIdx] = useState(0);
  const [splitPercent, setSplitPercent] = useState(52);
  const [quoteIdx, setQuoteIdx] = useState(0);

  const leftRitual = BEAUTY_RITUALS.find((r) => r.id === leftId) ?? BEAUTY_RITUALS[0];
  const rightRitual = BEAUTY_RITUALS.find((r) => r.id === rightId) ?? BEAUTY_RITUALS[1];
  const compared = [leftRitual, rightRitual];

  const study = BEFORE_AFTER_STUDIES[studyIdx];
  const quote = CLIENT_PERSPECTIVES[quoteIdx];

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.compare-reveal-block',
        { y: 38, scale: 0.97, opacity: 0.9 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 88%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.compare-reveal-block img',
        { scale: 1.09 },
        {
          scale: 1,
          duration: 1.05,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 88%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="compare-workspace"
      ref={sectionRef}
      className="bg-obsidian px-5 py-20 sm:px-8 sm:py-24 lg:px-12"
    >
      <div className="mx-auto flex max-w-[1380px] flex-col gap-6">
        <div className="rounded-[28px] bg-carbon p-6 sm:p-10 lg:p-14">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <RevealHeadline
                text="Compare rituals side by side."
                className="type-comparison-headline text-porcelain"
              />
              <p className="type-body mt-3 max-w-[54ch] text-ash">
                Select any two facial, hair, makeup, or bodywork sessions to compare active protocols, session length, and barrier benefits.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                { label: 'First ritual', value: leftId, onChange: setLeftId },
                { label: 'Second ritual', value: rightId, onChange: setRightId },
              ].map((sel) => (
                <div key={sel.label} className="relative">
                  <label className="sr-only">{sel.label}</label>
                  <select
                    value={sel.value}
                    onChange={(e) => sel.onChange(e.target.value)}
                    className="type-body w-full appearance-none rounded-[980px] border border-slate bg-[rgba(255,255,255,0.04)] py-3 pr-[45px] pl-[24px] text-porcelain transition-colors hover:border-porcelain/70 focus:border-primary"
                  >
                    {BEAUTY_RITUALS.map((r) => (
                      <option key={r.id} value={r.id} className="bg-carbon text-porcelain">
                        {r.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    strokeWidth={1.8}
                    className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ash"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {compared.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="compare-reveal-block group flex flex-col justify-between rounded-[28px] bg-obsidian p-6 sm:p-8"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[28px] bg-obsidian">
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      className="img-hover-zoom h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="mt-6 flex items-baseline justify-between gap-2">
                    <h3 className="type-hero-product-name text-porcelain">{item.name}</h3>
                    {item.isNew && (
                      <span className="text-[12px] leading-[16px] font-semibold tracking-[-0.12px] text-tertiary">
                        New
                      </span>
                    )}
                  </div>

                  <div className="mt-5 rounded-[28px] bg-graphite p-5 keyline-subtle">
                    <p className="type-feature-stat text-porcelain">{item.metricValue}</p>
                    <p className="type-body mt-2 text-ash">{item.metricCopy}</p>
                  </div>

                  <dl className="mt-6 divide-y divide-steel/60">
                    {item.specs.map((spec) => (
                      <div key={spec.label} className="flex items-baseline justify-between gap-4 py-3">
                        <dt className="type-body text-ash">{spec.label}</dt>
                        <dd
                          className={`type-body-strong text-right ${
                            spec.opticalHighlight ? 'text-primary' : 'text-porcelain'
                          }`}
                        >
                          {spec.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-steel/60 pt-5">
                  <span className="numr-tabular type-product-label text-porcelain">
                    ${item.price}
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onInspectRitual(item)}
                      className="type-utility-nav inline-flex items-center gap-0.5 text-primary hover:underline"
                    >
                      <span>Details</span>
                      <ChevronRight size={13} strokeWidth={1.8} />
                    </button>
                    <MagneticButton
                      onClick={() => onReserveRitual(item.id)}
                      className="type-utility-nav inline-flex items-center gap-1 rounded-[170px] bg-primary px-[16px] py-[7px] font-semibold text-on-primary hover:bg-tertiary"
                    >
                      <span>Book</span>
                      <ArrowRight
                        size={12}
                        strokeWidth={2.2}
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                      />
                    </MagneticButton>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Integrated Before & After Clinical Clarity Frame */}
          <div className="compare-reveal-block mt-6 grid grid-cols-1 items-center gap-8 rounded-[28px] bg-obsidian p-6 sm:p-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <RevealHeadline
                text="Documented Before & After Clarity."
                as="h3"
                className="font-sf-pro-display text-[32px] leading-[1.12] font-semibold tracking-[-0.24px] text-porcelain"
              />
              <p className="type-body mt-3 text-ash">
                Drag across the frame to compare pre-treatment dehydration against post-protocol skin luminosity.
              </p>

              <div className="mt-6 flex flex-col gap-3">
                {BEFORE_AFTER_STUDIES.map((s, idx) => {
                  const active = idx === studyIdx;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setStudyIdx(idx);
                        setSplitPercent(52);
                      }}
                      className={`rounded-[28px] p-5 text-left transition-colors ${
                        active ? 'bg-carbon keyline-slate' : 'bg-graphite keyline-subtle hover:bg-carbon/60'
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="type-product-label text-porcelain">{s.title}</span>
                        <span className="type-utility-nav text-secondary">{s.timeline}</span>
                      </div>
                      <p className="type-utility-nav mt-1 text-primary">{s.protocol}</p>
                      <p className="type-body mt-2 text-ash">{s.observation}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[28px] bg-graphite">
                <img
                  src={study.image}
                  alt={`${study.imageAlt} — After ritual`}
                  style={{ filter: study.afterFilter }}
                  className="absolute inset-0 h-full w-full object-cover object-top select-none"
                />
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - splitPercent}% 0 0)` }}
                >
                  <img
                    src={study.image}
                    alt={`${study.imageAlt} — Before ritual`}
                    style={{ filter: study.beforeFilter }}
                    className="h-full w-full object-cover object-top select-none"
                  />
                </div>

                <div
                  className="pointer-events-none absolute inset-y-0 w-[1.5px] bg-porcelain"
                  style={{ left: `${splitPercent}%` }}
                >
                  <div className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-steel text-porcelain keyline-slate">
                    <MoveHorizontal size={15} strokeWidth={1.8} />
                  </div>
                </div>

                <span className="pointer-events-none absolute top-4 left-4 rounded-full bg-obsidian/80 px-3 py-1 type-utility-nav text-porcelain">
                  Before
                </span>
                <span className="pointer-events-none absolute top-4 right-4 rounded-full bg-primary px-3 py-1 type-utility-nav font-semibold text-on-primary">
                  After Ritual
                </span>

                <label htmlFor="apple-before-after-slider" className="sr-only">
                  Compare before and after skin clarity
                </label>
                <input
                  id="apple-before-after-slider"
                  type="range"
                  min={10}
                  max={90}
                  value={splitPercent}
                  onChange={(e) => setSplitPercent(Number(e.target.value))}
                  className="absolute inset-0 z-10 h-full w-full cursor-ew-resize opacity-0"
                />
              </div>
            </div>
          </div>

          {/* Client Perspective Strip */}
          <div className="compare-reveal-block mt-6 grid grid-cols-1 items-center gap-8 rounded-[28px] bg-obsidian p-6 sm:p-10 lg:grid-cols-12">
            <div className="group aspect-[4/3] overflow-hidden rounded-[28px] bg-graphite lg:col-span-4">
              <img
                key={quote.id}
                src={quote.image}
                alt={quote.imageAlt}
                className="img-hover-zoom h-full w-full object-cover object-top"
              />
            </div>

            <div className="lg:col-span-8 lg:pl-4">
              <blockquote className="font-sf-pro-display text-[22px] leading-[1.32] font-medium tracking-[-0.12px] text-porcelain sm:text-[28px]">
                “{quote.quote}”
              </blockquote>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-steel/60 pt-5">
                <div>
                  <p className="type-product-label text-porcelain">{quote.author}</p>
                  <p className="type-body mt-0.5 text-ash">
                    {quote.role} · {quote.ritual}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Previous client perspective"
                    onClick={() =>
                      setQuoteIdx((i) => (i - 1 + CLIENT_PERSPECTIVES.length) % CLIENT_PERSPECTIVES.length)
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-steel/80 text-porcelain hover:bg-steel"
                  >
                    <ChevronLeft size={16} strokeWidth={1.8} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next client perspective"
                    onClick={() =>
                      setQuoteIdx((i) => (i + 1) % CLIENT_PERSPECTIVES.length)
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-steel/80 text-porcelain hover:bg-steel"
                  >
                    <ChevronRight size={16} strokeWidth={1.8} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
