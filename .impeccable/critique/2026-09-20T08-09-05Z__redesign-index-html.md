---
target: index.html
total_score: 24
max_score: 36
na_heuristics: 9
p0_count: 0
p1_count: 3
target_identity: "file:B:\\ClaudeDesing\\jegfutar\\redesign\\index.html"
target_fingerprint: "sha256:8877abfa8eb8907a6637fced073cb809f70ed3f2a372342eb93c12f36c318b78"
target_path: "B:\\ClaudeDesing\\jegfutar\\redesign\\index.html"
timestamp: 2026-09-20T08-09-05Z
slug: redesign-index-html
---
## Method: dual-agent (A: design review · B: detector + böngésző-evidencia)

Cél: `redesign/index.html` · Mód: **Persuade** · Vizuális autoritás: Glacier Editorial (`redesign/DESIGN.md`)

## Design Health Score

| # | Heurisztika | Pont | Kulcsprobléma |
|---|---|---|---|
| 1 | Rendszerállapot láthatósága | 3 | Nav-, harmonika- és témaállapot tiszta; nincs "most hívható-e" jelzés |
| 2 | Rendszer ↔ valóság egyezése | 3 | Closer `Ma szállítunk.` ellentmond a GYIK-nek ("Sok esetben aznap is") |
| 3 | Felhasználói kontroll és szabadság | 2 | Mobil fiók nem viszi be a fókuszt, Escape után nem adja vissza (activeElement végig BODY) |
| 4 | Konzisztencia és szabványok | 2 | 3 szerződésszegés a DESIGN.md-hez: nincs fókuszcsapda, 20/32 elem <44px, footer statement szürke |
| 5 | Hibamegelőzés | 2 | Magnetikus elsődleges CTA, definiálatlan kiszállítási terület, nincs nyitvatartás |
| 6 | Felismerés a felidézés helyett | 3 | Telefonszám 6x a dokumentumban, mobilon görgetés közben 0x látható |
| 7 | Rugalmasság és hatékonyság | 2 | Visszatérő heti B2B vevő; mobilon 3 interakció a hívásig |
| 8 | Esztétikai és minimalista design | 4 | 3 betűcsalád fegyelmezett szereposztással, valós 2,5-4,9x hierarchia, 4pt ritmus |
| 9 | Hibafelismerés és -javítás | n/a | Nincs input/validáció/hibaállapot a főoldalon (űrlap a kapcsolat.html-en) |
| 10 | Súgó és dokumentáció | 3 | GYIK jól célzott, de a lap 88%-ánál, és 2 kulcskérdésre "hívjon" a válasz |
| **Összesen** | | **24/36** | **Közepes-jó — erős kivitel, gyenge bizonyíték** |

## Design Specificity Verdict

Nem cserélhető ki — de a NYELV authored, a BIZONYÍTÉK nem.

Authored: a manifesztó ("Ha elfogy, megáll a pult"), a valódi szegedi koordináta a hero__coords-ban, a termékleírások használati szótára, a hűtő kihelyezés szezon-ritmusa.

Kategória-sablon: a stat-grid "2 — Terméktípus" cellája, a ticker hat ismételt állítása, és a Folyamat szekció (szó szerinti duplikátum a kiszallitas.html-ből).

Legnagyobb interchangeability-pont: 0 db img elem az egész oldalon. Nulla partnernév, arc, referencia.

Deterministic scan: 71 statikus / 95 futásidejű találat, a többség hamis pozitív.
- 38 x low-contrast: a detektor a sötét téma színeit fehér háttérrel párosította. Élőben: body 10,54:1 / 8,51:1, akcentus 12,47:1 / 4,86:1 — mind AA.
- flat-type-hierarchy: clamp() feloldatlan; valós hierarchia 2,5-4,9x.
- 20 x cramped-padding: minden konténer a gyerekének delegálja a belső teret.
- tight-leading / all-caps-body / overused-font: display-tipográfia, 11px mono koordináta-címke, 22% Fraunces.

