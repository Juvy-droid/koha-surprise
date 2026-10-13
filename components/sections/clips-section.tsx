"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Film, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Clip {
  id: number;
  title: string;
  thumbnail: string;
  videoSrc: string;
  isLocal?: boolean;
}

const clips: Clip[] = [
  {
    id: 1,
    title: "shovel",
    thumbnail:
      "https://static-cdn.jtvnw.net/twitch-clips/4xzgKFy1j00Wl0h4s5qS9Q/AT-cm%7C4xzgKFy1j00Wl0h4s5qS9Q-preview-480x272.jpg",
    videoSrc:
      "https://clips.twitch.tv/embed?clip=ComfortableEasyShingleSpicyBoy-XLWPTRaXSHizmpL1",
    isLocal: false,
  },
  {
    id: 2,
    title: "twins fight to the death",
    thumbnail:
      "https://static-cdn.jtvnw.net/twitch-clips/B-qYQPYoBSjHeFn14ftYhA/AT-cm%7CB-qYQPYoBSjHeFn14ftYhA-preview-260x147.jpg",
    videoSrc:
      "https://clips.twitch.tv/embed?clip=TriumphantRacyDragonfruitUWot-9igFKMd4WfXh-1iE",
    isLocal: false,
  },
  {
    id: 3,
    title: "don't panic...",
    thumbnail:
      "https://static-cdn.jtvnw.net/twitch-clips/BXZLkrb0UfAlcqmJe1O1oQ/AT-cm%7CBXZLkrb0UfAlcqmJe1O1oQ-preview-480x272.jpg",
    videoSrc:
      "https://clips.twitch.tv/embed?clip=GenerousFreezingScorpionRlyTho-tvRR8CVyqYl7U7Wh",
    isLocal: false,
  },
  {
    id: 4,
    title: "20th Birthday!",
    thumbnail:
      "https://static-cdn.jtvnw.net/twitch-clips/djCVQn3Na94MWb8OwbPWnQ/AT-cm%7CdjCVQn3Na94MWb8OwbPWnQ-preview-480x272.jpg",
    videoSrc:
      "https://clips.twitch.tv/embed?clip=VenomousDrabNarwhalSMOrc-fc1r3gxZvw7Bs9ad",
    isLocal: false,
  },
  {
    id: 5,
    title: "soap loves noahs feet (vol warning)",
    thumbnail:
      "https://static-cdn.jtvnw.net/twitch-clips/8GqXIHg1fUWC2cQDBhAX3A/AT-cm%7C8GqXIHg1fUWC2cQDBhAX3A-preview-260x147.jpg",
    videoSrc:
      "https://clips.twitch.tv/embed?clip=WonderfulAffluentToadGingerPower-eDV9RYLZxAMGEBfc",
    isLocal: false,
  },
  {
    id: 6,
    title:
      "[18+] [DAY 3 DONOTHON] I totally didnt oversleep | Golf with your Friends",
    thumbnail:
      "https://static-cdn.jtvnw.net/twitch-clips/_PXds4jWfpEYhOOB8cgsng/40775964021-offset-81138-preview-480x272.jpg",
    videoSrc:
      "https://clips.twitch.tv/embed?clip=BeautifulRoughWombatUWot-iNZ-kRiE44HxyCye",
    isLocal: false,
  },
  {
    id: 7,
    title: "ephy u cant miss this...",
    thumbnail:
      "https://static-cdn.jtvnw.net/twitch-clips-thumbnails-prod/SuccessfulFuriousSalsifyKlappa-2RRre9-qcfbi1AuH/f51f0649-553b-4d2c-9e56-de291b2f10fd/preview.jpg",
    videoSrc:
      "https://clips.twitch.tv/embed?clip=SuccessfulFuriousSalsifyKlappa-2RRre9-qcfbi1AuH",
    isLocal: false,
  },
  {
    id: 8,
    title: "Team Guzzlers Introduction",
    thumbnail:
      "https://static-cdn.jtvnw.net/twitch-clips-thumbnails-prod/NiceCovertAnteaterPeteZaroll-9VnatzcJDpRI3KVP/4864a0a3-c16b-4547-a321-4e24917e6a98/preview.jpg",
    videoSrc:
      "https://clips.twitch.tv/embed?clip=NiceCovertAnteaterPeteZaroll-9VnatzcJDpRI3KVP",
    isLocal: false,
  },
  {
    id: 9,
    title: "she's doing what to santa?",
    thumbnail:
      "https://static-cdn.jtvnw.net/twitch-clips-thumbnails-prod/TsundereTamePepperTheThing-vUOTKlIYQNiUyBFu/9fb7bed0-6d24-4610-bc1b-c10c0770917f/preview.jpg",
    videoSrc:
      "https://clips.twitch.tv/embed?clip=TsundereTamePepperTheThing-vUOTKlIYQNiUyBFu",
    isLocal: false,
  },
  {
    id: 10,
    title: "she cant breathe",
    thumbnail:
      "https://static-cdn.jtvnw.net/twitch-clips-thumbnails-prod/ClearCallousWhaleStinkyCheese-dbD0u7GKV4qHHjKN/8fb2b0d1-0cd4-41bb-9c3c-9b8fbe306286/preview.jpg",
    videoSrc:
      "https://clips.twitch.tv/embed?clip=ClearCallousWhaleStinkyCheese-dbD0u7GKV4qHHjKN",
    isLocal: false,
  },
  {
    id: 11,
    title: "Main Character Detected",
    thumbnail:
      "https://static-cdn.jtvnw.net/twitch-clips-thumbnails-prod/InventiveHomelyFriseeTheThing-A0kDbw8fccXkl_XI/857ad43e-a3a5-4dc5-88ce-75bb727a0c7d/preview.jpg",
    videoSrc:
      "https://clips.twitch.tv/embed?clip=InventiveHomelyFriseeTheThing-A0kDbw8fccXkl_XI",
    isLocal: false,
  },
  {
    id: 12,
    title: "pingpoo shut up",
    thumbnail:
      "https://static-cdn.jtvnw.net/twitch-clips-thumbnails-prod/BetterSpoopyTitanSmoocherZ-8YgAfvYWoonTi2qy/8b6eba49-9659-4173-8342-9b25f685cdfb/preview.jpg",
    videoSrc:
      "https://clips.twitch.tv/embed?clip=BetterSpoopyTitanSmoocherZ-8YgAfvYWoonTi2qy",
    isLocal: false,
  },
  {
    id: 13,
    title: "Happy New Years!",
    thumbnail:
      "https://static-cdn.jtvnw.net/twitch-clips/m7lj3GpQkaM8qmoonzYV6g/AT-cm%7Cm7lj3GpQkaM8qmoonzYV6g-preview-480x272.jpg",
    videoSrc:
      "https://clips.twitch.tv/embed?clip=AmericanVenomousCheesecakePJSalt-alCRozyqaiifNhXq",
    isLocal: false,
  },
  {
    id: 14,
    title: "THE BABIES",
    thumbnail:
      "https://static-cdn.jtvnw.net/twitch-clips/3k0Ol_fveDpwOkrxt8lCmg/AT-cm%7C3k0Ol_fveDpwOkrxt8lCmg-preview-480x272.jpg",
    videoSrc:
      "https://clips.twitch.tv/embed?clip=TransparentSolidDinosaurPrimeMe-9-94OnA6SvG3yUKa",
    isLocal: false,
  },
  {
    id: 15,
    title: "happy birthday brunooo",
    thumbnail:
      "https://static-cdn.jtvnw.net/twitch-clips-thumbnails-prod/PeppyGrossHornetPeteZaroll-DNWkoB5u3-7ScV0U/16571c94-06e5-46b5-b8c4-165ed0ae2459/preview.jpg",
    videoSrc:
      "https://clips.twitch.tv/embed?clip=PeppyGrossHornetPeteZaroll-DNWkoB5u3-7ScV0U",
    isLocal: false,
  },
  {
    id: 16,
    title: "THE REAL XQC RAID",
    thumbnail:
      "https://static-cdn.jtvnw.net/twitch-clips-thumbnails-prod/RichFrozenArtichokePicoMause-tJIKtZkIQ18ra_k3/65c5cb6b-7f03-4546-8800-279fa4af6d37/preview.jpg",
    videoSrc:
      "https://clips.twitch.tv/embed?clip=RichFrozenArtichokePicoMause-tJIKtZkIQ18ra_k3",
    isLocal: false,
  },
  {
    id: 17,
    title: "Erika being special",
    thumbnail:
      "https://static-cdn.jtvnw.net/twitch-clips/jsVFdZvPh2ZyERw4xdQM2A/AT-cm%7CjsVFdZvPh2ZyERw4xdQM2A-preview-260x147.jpg",
    videoSrc:
      "https://clips.twitch.tv/embed?clip=KathishTameTitanAMPEnergyCherry-m8-HZnIRHDjF1AzY",
    isLocal: false,
  },
  {
    id: 18,
    title: "The hole incident",
    thumbnail:
      "https://static-cdn.jtvnw.net/twitch-clips-thumbnails-prod/AdorableBumblingDuckRitzMitz-ZftXDONf5J-9omI2/fc130d59-2a71-4a12-b261-6dfc4a4957b7/preview.jpg",
    videoSrc:
      "https://clips.twitch.tv/embed?clip=AdorableBumblingDuckRitzMitz-ZftXDONf5J-9omI2",
    isLocal: false,
  },
  {
    id: 19,
    title: "tumbling weed",
    thumbnail:
      "https://static-cdn.jtvnw.net/twitch-clips-thumbnails-prod/BovineArtsyBillPlanking-q16t1b8AGsgBZ-_I/a014f176-70dd-46b3-958c-d49750c6b1b9/preview.jpg",
    videoSrc:
      "https://clips.twitch.tv/embed?clip=BovineArtsyBillPlanking-q16t1b8AGsgBZ-_I",
    isLocal: false,
  },
  {
    id: 20,
    title: "yo hit the mic",
    thumbnail:
      "https://static-cdn.jtvnw.net/twitch-clips/kYcT8uPPX5U5ivdjCsVJmA/40390746005-offset-17318-preview-480x272.jpg",
    videoSrc:
      "https://clips.twitch.tv/embed?clip=AverageVastDaikonBIRB-UjttrC8HBzxhlYYw",
    isLocal: false,
  },
  {
    id: 21,
    title: "content warning montage",
    thumbnail: "/clips/cwmt.png",
    videoSrc: "/clips/cwm.mp4",
    isLocal: true,
  },
  {
    id: 22,
    title: "Chinnie EVOLVEEE",
    thumbnail: "/clips/evolve.png",
    videoSrc: "/clips/evolve.mp4",
    isLocal: true,
  },
  {
    id: 23,
    title: "big big boy",
    thumbnail: "/clips/big big boy.png",
    videoSrc: "/clips/big big boy.mp4",
    isLocal: true,
  },
];

