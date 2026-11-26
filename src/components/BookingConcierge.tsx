'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';
import { BEAUTY_RITUALS, SPECIALISTS, TIME_SLOTS } from '../data/salon';
import { MagneticButton } from './MagneticButton';
import { RevealHeadline } from './RevealHeadline';

gsap.registerPlugin(ScrollTrigger);

interface BookingConciergeProps {
  selectedRitualId: string;
  onSelectRitual: (id: string) => void;
}

interface ReservationPass {
  code: string;
  ritualName: string;
  duration: string;
  price: number;
  specialist: string;
  date: string;
  time: string;
  guest: string;
  email: string;
}

export const BookingConcierge: React.FC<BookingConciergeProps> = ({
  selectedRitualId,
  onSelectRitual,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const defaultDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  }, []);

  const [specialistId, setSpecialistId] = useState(SPECIALISTS[0].id);
  const [date, setDate] = useState(defaultDate);
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[1]);
  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [pass, setPass] = useState<ReservationPass | null>(null);

  const activeRitual =
    BEAUTY_RITUALS.find((r) => r.id === selectedRitualId) ?? BEAUTY_RITUALS[0];
  const activeSpecialist =
    SPECIALISTS.find((s) => s.id === specialistId) ?? SPECIALISTS[0];

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.booking-panel-reveal',
        { y: 36, scale: 0.98, opacity: 0.9 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.85,
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
        '.booking-panel-reveal img',
        { scale: 1.09 },
        {
          scale: 1,
          duration: 1.05,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      setErrorMsg('Enter guest full name to hold your suite.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Enter a valid email address for reservation dispatch.');
      return;
    }
    setErrorMsg('');
    setPass({
      code: `MA-${Math.floor(1000 + Math.random() * 9000)}`,
      ritualName: activeRitual.name,
      duration: activeRitual.duration,
      price: activeRitual.price,
      specialist: activeSpecialist.name,
      date,
      time: timeSlot,
      guest: guestName.trim(),
      email: email.trim(),
    });
  };

  return (
    <section
      id="booking"
      ref={sectionRef}
      className="surface-carbon-band px-5 py-20 sm:px-8 sm:py-24 lg:px-12"
    >
      <div className="mx-auto max-w-[1380px]">
        <div className="booking-panel-reveal rounded-[28px] bg-carbon p-6 sm:p-10 lg:p-14">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Left Selected Ritual Summary Tile */}
            <div className="group flex flex-col justify-between rounded-[28px] bg-obsidian p-6 sm:p-8 lg:col-span-5">
              <div>
                <RevealHeadline
                  text="Reserve your private session."
                  className="type-comparison-headline text-porcelain"
                />
                <p className="type-body mt-3 text-ash">
                  Formulations are cold-blended fresh before arrival. Zero prepayment required.
                </p>

                <div className="mt-6 aspect-[16/10] w-full overflow-hidden rounded-[28px] bg-graphite">
                  <img
                    src={activeRitual.image}
                    alt={activeRitual.imageAlt}
                    className="img-hover-zoom h-full w-full object-cover object-center"
                  />
                </div>

                <div className="mt-6">
                  <p className="type-utility-nav text-primary">
                    {activeRitual.specHighlight}
                  </p>
                  <h3 className="mt-1 type-hero-product-name text-porcelain">
                    {activeRitual.name}
                  </h3>
                  <p className="type-body mt-2 text-ash">{activeRitual.description}</p>
                </div>
              </div>

              <div className="mt-6 flex items-baseline justify-between border-t border-steel/60 pt-5">
                <span className="type-body text-ash">{activeRitual.duration}</span>
                <span className="type-feature-stat text-porcelain">${activeRitual.price}</span>
              </div>
            </div>

            {/* Right Booking Form or Confirmation Pass */}
            <div className="lg:col-span-7">
              {pass ? (
                <div className="flex h-full flex-col justify-between rounded-[28px] bg-obsidian p-6 sm:p-10">
                  <div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-on-primary">
                      <Check size={20} strokeWidth={2.2} />
                    </div>
                    <h3 className="mt-6 font-sf-pro-display text-[32px] leading-[1.13] font-semibold text-porcelain">
                      Suite reserved for {pass.guest}.
                    </h3>
                    <p className="type-body mt-2 text-ash">
                      Reservation pass <span className="font-semibold text-porcelain">{pass.code}</span> prepared for {pass.email}.
                    </p>

                    <dl className="mt-8 divide-y divide-steel/60 border-y border-steel/60">
                      <div className="flex justify-between py-3.5 type-body">
                        <dt className="text-ash">Ritual</dt>
                        <dd className="font-semibold text-porcelain">{pass.ritualName}</dd>
                      </div>
                      <div className="flex justify-between py-3.5 type-body">
                        <dt className="text-ash">Specialist</dt>
                        <dd className="font-semibold text-porcelain">{pass.specialist}</dd>
                      </div>
                      <div className="flex justify-between py-3.5 type-body">
                        <dt className="text-ash">Schedule</dt>
                        <dd className="numr-tabular font-semibold text-porcelain">
                          {pass.date} · {pass.time}
                        </dd>
                      </div>
                      <div className="flex justify-between py-3.5 type-body">
                        <dt className="text-ash">Session Total</dt>
                        <dd className="numr-tabular font-semibold text-primary">
                          ${pass.price} ({pass.duration})
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setPass(null)}
                      className="type-utility-nav rounded-full border border-slate px-5 py-2.5 text-porcelain hover:border-porcelain"
                    >
                      Modify Reservation
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPass(null);
                        setGuestName('');
                        setEmail('');
                        setNotes('');
                      }}
                      className="type-utility-nav rounded-[170px] bg-primary px-5 py-2.5 font-semibold text-on-primary hover:bg-tertiary"
                    >
                      Book Another Session
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex h-full flex-col justify-between gap-6 rounded-[28px] bg-obsidian p-6 sm:p-10"
                >
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="relative">
                        <label htmlFor="book-ritual" className="type-utility-nav block text-ash">
                          Selected Ritual
                        </label>
                        <div className="relative mt-2">
                          <select
                            id="book-ritual"
                            value={selectedRitualId}
                            onChange={(e) => onSelectRitual(e.target.value)}
                            className="type-body w-full appearance-none rounded-[980px] border border-slate bg-[rgba(255,255,255,0.04)] py-3 pr-[45px] pl-[24px] text-porcelain focus:border-primary"
                          >
                            {BEAUTY_RITUALS.map((r) => (
                              <option key={r.id} value={r.id} className="bg-carbon text-porcelain">
                                {r.name} — ${r.price}
                              </option>
                            ))}
                          </select>
                          <ChevronDown
                            size={15}
                            className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ash"
                          />
                        </div>
                      </div>

                      <div className="relative">
                        <label htmlFor="book-specialist" className="type-utility-nav block text-ash">
                          Specialist
                        </label>
                        <div className="relative mt-2">
                          <select
                            id="book-specialist"
                            value={specialistId}
                            onChange={(e) => setSpecialistId(e.target.value)}
                            className="type-body w-full appearance-none rounded-[980px] border border-slate bg-[rgba(255,255,255,0.04)] py-3 pr-[45px] pl-[24px] text-porcelain focus:border-primary"
                          >
                            {SPECIALISTS.map((sp) => (
                              <option key={sp.id} value={sp.id} className="bg-carbon text-porcelain">
                                {sp.name}
                              </option>
                            ))}
                          </select>
                          <ChevronDown
                            size={15}
                            className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ash"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="book-date" className="type-utility-nav block text-ash">
                          Date
                        </label>
                        <input
                          id="book-date"
                          type="date"
                          value={date}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={(e) => setDate(e.target.value)}
                          className="type-body mt-2 w-full rounded-[980px] border border-slate bg-[rgba(255,255,255,0.04)] px-6 py-3 text-porcelain focus:border-primary"
                        />
                      </div>

                      <div>
                        <span className="type-utility-nav block text-ash">Preferred Hour</span>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {TIME_SLOTS.map((slot) => {
                            const active = slot === timeSlot;
                            return (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setTimeSlot(slot)}
                                className={`type-utility-nav rounded-full px-3 py-2 transition-colors ${
                                  active
                                    ? 'bg-primary font-semibold text-on-primary'
                                    : 'border border-slate bg-[rgba(255,255,255,0.04)] text-porcelain hover:border-porcelain'
                                }`}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="book-name" className="type-utility-nav block text-ash">
                          Guest Name
                        </label>
                        <input
                          id="book-name"
                          type="text"
                          value={guestName}
                          onChange={(e) => {
                            setGuestName(e.target.value);
                            if (errorMsg) setErrorMsg('');
                          }}
                          placeholder="Claire Beaumont"
                          className="type-body mt-2 w-full rounded-[980px] border border-slate bg-[rgba(255,255,255,0.04)] px-6 py-3 text-porcelain placeholder:text-ash focus:border-primary"
                        />
                      </div>

                      <div>
                        <label htmlFor="book-email" className="type-utility-nav block text-ash">
                          Email
                        </label>
                        <input
                          id="book-email"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errorMsg) setErrorMsg('');
                          }}
                          placeholder="claire@domain.com"
                          className="type-body mt-2 w-full rounded-[980px] border border-slate bg-[rgba(255,255,255,0.04)] px-6 py-3 text-porcelain placeholder:text-ash focus:border-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="book-notes" className="type-utility-nav block text-ash">
                        Skin or Hair Notes (Optional)
                      </label>
                      <input
                        id="book-notes"
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Sensitivity notes, scalp goals, or occasion timing"
                        className="type-body mt-2 w-full rounded-[980px] border border-slate bg-[rgba(255,255,255,0.04)] px-6 py-3 text-porcelain placeholder:text-ash focus:border-primary"
                      />
                    </div>

                    {errorMsg && (
                      <p role="alert" className="type-utility-nav font-semibold text-primary">
                        {errorMsg}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-steel/60 pt-5">
                    <p className="type-utility-nav text-ash">
                      24 Rue Saint-Honoré · Suite 3 · Reschedule free 24h prior
                    </p>

                    <MagneticButton
                      type="submit"
                      className="type-body-strong inline-flex items-center gap-1.5 rounded-[170px] bg-primary px-6 py-2.5 text-on-primary hover:bg-tertiary"
                    >
                      <span>Confirm Reservation</span>
                      <ArrowRight
                        size={14}
                        strokeWidth={2}
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                      />
                    </MagneticButton>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
