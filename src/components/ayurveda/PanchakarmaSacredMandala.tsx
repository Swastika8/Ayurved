import { useState, useId } from "react";
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export interface PanchakarmaSymbol {
  id: string;
  name: string;
  sanskrit: string;
  sanskritTitle: string;
  dosha: string;
  organ: string;
  cx: number;
  cy: number;
  marmaTarget: { x: number; y: number };
  color: string;
  accent: string;
  rotationDuration: number;
  reverse?: boolean;
  glyph: (idPrefix: string) => React.ReactNode;
  summary: string;
}

const THERAPY_SYMBOLS: PanchakarmaSymbol[] = [
  {
    id: "nasya",
    name: "Nasya",
    sanskrit: "नस्य कर्म",
    sanskritTitle: "नासा हि शिरसो द्वारम्",
    dosha: "Kapha & Prana Vata",
    organ: "Cranial & Sinus Srotas",
    cx: 400,
    cy: 78,
    marmaTarget: { x: 400, y: 195 }, // Head / Ajna
    color: "#C99A52",
    accent: "#EFE9D8",
    rotationDuration: 45,
    summary: "Nose is the gateway to the cranium. Herbal drops purge deep-seated toxins from sensory & brain faculties.",
    glyph: (p) => (
      /* Nasya: Consecrated falling drop into eight-petaled cranial prana lotus */
      <g>
        <circle cx="0" cy="0" r="28" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        {/* Eight radiating petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <path
            key={deg}
            d="M0 0 C-4 -12 -3 -22 0 -26 C3 -22 4 -12 0 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            transform={`rotate(${deg})`}
          />
        ))}
        {/* Central sacred golden drop */}
        <path
          d="M0 -10 C-6 -2 -6 6 0 9 C6 6 6 -2 0 -10 Z"
          fill="url(#goldGradient)"
          stroke="#B58A45"
          strokeWidth="0.8"
        />
        <circle cx="0" cy="0" r="2" fill="#164C35" />
      </g>
    ),
  },
  {
    id: "vaman",
    name: "Vaman",
    sanskrit: "वमन कर्म",
    sanskritTitle: "वमनं श्लेष्महराणाम्",
    dosha: "Kapha Root Purge",
    organ: "Chest, Lungs & Stomach",
    cx: 640,
    cy: 175,
    marmaTarget: { x: 400, y: 275 }, // Upper Torso / Anahata
    color: "#879C78",
    accent: "#164C35",
    rotationDuration: 52,
    summary: "Physiological elimination of aggravated Kapha and deep mucus toxins through the upper gastric pathway.",
    glyph: (p) => (
      /* Vaman: Upward ascending spiral bio-purification vortex */
      <g>
        <circle cx="0" cy="0" r="28" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <path
            key={deg}
            d="M0 -6 C10 -6 18 -14 20 -22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            transform={`rotate(${deg})`}
          />
        ))}
        <circle cx="0" cy="0" r="8" fill="none" stroke="#C99A52" strokeWidth="1.2" />
        <circle cx="0" cy="0" r="3" fill="#164C35" />
      </g>
    ),
  },
  {
    id: "snehapan",
    name: "Snehapan",
    sanskrit: "स्नेहपान",
    sanskritTitle: "स्नेहो मृदुकरो देहे",
    dosha: "Tridosha Balance",
    organ: "All 7 Deep Dhatus",
    cx: 690,
    cy: 395,
    marmaTarget: { x: 400, y: 350 }, // Solar plexus / Manipura
    color: "#C99A52",
    accent: "#B86F4A",
    rotationDuration: 48,
    reverse: true,
    summary: "Progressive intake of warm medicated ghee to saturate cellular membranes and liquefy lipophilic toxins.",
    glyph: (p) => (
      /* Snehapan: Ghee vessel stream into triple radiant agni flame */
      <g>
        <circle cx="0" cy="0" r="28" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.6" />
        {/* Consecrated Uruli vessel outline */}
        <ellipse cx="0" cy="8" rx="16" ry="6" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M-16 8 C-14 18 14 18 16 8" fill="none" stroke="currentColor" strokeWidth="1.2" />
        {/* Rising Agni flames */}
        <path d="M0 6 C-4 -4 0 -14 0 -22 C0 -14 4 -4 0 6 Z" fill="url(#goldGradient)" opacity="0.8" />
        <path d="M-6 4 C-8 -2 -4 -8 -6 -14 C-4 -9 -2 -3 -6 4 Z" fill="#C99A52" opacity="0.6" />
        <path d="M6 4 C8 -2 4 -8 6 -14 C4 -9 2 -3 6 4 Z" fill="#C99A52" opacity="0.6" />
      </g>
    ),
  },
  {
    id: "vasti",
    name: "Vasti",
    sanskrit: "बस्ति कर्म",
    sanskritTitle: "बस्तिर्वातहराणां श्रेष्ठः",
    dosha: "Supreme Vata Cure",
    organ: "Colon & Bone Matrix",
    cx: 560,
    cy: 620,
    marmaTarget: { x: 400, y: 440 }, // Pelvic / Muladhara
    color: "#B58A45",
    accent: "#164C35",
    rotationDuration: 56,
    summary: "The queen of Ayurvedic purifications. Eradicates 80+ chronic neurological, joint, and chronic Vata imbalances.",
    glyph: (p) => (
      /* Vasti: Classical brass Basti Netra spout surrounded by sacred geometry */
      <g>
        <circle cx="0" cy="0" r="28" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        {/* Quad lotus anchors */}
        {[0, 90, 180, 270].map((deg) => (
          <path
            key={deg}
            d="M0 -28 C-5 -22 -5 -16 0 -12 C5 -16 5 -22 0 -28 Z"
            fill="currentColor"
            opacity="0.4"
            transform={`rotate(${deg})`}
          />
        ))}
        {/* Stylized Netra nozzle & urn */}
        <path d="M0 -18 L0 12 M-5 -6 L5 -6 M-8 4 L8 4" stroke="#C99A52" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="0" cy="-18" r="3" fill="#164C35" />
      </g>
    ),
  },
  {
    id: "virechan",
    name: "Virechan",
    sanskrit: "विरेचन कर्म",
    sanskritTitle: "विरेचनं पित्तहराणाम्",
    dosha: "Pitta Root Purge",
    organ: "Liver, Gallbladder & Gut",
    cx: 240,
    cy: 620,
    marmaTarget: { x: 400, y: 380 }, // Lower Abdomen / Svadhisthana
    color: "#B86F4A",
    accent: "#C99A52",
    rotationDuration: 46,
    summary: "Controlled herbal purgation to expel vitiated bile, cellular inflammation, and accumulated metabolic heat.",
    glyph: (p) => (
      /* Virechan: Twelve-spoked bio-purification wheel */
      <g>
        <circle cx="0" cy="0" r="28" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <line
            key={deg}
            x1="0"
            y1="-26"
            x2="0"
            y2="-16"
            stroke="currentColor"
            strokeWidth="1.2"
            transform={`rotate(${deg})`}
          />
        ))}
        <circle cx="0" cy="0" r="14" fill="none" stroke="#B86F4A" strokeWidth="1.2" />
        <circle cx="0" cy="0" r="6" fill="#C99A52" opacity="0.7" />
      </g>
    ),
  },
  {
    id: "swedan",
    name: "Swedan",
    sanskrit: "स्वेदन",
    sanskritTitle: "स्वेदघ्नो गौरवनिग्रहः",
    dosha: "Kapha & Vata",
    organ: "Microscopic Srotas",
    cx: 110,
    cy: 395,
    marmaTarget: { x: 400, y: 330 }, // Core Srotas
    color: "#879C78",
    accent: "#0D3324",
    rotationDuration: 50,
    reverse: true,
    summary: "Herbal steam sudation that dilates 10,000+ Srotas, liquifying hardened toxins so they easily flow to the gut.",
    glyph: (p) => (
      /* Swedan: Triple curving botanical steam wisps from cedar apothecary kettle */
      <g>
        <circle cx="0" cy="0" r="28" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.5" />
        {/* Three S-shaped rising steam plumes */}
        {[-8, 0, 8].map((offset, i) => (
          <path
            key={i}
            d={`M${offset} 16 C${offset - 6} 6, ${offset + 6} -4, ${offset - 2} -18`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        ))}
        <ellipse cx="0" cy="18" rx="14" ry="4" fill="none" stroke="#C99A52" strokeWidth="1.2" />
      </g>
    ),
  },
  {
    id: "abhyang",
    name: "Abhyang",
    sanskrit: "अभ्यङ्ग",
    sanskritTitle: "स जराश्रमवातहा",
    dosha: "Vata Pacification",
    organ: "Skin & 107 Marma Points",
    cx: 160,
    cy: 175,
    marmaTarget: { x: 400, y: 300 }, // Full Body / Hridaya
    color: "#C99A52",
    accent: "#164C35",
    rotationDuration: 42,
    summary: "Rhythmic synchronization massage with warm medicated oils along energy pathways to quiet the nervous system.",
    glyph: (p) => (
      /* Abhyang: Symmetrical hands radiating healing prana around central oil pearl */
      <g>
        <circle cx="0" cy="0" r="28" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
        {/* Sacred geometric oval leaves */}
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <ellipse
            key={deg}
            cx="0"
            cy="-15"
            rx="5"
            ry="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            transform={`rotate(${deg})`}
          />
        ))}
        <circle cx="0" cy="0" r="7" fill="url(#goldGradient)" />
      </g>
    ),
  },
];

