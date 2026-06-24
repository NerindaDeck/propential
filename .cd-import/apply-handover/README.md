# Propential — Apply form handover

A complete, self-contained copy of the Propential **Apply** page and everything it needs to render and behave identically to the live design. Plain HTML / CSS / vanilla JS — **no build step**, no framework, no dependencies. Drop it on any static host (Vercel-ready, see bottom).

---

## 1. What's in here

```
apply-handover/
├─ apply.html              ← the page (open this)
├─ apply.js                ← form engine: renders, validates, conditional logic, persistence, submit
├─ apply-schema.js         ← SINGLE SOURCE OF TRUTH: every field, id, data-fs-id, options, rules
├─ apply-data.js           ← option lists + the 358-item job-title list
├─ propential.css          ← base design system (colour, type, inputs, buttons, nav, footer)
├─ propential-v3.css       ← v3 visual layer (loads after base; nav dock, date/select theming, etc.)
├─ partials.js             ← injects the shared nav + footer into #site-nav / #site-footer
├─ site.js                 ← shared behaviour (mobile nav toggle, reveal-on-scroll, persisted tweaks)
├─ assets/
│  └─ propential_mark.svg  ← logo mark (favicon + nav/footer lockup)
├─ legal/                  ← privacy, credit-guide, terms, tmd, complaints, hardship (consent links)
├─ apply-handover-v0.md    ← backend field map (name → data-fs-id) for the Formstack wiring
├─ apply-fields-reference.md ← FULL field reference: every field's options, rules, formatting, placeholder, helper text
├─ vercel.json             ← static hosting config
└─ README.md               ← this file
```

Load order in `apply.html` (do not change):
`propential.css` → `propential-v3.css` … `partials.js` → `site.js` → `apply-data.js` → `apply-schema.js` → `apply.js`.

---

## 2. How the form is built (important)

The form is **schema-driven**. Nothing about a field is hard-coded in the HTML — `apply.html` contains only the page shell (nav, header, the stepper rail, an empty `#wizSteps` container, the nav buttons). At load, `apply.js` reads `APPLY_SCHEMA` (from `apply-schema.js`) and **renders every step and field into the DOM**.

That means: **to change a label, option, order, validation rule, or conditional, edit `apply-schema.js` — not the HTML.** The same schema also drives validation, the show/hide logic, localStorage persistence, the submit payload, and the backend handover doc, so they can never drift apart.

### The schema shape
```js
window.APPLY_SCHEMA = {
  steps: [ { key, title, eyebrow, blurb, fields: [ …field objects… ] }, … ],  // 10 steps
  consents: { consentPrivacy: { heading, value, display?, bullets? }, … },     // verbatim values
  tracking: [ { v, fs, param? , value? }, … ]                                  // hidden inputs
};
```

### A field object
| key | meaning |
|---|---|
| `t` | control type: `text` `email` `tel` `date` `num` `money` `radio` `select` `multi` `typeahead` `address` `toggle` `consent` `subhead` `group` |
| `v` | variable = the input's `id` **and** `name` |
| `fs` | the Formstack field id, rendered as `data-fs-id` |
| `l` | label / question text |
| `o` | options (array, or `'@LIST'` to pull from `apply-data.js`) |
| `req` | required (only enforced while visible) |
| `show` | array of conditions; field is visible only if **all** pass |
| `half` / `w` | layout width (see §4) |
| `hint` / `note` | helper text under the field |
| `ph` | placeholder |
| `min` `max` `digits` `digitsRange` `gte` `kind` | validation (see §5) |

### Condition objects (`show`)
```
{ f:'employment', eq:'Self-employed' }     parent equals
{ f:'dependants', in:['2','3','4 or more'] } parent is one of
{ f:'employment', notIn:['Retired', …] }   parent is none of
{ f:'addCl2', on:true }                     parent checkbox is checked
```
A field is shown only when **every** condition passes. Hidden fields are cleared and skipped by validation. Visibility cascades (a child of a hidden block stays hidden), re-evaluated on every change.

---

## 3. The 10 steps

1. **Purpose** — purpose, project type (multi), amount, preferred term
2. **Your details** — title / first / middle / last (one row), DOB / email / mobile (one row), joint applicant
3. **Employment** — status, conditional employee vs self-employed blocks, job-title type-ahead
4. **Home address** — address (progressive), tenure, previous address, ownership, home value, mortgage, relationship
5. **Your property** — is-home toggle, property address, on-title, rental income, loan, value
6. **Income** — salary (min $25k), pay frequency, Centrelink (×3 repeat), other income (×3 repeat)
7. **Expenses & commitments** — living expenses, spouse %, rent/mortgage, adverse-change
8. **Assets & liabilities** — investment property (×3), assets (×4), credit cards (×5), other debt (×5)
9. **Identity & verification** — licence, Medicare, dependants (×4 ages)
10. **Declarations & consents** — 7 consent checkboxes + "Confirm all declarations"

