import { useState, useEffect, useRef, useCallback } from "react";
import { Sparkles, Volume2, VolumeX, ArrowRight } from "lucide-react";

interface CinematicIntroProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

const STORAGE_KEY = "has_seen_aarogya_intro";

export function CinematicIntro({ onComplete, forceShow = false }: CinematicIntroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Web Audio Context for Vedic OM/Tanpura Harmonic Drone
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const startVedicDrone = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 1.2);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Sacred OM resonance (136.1 Hz fundamental with rich harmonic overtones)
      const harmonics = [
        { f: 136.1, type: "sine" as OscillatorType, vol: 0.35 },
        { f: 68.05, type: "sine" as OscillatorType, vol: 0.3 },
        { f: 204.15, type: "triangle" as OscillatorType, vol: 0.15 },
        { f: 272.2, type: "sine" as OscillatorType, vol: 0.1 },
        { f: 408.3, type: "sine" as OscillatorType, vol: 0.06 },
      ];

      harmonics.forEach(({ f, type, vol }) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(f, ctx.currentTime);

        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.2, ctx.currentTime);
        lfoGain.gain.setValueAtTime(0.8, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();

        g.gain.setValueAtTime(vol, ctx.currentTime);
        osc.connect(g);
        g.connect(masterGain);
        osc.start();
      });
    } catch (e) {
      console.warn("Audio Context init error:", e);
    }
  };

  const stopVedicDrone = () => {
    if (audioCtxRef.current && gainNodeRef.current) {
      const ctx = audioCtxRef.current;
      const g = gainNodeRef.current;
      try {
        g.gain.setValueAtTime(g.gain.value, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
        setTimeout(() => {
          if (ctx.state !== "closed") {
            ctx.suspend();
          }
        }, 650);
      } catch {
        // ignore
      }
    }
  };

  const handleFinish = useCallback(() => {
    if (isFadingOut) return;
    setIsFadingOut(true);
    stopVedicDrone();
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore
    }
    setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 850);
  }, [isFadingOut, onComplete]);

  // Check session storage on mount
  useEffect(() => {
    if (forceShow) {
      setIsVisible(true);
      return;
    }
    try {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        if (params.get("intro") === "true") {
          setIsVisible(true);
          return;
        }
      }
      const hasSeen = sessionStorage.getItem(STORAGE_KEY);
      if (!hasSeen) {
        setIsVisible(true);
      }
    } catch {
      setIsVisible(true);
    }
  }, [forceShow]);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const { currentTime, duration } = videoRef.current;
    if (duration > 0) {
      setProgress(Math.min(100, Math.round((currentTime / duration) * 100)));
    }
  };

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
      if (!nextMuted) {
        videoRef.current.volume = 0.85;
        startVedicDrone();
      } else {
        stopVedicDrone();
      }
    }
  };

  const handleVideoEnded = () => {
    setTimeout(() => {
      handleFinish();
    }, 800);
  };

  if (!isVisible) return null;

  return (
    <div
      aria-label="Aarogya Ayurvedic Cinematic Entrance Sequence"
      onClick={handleFinish}
      className={`fixed inset-0 z-[9999] w-screen h-screen overflow-hidden select-none bg-[#090e0a] cursor-pointer transition-opacity duration-800 ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* 1. Full-Screen Edge-to-Edge Video (Occupies 100vw × 100vh with zero border/letterboxing) */}
      <video
        ref={videoRef}
        src="/media/intro.mp4"
        autoPlay
        playsInline
        muted={isMuted}
        preload="auto"
        onClick={handleFinish}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnded}
        title="Click anywhere to open website"
        className="absolute inset-0 w-full h-full object-cover object-center filter saturate-[1.08] contrast-[1.04] brightness-[1.01] cursor-pointer"
      />

      {/* Subtle Dark Gradient Scrim to ensure controls and brand badge are legible */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/35" />

      {/* Top Center Brand Seal */}
      <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#d4af37]/40 text-[#f3e5ab] text-xs font-serif tracking-widest uppercase shadow-soft pointer-events-none z-20">
        <Sparkles className="size-3 text-[#e6ca65]" />
        <span>Aarogya • Classical Ashtanga Sanctuary</span>
      </div>

      {/* Top Right Quick Skip Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleFinish();
        }}
        className="absolute top-4 sm:top-6 right-4 sm:right-8 z-20 flex items-center gap-1.5 text-xs text-white/90 hover:text-white font-mono uppercase tracking-wider bg-black/45 hover:bg-black/70 border border-white/20 hover:border-white/40 px-4 py-1.5 rounded-full transition-all cursor-pointer backdrop-blur-md shadow-lg"
        aria-label="Skip cinematic entrance"
      >
        <span>Skip</span>
        <ArrowRight className="size-3" />
      </button>

      {/* Bottom Control Strip */}
      <div className="absolute bottom-6 sm:bottom-8 inset-x-4 sm:inset-x-12 flex flex-col sm:flex-row items-center justify-between gap-4 z-20 pointer-events-auto">
        {/* Sound Toggle (Stops event propagation so clicking sound doesn't trigger finish) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleSound();
          }}
          className={`flex items-center gap-2 text-xs font-sans px-4 py-2 rounded-full border transition-all cursor-pointer shadow-soft backdrop-blur-md ${
            !isMuted
              ? "bg-black/85 text-[#e6ca65] border-[#d4af37]/70 ring-2 ring-[#d4af37]/20"
              : "bg-black/65 text-white/80 hover:text-white border-white/20"
          }`}
          aria-label={isMuted ? "Turn on audio" : "Mute audio"}
        >
          {isMuted ? (
            <VolumeX className="size-3.5 text-white/60" />
          ) : (
            <Volume2 className="size-3.5 text-[#e6ca65] animate-pulse" />
          )}
          <span>{isMuted ? "Sound: Off" : "Sound: On (Vedic Sacred Tone)"}</span>
        </button>

        {/* Center Golden Progress & Click Hint */}
        <div className="flex flex-col items-center gap-1.5 text-center bg-black/65 backdrop-blur-md px-5 py-2 rounded-full border border-white/10 shadow-soft">
          <div className="w-44 sm:w-56 h-1 rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#b8860b] via-[#e6ca65] to-[#b8860b] transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="font-serif italic text-[11px] text-[#f3e5ab] tracking-wider">
            Click anywhere on video to enter ({progress}%)
          </p>
        </div>

        {/* Enter Sanctuary Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleFinish();
          }}
          className="group flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-[#1a1205] bg-gradient-to-r from-[#e6ca65] via-[#f3e5ab] to-[#e6ca65] hover:brightness-105 active:scale-98 px-6 py-2.5 rounded-full transition-all shadow-lift border border-[#d4af37]/60 cursor-pointer"
          aria-label="Enter Sanctuary"
        >
          <span>Enter Sanctuary</span>
          <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
