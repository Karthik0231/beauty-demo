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
  const [logoSrc, setLogoSrc] = useState('/images/aurelia-emblem.jpg');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track active section smoothly while scrolling
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
      { rootMargin: '-28% 0px -55% 0px', threshold: [0.05, 0.25, 0.5] }
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
          ? 'border-b border-steel/60 bg-graphite/90 backdrop-blur-xl'
          : 'border-b border-steel/25 bg-obsidian/80 backdrop-blur-md'
      }`}
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-[64px] max-w-[1380px] items-center justify-between px-5 sm:px-8 lg:px-12"
      >
        {/* Prominent Brand Mark + Wordmark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleLink('hero');
          }}
          className="group flex shrink-0 items-center gap-3 whitespace-nowrap rounded-[10px] py-1 transition-opacity hover:opacity-90"
          aria-label="Maison Aurélia Home"
        >
          <img
            src={logoSrc}
            alt="MAISON AURÉLIA emblem"
            onError={() => {
              if (logoSrc !== '/images/aurelia-emblem.jpg') {
                setLogoSrc('/images/aurelia-emblem.jpg');
              }
            }}
            className="h-9 w-9 shrink-0 rounded-[8px] border border-steel/70 object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <div className="flex flex-col leading-none">
            <span className="font-sf-pro-display text-[14px] font-semibold tracking-[0.2em] text-porcelain uppercase">
              Maison Aurélia
            </span>
            <span className="mt-1 text-[10px] font-medium tracking-[0.16em] text-tertiary uppercase">
              Skin &amp; Beauty Atelier
            </span>
          </div>
        </a>

        {/* Clean Single-Row Links with Active Scroll Indicator */}
        <ul className="hidden items-center gap-7 lg:flex xl:gap-9">
          {NAV_LINKS.map((item) => {
            const isActive = activeSection === item.target;
            return (
              <li key={item.target} className="relative">
                <a
                  href={`#${item.target}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLink(item.target);
                  }}
                  className={`group relative inline-flex flex-col items-center py-2 text-[13px] font-medium tracking-[-0.01em] whitespace-nowrap transition-colors duration-300 ${
                    isActive ? 'text-primary' : 'text-porcelain/80 hover:text-porcelain'
                  }`}
                >
                  <span>{item.label}</span>
                  <span
                    aria-hidden="true"
                    className={`mt-1 h-[2px] rounded-full bg-primary transition-all duration-300 ${
                      isActive
                        ? 'w-full opacity-100'
                        : 'w-0 opacity-0 group-hover:w-3/4 group-hover:opacity-60'
                    }`}
                  />
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
            className="flex h-9 w-9 items-center justify-center rounded-full border border-steel/60 bg-graphite/60 text-porcelain/85 transition-colors hover:border-slate hover:text-primary"
          >
            <Search size={15} strokeWidth={1.7} />
          </button>

          <MagneticButton
            onClick={onBookClick}
            className="hidden items-center gap-1.5 rounded-[170px] bg-primary px-4 py-2 text-[12px] font-semibold tracking-[-0.01em] text-on-primary hover:bg-tertiary sm:inline-flex"
          >
            <span>Reserve</span>
            <ArrowRight
              size={13}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </MagneticButton>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-steel/70 text-porcelain transition-colors hover:border-slate lg:hidden"
          >
            {mobileOpen ? <X size={17} strokeWidth={1.7} /> : <Menu size={17} strokeWidth={1.7} />}
          </button>
        </div>
      </nav>

      {/* Mobile / Tablet Navigation Drawer */}
      {mobileOpen && (
        <div className="mx-4 mb-4 rounded-[20px] bg-[#161617] p-5 keyline-subtle lg:hidden">
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
                    className={`flex items-center justify-between rounded-[10px] px-3 py-2.5 type-section-nav transition-colors ${
                      isActive ? 'bg-carbon text-primary' : 'text-porcelain hover:bg-carbon/60'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
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
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-[170px] bg-primary py-3 text-[13px] font-semibold text-on-primary"
          >
            <span>Reserve a Private Suite</span>
            <ArrowRight size={14} strokeWidth={2} />
          </button>
        </div>
      )}
    </header>
  );
};
