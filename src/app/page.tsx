'use client';

import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { BEAUTY_RITUALS, BeautyRitual, CAMPAIGN_HIGHLIGHTS } from '@/data/salon';
import { BrandIntro } from '@/components/BrandIntro';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { HighlightsSection } from '@/components/HighlightsSection';
import { SkincareExperience } from '@/components/SkincareExperience';
import { TreatmentsWorkspace } from '@/components/TreatmentsWorkspace';
import { CompareWorkspace } from '@/components/CompareWorkspace';
import { PricingResetCard } from '@/components/PricingResetCard';
import { BookingConcierge } from '@/components/BookingConcierge';
import { Footer } from '@/components/Footer';
import { FilmModal, LightboxSlide, RitualQuickView, SearchOverlay } from '@/components/Modals';

gsap.registerPlugin(ScrollTrigger);

const TREATMENT_SLIDES: LightboxSlide[] = BEAUTY_RITUALS.map((r) => ({
  id: r.id,
  label: r.name,
  specTag: r.specHighlight,
  headline: r.name,
  subcopy: r.description,
  image: r.image,
  imageAlt: r.imageAlt,
}));

export default function HomePage() {
  const lenisRef = useRef<Lenis | null>(null);
  const [selectedRitualId, setSelectedRitualId] = useState(BEAUTY_RITUALS[0].id);
  const [quickViewRitual, setQuickViewRitual] = useState<BeautyRitual | null>(null);
  const [lightboxState, setLightboxState] = useState<{
    open: boolean;
    index: number;
    slides: LightboxSlide[];
  }>({
    open: false,
    index: 0,
    slides: CAMPAIGN_HIGHLIGHTS,
  });
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollToSection = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -72 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReserveRitual = (ritualId: string) => {
    setSelectedRitualId(ritualId);
    scrollToSection('booking');
  };

  return (
    <div className="min-h-screen bg-obsidian text-porcelain">
      <BrandIntro />

      <Navbar
        onNavigate={scrollToSection}
        onBookClick={() => scrollToSection('booking')}
        onOpenSearch={() => setSearchOpen(true)}
      />

      <main>
        <HeroSection
          onBookClick={() => scrollToSection('booking')}
          onWatchFilm={() =>
            setLightboxState({ open: true, index: 0, slides: CAMPAIGN_HIGHLIGHTS })
          }
        />

        <HighlightsSection
          onWatchFilm={(startIndex = 0) =>
            setLightboxState({ open: true, index: startIndex, slides: CAMPAIGN_HIGHLIGHTS })
          }
        />

        <SkincareExperience />

        <TreatmentsWorkspace
          selectedRitualId={selectedRitualId}
          onReserveRitual={handleReserveRitual}
          onInspectRitual={(r) => setQuickViewRitual(r)}
          onOpenLightbox={(index) =>
            setLightboxState({ open: true, index, slides: TREATMENT_SLIDES })
          }
        />

        <CompareWorkspace
          onReserveRitual={handleReserveRitual}
          onInspectRitual={(r) => setQuickViewRitual(r)}
        />

        <PricingResetCard onReserveRitual={handleReserveRitual} />

        <BookingConcierge
          selectedRitualId={selectedRitualId}
          onSelectRitual={setSelectedRitualId}
        />
      </main>

      <Footer onNavigate={scrollToSection} />

      <FilmModal
        isOpen={lightboxState.open}
        initialIndex={lightboxState.index}
        slides={lightboxState.slides}
        onClose={() => setLightboxState((prev) => ({ ...prev, open: false }))}
      />

      <RitualQuickView
        ritual={quickViewRitual}
        onClose={() => setQuickViewRitual(null)}
        onReserve={handleReserveRitual}
      />

      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectRitual={(r) => setQuickViewRitual(r)}
      />
    </div>
  );
}
