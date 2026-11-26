'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight } from 'lucide-react';
import { BEAUTY_RITUALS } from '../data/salon';
import { RevealHeadline } from './RevealHeadline';

gsap.registerPlugin(ScrollTrigger);

interface PricingResetCardProps {
  onReserveRitual: (ritualId: string) => void;
}

export const PricingResetCard: React.FC<PricingResetCardProps> = ({
  onReserveRitual,
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pricing-tile',
        { y: 20, opacity: 0.92 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.06,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pricing-reset"
      ref={sectionRef}
      className="bg-obsidian px-5 pb-20 sm:px-8 sm:pb-24 lg:px-12"
    >
      <div className="mx-auto max-w-[1380px]">
        {/* Deliberate White Comparison Surface */}
        <div className="rounded-[28px] bg-white p-6 text-carbon sm:p-10 lg:p-14">
          <div className="flex flex-col justify-between gap-6 border-b border-black/10 pb-8 lg:flex-row lg:items-end">
            <div>
              <RevealHeadline
                text="Complete Service Directory & Outcomes."
                className="font-sf-pro-display text-[32px] leading-[1.08] font-semibold tracking-[-0.24px] text-carbon sm:text-[48px]"
              />
              <p className="type-body mt-3 max-w-[54ch] text-slate">
                Transparent single-session pricing with cold-pressed apothecary preparation and private suite recovery built into every visit.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onReserveRitual(BEAUTY_RITUALS[0].id)}
              className="group type-body-strong inline-flex items-center gap-1 self-start text-cobalt-link hover:underline lg:self-auto"
            >
              <span>Schedule consultation</span>
              <ChevronRight
                size={15}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {BEAUTY_RITUALS.map((ritual) => (
              <div
                key={ritual.id}
                className="pricing-tile flex flex-col justify-between rounded-[28px] bg-porcelain p-4 transition-colors duration-300 hover:bg-[#ecece6] sm:p-6"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="type-utility-nav font-semibold text-slate">
                      {ritual.category}
                    </span>
                    <span className="type-utility-nav text-slate">{ritual.duration}</span>
                  </div>
                  <h3 className="mt-2 font-sf-pro-display text-[22px] leading-[1.18] font-semibold text-carbon">
                    {ritual.name}
                  </h3>
                  <p className="type-body mt-2 text-slate">{ritual.tagline}</p>
                </div>

                <div className="mt-6 flex items-baseline justify-between border-t border-black/10 pt-4">
                  <span className="type-feature-stat text-carbon">${ritual.price}</span>
                  <button
                    type="button"
                    onClick={() => onReserveRitual(ritual.id)}
                    className="group type-body-strong inline-flex items-center gap-0.5 text-cobalt-link hover:underline"
                  >
                    <span>Select</span>
                    <ChevronRight
                      size={14}
                      strokeWidth={1.8}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
