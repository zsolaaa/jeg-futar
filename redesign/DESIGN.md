# Jég Futár — Glacier Editorial

Teljes redesign. Önálló, build nélküli statikus oldal: `redesign/` mindent tartalmaz,
ami a futáshoz kell. Az eredeti oldal a repo gyökerében érintetlen maradt.

---

## Irány

**Glacier Editorial** — sötét, hideg, tipográfia-vezérelt luxus.

A célközönség bár, étterem, rendezvény: esti közeg. A sötét alap ehhez illeszkedik,
a jeges akcentus és a nagy szerif display pedig a „kristálytiszta, prémium" ígéretet
viszi. Nem trendkövető glassmorphism-demó: a hatás a tipográfiából, a térből és a
finom rétegekből jön.

| Tengely | Döntés |
|---|---|
| Alapmód | Sötét (dark-first), teljes világos párral |
| Display | Fraunces variable — optikai méret 144, WONK 1 |
| UI / body | Inter Tight |
| Metaadat / szám | JetBrains Mono, tabular figures |
| Akcentus | Glacier ice-blue, `oklch(83% 0.105 212)` |
| Másodlagos | Brass / champagne, `oklch(85% 0.098 82)` — ritkán, kiemelésre |
| Sűrűség | Standard (4pt ritmus) |
| Mozgás | Standard — scroll reveal, sorfeltárás, magnetikus CTA |

### Miért nem a motor alapjavaslata

A `ui-ux-pro-max --design-system` Amatic SC / Cabin párost javasolt (craft/artisan
profil). Kézműves termékhez jó, prémium vendéglátói beszállítóhoz nem: az Amatic SC
kézírásos display, ami pont az ellenkezőjét kommunikálja. A navy+gold luxus-palettát
viszont megtartottuk, csak jégkékre hangolva.

---

## Token réteg

Minden szín `oklch()`-ban, szemantikus néven. `assets/css/tokens.css`.

A témaváltás a `:root[data-theme]` attribútumon múlik. Három állapot:

1. `data-theme="dark"` — kényszerített sötét
2. `data-theme="light"` — kényszerített világos
3. attribútum nélkül — az OS `prefers-color-scheme` dönt

A választást a `<head>`-ben futó inline script állítja vissza `localStorage`-ból,
még az első festés előtt — így nincs téma-villanás.

### Szemantikus színek

| Token | Szerep |
|---|---|
| `--bg` / `--bg-deep` / `--bg-inset` | lap, mély szekció, süllyesztett felület |
| `--bg-raised` / `--bg-raised-2` | kártya, emelt felület |
| `--text` / `--text-2` / `--text-3` | elsődleges / másodlagos / halvány szöveg |
| `--line` / `--line-strong` | hajszálvonal, hangsúlyos elválasztó |
| `--accent` + `-2` `-deep` `-wash` `-glow` | jégkék akcentus-család |
| `--brass` / `--brass-wash` | meleg ellenpont |
| `--danger` / `--danger-line` | űrlaphiba — témánként külön, WCAG AA miatt |
| `--glass` / `--glass-line` | üveg navigáció |

Mindkét téma külön hangolva: a világos akcentus sötétebb (`oklch(51%)`), hogy fehéren
is meglegyen a 4.5:1. Az invertálás nem elég — külön értékek kellenek.

---

## Tipográfiai rendszer

Három család, mindegyiknek egy dolga van:

- **Fraunces** — `.display-hero`, `.display-xl`, `.display-lg`, `.display`,
  pull quote, nagy számok, wordmark. Változó optikai méret: nagy fokozatnál
  `opsz 144` adja a vékony vonalvezetést.
- **Inter Tight** — minden folyószöveg, gomb, űrlap, `.heading-*`.
- **JetBrains Mono** — `.eyebrow`, `.mono`, címkék, koordináták, lépésszámok.
  Ez a réteg adja a „mért, precíz" érzetet; `tnum` mindenhol bekapcsolva.

Az `em` a display osztályokon dőlt + akcentus színű — ez a kiemelés egyetlen
megengedett módja címsorban.

---

## Komponensek

`assets/css/main.css`, számozott szekciókban.

| Blokk | Osztály |
|---|---|
| Navigáció | `.masthead` → `.nav`, görgetésre `.is-stuck` (üveg pill) |
| Mobil fiók | `.nav__links.is-open` — teljes képernyős, fókuszcsapdával |
| Gombok | `.btn`, `--ghost` `--sm` `--lg` `--block` `--brass` |
| Nyíl-link | `.arrow-link` — aláhúzás jobbról balra rajzolódik |
| Kártya | `.card`, `--glow` (kurzorkövető fény), `--lift`, `--inset` |
| Adatsor | `.spec-list` — kulcs/érték, mono kulccsal |
| Statisztika | `.stat-grid` / `.stat` |
| Lépések | `.steps` / `.step`, `.rail` |
| Harmonika | `.accordion` — `grid-template-rows: 0fr → 1fr` |
| Szalag | `.ticker` — duplázott sáv, végtelen futás, hoverre áll |
| Panel | `.panel` + `.frost-plate` — CSS-ből rajzolt jég-felület |
| Záró CTA | `.closer` + `.phone-display` |
| Lábléc | `.footer` + `.footer__statement` |
| Űrlap | `.form` / `.field` — inline validáció, hibaüzenet a mező alatt |

