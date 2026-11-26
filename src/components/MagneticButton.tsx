'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 0.22,
  className = '',
  type = 'button',
  ...rest
}) => {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    if (prefersReduced || isTouch) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.42, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.42, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
      const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;
      xTo(Math.max(-7, Math.min(7, dx)));
      yTo(Math.max(-7, Math.min(7, dy)));
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);

  return (
    <button
      ref={ref}
      type={type}
      className={`group transition-[background-color,border-color,color,opacity] duration-300 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
