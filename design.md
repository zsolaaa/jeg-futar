# Design — Jég Futár

A locked design system for the Jég Futár website redesign (jeg-futar.hu).
Every page redesign reads this file before emitting code. Do not regenerate per page.

## Genre
modern-minimal

## Theme
Custom — **jég-prémium**
Vibe: kristálytiszta · megbízható · hideg frissesség · helyi minőség

| Token | Value | Note |
|---|---|---|
| `--color-paper` | `oklch(97% 0.006 220)` | jég-fehér, alig észrevehető hideg tónus |
| `--color-paper-2` | `oklch(93% 0.010 215)` | halvány jégkék szekció-háttér |
| `--color-paper-dark` | `oklch(14% 0.018 235)` | sötét szekciókhoz, footer |
| `--color-ink` | `oklch(12% 0.015 235)` | hideg közel-fekete |
| `--color-ink-2` | `oklch(42% 0.010 228)` | másodlagos szöveg |
| `--color-rule` | `oklch(87% 0.009 218)` | finom elválasztó |
| `--color-accent` | `oklch(52% 0.22 228)` | mély prémium kék-cián |
| `--color-focus` | `oklch(60% 0.25 258)` | fókuszgyűrű |

## Typography
- Display: **Geist** 800, tight tracking (-0.03em to -0.05em at large sizes)
- Body: **Geist** 400/500
- Wordmark: **Fraunces** 600 — wordmark csak (max 2 instance)
- Scale: major third (1.25), base 16px

## Macrostructure family
- **Homepage** (index.html): Stat-Led (04) — "0 Ft kiszállítási díj" hero stat
- **Service pages** (kiszallitas.html, huto-kihelyezes.html): Split Studio (15) — alternating diptych
- **Products & Pricing** (termekeink.html): Catalogue (11) — product card grid
- **About** (rolunk.html): Long Document (02) — founder narrative prose
- **Contact** (kapcsolat.html): Minimal form

## Navigation
N5 Floating pill — wordmark + 4 links + telefon CTA pill
Content: Termékek · Kiszállítás · Hűtő kihelyezés · Rólunk + [+36 70 606 6181]

IA change: 7 nav item → 4 + telefon CTA (Főbb partnereink → főoldal section, Pályázat → footer link)

## Footer
Ft5 Statement — "Friss jég. Szegeden. Ma."
Wordmark + links + telefon + email + copyright beneath the statement line.

## Motion
- Page-load: fade-up stagger (--i CSS custom property, max 500ms total)
- Hover: `translateY(-1px)` on CTAs, color shift on links
- Reduced motion: opacity-only, 150ms

## CTA voice
- Primary: filled pill, accent background, phone number or main action
- Secondary: outlined pill, accent border+text
- Typographic: link-arrow with `→`, accent color, border-bottom on hover

## What pages share
- Wordmark (Fraunces 600)
- Accent color and footprint (≤ 5% per viewport)
- Geist body font
- CTA shapes (pill + link-arrow)
- Nav + footer components

## IA (original → new)
Original 7 nav items: Termékeink · Áraink · Kiszállítás · Hűtő kihelyezés · Főbb partnereink · Pályázat · Kapcsolat
New: Termékek · Kiszállítás · Hűtő kihelyezés · Rólunk + [telefon CTA]
- Áraink merged into Termékek page
- Partnereink → szekció a főoldalon
- Pályázat → footer link
- Kapcsolat → telefon a navban

## Design axes
paper-band: light · display-style: geometric-sans · accent-hue: cool (228°)
