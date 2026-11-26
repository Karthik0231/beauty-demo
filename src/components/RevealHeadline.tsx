'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealHeadlineProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  immediate?: boolean;
}

export const RevealHeadline: React.FC<RevealHeadlineProps> = ({
  text,
  as: Tag = 'h2',
  className = '',
  immediate = false,
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const words = text.split(' ');

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const spans = el.querySelectorAll('.reveal-word');
      if (immediate) {
        gsap.fromTo(
          spans,
          { y: 26, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.06,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          }
        );
      } else {
        gsap.fromTo(
          spans,
          { y: 20, opacity: 0.9 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.045,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              once: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [immediate]);

  return (
    <Tag ref={containerRef} className={className}>
      {words.map((word, idx) => (
        <span key={`${word}-${idx}`} className="inline-block align-bottom">
          <span className="reveal-word inline-block will-change-transform">
            {word}
            {idx < words.length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ))}
    </Tag>
  );
};