Jogos találatok, amiket az A ág nem látott:
- layout-transition: .masthead transition: padding (main.css:348) — layout-animáció scroll-váltáskor.
- clipped-overflow-container x5: .card, .product__figure, .panel.
- dark-glow: hover-only akcentus-glow.
- kicker-above-heading x6: hat .eyebrow kicker h2-k fölött.

Overlay: injekció sikerült (detect.js a localhost:8400-ról, konzol "[impeccable] 95 anti-patterns found"). Az overlay-szerver leállítva; élő overlay nincs.

## Overall Impression

Szépen megírt oldal, ami nem mutatja meg a saját termékét. A tipográfiai kivitel és a mozgásrendszer mérnöki minősége kiemelkedő (nincs CLS, canvas leáll, reduced-motion teljes, konzol tiszta, minden kérés 200). A baj bizonyítási: ár, időpont, terület, fotó, referencia — egyik sincs. A telefonszám mobilon a görgetés 83%-án nem elérhető.

Legnagyobb lehetőség: egy valódi makrófotó + kiírt településlista többet emelne a konverzión, mint bármilyen további tipográfiai csiszolás.

## What's Working

1. A manifesztó tipográfiai és szemantikai egysége — a mondat fordulópontja egyben a színkontraszt fordulópontja.
2. A hűtő kihelyezés panel CTA-párja — két tudásszintet szolgál ki redundancia nélkül.
3. A feltárási rendszer mérnöki tisztasága — markupból induló sorfeltárás, nincs horizontális scroll 375px-en, nincs konzolhiba.

## Priority Issues

### [P1] Mobilon a görgetés 83%-án nincs hívógomb
.nav__cta-desktop display:none a max-width:1000px blokkban. Telefonszám a heróban (0-964px), majd a closerben (8099px) — közte ~7100px-en semmi. A nav__tail egyetlen elsődleges akciója egy hold-ikon.
Fix: mobilon a theme-toggle helyére ikonos .btn--sm telefongomb (téma a fiókba), vagy fixed bottom hívósáv env(safe-area-inset-bottom)-mal.
Parancs: /impeccable adapt

### [P1] Nulla bizonyíték: nincs jég, nincs vevő, nincs terület, nincs időpont
(a) 0 db img; (b) nulla referencia/arc; (c) "Szeged és környéke" sehol nincs településnévvel kitöltve; (d) kapcsolat.html .hours mindkét sora "Telefonon egyeztetünk".
Fix: makrófotó a product__figure helyére; a "2 — Terméktípus" cella cseréje valódi számra; kiírt településlista; konkrét idősáv a closer__meta-ba.
Parancs: /impeccable bolder

### [P1] A mobil fiók akadálymentessége nem tartja a DESIGN.md ígéretét
Fókusz nem kerül be nyitáskor (activeElement BODY), nincs role=dialog / aria-modal / inert, Escape után nincs fókusz-visszaadás. Háttérgörgetés-zár viszont működik. 20/32 interaktív elem <44px desktopon (.footer__link 24px, .arrow-link 33,6px, .theme-toggle 40px), 15/33 mobilon.
Fix: fókuszmozgatás + inert + visszaadás; min-height 44px a footer- és arrow-linkeken, 44px theme-toggle.
Parancs: /impeccable audit

### [P2] A "Részletek és árak" olyat ígér, ami nem létezik — és a closer ellentmond a GYIK-nek
Nulla számszerű ár a 0 Ft kiszállításon kívül. Closer: "Ma szállítunk." vs GYIK: "Sok esetben aznap is tudunk szállítani."
Fix: sávos árindikáció vagy őszinte linkszöveg; a két szállítási állítás közül az egyiket törölni.
Parancs: /impeccable clarify

