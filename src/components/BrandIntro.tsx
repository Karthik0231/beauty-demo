'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const BrandIntro: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    try {
      if (sessionStorage.getItem('ma_intro_seen') === '1') return;
      sessionStorage.setItem('ma_intro_seen', '1');
    } catch {
      return;
    }

    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible || !overlayRef.current || !markRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setVisible(false),
      });

      tl.fromTo(
        markRef.current,
        { opacity: 0, scale: 0.94, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: 'power3.out' }
      )
        .to(markRef.current, {
          opacity: 0,
          y: -8,
          duration: 0.35,
          delay: 0.25,
          ease: 'power2.in',
        })
        .to(
          overlayRef.current,
          {
            opacity: 0,
            duration: 0.38,
            ease: 'power2.out',
          },
          '-=0.15'
        );
    }, overlayRef);

    return () => ctx.revert();
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      onClick={() => setVisible(false)}
      role="status"
      aria-label="Maison Aurélia loading"
      className="fixed inset-0 z-[80] flex cursor-pointer items-center justify-center bg-obsidian"
    >
      <div ref={markRef} className="flex flex-col items-center gap-4">
        <img
          src="/images/aurelia-emblem.jpg"
          alt="MAISON AURÉLIA"
          className="h-20 w-20 rounded-[16px] border border-steel/60 object-cover"
        />
        <span className="font-sf-pro-display text-[13px] font-semibold tracking-[0.28em] text-porcelain uppercase">
          Maison Aurélia
        </span>
      </div>
    </div>
  );
};