interface PanchakarmaSacredMandalaProps {
  selectedTherapyId?: string;
  onSelectTherapy?: (id: string) => void;
}

export function PanchakarmaSacredMandala({
  selectedTherapyId = "nasya",
  onSelectTherapy,
}: PanchakarmaSacredMandalaProps) {
  const [activeId, setActiveId] = useState<string>(selectedTherapyId);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const gradientId = useId();

  const currentTherapy =
    THERAPY_SYMBOLS.find((s) => s.id === (hoveredId || activeId)) || THERAPY_SYMBOLS[0]!;

  const handleSelect = (id: string) => {
    setActiveId(id);
    onSelectTherapy?.(id);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto py-8 select-none">
      {/* 1. Interactive Master Sacred Installation */}
      <div className="relative w-full aspect-[4/3] max-h-[820px] mx-auto flex items-center justify-center">
        <svg
          viewBox="0 0 800 720"
          className="w-full h-full overflow-visible drop-shadow-2xl"
          aria-label="Classical Panchakarma Mandala: The Seven Biological Purifications"
        >
          <defs>
            {/* Linear Gold Sheen */}
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F3E5AB" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#996515" />
            </linearGradient>

            {/* Radiant Sun Halo Radial Gradient */}
            <radialGradient id={`sunHalo-${gradientId}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.45" />
              <stop offset="45%" stopColor="#C99A52" stopOpacity="0.22" />
              <stop offset="75%" stopColor="#B58A45" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#F7F3E8" stopOpacity="0" />
            </radialGradient>

            {/* Prana Connection Pulse */}
            <linearGradient id={`pulseLine-${gradientId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#164C35" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* LAYER A: GOLDEN BREATHING RAYS & SACRED HALO (BEHIND FIGURE) */}
          <g className="origin-[400px_350px] animate-[panchaRayBreathe_9s_ease-in-out_infinite]">
            {/* Soft Ambient Golden Sun Glow */}
            <circle cx="400" cy="350" r="280" fill={`url(#sunHalo-${gradientId})`} />

            {/* Concentric Delicate Golden Geometric Rings */}
            <circle cx="400" cy="350" r="240" fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.35" />
            <circle cx="400" cy="350" r="200" fill="none" stroke="#C99A52" strokeWidth="1" opacity="0.45" strokeDasharray="4 6" />
            <circle cx="400" cy="350" r="160" fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.55" />
            <circle cx="400" cy="350" r="120" fill="none" stroke="#B58A45" strokeWidth="1" opacity="0.4" strokeDasharray="2 4" />

            {/* Radiating 48 Thin Golden Sunburst Rays */}
            {Array.from({ length: 48 }).map((_, i) => {
              const angle = (i * 360) / 48;
              const rad = (angle * Math.PI) / 180;
              const innerR = i % 2 === 0 ? 130 : 155;
              const outerR = i % 4 === 0 ? 255 : 235;
              const x1 = 400 + innerR * Math.cos(rad);
              const y1 = 350 + innerR * Math.sin(rad);
              const x2 = 400 + outerR * Math.cos(rad);
              const y2 = 350 + outerR * Math.sin(rad);
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#D4AF37"
                  strokeWidth={i % 4 === 0 ? "1" : "0.5"}
                  opacity={i % 2 === 0 ? 0.65 : 0.4}
                />
              );
            })}
          </g>

          {/* LAYER B: GENTLY SWAYING SACRED BOTANICAL LOTUS BASE */}
          <g className="origin-[400px_560px] animate-[panchaLotusSway_7s_ease-in-out_infinite]">
            {/* Outer Broad Lotus Petals */}
            <path
              d="M330 575 C350 595 450 595 470 575 C450 585 350 585 330 575 Z"
              fill="#879C78"
              opacity="0.6"
            />
            {/* Middle Golden Tier Petals */}
            <path
              d="M310 565 C345 580 380 565 400 585 C420 565 455 580 490 565 C455 575 420 570 400 578 C380 570 345 575 310 565 Z"
              fill="url(#goldGradient)"
              opacity="0.8"
            />
            {/* Central Pedestal Lotus Disc */}
            <ellipse cx="400" cy="565" rx="55" ry="8" fill="#164C35" stroke="#D4AF37" strokeWidth="1.5" />
          </g>

          {/* LAYER C: PRANA LIFELINE TO ACTIVE/HOVERED THERAPY MARMA */}
          {currentTherapy && (
            <g className="transition-all duration-500">
              <line
                x1={currentTherapy.cx}
                y1={currentTherapy.cy}
                x2={currentTherapy.marmaTarget.x}
                y2={currentTherapy.marmaTarget.y}
                stroke={`url(#pulseLine-${gradientId})`}
                strokeWidth="1.8"
                strokeDasharray="4 4"
                className="animate-[dash_20s_linear_infinite]"
              />
              {/* Marma Pulsing Beacon */}
              <circle
                cx={currentTherapy.marmaTarget.x}
                cy={currentTherapy.marmaTarget.y}
                r="7"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="1.5"
                className="animate-ping"
              />
              <circle
                cx={currentTherapy.marmaTarget.x}
                cy={currentTherapy.marmaTarget.y}
                r="4.5"
                fill="#D4AF37"
              />
            </g>
          )}

          {/* LAYER D: THE CENTRAL COMPLETELY BLACK HUMAN SILHOUETTE (REMAINS COMPLETELY STILL) */}
          <g id="centralSilhouette">
            {/* 
              Clean, minimal, featureless black upright human silhouette.
              Palms facing outward/forward.
            */}
            <path
              d="
                M400 178
                C391 178 384 186 384 196
                C384 207 391 216 400 216
                C409 216 416 207 416 196
                C416 186 409 178 400 178 Z

                M395 217
                C390 220 382 225 372 232
                C362 239 350 252 344 268
                C338 284 332 304 326 328
                C323 340 318 354 316 364
                C314 374 313 382 316 385
                C319 388 325 385 328 376
                C332 364 336 348 340 334
                C345 316 350 298 356 288
                C360 282 364 280 368 280
                L368 375
                C368 405 370 435 372 460
                L372 560
                C372 563 376 565 380 565
                C386 565 391 563 392 558
                L395 440
                L398 440
                L398 558
                C399 563 404 565 410 565
                C414 565 418 563 418 560
                L418 460
                C420 435 422 405 422 375
                L422 280
                C426 280 430 282 434 288
                C440 298 445 316 450 334
                C454 348 458 364 462 376
                C465 385 471 388 474 385
                C477 382 476 374 474 364
                C472 354 467 340 464 328
                C458 304 452 284 446 268
                C440 252 428 239 418 232
                C408 225 400 220 395 217 Z
              "
              fill="#080C0A"
              stroke="#164C35"
              strokeWidth="0.8"
              filter="drop-shadow(0 4px 16px rgba(0,0,0,0.65))"
            />

            {/* Subtle Golden Sushumna Nadi Spine Axis */}
            <line x1="400" y1="216" x2="400" y2="440" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="1 3" opacity="0.6" />

            {/* Subtle Central Marma Energy Centers (Tiny Golden Nodes) */}
            {[
              { y: 196, r: 2.2 }, // Sahasrara/Ajna
              { y: 240, r: 2 },   // Vishuddha
              { y: 285, r: 2.5 }, // Anahata
              { y: 345, r: 2.2 }, // Manipura
              { y: 395, r: 2 },   // Svadhisthana
              { y: 440, r: 2.5 }, // Muladhara
            ].map(({ y, r }, idx) => (
              <circle key={idx} cx="400" cy={y} r={r} fill="#D4AF37" opacity="0.85" />
            ))}
          </g>

          {/* LAYER E: SEVEN ELEGANT CIRCULAR AYURVEDIC THERAPY EMBLEMS */}
          {THERAPY_SYMBOLS.map((symbol) => {
            const isSelected = activeId === symbol.id;
            const isHovered = hoveredId === symbol.id;
            const isActive = isSelected || isHovered;

            return (
              <g
                key={symbol.id}
                transform={`translate(${symbol.cx}, ${symbol.cy})`}
                className="cursor-pointer transition-all duration-300"
                onClick={() => handleSelect(symbol.id)}
                onMouseEnter={() => setHoveredId(symbol.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* 1. Surrounding Stationary Badge / Circle (DOES NOT ROTATE) */}
                <circle
                  cx="0"
                  cy="0"
                  r="42"
                  fill={isActive ? "#0D3324" : "#1A261D"}
                  stroke={isActive ? "#D4AF37" : "#B58A45"}
                  strokeWidth={isActive ? "2.2" : "1.2"}
                  opacity={isActive ? "0.98" : "0.90"}
                  className="transition-colors duration-300"
                  filter="drop-shadow(0 6px 14px rgba(0,0,0,0.45))"
                />

                {/* Outer Ring Concentric Frame (Stationary) */}
                <circle
                  cx="0"
                  cy="0"
                  r="36"
                  fill="none"
                  stroke={isActive ? "#D4AF37" : "#C99A52"}
                  strokeWidth="0.8"
                  opacity={isActive ? "0.8" : "0.4"}
                  strokeDasharray="2 3"
                />

                {/* 2. ONLY THE INDIVIDUAL INNER EMBLEM ROTATES AROUND ITS OWN CENTER! */}
                <g
                  style={{
                    transformOrigin: "0px 0px",
                    animation: `panchaGlyphSpin ${symbol.rotationDuration}s linear infinite ${
                      symbol.reverse ? "reverse" : "normal"
                    }`,
                    color: isActive ? "#F3E5AB" : symbol.color,
                  }}
                  className="transition-colors duration-300"
                >
                  {symbol.glyph(symbol.id)}
                </g>

                {/* 3. Stationary Outer Label & Sanskrit Typography (DOES NOT ROTATE) */}
                <text
                  x="0"
                  y="56"
                  textAnchor="middle"
                  className="font-display text-[12px] font-bold tracking-wider uppercase select-none transition-colors duration-300"
                  fill={isActive ? "#D4AF37" : "#EFE9D8"}
                >
                  {symbol.name}
                </text>
                <text
                  x="0"
                  y="68"
                  textAnchor="middle"
                  className="font-serif italic text-[10px] select-none transition-colors duration-300"
                  fill={isActive ? "#C99A52" : "#879C78"}
                >
                  {symbol.sanskrit}
                </text>

                {/* Active Indicator Pulse Ring */}
                {isActive && (
                  <circle
                    cx="0"
                    cy="0"
                    r="47"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="1.2"
                    opacity="0.5"
                    className="animate-ping"
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* 2. Active Therapy Editorial Narrative Strip Below Installation */}
      <div className="mt-8 transition-all duration-500">
        <div className="leaf-card p-6 sm:p-8 bg-card/95 border border-primary/25 rounded-3xl shadow-lift backdrop-blur-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20">
                  <Sparkles className="size-3 text-accent" /> {currentTherapy.name} Chikitsa
                </span>
                <span className="font-serif italic text-xs text-primary/80">
                  “{currentTherapy.sanskritTitle}”
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                {currentTherapy.name} Karma · {currentTherapy.sanskrit}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {currentTherapy.summary}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <div className="text-left sm:text-right border-l-2 sm:border-l-0 sm:border-r-2 border-primary/30 pl-3 sm:pr-3 py-1">
                <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Target Dosha</p>
                <p className="text-xs font-semibold text-primary">{currentTherapy.dosha}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{currentTherapy.organ}</p>
              </div>

              <Button asChild size="sm" className="rounded-full px-5 text-xs font-semibold gap-1.5 shadow-soft">
                <Link to="/book">
                  Book Protocol <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
