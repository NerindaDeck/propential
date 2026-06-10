# Propential — website (Revision R1 build)

Static, mobile-first marketing site for **Propential** (Medipay Holdings Pty Ltd, ACL 474336).
Plain HTML/CSS/JS — no build step. This `dist/` folder is the deployable site root.

## Pages
- `index.html` — Home
- `how-it-works.html`, `product.html`, `calculator.html`, `faqs.html`
- `eligibility.html` — eligibility check (instant result)
- `apply.html` — full application (referral-code capture)
- `legal/` — privacy, terms, credit-guide, tmd, complaints, hardship

## Shared
- `propential.css` / `propential-v3.css` — base + v3 visual layer
- `partials.js` — injects shared nav + footer (acknowledgement + licensee line live here)
- `site.js`, `calculator.js`, `eligibility.js`, `apply.js` — page logic / validation
- `assets/` — logo mark + photography

---

## Deploy to Vercel (GitHub → Vercel)
1. Push the **contents of this `dist/` folder** to a new GitHub repo (repo root = this folder).
2. In Vercel: **New Project → Import** the repo.
3. Framework preset: **Other**. Build command: *(none)*. Output directory: `./` (root).
4. **Deploy.** Vercel serves the static files as-is.

(Netlify / GitHub Pages: drop the folder in — no config needed.)

> Tip: if you already have a Vercel project connected to the repo, just push to the
> default branch and Vercel will redeploy automatically.

---

## What changed in R1 (already applied in this build)
- **Global footer:** new Acknowledgement of Country (Gadigal & Birrabirragal); licensee
  line corrected to **264 George Street, Sydney NSW 2000**.
- **Calculator:** removed the moving comparison-rate line; reworded the totals line; added
  the term/early-repayment lead-in; replaced the info block with the full *"Important
  information about this calculator"* copy. Representative example is now a fixed
  $30,000 / 5-year example (no longer slider-driven).
- **Home:** removed "build on it"; replaced equity-release door copy; removed equity and
  "not risk-priced" tile sublines; corrected two-fee wording.
- **Eligibility:** Q1 now "Do you own a property in Australia?"; removed the "I'm buying
  one" option; added $5,000–$100,000 amount validation; fixed + reworded the consent block.
- **Product:** removed "not a renovation loan"; repayments now "fortnightly or monthly";
  Gino purpose framing; comparison rate ≈ 21.3% (was placeholder).
- **FAQ:** removed "or are buying"; replaced eligibility answer; repayments "monthly or
  fortnightly"; comparison rate updated.
- **Legal:** Credit Guide rebuilt with the full handed-over draft; **264 George Street**
  correction applied to the Credit Guide and all other legal contact blocks.

## Before going live — still to confirm
- **Comparison rate (≈ 21.3% p.a.):** drafted on a $30,000 / 5-year example with the
  $1,130 establishment + $24.50 monthly fees. **Indicative only** — counsel must confirm
  the prescribed example, the method and the final figure before publication.
- **Apply page → RenoNow FormStack:** the application structure is in place but the field
  names/order must be mirrored from the existing RenoNow FormStack form so submissions
  populate correctly. Wire the live integration where `apply.js` / `eligibility.js` carry
  the `TODO: wire to Formstack (medipay.formstack.com) + ActiveCampaign CRM` marker.
- **Legal pages** remain drafts pending final legal sign-off.

## Fonts
Loaded from Google Fonts at runtime (Fraunces, Hanken Grotesk, JetBrains Mono).
