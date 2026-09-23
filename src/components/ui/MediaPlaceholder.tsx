import { Play, Sparkles, Video, Eye, X } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface MediaPlaceholderProps {
  title: string;
  subtitle?: string | undefined;
  caption?: string | undefined;
  type?: string | undefined;
  badge?: string | undefined;
  aspectRatio?: "16/9" | "4/3" | "21/9" | "square" | undefined;
  className?: string | undefined;
  duration?: string | undefined;
  previewUrl?: string | undefined;
  details?: string[] | undefined;
  suggestedPrompt?: string | undefined;
  technicalSpecs?: Record<string, string> | undefined;
}

export function MediaPlaceholder({
  title,
  subtitle,
  caption,
  type = "3d",
  badge,
  aspectRatio = "16/9",
  className = "",
  duration = "3:45 mins",
  previewUrl,
  details = [
    "Classical anatomical alignment",
    "Bio-purification phase breakdown",
    "Herbal decoction thermal dynamics",
  ],
  suggestedPrompt,
  technicalSpecs,
}: MediaPlaceholderProps) {
  const displaySubtitle = subtitle || caption || "High-definition 3D visualization / immersive video container";
  const displayBadge = badge || (type === "3d" ? "3D Walkthrough Active" : "Cinematic Video Active");
  const [isOpen, setIsOpen] = useState(false);

  const aspectClass = {
    "16/9": "aspect-video",
    "4/3": "aspect-[4/3]",
    "21/9": "aspect-[21/9]",
    square: "aspect-square",
  }[aspectRatio];

  const isVideo = previewUrl?.endsWith(".mp4");
  const isImage = previewUrl && !isVideo;

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className={`group relative overflow-hidden rounded-[2rem] border border-border/70 bg-gradient-to-br from-secondary/50 via-card to-primary/5 shadow-soft transition-all duration-300 hover:shadow-lift hover:border-primary/40 cursor-pointer ${aspectClass} ${className}`}
      >
        {/* Render actual media background if provided */}
        {isVideo && (
          <video
            src={previewUrl}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        {isImage && (
          <img
            src={previewUrl}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}

        {/* Ambient Botanical Vignette Gradient Overlays */}
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
          previewUrl
            ? "bg-gradient-to-t from-black/85 via-black/45 to-black/25 group-hover:from-black/75"
            : ""
        }`} />

        {/* Subtle decorative background botanical ring if no media */}
        {!previewUrl && (
          <>
            <div className="absolute -right-16 -top-16 size-48 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-colors pointer-events-none" />
            <div className="absolute -left-16 -bottom-16 size-48 rounded-full bg-accent/5 blur-2xl group-hover:bg-accent/10 transition-colors pointer-events-none" />
          </>
        )}

        {/* Outer frame styling */}
        <div className="relative flex h-full w-full flex-col justify-between p-6">
          {/* Top meta tags */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-background/80 backdrop-blur-md px-3 py-1 text-[11px] font-medium text-primary shadow-xs">
              <Sparkles className="size-3 text-accent" />
              {displayBadge}
            </span>
            <span className="text-[11px] font-medium text-foreground/90 bg-background/80 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-border shadow-xs">
              {duration}
            </span>
          </div>

          {/* Central Animated Play Trigger */}
          <div className="flex flex-col items-center justify-center text-center my-auto py-4">
            <div className="relative flex size-14 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lift group-hover:scale-110 transition-transform duration-300 backdrop-blur-md">
              <span className="absolute inset-0 rounded-full border-2 border-primary/40 animate-ping opacity-30" />
              <Play className="size-5 translate-x-0.5 fill-current" />
            </div>
            <h4 className="mt-3 font-display text-lg font-semibold text-white drop-shadow-md">
              {title}
            </h4>
            <p className="mt-1 max-w-sm text-xs text-white/80 line-clamp-2 drop-shadow-xs">
              {displaySubtitle}
            </p>
          </div>

          {/* Bottom helper */}
          <div className="flex items-center justify-between text-[11px] text-white/80 border-t border-white/20 pt-3">
            <span className="flex items-center gap-1.5">
              <Video className="size-3.5 text-accent" /> Click to play full-screen & view specs
            </span>
            <span className="font-mono text-[10px] text-white/70 font-medium">ACTIVE STAGE</span>
          </div>
        </div>
      </div>

      {/* Interactive Modal displaying video / high-res visual & specs */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-2xl bg-card border-border p-6 overflow-hidden">
          <DialogHeader>
            <div className="inline-flex items-center gap-1.5 text-xs text-primary font-medium mb-1">
              <Eye className="size-3.5" /> Media Stage Player & Technical Specifications
            </div>
            <DialogTitle className="font-display text-2xl">{title}</DialogTitle>
            <DialogDescription className="text-sm">
              {displaySubtitle}
            </DialogDescription>
          </DialogHeader>

          {/* Media Player Container */}
          <div className="space-y-4 py-2">
            {isVideo && (
              <div className="rounded-2xl overflow-hidden shadow-lg border border-border bg-black aspect-video">
                <video
                  src={previewUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {isImage && (
              <div className="rounded-2xl overflow-hidden shadow-lg border border-border aspect-video">
                <img
                  src={previewUrl}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {technicalSpecs && (
              <div className="rounded-2xl border border-accent/25 bg-accent/5 p-4 text-xs space-y-1.5">
                <div className="font-semibold text-accent uppercase tracking-wider text-[10px]">
                  Technical Delivery Target
                </div>
                {Object.entries(technicalSpecs).map(([key, val]) => (
                  <div key={key} className="flex justify-between text-muted-foreground">
                    <span className="capitalize">{key}:</span>
                    <span className="font-mono text-foreground font-medium">{val}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-xs space-y-2">
              <div className="font-semibold text-primary uppercase tracking-wider text-[10px]">
                Production & Clinical Narrative Focus
              </div>
              <ul className="space-y-1.5 text-muted-foreground">
                {details.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {suggestedPrompt && (
              <div className="rounded-xl border border-border bg-muted/40 p-3 text-xs space-y-1">
                <div className="font-semibold text-[10px] text-muted-foreground uppercase">
                  Generative Vision Prompt
                </div>
                <p className="text-[11px] text-foreground/80 italic font-serif">"{suggestedPrompt}"</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
