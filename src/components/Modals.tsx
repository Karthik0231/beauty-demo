'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import { BEAUTY_RITUALS, BeautyRitual, CAMPAIGN_HIGHLIGHTS } from '../data/salon';
import { MagneticButton } from './MagneticButton';

export interface LightboxSlide {
  id: string;
  label: string;
  specTag: string;
  headline: string;
  subcopy: string;
  image: string;
  imageAlt: string;
}

interface FilmModalProps {
  isOpen: boolean;
  initialIndex?: number;
  slides?: LightboxSlide[];
  onClose: () => void;
}

export const FilmModal: React.FC<FilmModalProps> = ({
  isOpen,
  initialIndex = 0,
  slides,
  onClose,
}) => {
  const gallerySlides: LightboxSlide[] = slides ?? CAMPAIGN_HIGHLIGHTS;
  const [chapterIdx, setChapterIdx] = useState(initialIndex);

  useEffect(() => {
    if (isOpen) {
      setChapterIdx(initialIndex);
    }
  }, [isOpen, initialIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        setChapterIdx((i) => (i + 1) % gallerySlides.length);
      }
      if (e.key === 'ArrowLeft') {
        setChapterIdx((i) => (i - 1 + gallerySlides.length) % gallerySlides.length);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, gallerySlides.length, onClose]);

  if (!isOpen) return null;
  const chapter = gallerySlides[chapterIdx] ?? gallerySlides[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/94 p-4 backdrop-blur-lg"
      role="dialog"
      aria-modal="true"
      aria-label="Maison Aurélia Fullscreen Gallery"
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />
      <div className="relative z-10 w-full max-w-[1100px] overflow-hidden rounded-[28px] bg-carbon keyline-subtle">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close fullscreen gallery"
          className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-obsidian/80 text-porcelain transition-colors hover:bg-steel"
        >
          <X size={17} strokeWidth={1.8} />
        </button>

        {/* Left / Right Keyboard & Pointer Navigation */}
        <button
          type="button"
          onClick={() => setChapterIdx((i) => (i - 1 + gallerySlides.length) % gallerySlides.length)}
          aria-label="Previous image"
          className="absolute top-1/2 left-4 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-obsidian/75 text-porcelain backdrop-blur-md transition-colors hover:bg-primary hover:text-on-primary"
        >
          <ChevronLeft size={18} strokeWidth={1.8} />
        </button>

        <button
          type="button"
          onClick={() => setChapterIdx((i) => (i + 1) % gallerySlides.length)}
          aria-label="Next image"
          className="absolute top-1/2 right-4 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-obsidian/75 text-porcelain backdrop-blur-md transition-colors hover:bg-primary hover:text-on-primary"
        >
          <ChevronRight size={18} strokeWidth={1.8} />
        </button>

        <div className="relative aspect-[16/9] w-full bg-obsidian">
          <img
            key={chapter.id}
            src={chapter.image}
            alt={chapter.imageAlt}
            className="h-full w-full object-cover transition-opacity duration-500"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
            <p className="type-body-strong text-primary">{chapter.specTag}</p>
            <h3 className="mt-1 font-sf-pro-display text-[26px] font-semibold text-porcelain sm:text-[38px]">
              {chapter.headline}
            </h3>
            <p className="type-body mt-2 max-w-[56ch] text-porcelain/85">{chapter.subcopy}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 bg-graphite px-6 py-4">
          <div className="flex flex-wrap gap-2">
            {gallerySlides.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setChapterIdx(idx)}
                className={`rounded-full px-4 py-1.5 type-utility-nav transition-colors ${
                  idx === chapterIdx
                    ? 'bg-primary font-semibold text-on-primary'
                    : 'bg-steel/70 text-porcelain/85 hover:bg-steel'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <span className="type-utility-nav text-ash">
            Use ← / → keys · Esc to close
          </span>
        </div>
      </div>
    </div>
  );
};

interface RitualQuickViewProps {
  ritual: BeautyRitual | null;
  onClose: () => void;
  onReserve: (ritualId: string) => void;
}

export const RitualQuickView: React.FC<RitualQuickViewProps> = ({
  ritual,
  onClose,
  onReserve,
}) => {
  useEffect(() => {
    if (!ritual) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [ritual, onClose]);

  if (!ritual) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${ritual.name} details`}
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />
      <div
        className="relative z-10 grid max-h-[90vh] w-full max-w-[920px] grid-cols-1 overflow-y-auto rounded-[28px] bg-carbon keyline-subtle md:grid-cols-12"
        data-lenis-prevent
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close ritual specs"
          className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-obsidian/85 text-porcelain hover:bg-steel"
        >
          <X size={16} strokeWidth={1.8} />
        </button>

        <div className="relative aspect-square bg-obsidian md:col-span-6 md:aspect-auto">
          <img
            src={ritual.image}
            alt={ritual.imageAlt}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="flex flex-col justify-between p-6 sm:p-8 md:col-span-6">
          <div>
            {ritual.isNew && (
              <p className="text-[12px] leading-[16px] font-semibold tracking-[-0.12px] text-tertiary">
                New
              </p>
            )}
            <h3 className="mt-1 type-hero-product-name text-porcelain">{ritual.name}</h3>
            <p className="type-body mt-2 text-ash">{ritual.description}</p>

            <div className="mt-5 rounded-[28px] bg-obsidian p-4">
              <p className="type-utility-nav text-primary">{ritual.specHighlight}</p>
              <p className="type-body mt-1 text-porcelain">{ritual.monthlyOrCadence}</p>
            </div>

            <dl className="mt-6 divide-y divide-steel/60">
              {ritual.specs.map((spec) => (
                <div key={spec.label} className="flex justify-between gap-4 py-2.5">
                  <dt className="type-utility-nav text-ash">{spec.label}</dt>
                  <dd className="type-utility-nav text-right font-semibold text-porcelain">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-steel/60 pt-5">
            <div>
              <p className="type-feature-stat text-porcelain">${ritual.price}</p>
              <p className="type-utility-nav text-ash">{ritual.duration}</p>
            </div>
            <MagneticButton
              onClick={() => {
                onReserve(ritual.id);
                onClose();
              }}
              className="type-body-strong inline-flex items-center gap-1.5 rounded-[170px] bg-primary px-6 py-2.5 text-on-primary hover:bg-tertiary"
            >
              <span>Select &amp; Book</span>
              <ArrowRight
                size={14}
                strokeWidth={2}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRitual: (ritual: BeautyRitual) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  onSelectRitual,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();
  const matches = q
    ? BEAUTY_RITUALS.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q) ||
          r.specHighlight.toLowerCase().includes(q)
      )
    : BEAUTY_RITUALS;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-obsidian/85 p-4 pt-16 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Search beauty rituals"
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />
      <div className="relative z-10 w-full max-w-[680px] rounded-[28px] bg-graphite p-6 keyline-subtle sm:p-8">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search
              size={16}
              strokeWidth={1.8}
              className="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-ash"
            />
            <input
              type="search"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search facials, hair architecture, makeup, cryo..."
              className="type-body w-full rounded-[980px] border border-slate bg-[rgba(255,255,255,0.04)] py-3 pr-5 pl-12 text-porcelain placeholder:text-ash focus:border-primary"
            />
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-carbon text-porcelain hover:bg-steel"
          >
            <X size={16} strokeWidth={1.8} />
          </button>
        </div>

        <ul className="mt-6 divide-y divide-steel/60">
          {matches.length === 0 ? (
            <li className="py-6 text-center type-body text-ash">
              No matching treatment found.
            </li>
          ) : (
            matches.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => {
                    onSelectRitual(item);
                    onClose();
                  }}
                  className="flex w-full items-center justify-between gap-4 rounded-[10px] px-2 py-3 text-left transition-colors hover:bg-carbon"
                >
                  <div>
                    <p className="type-body-strong text-porcelain">{item.name}</p>
                    <p className="type-utility-nav text-ash">{item.specHighlight}</p>
                  </div>
                  <span className="numr-tabular type-body text-primary">
                    ${item.price}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};
