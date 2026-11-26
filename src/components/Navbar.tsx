'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, Menu, Search, X } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface NavbarProps {
  onNavigate: (id: string) => void;
  onBookClick: () => void;
  onOpenSearch: () => void;
}

const NAV_LINKS = [
  { label: 'Overview', target: 'hero' },
  { label: 'Highlights', target: 'highlights' },
  { label: 'Protocol', target: 'skincare-experience' },
  { label: 'Treatments', target: 'treatments-workspace' },
  { label: 'Compare', target: 'compare-workspace' },
  { label: 'Directory', target: 'pricing-reset' },
];

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  onBookClick,
  onOpenSearch,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = [...NAV_LINKS.map((l) => l.target), 'booking'];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0.05, 0.25, 0.5] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleLink = (target: string) => {
    setMobileOpen(false);
    setActiveSection(target);
    onNavigate(target);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-primary/20 bg-[#0b0b0d]/92 shadow-[0_12px_36px_rgba(0,0,0,0.45)] backdrop-blur-2xl'
          : 'border-b border-white/10 bg-[#070708]/85 backdrop-blur-xl'
      }`}
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-[78px] max-w-[1400px] items-center justify-between gap-4 px-5 sm:h-[82px] sm:px-8 lg:px-12"
      >
        {/* Substantial Brand Emblem + Wordmark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleLink('hero');
          }}
          className="group flex shrink-0 items-center gap-3.5 whitespace-nowrap rounded-[12px] py-1"
          aria-label="Maison Aurélia Home"
        >
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[12px] border border-primary/40 bg-obsidian transition-colors duration-300 group-hover:border-primary">
            <img
              src="/images/aurelia-emblem.jpg"
              alt="MAISON AURÉLIA monogram"
              className="h-full w-full scale-[1.42] object-cover transition-transform duration-500 group-hover:scale-[1.5]"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-sf-pro-display text-[16px] font-semibold tracking-[0.22em] text-porcelain uppercase sm:text-[17px]">
              Maison Aurélia
            </span>
            <span className="mt-1.5 text-[10px] font-semibold tracking-[0.22em] text-primary uppercase">
              Skin &amp; Beauty Atelier
            </span>
          </div>
        </a>

        {/* Centered Pill Track Navigation */}
        <ul className="hidden items-center gap-1 rounded-full border border-white/10 bg-[#141416]/90 px-2 py-1.5 lg:flex">
          {NAV_LINKS.map((item) => {
            const isActive = activeSection === item.target;
            return (
              <li key={item.target}>
                <a
                  href={`#${item.target}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLink(item.target);
                  }}
                  className={`relative inline-flex items-center rounded-full px-4 py-2 text-[13px] font-medium tracking-[-0.01em] whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? 'bg-primary font-semibold text-on-primary'
                      : 'text-porcelain/80 hover:bg-white/5 hover:text-porcelain'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right Utility Actions */}
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search treatments and rituals"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#141416] text-porcelain/90 transition-colors hover:border-primary/60 hover:text-primary"
          >
            <Search size={16} strokeWidth={1.7} />
          </button>

          <MagneticButton
            onClick={onBookClick}
            className="hidden items-center gap-2 rounded-[170px] bg-primary px-5 py-2.5 text-[13px] font-semibold tracking-[-0.01em] text-on-primary hover:bg-tertiary sm:inline-flex"
          >
            <span>Reserve Suite</span>
            <ArrowRight
              size={14}
              strokeWidth={2.1}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </MagneticButton>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#141416] text-porcelain transition-colors hover:border-primary/60 lg:hidden"
          >
            {mobileOpen ? <X size={18} strokeWidth={1.7} /> : <Menu size={18} strokeWidth={1.7} />}
          </button>
        </div>
      </nav>

      {/* Mobile / Tablet Navigation Drawer */}
      {mobileOpen && (
        <div className="mx-4 mb-4 rounded-[20px] border border-white/10 bg-[#141416] p-5 lg:hidden">
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((item) => {
              const isActive = activeSection === item.target;
              return (
                <li key={item.target}>
                  <a
                    href={`#${item.target}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLink(item.target);
                    }}
                    className={`flex items-center justify-between rounded-[12px] px-4 py-3 text-[15px] font-medium transition-colors ${
                      isActive ? 'bg-primary font-semibold text-on-primary' : 'text-porcelain hover:bg-white/5'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <ArrowRight size={14} strokeWidth={2} />}
                  </a>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onBookClick();
            }}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-[170px] bg-primary py-3.5 text-[14px] font-semibold text-on-primary"
          >
            <span>Reserve a Private Suite</span>
            <ArrowRight size={15} strokeWidth={2} />
          </button>
        </div>
      )}
    </header>
  );
};