function ClipCard({ clip, onClick }: { clip: Clip; onClick: () => void }) {
  const [imgError, setImgError] = useState(false);
  const hasThumbnail =
    clip.thumbnail && !clip.thumbnail.includes("/api/placeholder") && !imgError;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-video rounded-xl overflow-hidden bg-card border border-border">
        {/* Actual thumbnail image */}
        {hasThumbnail ? (
          <img
            src={clip.thumbnail}
            alt={clip.title}
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          /* Fallback placeholder when no thumbnail */
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <Film className="w-12 h-12 text-muted-foreground/50" />
          </div>
        )}

        {/* Play overlay */}
        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center transform group-hover:scale-110 transition-transform">
            <Play className="w-7 h-7 text-primary-foreground ml-1" />
          </div>
        </div>
      </div>
      <h3 className="mt-3 text-foreground font-medium group-hover:text-primary transition-colors">
        {clip.title}
      </h3>
    </motion.div>
  );
}

function VideoPlayer({
  clip,
  onClose,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}: {
  clip: Clip;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}) {
  const src = !clip.isLocal
    ? `${clip.videoSrc}&parent=${typeof window !== "undefined" ? window.location.hostname : "localhost"}`
    : clip.videoSrc;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute -top-12 right-0 text-foreground hover:text-primary"
        >
          <X className="w-6 h-6" />
        </Button>

        <div className="relative aspect-video rounded-2xl overflow-hidden bg-card border border-border">
          {clip.isLocal ? (
            <video
              src={src}
              controls
              autoPlay
              className="w-full h-full object-cover"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <iframe
              src={src}
              className="w-full h-full"
              allowFullScreen
              title={clip.title}
            />
          )}
        </div>

        <h3 className="mt-4 text-xl font-bold text-foreground text-center">
          {clip.title}
        </h3>

        <div className="flex items-center justify-center gap-4 mt-4">
          <Button
            variant="outline"
            size="icon"
            onClick={onPrev}
            disabled={!hasPrev}
            className="rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onNext}
            disabled={!hasNext}
            className="rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export function ClipsSection() {
  const [selectedClip, setSelectedClip] = useState<number | null>(null);

  const handleNext = () => {
    if (selectedClip !== null && selectedClip < clips.length - 1) {
      setSelectedClip(selectedClip + 1);
    }
  };

  const handlePrev = () => {
    if (selectedClip !== null && selectedClip > 0) {
      setSelectedClip(selectedClip - 1);
    }
  };

  return (
    <section id="clips" className="py-24 px-4 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            <Play className="w-4 h-4" />
            Memoir
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Clip Highlights
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Relive couple moments from your 3 year journey and hope you can look
            back at them with joy in ur eyes :3
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {clips.map((clip, index) => (
            <ClipCard
              key={clip.id}
              clip={clip}
              onClick={() => setSelectedClip(index)}
            />
          ))}
        </div>
      </div>

      {selectedClip !== null && (
        <VideoPlayer
          clip={clips[selectedClip]}
          onClose={() => setSelectedClip(null)}
          onNext={handleNext}
          onPrev={handlePrev}
          hasNext={selectedClip < clips.length - 1}
          hasPrev={selectedClip > 0}
        />
      )}
    </section>
  );
}