Plus hidden tracking inputs (`utmSource/Medium/Content/Campaign`, `gclid`, `productName="Reno Now"`).

---

## 4. Layout, styling & responsiveness

- **Brand tokens** live in `propential.css` `:root` (ink/olive/champagne/ivory palette, Fraunces display + Hanken Grotesk body fonts, radii, lines). `propential-v3.css` adds the mono accents, floating nav dock, and dark date/select theming.
- **Step rail (the stepper):** a sticky vertical rail on desktop (`.wiz-rail`, `position:sticky; top:96px`) listing all 10 steps with the current one highlighted and completed ones checked. On screens ≤ 820px it collapses to a compact "Step N of 10 + progress bar" header (`.wiz-head--m`). Clicking a step jumps to it; advancing scrolls back to the top.
  - **Note:** the page uses `overflow-x: clip` (not `hidden`) on `html, body` so the sticky rail works — `hidden` turns an ancestor into a scroll container and breaks `position:sticky`.
- **Field grid:** a 12-column grid. `span-2` = full width (12), default `.field` = half (6), `col-3` = quarter, `col-4` = third. Breakpoints: ≤720px collapses quarters/thirds to halves; ≤560px everything stacks to one column.
- **Vertical rhythm:** a flat 22px gap between every question (flex `gap` on `.wiz-step__body` + grid `row-gap`), so spacing is uniform across all steps.
- **Money fields:** `$` prefix, live thousands-separator formatting as you type, `0` placeholder.
- **Number/text caps:** digit-limited fields (ABN 11, Medicare 11, postcode 4) hard-stop at their max and reject non-digits.
- **Addresses (progressive):** only the street line shows first; line 2 / suburb / state / postcode appear once the street has content (and the Google Places autocomplete, if a key is supplied, fills all five).
- **Dropdowns:** "Select…" is a disabled, hidden placeholder (never a selectable option); option list themed to brand where browsers allow.
- **Consents:** titles white, explainer/bullet text `#a7a399`, page references rendered as links, smaller (17px) checkboxes.

---

## 5. Validation rules

Per-step on **Continue**; the whole form re-validates on **Submit** (jumping to the first invalid step). Conditional fields validate only while visible.

- required; email format; AU mobile `04xxxxxxxx`; DOB ≥ 18; Medicare expiry must be a future date
- `min` / `max` on money (amount **$5,000–$175,000**; income **min $25,000**)
- `digits` exact / `digitsRange` (Medicare 10–11) / postcode 4
- `gte` cross-field (total expenses ≥ general expenses)
- type-ahead must resolve to an exact list item

---

## 6. Behaviour

- **Progress is saved** to `localStorage` (`propential_apply_v2`) and restored on return; cleared on successful submit.
- **Auto-fill:** when "Is your home address the property…" = **Yes**, the property value auto-populates from the home value; the renovation address copies the home address at submit.
- **Dynamic term:** 1–7 years for amounts ≤ $50k, up to 10 years above (rebuilds as the amount changes).
- **Submit is front-end only** — it collects all fields into one object keyed by `name`, `console.log`s it, and shows the success screen. **It posts nowhere.** See `apply-handover-v0.md` for the Formstack mapping needed to wire it up.

### Google Places (optional)
Address autocomplete is dormant until a Maps key is supplied — either
`<meta name="google-maps-key" content="YOUR_KEY">` in `<head>`, or `window.PROPENTIAL_MAPS_KEY = '…'` before `apply.js`. Without a key the five address inputs are ordinary, fully-usable text fields.

---

## 7. Deploy to Vercel

This is a static site — no build command, no framework preset.

**Option A — drag & drop:** zip/upload this folder at vercel.com → New Project → it serves as-is.

**Option B — CLI:**
```bash
npm i -g vercel
cd apply-handover
vercel            # preview
vercel --prod     # production
```
When asked: **Framework Preset = Other**, **Build Command = (none)**, **Output Directory = ./**.

`vercel.json` (included) sets `cleanUrls` (so `/apply` works without `.html`) and basic caching for css/js/svg. The page lives at `/apply.html` (or `/apply` with cleanUrls).

> To embed only the form inside an existing site instead of shipping the whole page, lift the `<form id="applyForm">…</form>` shell from `apply.html`, keep the `apply-styles` `<style>` block, and load `apply-data.js` + `apply-schema.js` + `apply.js`. The form needs `propential.css` + `propential-v3.css` for its look.
