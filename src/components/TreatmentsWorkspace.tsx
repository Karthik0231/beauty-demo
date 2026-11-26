'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { BEAUTY_RITUALS, BeautyRitual } from '../data/salon';
import { MagneticButton } from './MagneticButton';
import { RevealHeadline } from './RevealHeadline';

gsap.registerPlugin(ScrollTrigger);

interface TreatmentsWorkspaceProps {
  selectedRitualId: string;
  onReserveRitual: (ritualId: string) => void;
  onInspectRitual: (ritual: BeautyRitual) => void;
  onOpenLightbox: (index: number) => void;
}

const CATEGORIES: Array<'All' | BeautyRitual['category']> = [
  'All',
  'Facial Atelier',
  'Hair Architecture',
  'Editorial Makeup',
  'Body Sanctuary',
];

export const TreatmentsWorkspace: React.FC<TreatmentsWorkspaceProps> = ({
  selectedRitualId,
  onReserveRitual,
  onInspectRitual,
  onOpenLightbox,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>('All');

  const items =
    activeCategory === 'All'
      ? BEAUTY_RITUALS
      : BEAUTY_RITUALS.filter((r) => r.category === activeCategory);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ritual-tile',
        { y: 40, scale: 0.97, opacity: 0.9 },
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
        '.ritual-image-clip img',
        { scale: 1.1 },
        {
          scale: 1,
          duration: 1.1,
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

      gsap.fromTo(
        '.ritual-image-clip',
        { clipPath: 'inset(5% 0% 5% 0% round 28px)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 28px)',
          duration: 0.95,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'clipPath',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 88%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section
      id="treatments-workspace"
      ref={sectionRef}
      className="surface-carbon-band px-5 py-20 sm:px-8 sm:py-24 lg:px-12"
    >
      <div className="mx-auto max-w-[1380px]">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <RevealHeadline
              text="Signature Atelier Rituals."
              className="type-section-headline text-porcelain"
            />
            <p className="type-section-nav mt-3 max-w-[48ch] text-ash">
              Facial bodywork, architectural hair cutting, mineral complexion work, and heated stone therapy.
            </p>
          </div>

          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Treatment disciplines">
            {CATEGORIES.map((category) => {
              const active = category === activeCategory;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveCategory(category)}
                  className={`type-utility-nav rounded-full px-4 py-[7px] transition-colors ${
                    active
                      ? 'bg-primary font-semibold text-on-primary'
                      : 'border border-slate text-porcelain/80 hover:border-porcelain hover:text-porcelain'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Carbon #1d1d1f parent panel containing Obsidian #000000 28px Feature Tiles */}
        <div className="rounded-[28px] bg-carbon p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {items.map((ritual) => {
              const selected = ritual.id === selectedRitualId;
              const masterIdx = BEAUTY_RITUALS.findIndex((x) => x.id === ritual.id);
              return (
                <article
                  key={ritual.id}
                  className={`ritual-tile group flex flex-col justify-between rounded-[28px] bg-obsidian p-6 sm:p-8 ${
                    selected ? 'keyline-slate' : ''
                  }`}
                >
                  <div>
                    <button
                      type="button"
                      onClick={() => onOpenLightbox(masterIdx >= 0 ? masterIdx : 0)}
                      aria-label={`Inspect ${ritual.name} fullscreen`}
                      className="ritual-image-clip relative block aspect-[16/10] w-full overflow-hidden rounded-[28px] bg-obsidian text-left"
                    >
                      <img
                        src={ritual.image}
                        alt={ritual.imageAlt}
                        className="img-hover-zoom h-full w-full object-cover object-center"
                      />
                    </button>

                    <div className="mt-6 flex items-baseline justify-between gap-2">
                      <h3 className="font-sf-pro-display text-[28px] leading-[1.12] font-semibold tracking-[0.196px] text-porcelain">
                        {ritual.name}
                      </h3>
                      {ritual.isNew && (
                        <span className="text-[12px] leading-[16px] font-semibold tracking-[-0.12px] text-tertiary">
                          New
                        </span>
                      )}
                    </div>

                    <p className="type-body-strong mt-2 text-primary">
                      {ritual.specHighlight}
                    </p>
                    <p className="type-body mt-2.5 text-ash">{ritual.description}</p>
                  </div>

                  <div className="mt-6 border-t border-steel/60 pt-5">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <span className="type-feature-stat text-porcelain">
                          ${ritual.price}
                        </span>
                        <span className="type-utility-nav ml-2 text-ash">
                          {ritual.duration} · {ritual.monthlyOrCadence}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => onInspectRitual(ritual)}
                          className="type-utility-nav inline-flex items-center gap-0.5 text-primary hover:underline"
                        >
                          <span>Specs</span>
                          <ChevronRight size={13} strokeWidth={1.8} />
                        </button>

                        <MagneticButton
                          onClick={() => onReserveRitual(ritual.id)}
                          className="type-utility-nav inline-flex items-center gap-1.5 rounded-[170px] bg-primary px-[16px] py-[7px] font-semibold text-on-primary hover:bg-tertiary"
                        >
                          <span>{selected ? 'Selected' : 'Book'}</span>
                          <ArrowRight
                            size={12}
                            strokeWidth={2.2}
                            className="transition-transform duration-300 group-hover:translate-x-0.5"
                          />
                        </MagneticButton>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
