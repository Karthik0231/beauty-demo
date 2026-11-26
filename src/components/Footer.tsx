'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Enter a valid email address.');
      return;
    }
    setErrorMsg('');
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-obsidian px-5 pt-16 pb-12 text-ash sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1380px]">
        <div className="space-y-2.5 border-b border-steel/70 pb-8 type-utility-nav text-ash">
          <p>
            1. Hydration (+42%) and protocol metrics reflect illustrative demonstration telemetry for the Maison Aurélia flagship studio.
          </p>
          <p>
            2. All facial and scalp infusions are blended fresh at 4°C without synthetic fragrance, drying alcohols, or cyclic silicones.
          </p>
        </div>

        <div className="flex flex-col justify-between gap-6 border-b border-steel/70 py-10 md:flex-row md:items-center">
          <div>
            <h3 className="type-product-label text-porcelain">Maison Aurélia Atelier</h3>
            <p className="type-body mt-1 text-ash">
              Receive private suite openings and seasonal treatment releases.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="flex w-full max-w-[440px] flex-col gap-2">
            <div className="flex flex-col gap-2 sm:flex-row">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="name@domain.com"
                className="type-body flex-1 rounded-[980px] border border-slate bg-[rgba(255,255,255,0.04)] px-6 py-2.5 text-porcelain placeholder:text-ash focus:border-primary"
              />
              <button
                type="submit"
                className="type-utility-nav rounded-[170px] bg-primary px-5 py-2.5 font-semibold text-on-primary transition-colors hover:bg-tertiary"
              >
                Subscribe
              </button>
            </div>
            {errorMsg && <p className="type-utility-nav text-primary">{errorMsg}</p>}
            {subscribed && (
              <p className="type-utility-nav inline-flex items-center gap-1.5 text-primary">
                <Check size={13} strokeWidth={2} />
                <span>Registered for private suite notifications.</span>
              </p>
            )}
          </form>
        </div>

        <div className="grid grid-cols-2 gap-8 border-b border-steel/70 py-10 sm:grid-cols-4">
          <div>
            <h4 className="type-body-strong text-porcelain">Disciplines</h4>
            <ul className="mt-3 space-y-2 type-utility-nav">
              {[
                { label: 'Sculptural Facial 01', id: 'treatments-workspace' },
                { label: 'Silk Hair Architecture', id: 'treatments-workspace' },
                { label: 'Atelier Complexion', id: 'treatments-workspace' },
                { label: 'Thermal Orchid Stone', id: 'treatments-workspace' },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => onNavigate(link.id)}
                    className="text-ash transition-colors hover:text-primary hover:underline"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="type-body-strong text-porcelain">Experience</h4>
            <ul className="mt-3 space-y-2 type-utility-nav">
              {[
                { label: 'Four-Stage Protocol', id: 'skincare-experience' },
                { label: 'Compare Rituals', id: 'compare-workspace' },
                { label: 'Service Directory', id: 'pricing-reset' },
                { label: 'Reserve a Suite', id: 'booking' },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => onNavigate(link.id)}
                    className="text-ash transition-colors hover:text-primary hover:underline"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="type-body-strong text-porcelain">Studio</h4>
            <ul className="mt-3 space-y-2 type-utility-nav">
              <li>24 Rue Saint-Honoré</li>
              <li>Suite 3 · Paris</li>
              <li>Tue – Sun: 09:30 – 19:30</li>
              <li>+33 1 42 68 55 00</li>
            </ul>
          </div>

          <div>
            <h4 className="type-body-strong text-porcelain">Concierge</h4>
            <ul className="mt-3 space-y-2 type-utility-nav">
              <li>concierge@maisonaurelia.com</li>
              <li>@maisonaurelia.paris</li>
              <li>Private Bridal Suites</li>
              <li>4°C Apothecary Refills</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 pt-6 type-utility-nav text-ash sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            <img
              src="/images/aurelia-emblem.jpg"
              alt="MAISON AURÉLIA emblem"
              className="h-5 w-5 rounded-[4px] border border-steel/60 object-cover"
            />
            <span className="font-sf-pro-display text-[12px] font-semibold tracking-[0.18em] text-porcelain uppercase">
              Maison Aurélia
            </span>
            <span className="ml-2">Copyright © 2026 Maison Aurélia. All rights reserved.</span>
          </div>
          <p>Obsidian Beauty Exhibition · Next.js App Router</p>
        </div>
      </div>
    </footer>
  );
};