### Ikonok

Saját SVG sprite minden oldal tetején, `<symbol>` + `<use>`. Nincs emoji, nincs
ikonkönyvtár-függőség. Egységes 1.5 vonalvastagság, kerek végek.

**Fontos:** a `<use>` a szimbólumot árnyék-DOM-ba klónozza, ezért a sprite-ban lévő
szülő `<g>` prezentációs attribútumai *nem* jutnak el az ikonhoz. A stílust a
`.ico, svg:has(use)` CSS szabály adja — ez öröklődik a klónba.

### Márkajel

Az eredeti rajzfilmes maszkot (mosolygó koktélpohár) nem használjuk: nem fér össze
az iránnyal. Helyette geometrikus jégkristály monogram — hat kar, egyenként két
ágpárral, `#jf-arm` definícióból hatszor forgatva. Mellette Fraunces wordmark.

---

## Mozgás

| Réteg | Megoldás |
|---|---|
| Sorfeltárás | `.reveal-lines` > `.line` > `span`, `translateY(110%)` + `overflow:hidden` |
| Blokk-feltárás | `.reveal` → `.is-in`, IntersectionObserver |
| Késleltetés | `--delay` custom property; sorokra JS lépteti 85 ms-enként |
| Magnetikus CTA | `data-magnetic="0.22"` — csak finom mutatónál |
| Hero részecskék | canvas, ~30 sodródó hatszög, DPR max 2 |
| Aurora | 3 CSS blob, 26–38 s drift, mutatóra enyhe parallax |

A feltárás markupból indul (a `.line > span` a HTML-ben van, nem JS wrappeli),
így nincs elrendezés-ugrás. A kezdőállapotot a `.js` osztály kapcsolja be, amit
az inline script tesz a `<html>`-re — JS nélkül minden azonnal látszik.

`prefers-reduced-motion: reduce` esetén: minden animáció kikapcsol, a canvas el sem
indul, a szalag megáll, a feltárt elemek azonnal láthatók.

---

## Hozzáférhetőség

- Kontraszt: `--text` / `--bg` és `--accent` / `--bg` mindkét témában ≥ 4.5:1;
  a hibaszín témánként külön hangolva
- Fókusz: `:focus-visible` 2px gyűrű `--focus` színnel, 3px offsettel
- Érintés: minden interaktív elem ≥ 44px magas (`.btn` min-height 48px)
- Fiók: Escape zár, fókusz bent marad, `aria-expanded` szinkronban
- Űrlap: látható címke, `aria-invalid`, hiba a mező alatt, submitkor az első
  hibás mezőre ugrik a fókusz, a sikerüzenet `role="status"`
- Ugrás a tartalomra link, `aria-current="page"` a navigációban
- Szalag `aria-hidden`, mellette rejtett szöveges megfelelő

---

## Fájlszerkezet

```
redesign/
├── index.html              főoldal
├── termekek.html           termékek & árak
├── kiszallitas.html        kiszállítás
├── huto-kihelyezes.html    hűtő kihelyezés
├── rolunk.html             cégtörténet
├── kapcsolat.html          elérhetőség + űrlap
├── assets/
│   ├── css/tokens.css      színek, típus, tér, mozgás — két téma
│   ├── css/main.css        reset, primitívek, komponensek
│   └── js/main.js          téma, nav, feltárás, canvas, űrlap
└── DESIGN.md
```

Nincs build lépés, nincs npm függőség. A betűtípusok Google Fontsról jönnek.

---

## IA változás

Az eredeti navigáció 4 elem + telefon CTA volt, a Kapcsolat csak a láblécben.
Itt 5 elem: a **Kapcsolat bekerült a főmenübe**, mert az űrlap és a nyitvatartás
önálló belépési pont, láblécből nehezen megtalálható.

A `palyazat.html` hivatkozás kimaradt: az eredeti láblécben szerepelt, de a fájl
nem létezik a repóban. Ha kell, pótolható — addig törött link lett volna.

---

## Ami még hiányzik az éles indulásig

1. **Saját fotók.** Jelenleg minden vizuál CSS-ből rajzolt absztrakció
   (`.frost-plate`, `.product__figure`, `.map-plate`). Ezek szándékosan
   tisztességesek — nem stock-fotót imitálnak —, de valódi termék- és
   üzemfotó sokat dobna rajta.
2. **Űrlap backend.** A `kapcsolat.html` űrlapja validál és sikerállapotot mutat,
   de nem küld sehova. Formspree, Netlify Forms vagy saját PHP endpoint kell.
3. **Árak.** Mindenhol „mennyiség szerint, kérjen ajánlatot" szerepel, mert az
   eredeti oldalon sem volt konkrét ár. Ha van listaár, a `.spec-list` sorokba megy.
4. **Valódi nyitvatartás.** Most „telefonon egyeztetünk" — ha van fix sáv,
   a `kapcsolat.html` `.hours` blokkjában cserélhető.
5. **OG kép.** A meta tagek készen állnak, a kép hiányzik.
