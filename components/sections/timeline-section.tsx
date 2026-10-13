"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Calendar,
  Star,
  Users,
  Trophy,
  Heart,
  Zap,
  PartyPopper,
  Flame,
} from "lucide-react";
import Image from "next/image";

interface Milestone {
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  highlight?: boolean;
}

// Art pieces that will float alongside the timeline
const floatingArt = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/soapdax.png-noNGOQuXaxZrVICYiDmgglYvUrQu9v.jpeg",
    alt: "Soapdax",
    position: 0,
    side: "left" as const,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/23213123212-BSVdnmTwZvACyyoyASnwITr7pxEwMK.png",
    alt: "Soapdax Night Art",
    position: 1,
    side: "right" as const,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Soap_no_bg-NYm4vYCR4jVbTNA4wvglTYjEKf8apO.png",
    alt: "Chibi Soap",
    position: 2,
    side: "left" as const,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/onlysoap.png-FSEKuSr8X3QIvfriaeBT7MhLrcgCN6.jpeg",
    alt: "Soapdax Portrait",
    position: 3,
    side: "right" as const,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/catsoap-hxOIUDsa18t2FfVEoUfrb7uvuyARAl.png",
    alt: "Cat Soap",
    position: 4,
    side: "left" as const,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Soapdax_chibi-qgfpOmFfKhfWBoUq6HKied51IscHyq.png",
    alt: "Soapdax Chibi with Headphones",
    position: 5,
    side: "right" as const,
  },
  {
    src: "/mangadax.png",
    alt: "Soapverse Recap Art",
    position: 6,
    side: "left" as const,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/shoujoreimodelsribbon-UPH22D3Pr9c7dX1xLlYZgHkZrpZiCk.png",
    alt: "Shoujorei Models",
    position: 7,
    side: "right" as const,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Itte_no_bg-qlxOcnGOB20IqNCQShq8eNor108OzZ.png",
    alt: "Itte Art",
    position: 8,
    side: "left" as const,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled3_20250904203207.png-XlVNHDEVWhKokI4yfj6lp7vwpsoF91.jpeg",
    alt: "Soap Expressions",
    position: 9,
    side: "right" as const,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BR-VwDCBu4NhgxU4v7CUEBMPpZqkxVjt7.png",
    alt: "BR Art",
    position: 10,
    side: "left" as const,
  },
  {
    src: "/bubz.png",
    alt: "Soapverse Planet",
    position: 11,
    side: "right" as const,
  },
  {
    src: "/bubz.png",
    alt: "Soapverse Planet",
    position: 11,
    side: "right" as const,
  },
  {
    src: "/bubz.png",
    alt: "Soapverse Planet",
    position: 11,
    side: "right" as const,
  },
  {
    src: "/bubz.png",
    alt: "Soapverse Planet",
    position: 11,
    side: "right" as const,
  },
  {
    src: "/bubz.png",
    alt: "Soapverse Planet",
    position: 11,
    side: "right" as const,
  },
  {
    src: "/b.png",
    alt: "Soapverse Planet",
    position: 11,
    side: "left" as const,
  },
  {
    src: "/b.png",
    alt: "Soapverse Planet",
    position: 11,
    side: "right" as const,
  },
  {
    src: "/h.png",
    alt: "Soapverse Planet",
    position: 11,
    side: "left" as const,
  },
  {
    src: "/h.png",
    alt: "Soapverse Planet",
    position: 11,
    side: "right" as const,
  },
  {
    src: "/baldsoap.png",
    alt: "Soapverse Planet",
    position: 11,
    side: "right" as const,
  },
  {
    src: "/baldsoap.png",
    alt: "Soapverse Planet",
    position: 11,
    side: "right" as const,
  },
  {
    src: "/baldsoap.png",
    alt: "Soapverse Planet",
    position: 11,
    side: "right" as const,
  },
  {
    src: "/baldsoap.png",
    alt: "Soapverse Planet",
    position: 11,
    side: "right" as const,
  },
  {
    src: "/baldsoap.png",
    alt: "Soapverse Planet",
    position: 11,
    side: "right" as const,
  },
  {
    src: "/baldsoap.png",
    alt: "Soapverse Planet",
    position: 11,
    side: "right" as const,
  },
  {
    src: "/baldsoap.png",
    alt: "Soapverse Planet",
    position: 11,
    side: "right" as const,
  },
  {
    src: "/2.jpg",
    alt: "Soapverse Planet",
    position: 11,
    side: "right" as const,
  },
  {
    src: "/clown_soap.png",
    alt: "Soapverse Planet",
    position: 11,
    side: "left" as const,
  },
  {
    src: "/o.png",
    alt: "Soapverse Planet",
    position: 11,
    side: "right" as const,
  },
    {
    src: "/c.png",
    alt: "Soapverse Planet",
    position: 11,
    side: "left" as const,
  },
      {
    src: "/t.png",
    alt: "Soapverse Planet",
    position: 11,
    side: "right" as const,
  },
];

