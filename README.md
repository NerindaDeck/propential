# Propential — property-secured loan website

Static, mobile-first marketing site for **Propential** (Medipay Holdings Pty Ltd, ACL 474336). No build step — plain HTML/CSS/JS. Deploys to any static host (Vercel, Netlify, GitHub Pages).

## Pages
- `index.html` — Home (hero with live calculator, project carousel, "how it works", door reveal, closing CTA)
- `how-it-works.html`, `product.html`, `calculator.html`, `faqs.html`
- `eligibility.html` — eligibility check form (instant result)
- `apply.html` — full application form (referral-code capture)
- `legal/` — privacy, terms, credit-guide, tmd, complaints, hardship

## Shared assets
- `propential.css` — base design system (tokens, type, components, nav, footer)
- `propential-v3.css` — v3 visual layer (glass, motion, carousel, calculator)
- `partials.js` — injects the shared nav + footer
- `site.js` — nav toggle, reveal animations, scroll progress, cross-page tweaks
- `calculator.js`, `eligibility.js`, `apply.js` — page logic / validation
- `assets/` — logo mark + photography

## Deploy (GitHub → Vercel)
1. Create a new GitHub repo and push these files (repo root = this folder).
2. In Vercel: **New Project → Import** the repo.
3. Framework preset: **Other**. Build command: *(none)*. Output directory: `./` (root).
4. **Deploy.** Vercel serves the static files as-is.

(GitHub Pages / Netlify: drop the folder in — no config needed.)

## Before going live — to confirm with counsel
- **Comparison rate** is a flagged placeholder (`≈ XX.XX% p.a.`) everywhere the 17.95% rate appears. Replace with the confirmed figure.
- **Legal pages** are titled drafts ("working draft" note) pending legal sign-off.
- **Forms** show a branded success state and currently post to a placeholder. Search for `TODO: wire to Formstack (medipay.formstack.com) + ActiveCampaign CRM` in `eligibility.js` and `apply.js` to connect the live integration (with referral code + email fallback).

## Fonts
Loaded from Google Fonts at runtime (Fraunces, Hanken Grotesk, JetBrains Mono). No local font files required.
