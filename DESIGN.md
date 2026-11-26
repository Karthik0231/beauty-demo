---
name: Maison Aurélia — Apple Style Reference
description: Midnight hardware gallery aesthetic applied to luxury skincare, facial bodywork, hair architecture, and editorial makeup.
colors:
  obsidian: "#000000"
  graphite: "#0e0e0e"
  carbon: "#1d1d1f"
  steel: "#333336"
  slate: "#6e6e73"
  ash: "#86868b"
  porcelain: "#f5f5f7"
  white: "#ffffff"
  apple-blue: "#0071e3"
  electric-link: "#2997ff"
  cobalt-link: "#0066cc"
  copper-new: "#b64400"
  optical-yellow: "#ffd500"
typography:
  display:
    fontFamily: "SF Pro Display, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(44px, 5.8vw, 80px)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-1.2px"
  headline:
    fontFamily: "SF Pro Display, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(32px, 3.8vw, 56px)"
    fontWeight: 600
    lineHeight: 1.07
    letterSpacing: "-0.84px"
  title:
    fontFamily: "SF Pro Display, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "28px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.196px"
  body:
    fontFamily: "SF Pro Text, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.29
    letterSpacing: "-0.224px"
  label:
    fontFamily: "SF Pro Text, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.33
    letterSpacing: "-0.12px"
rounded:
  links: "10px"
  navigation: "20px"
  cards: "28px"
  compactButtons: "36px"
  buttons: "170px"
  inputs: "980px"
  pills: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "48px"
components:
  button-primary:
    backgroundColor: "{colors.apple-blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.buttons}"
    padding: "7px 14px"
  button-outlined:
    backgroundColor: "transparent"
    textColor: "{colors.porcelain}"
    rounded: "{rounded.pills}"
    padding: "6px 14px"
  card-obsidian:
    backgroundColor: "{colors.obsidian}"
    textColor: "{colors.porcelain}"
    rounded: "{rounded.cards}"
    padding: "24px"
  card-carbon:
    backgroundColor: "{colors.carbon}"
    textColor: "{colors.porcelain}"
    rounded: "{rounded.cards}"
    padding: "32px"
  card-pale-comparison:
    backgroundColor: "{colors.white}"
    textColor: "{colors.carbon}"
    rounded: "{rounded.cards}"
    padding: "32px"
  input-selector:
    backgroundColor: "rgba(255,255,255,0.04)"
    textColor: "{colors.porcelain}"
    rounded: "{rounded.inputs}"
    padding: "12px 45px 12px 24px"
  nav-sticky:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.porcelain}"
    rounded: "{rounded.navigation}"
    padding: "10px 20px"
---

# Design System: Maison Aurélia — Apple Style Reference

## Overview

**Creative North Star: "Midnight Hardware Gallery"**

Applies the Apple Style Reference token system directly to a clinical-luxury beauty, facial, hair, and makeup flagship. Uninterrupted Obsidian (`#000000`) stages isolate photography; Carbon (`#1d1d1f`) bands organize comparison and booking workspaces; White (`#ffffff`) serves as a deliberate service-pricing reset card.

## Colors

- **Obsidian** (`#000000`), **Graphite** (`#0e0e0e`), **Carbon** (`#1d1d1f` / `linear-gradient(#1d1d1f, #000000 288px)`), **Steel** (`#333336`), **Slate** (`#6e6e73`), **Ash** (`#86868b`), **Porcelain** (`#f5f5f7`), **White** (`#ffffff`), **Primary Lime** (`#C4F428` with `#000000` ink), **Secondary Sage** (`#DFE7C9`), **Tertiary Lime** (`#A5D617`), **Accessible Lime Link** (`#4B6800` on White comparison surface).

## Typography

`SF Pro Display` / `SF Pro Text` (`Inter` substitute) across exact reference scales (`12px` utility-nav, `14px` body, `17px` section-nav, `19px` product-label, `28px` feature-stat, `32px` hero-product-name, `80px` display, `96px` display-xl).

## Elevation & Depth

Zero drop shadows on cards, tiles, or media frames; separation relies on Obsidian-to-Carbon transitions, `28px` corners, and `1px` keylines (`rgb(40, 40, 40)` / `rgb(110, 110, 115)`).

## Do's and Don'ts

- **Do** use `28px` corners on media frames, feature tiles, comparison panels, and pale reset cards.
- **Do** reserve Apple Blue `#0071e3` strictly for primary Book / Confirm / Subscribe pills.
- **Don't** add drop shadows, beige/pastel salon card grids, or decorative arches.