// Real milestones from Soapdax's journey
const milestones: Milestone[] = [
  {
    date: "9th Feb 2023",
    title: "First Stream",
    description:
      "The very beginning of the Soapdaxverse! The journey starts here.",
    icon: <Star className="w-5 h-5" />,
    highlight: true,
  },
  {
    date: "21st Apr 2023",
    title: "Affiliate Stream!",
    description:
      "A major milestone! Soapdax officially became a Twitch Affiliate.",
    icon: <Trophy className="w-5 h-5" />,
    highlight: true,
  },
  {
    date: "7th May 2023",
    title: "First 100 Followers!",
    description:
      "The community started growing and we hit our first big follower milestone!",
    icon: <Users className="w-5 h-5" />,
  },
  {
    date: "6th Jun 2023",
    title: "200 Followers!",
    description:
      "The community doubled in size. The Soapdaxverse was expanding!",
    icon: <Users className="w-5 h-5" />,
  },
  {
    date: "21st Aug 2023",
    title: "500 Followers!",
    description:
      "Half a thousand people joined the journey. Incredible growth!",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    date: "2nd Oct 2023",
    title: "1K Followers!",
    description:
      "One thousand followers! A massive milestone for the community.",
    icon: <PartyPopper className="w-5 h-5" />,
    highlight: true,
  },
  {
    date: "19th May 2024",
    title: "2K Followers!",
    description: "The community doubled again. Two thousand strong!",
    icon: <Users className="w-5 h-5" />,
  },
  {
    date: "19th-25th Jun 2024",
    title: "First Donothon!",
    description:
      "Celebrating 2.1K followers with the very first donothon event!",
    icon: <Flame className="w-5 h-5" />,
    highlight: true,
  },
  {
    date: "20th Nov 2024",
    title: "3K Followers!",
    description: "Three thousand followers joined the Soapdaxverse!",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    date: "8th Dec 2024",
    title: "24HR Stream Complete!",
    description:
      "An epic 24-hour stream celebrating 3K and reaching 3.1K followers!",
    icon: <Zap className="w-5 h-5" />,
    highlight: true,
  },
  {
    date: "9th Feb 2025",
    title: "2 Year Anniversary!",
    description:
      "Two years of amazing streams, incredible moments, and an unforgettable community.",
    icon: <PartyPopper className="w-5 h-5" />,
    highlight: true,
  },
  {
    date: "19th Jul 2025",
    title: "Donothon Complete - 4K!",
    description:
      "28 days of streaming! 4K followers, 250 subs, and an incredible donation total!",
    icon: <Trophy className="w-5 h-5" />,
    highlight: true,
  },
  {
    date: "1st Oct 2025",
    title: "Finished first subathon!",
    description: "More than 500 subs achieved! and chuddax face reveal!!",
    icon: <Trophy className="w-5 h-5" />,
    highlight: true,
  },
    {
    date: "21st Apr 2025",
    title: "Third year affiliate anniversary!!! <3",
    description: "24 HOURS OF PURE CHAOS AND MEMORIES TO BE SHARED :3",
    icon: <Trophy className="w-5 h-5" />,
    highlight: true,
  },
];

function FloatingArtPiece({
  art,
  index,
}: {
  art: (typeof floatingArt)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, x: art.side === "left" ? -100 : 100 }}
      animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      className={`absolute hidden xl:block z-0 ${
        art.side === "left"
          ? "-left-32 2xl:-left-48"
          : "-right-32 2xl:-right-48"
      }`}
      style={{ top: `${index * 280 + 150}px` }}
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: art.side === "left" ? [-2, 2, -2] : [2, -2, 2],
        }}
        transition={{
          duration: 4 + index * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        <div className="relative w-32 h-32 2xl:w-40 2xl:h-40 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-lg shadow-primary/20 bg-card">
          <Image src={art.src} alt={art.alt} fill className="object-cover" />
        </div>
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-xl -z-10" />
      </motion.div>
    </motion.div>
  );
}

function TimelineCard({
  milestone,
  index,
}: {
  milestone: Milestone;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`flex items-center gap-4 md:gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`flex-1 ${isLeft ? "md:text-right" : "md:text-left"}`}
      >
        <div
          className={`inline-block p-6 rounded-2xl ${
            milestone.highlight
              ? "bg-accent/10 border border-accent/30"
              : "bg-card border border-border"
          }`}
        >
          <div
            className={`flex items-center gap-3 mb-3 ${isLeft ? "md:flex-row-reverse" : ""}`}
          >
            <div
              className={`p-2 rounded-lg ${
                milestone.highlight
                  ? "bg-accent text-accent-foreground"
                  : "bg-primary/20 text-primary"
              }`}
            >
              {milestone.icon}
            </div>
            <span className="text-sm text-muted-foreground font-medium">
              {milestone.date}
            </span>
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            {milestone.title}
          </h3>
          <p className="text-muted-foreground">{milestone.description}</p>
        </div>
      </motion.div>

      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative z-10 hidden md:block"
      >
        <div
          className={`w-5 h-5 rounded-full ${
            milestone.highlight ? "bg-accent" : "bg-primary"
          } ring-4 ring-background`}
        />
        {milestone.highlight && (
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-accent"
          />
        )}
      </motion.div>

      {/* Spacer for alternating layout */}
      <div className="flex-1 hidden md:block" />
    </div>
  );
}

export function TimelineSection() {
  return (
    <section id="timeline" className="py-24 px-4 relative overflow-visible">
      <div className="max-w-6xl mx-auto relative">
        {/* Floating art pieces on the sides */}
        {floatingArt.map((art, index) =>
          (index > -1 && index < 12) ||
          (index > 16 && index != 19 && index != 20 && index < 22) ||
          index > 26 ? (
            <FloatingArtPiece key={index} art={art} index={index} />
          ) : null,
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            <Calendar className="w-4 h-4" />
            The Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            A journey that started 3 years ago
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A lot of time has past since the beginning of your journey, and a lot of things have happened as well, hopefully this reminds you of all the things you have achieved, and motivates you to keep achieving new goals!
          </p>
        </motion.div>

        {/* Timeline line */}
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-accent/50 to-primary/50 hidden md:block -translate-x-1/2" />

          <div className="space-y-8 md:space-y-12">
            {milestones.map((milestone, index) => (
              <TimelineCard key={index} milestone={milestone} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
