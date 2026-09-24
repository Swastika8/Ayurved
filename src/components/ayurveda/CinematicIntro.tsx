import { useState, useEffect, useRef, useCallback } from "react";
import { Sparkles, Volume2, VolumeX, ArrowRight } from "lucide-react";

interface CinematicIntroProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

const STORAGE_KEY = "has_seen_aarogya_intro";
const TOTAL_FRAMES = 300;
const FPS = 30;
const FRAME_DURATION = 1000 / FPS; // 33.33ms

export function CinematicIntro({ onComplete, forceShow = false }: CinematicIntroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentFrameDisplay, setCurrentFrameDisplay] = useState(1);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const currentFrameRef = useRef<number>(1);
  const isPlayingRef = useRef<boolean>(true);
  const isHoldingEndRef = useRef<boolean>(false);
  const animFrameIdRef = useRef<number | null>(null);
  const sampledBgColor = useRef<string>("#f5ebd4");

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
      masterGain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 1.2);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Sacred OM resonance (136.1 Hz fundamental with rich harmonic overtones)
      const harmonics = [
        { f: 136.1, type: "sine" as OscillatorType, vol: 0.4 },
        { f: 68.05, type: "sine" as OscillatorType, vol: 0.35 },
        { f: 204.15, type: "triangle" as OscillatorType, vol: 0.16 },
        { f: 272.2, type: "sine" as OscillatorType, vol: 0.12 },
        { f: 408.3, type: "sine" as OscillatorType, vol: 0.08 },
      ];

      harmonics.forEach(({ f, type, vol }) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(f, ctx.currentTime);

        // Gentle subtle vibrato/shimmer
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

  const toggleSound = () => {
    if (isMuted) {
      startVedicDrone();
      setIsMuted(false);
    } else {
      stopVedicDrone();
      setIsMuted(true);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const alreadySeen = sessionStorage.getItem(STORAGE_KEY);
      if (!alreadySeen || forceShow) {
        setIsVisible(true);
      }
    }
  }, [forceShow]);

  const handleFinish = useCallback(() => {
    if (isFadingOut) return;
    setIsFadingOut(true);
    stopVedicDrone();

    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEY, "true");
    }

    setTimeout(() => {
      setIsVisible(false);
      setIsFadingOut(false);
      onComplete?.();
    }, 900);
  }, [isFadingOut, onComplete]);

  // Keyboard shortcut listener
  useEffect(() => {
    if (!isVisible) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleFinish();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, handleFinish]);

  const getFrameUrl = (idx: number) => {
    const pad = String(idx).padStart(3, "0");
    return `/intro-frames/ezgif-frame-${pad}.jpg`;
  };

  // Canvas drawing function with full containment and smooth camera pull-back
  const drawCurrentFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const dpr = window.devicePixelRatio || 1;

    if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // 1. Draw smooth background matching the sampled parchment color
    const exactBg = sampledBgColor.current;
    ctx.fillStyle = exactBg;
    ctx.fillRect(0, 0, width, height);

    // 2. Select image
    const frameIndex = currentFrameRef.current;
    let img = imagesRef.current.get(frameIndex);
    if (!img) {
      for (let f = frameIndex - 1; f >= 1; f--) {
        if (imagesRef.current.has(f)) {
          img = imagesRef.current.get(f);
          break;
        }
      }
    }

    if (img && img.naturalWidth) {
      const imgW = img.naturalWidth;
      const imgH = img.naturalHeight;
      const imgAspect = imgW / imgH;

      // Reserve clean headroom (60px) and footroom (70px) so NO text/buttons touch the mandala seals
      const reservedTop = 64;
      const reservedBottom = 72;
      const availableH = Math.max(280, height - reservedTop - reservedBottom);
      const availableW = Math.max(320, width - 48);

      let baseW: number;
      let baseH: number;

      if (availableW / availableH > imgAspect) {
        baseH = availableH;
        baseW = baseH * imgAspect;
      } else {
        baseW = availableW;
        baseH = baseW / imgAspect;
      }

      // Smooth camera zoom-out: Starts gently at 1.10 and pulls back to 1.00 by frame 100 (~3.3s)
      const zoomProgress = Math.min(1, (frameIndex - 1) / 100);
      const easeZoom = 1 - Math.pow(1 - zoomProgress, 3);
      const scale = 1.10 - easeZoom * 0.10;

      const drawW = baseW * scale;
      const drawH = baseH * scale;
      const drawX = (width - drawW) / 2;
      // Vertically center inside the reserved safe window
      const drawY = reservedTop + (availableH - drawH) / 2;

      ctx.drawImage(img, drawX, drawY, drawW, drawH);

      // Soft edge feathering so the 1280x720 frame dissolves seamlessly into the background canvas
      const feather = 20;
      // Left edge fade
      const leftFade = ctx.createLinearGradient(drawX, 0, drawX + feather, 0);
      leftFade.addColorStop(0, exactBg);
      leftFade.addColorStop(1, "rgba(245, 235, 212, 0)");
      ctx.fillStyle = leftFade;
      ctx.fillRect(drawX - 1, drawY - 1, feather + 1, drawH + 2);

      // Right edge fade
      const rightFade = ctx.createLinearGradient(drawX + drawW - feather, 0, drawX + drawW, 0);
      rightFade.addColorStop(0, "rgba(245, 235, 212, 0)");
      rightFade.addColorStop(1, exactBg);
      ctx.fillStyle = rightFade;
      ctx.fillRect(drawX + drawW - feather, drawY - 1, feather + 1, drawH + 2);

      // Top edge fade
      const topFade = ctx.createLinearGradient(0, drawY, 0, drawY + feather);
      topFade.addColorStop(0, exactBg);
      topFade.addColorStop(1, "rgba(245, 235, 212, 0)");
      ctx.fillStyle = topFade;
      ctx.fillRect(drawX - 1, drawY - 1, drawW + 2, feather + 1);

      // Bottom edge fade
      const btmFade = ctx.createLinearGradient(0, drawY + drawH - feather, 0, drawY + drawH);
      btmFade.addColorStop(0, "rgba(245, 235, 212, 0)");
      btmFade.addColorStop(1, exactBg);
      ctx.fillStyle = btmFade;
      ctx.fillRect(drawX - 1, drawY + drawH - feather, drawW + 2, feather + 1);
    }

    ctx.restore();
  }, []);

  // Preloading frames into memory cache
  useEffect(() => {
    if (!isVisible) return;

    let isMounted = true;

    const loadFrame = (idx: number): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        if (imagesRef.current.has(idx)) {
          resolve(imagesRef.current.get(idx)!);
          return;
        }
        const img = new Image();
        img.src = getFrameUrl(idx);
        img.onload = () => {
          if (!isMounted) return;
          imagesRef.current.set(idx, img);
          if (idx === 1) {
            try {
              const testCanvas = document.createElement("canvas");
              testCanvas.width = 1;
              testCanvas.height = 1;
              const testCtx = testCanvas.getContext("2d");
              if (testCtx) {
                testCtx.drawImage(img, 10, 10, 1, 1, 0, 0, 1, 1);
                const p = testCtx.getImageData(0, 0, 1, 1).data;
                sampledBgColor.current = `rgb(${p[0]}, ${p[1]}, ${p[2]})`;
              }
            } catch {
              // fallback
            }
            if (currentFrameRef.current === 1) {
              drawCurrentFrame();
            }
          }
          resolve(img);
        };
        img.onerror = () => {
          resolve(img);
        };
      });
    };

    // Load initial 35 frames right away
    const initialBatch = Array.from({ length: 35 }, (_, i) => i + 1);
    Promise.all(initialBatch.map(loadFrame)).then(() => {
      // Stream in the rest in background chunks of 25
      const streamRest = async () => {
        for (let i = 36; i <= TOTAL_FRAMES; i += 25) {
          if (!isMounted) break;
          const chunk = Array.from({ length: Math.min(25, TOTAL_FRAMES - i + 1) }, (_, j) => i + j);
          await Promise.all(chunk.map(loadFrame));
          await new Promise((r) => setTimeout(r, 20));
        }
      };
      streamRest();
    });

    return () => {
      isMounted = false;
    };
  }, [isVisible, drawCurrentFrame]);

  // Smooth requestAnimationFrame playback loop at 30fps
  useEffect(() => {
    if (!isVisible) return;

    let lastTimestamp = performance.now();
    let accumulatedTime = 0;

    const loop = (timestamp: number) => {
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      if (isPlayingRef.current && !isHoldingEndRef.current) {
        accumulatedTime += delta;

        while (accumulatedTime >= FRAME_DURATION) {
          accumulatedTime -= FRAME_DURATION;

          if (currentFrameRef.current < TOTAL_FRAMES) {
            currentFrameRef.current += 1;
          } else {
            // Reached frame 300: Hold on fully illuminated mandala diagram
            isHoldingEndRef.current = true;
            setTimeout(() => {
              handleFinish();
            }, 3500);
            break;
          }
        }

        setCurrentFrameDisplay(currentFrameRef.current);
        drawCurrentFrame();
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isVisible, drawCurrentFrame, handleFinish]);

  // Window resize listener
  useEffect(() => {
    const handleResize = () => {
      drawCurrentFrame();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawCurrentFrame]);

  if (!isVisible) return null;

  const progressPercent = Math.min(100, Math.round((currentFrameDisplay / TOTAL_FRAMES) * 100));

  return (
    <div
      aria-label="Aarogya Ayurvedic Cinematic Entrance Sequence"
      style={{ backgroundColor: sampledBgColor.current }}
      className={`fixed inset-0 z-[9999] w-screen h-screen overflow-hidden select-none transition-opacity duration-900 ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* High-DPI Interactive Canvas with Containment & Camera Zoom-Out */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Top Center Brand Seal */}
      <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#d4af37]/35 text-[#f3e5ab] text-xs font-serif tracking-widest uppercase shadow-soft pointer-events-none">
        <Sparkles className="size-3 text-[#e6ca65]" />
        <span>Aarogya • Classical Ashtanga Sanctuary</span>
      </div>

      {/* Top Right Quick Skip Button */}
      <button
        type="button"
        onClick={handleFinish}
        className="absolute top-4 sm:top-6 right-4 sm:right-8 flex items-center gap-1.5 text-xs text-black/70 hover:text-black font-mono uppercase tracking-wider bg-black/5 hover:bg-black/10 border border-black/15 px-3 py-1.5 rounded-full transition-all cursor-pointer backdrop-blur-sm"
        aria-label="Skip cinematic entrance"
      >
        <span>Skip</span>
        <ArrowRight className="size-3" />
      </button>

      {/* Bottom Control Strip */}
      <div className="absolute bottom-6 sm:bottom-8 inset-x-4 sm:inset-x-12 flex flex-col sm:flex-row items-center justify-between gap-4 z-20 pointer-events-auto">
        {/* Sound Toggle */}
        <button
          type="button"
          onClick={toggleSound}
          className={`flex items-center gap-2 text-xs font-sans px-4 py-2 rounded-full border transition-all cursor-pointer shadow-soft backdrop-blur-md ${
            !isMuted
              ? "bg-black/80 text-[#e6ca65] border-[#d4af37]/60 ring-2 ring-[#d4af37]/20"
              : "bg-black/60 text-white/80 hover:text-white border-white/20"
          }`}
          aria-label={isMuted ? "Turn on sacred audio" : "Mute sacred audio"}
        >
          {isMuted ? (
            <VolumeX className="size-3.5 text-white/60" />
          ) : (
            <Volume2 className="size-3.5 text-[#e6ca65] animate-pulse" />
          )}
          <span>{isMuted ? "Sound: Off" : "Sound: On (Vedic Drone)"}</span>
        </button>

        {/* Center Golden Progress & Sacred Tag */}
        <div className="flex flex-col items-center gap-1.5 text-center bg-black/60 backdrop-blur-md px-5 py-2 rounded-full border border-black/15 shadow-soft">
          <div className="w-44 sm:w-56 h-1 rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#b8860b] via-[#e6ca65] to-[#b8860b] transition-all duration-75"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="font-serif italic text-[11px] text-[#f3e5ab] tracking-wider">
            Pancha Shodhana • Prana Pravaha ({progressPercent}%)
          </p>
        </div>

        {/* Enter Sanctuary Button */}
        <button
          type="button"
          onClick={handleFinish}
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