### [P2] Három vizuális hiba a két legfontosabb tipográfiai pillanatban
(a) .line padding-bottom 0.08em vs Fraunces ~0,24em leszáró → a hero mindhárom sorában sérül a leszáró szár (jég, ingyen, egész). (b) A hero 1008px/964px magas 900px/812px viewportban → a 0 Ft / 7 nap / 2018 ténysáv a hajtás alá esik. (c) main.css:1132 .footer__statement span minden leszármazott spant elér → a teljes záró mondat --text-3 szürke.
Fix: .line padding-bottom 0.22em / margin-bottom -0.22em; hero__foot felső margó clamp(1.5rem,4vh,3rem); .footer__statement > .line > span { color: var(--text) } + külön osztály a "Ma."-nak.
Parancs: /impeccable polish

## Persona Red Flags

Kovács Zoltán (koktélbár tulaj, péntek 22:40, egy kézzel, iPhone): a hero meggyőzi, de nem tudja most felveszik-e (nincs nyitvatartás). Görget a válaszért; a ténysáv a hajtás alatt. Ár helyett "kérjen ajánlatot". A GYIK minimum-válasza nem válasz és helyesírási hibát tartalmaz (index.html:732 "időpontól"). Hívni akar: a nav pillben márkajel, hold ikon, hamburger — nincs telefongomb.
Bukó elemek: .nav__cta-desktop display:none / .hours "Telefonon egyeztetünk" / spec-list__val em x2 / index.html:732 / closer-title "Ma szállítunk."

Tóth Anikó (magánszemély, kerti esküvő, laptop): a manifesto__text explicit "A vendéglátásban…" — az első 3000px-en kizárva érzi magát. A Jégdara "Rendezvényekhez" badge működik, de a "Magánszemélyként is rendelhetek?" a GYIK 5., legalsó, összecsukott eleme a lap 88%-ánál. Mennyiségbecslő és ár sehol. JS nélkül ki sem nyithatná: .accordion__panel grid-template-rows: 0fr a bázis-CSS-ben van, nem .js-hez kötve.

Hotel F&B beszerző: ár nincs, határidő bizonytalan, referencia nulla, számlázás/keretszerződés egy szó sem. Egyetlen összehasonlítható adat: 0 Ft kiszállítás. A Hűtő kihelyezés panel az ő nyelvén beszél, de a lap 67%-ánál kezdődik.

## Minor Observations

- .js osztály fragilitása: az inline script feltétel nélkül felteszi, a .js .reveal { opacity: 0 } 34 elemet rejt el → main.js hiba esetén a tartalom ~80%-a láthatatlan marad. Nincs no-js fallback.
- .masthead transition: padding (main.css:348) — layout-animáció.
- data-magnetic="0.22" egy 58px-es konverziós gombon ±20-25px elmozdulás.
- 11px mono címkék hat helyen (--t-mono 0.6875rem); 12px egyetlen token-változtatás.
- Hat .eyebrow kicker h2-k fölött.
- aria-labelledby="manifesto-title" egy p.eyebrow-ra mutat.
- (c) 2026 hardkódolva.
- Két azonos "Részletek és árak" link horgony nélkül.
- scroll-behavior: smooth globálisan egy 9656px magas mobiloldalon.
- A Folyamat szekció ~637px-et használ a kiszallitas.html duplikátumára.

## Questions to Consider

1. Melyik igaz: "Ma szállítunk" vagy "Sok esetben aznap is"? Az egyiket meg kell ölni.
2. Mit veszítenétek egy ártól-ig sávval? A mostani állapot a legjobban fizető vevőt szűri ki.
3. Miért van a téma-kapcsoló a mobil navigáció elsődleges helyén a telefonszám helyett?
4. Mit jelentene egy valódi fotó? Az editorial irány pont a fotóból él; a hely be van tervezve, csak üresen áll.
5. Kinek szól az oldal — a bárnak vagy Anikónak?
