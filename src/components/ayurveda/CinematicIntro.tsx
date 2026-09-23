import { useState, useEffect, useRef } from "react";
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
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Check session storage
    if (typeof window !== "undefined") {
      const alreadySeen = sessionStorage.getItem(STORAGE_KEY);
      if (!alreadySeen || forceShow) {
        setIsVisible(true);
      }
    }
  }, [forceShow]);

  // Attempt autoplay
  useEffect(() => {
    if (isVisible && videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay deferred or muted by browser policy:", err);
        });
      }
    }
  }, [isVisible]);

  const handleFinish = () => {
    if (isFadingOut) return;
    setIsFadingOut(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEY, "true");
    }
    // Smooth 800ms dissolve transition before fully unmounting
    setTimeout(() => {
      setIsVisible(false);
      setIsFadingOut(false);
      onComplete?.();
    }, 800);
  };

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      aria-label="Aarogya Ayurvedic Cinematic Entrance Sequence"
      className={`fixed inset-0 z-[9999] w-screen h-screen bg-[#0e1e17] overflow-hidden select-none transition-opacity duration-800 ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Absolute Full-Screen Video filling 100vw x 100vh with no container / rounded border */}
      <video
        ref={videoRef}
        src="/media/intro.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleFinish}
        className="w-full h-full object-cover object-center scale-[1.01]"
      />

      {/* Subtle cinematic vignette overlay to blend edges with brand tones */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#0e1e17]/20 to-[#0e1e17]/60 pointer-events-none" />

      {/* Minimal Brand Seal (Top Center) */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/90 text-xs font-serif tracking-widest uppercase">
        <Sparkles className="size-3 text-[#d4af37]" />
        <span>Aarogya • Classical Ashtanga Sanctuary</span>
      </div>

      {/* Accessible Control Bar (Bottom Edge) */}
      <div className="absolute bottom-8 inset-x-6 sm:inset-x-12 flex items-center justify-between z-20 pointer-events-auto">
        <button
          type="button"
          onClick={toggleSound}
          className="flex items-center gap-2 text-xs font-sans text-white/80 hover:text-white bg-black/40 backdrop-blur-md border border-white/15 px-4 py-2 rounded-full transition-colors cursor-pointer"
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? <VolumeX className="size-3.5 text-[#d4af37]" /> : <Volume2 className="size-3.5 text-[#d4af37]" />}
          <span>{isMuted ? "Sound: Off" : "Sound: On"}</span>
        </button>

        <button
          type="button"
          onClick={handleFinish}
          className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#d4af37] hover:text-white bg-black/60 hover:bg-black/80 backdrop-blur-md border border-[#d4af37]/40 px-5 py-2.5 rounded-full transition-all shadow-lg cursor-pointer hover:border-[#d4af37]"
          aria-label="Skip cinematic entrance"
        >
          <span>Enter Sanctuary</span>
          <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
