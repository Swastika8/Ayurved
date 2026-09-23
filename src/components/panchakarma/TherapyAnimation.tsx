import { motion } from "motion/react";

type Variant = "vamana" | "virechana" | "basti" | "nasya" | "raktamokshana";

const ease = [0.4, 0, 0.2, 1] as const;

function BodyOutline() {
  return (
    <g
      fill="none"
      stroke="var(--color-primary)"
      strokeOpacity="0.5"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      {/* head */}
      <circle cx="100" cy="42" r="19" />
      {/* neck + torso */}
      <path d="M100 61 v10" />
      <path d="M78 84 q22 -14 44 0 l6 66 q-28 12 -56 0 z" />
      {/* arms */}
      <path d="M80 88 q-22 26 -20 62" />
      <path d="M120 88 q22 26 20 62" />
      {/* legs */}
      <path d="M88 150 q-4 48 -2 74" />
      <path d="M112 150 q4 48 2 74" />
    </g>
  );
}

function Dosha({
  delay = 0,
  x,
  y,
  color = "var(--color-accent)",
}: {
  delay?: number;
  x: number;
  y: number;
  color?: string;
}) {
  return (
    <motion.circle
      cx={x}
      cy={y}
      r="3.4"
      fill={color}
      initial={{ opacity: 0.25, scale: 0.6 }}
      animate={{ opacity: [0.25, 0.9, 0.25], scale: [0.6, 1.1, 0.6] }}
      transition={{ duration: 2.4, repeat: Infinity, delay, ease }}
    />
  );
}

export function TherapyAnimation({ variant }: { variant: Variant }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-secondary/40 p-4">
      <svg viewBox="0 0 200 240" className="mx-auto h-64 w-auto" role="img" aria-hidden="true">
        {/* warm glow */}
        <motion.ellipse
          cx="100"
          cy="130"
          rx="72"
          ry="96"
          fill="var(--color-accent)"
          initial={{ opacity: 0.06 }}
          animate={{ opacity: [0.06, 0.16, 0.06] }}
          transition={{ duration: 5, repeat: Infinity, ease }}
        />

        <BodyOutline />

        {variant === "vamana" && (
          <>
            {[0, 0.4, 0.8, 1.2].map((delay, i) => (
              <motion.circle
                key={i}
                r="4"
                fill="var(--color-accent)"
                initial={{ opacity: 0 }}
                animate={{ cx: [100, 100], cy: [125, 52], opacity: [0, 0.95, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, delay, ease }}
              />
            ))}
            <motion.path
              d="M100 52 q14 -12 26 -6"
              stroke="var(--color-primary)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease }}
            />
            <Dosha x={92} y={120} delay={0.2} />
            <Dosha x={110} y={132} delay={0.9} />
          </>
        )}

        {variant === "virechana" && (
          <>
            {[0, 0.45, 0.9, 1.35].map((delay, i) => (
              <motion.circle
                key={i}
                r="4"
                fill="var(--color-destructive)"
                initial={{ opacity: 0 }}
                animate={{ cx: [100, 100], cy: [104, 168], opacity: [0, 0.95, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, delay, ease }}
              />
            ))}
            <motion.circle
              cx="100"
              cy="112"
              r="16"
              fill="var(--color-destructive)"
              initial={{ opacity: 0.08 }}
              animate={{ opacity: [0.2, 0.06, 0.2] }}
              transition={{ duration: 2.8, repeat: Infinity, ease }}
            />
          </>
        )}

        {variant === "basti" && (
          <>
            <motion.path
              d="M100 178 v-38"
              stroke="var(--color-primary)"
              strokeWidth="6"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease }}
            />
            {[0, 0.6, 1.2].map((delay, i) => (
              <motion.circle
                key={i}
                r="3.6"
                fill="var(--color-accent)"
                initial={{ opacity: 0 }}
                animate={{ cx: [100, 100], cy: [186, 142], opacity: [0, 1, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, delay, ease }}
              />
            ))}
            <Dosha x={88} y={158} delay={0.3} />
            <Dosha x={112} y={150} delay={1} />
          </>
        )}

        {variant === "nasya" && (
          <>
            {[0, 0.5, 1].map((delay, i) => (
              <motion.circle
                key={i}
                r="3.2"
                fill="var(--color-accent)"
                initial={{ opacity: 0 }}
                animate={{ cx: [100, 100], cy: [20, 46], opacity: [0, 1, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, delay, ease }}
              />
            ))}
            <motion.circle
              cx="100"
              cy="42"
              r="19"
              fill="var(--color-accent)"
              initial={{ opacity: 0.05 }}
              animate={{ opacity: [0.05, 0.3, 0.05] }}
              transition={{ duration: 2.6, repeat: Infinity, delay: 0.8, ease }}
            />
            <motion.path
              d="M92 60 q8 12 16 0"
              stroke="var(--color-primary)"
              strokeWidth="1.8"
              fill="none"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2.6, repeat: Infinity, ease }}
            />
          </>
        )}

        {variant === "raktamokshana" && (
          <>
            <motion.circle
              cx="61"
              cy="140"
              r="9"
              fill="var(--color-destructive)"
              initial={{ opacity: 0.15 }}
              animate={{ opacity: [0.15, 0.45, 0.15], r: [9, 7, 9] }}
              transition={{ duration: 3, repeat: Infinity, ease }}
            />
            {[0, 0.7, 1.4].map((delay, i) => (
              <motion.circle
                key={i}
                r="3.4"
                fill="var(--color-destructive)"
                initial={{ opacity: 0 }}
                animate={{ cx: [61, 55], cy: [146, 186], opacity: [0, 1, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, delay, ease }}
              />
            ))}
            <motion.path
              d="M40 196 q14 6 28 0"
              stroke="var(--color-primary)"
              strokeWidth="1.8"
              fill="none"
              initial={{ opacity: 0.4 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.6, repeat: Infinity, ease }}
            />
          </>
        )}
      </svg>
    </div>
  );
}

export type { Variant as TherapyVariant };
