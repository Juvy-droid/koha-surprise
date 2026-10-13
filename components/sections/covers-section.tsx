"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Play, Music, Heart, Sparkles, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// Replace with actual YouTube cover videos - use video ID from YouTube URL
const covers = [
  {
    id: "1",
    title: "言って。(Say It.) - [ ヨルシカ ] n-buna Official / ver. Soapdax",
    videoId: "vgkNJlthxy8", // Replace with actual YouTube video ID
    thumbnail: "https://i3.ytimg.com/vi/vgkNJlthxy8/hqdefault.jpg",
  },
  {
    id: "2",
    title: "Shoujo Rei - みきとP / ver. Soapdax & Yearlu (Reupload)",
    videoId: "u0aFl7DdcR4", // Replace with actual YouTube video ID
    thumbnail: "https://i3.ytimg.com/vi/u0aFl7DdcR4/hqdefault.jpg",
  },
  {
    id: "3",
    title: "運命の人 (The Person I'm Meant For/ The One) -『ユイカ』/ ver. Soapdax",
    videoId: "cGyHnSG4VLo", // Replace with actual YouTube video ID
    thumbnail: "https://i3.ytimg.com/vi/cGyHnSG4VLo/maxresdefault.jpg",
  },
  {
    id: "4",
    title: "「僕は...」(I Am...) - あたらよ / ver. Soapdax & Lominoes",
    videoId: "HSEN1hCAB4U", // Replace with actual YouTube video ID
    thumbnail: "https://i3.ytimg.com/vi/HSEN1hCAB4U/hqdefault.jpg",
  },
  {
    id: "5",
    title: "Staying - Lizzy McAlpine / ver. Soapdax",
    videoId: "ico_c1ryOg0", // Replace with actual YouTube video ID
    thumbnail: "https://i3.ytimg.com/vi/ico_c1ryOg0/maxresdefault.jpg",
  },
    {
    id: "6",
    title: "An uncomplete project of Girl A",
    videoId: "KTDZXlGusnY", // Replace with actual YouTube video ID
    thumbnail: "https://media.discordapp.net/attachments/1414033172953432135/1495917785237295114/SPOILER_image.png?ex=69e7fd80&is=69e6ac00&hm=900bd8b22cf820682898c675f96aea82d1daa1841cfb1fbf5df74b65e48a378a&animated=true",
  },
]


export function CoversSection() {
  const [selectedCover, setSelectedCover] = useState<typeof covers[0] | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section
      id="covers"
      ref={sectionRef}
      className="min-h-screen py-20 px-4 md:px-8 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        {/* Musical notes floating */}
        <motion.div
          className="absolute top-1/8 left-[22%] text-primary/20 text-6xl"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Music className="w-12 h-12" />
        </motion.div>
        <motion.div
          className="absolute top-1/3 right-[10%] text-accent/20 text-4xl"
          animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <Music className="w-8 h-8" />
        </motion.div>
        <motion.div
          className="absolute bottom-1/3 left-[12%] text-primary/15 text-5xl"
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Music className="w-10 h-10" />
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-6">
            <Music className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Bangers</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Your <span className="text-primary">Voice</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We know you been working really hard even though you sometimes dont believe in your own capacities, every time you have surpassed urself with each new cover, pls never stop bringing new covers cause you always cook! and hopefully this can show you how much you have improved homie!
          </p>
        </motion.div>

        {/* Covers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {covers.map((cover, index) => (
            <motion.div
              key={cover.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer bg-card border border-border"
              onClick={() => setSelectedCover(cover)}
            >
              <Image
                src={cover.thumbnail}
                alt={cover.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.1 }}
                >
                  <Play className="w-6 h-6 text-primary-foreground ml-1" />
                </motion.div>
              </div>

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {cover.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* YouTube Channel Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <a
              href="https://www.youtube.com/@soapdax"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <span>Visit Her YouTube</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Pls check her out and support her covers!
          </p>
        </motion.div>

        {/* Big gratitude message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-20 text-center"
        >
          <div className="relative inline-block">
            <Sparkles className="absolute -top-4 -left-4 w-6 h-6 text-primary animate-pulse" />
            <Sparkles className="absolute -bottom-4 -right-4 w-6 h-6 text-accent animate-pulse" />
            <blockquote className="text-2xl md:text-3xl font-medium text-foreground italic max-w-3xl mx-auto leading-relaxed">
              &ldquo;Keep singing like it matters, because it truly does.&rdquo;
            </blockquote>
          </div>
          <p className="text-muted-foreground mt-4">- With love, from Erika & Ephy</p>
        </motion.div>
      </div>

      {/* Video Modal */}
      {selectedCover && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedCover(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-4xl aspect-video bg-card rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${selectedCover.videoId}?autoplay=1`}
              title={selectedCover.title}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>
          
          {/* Close hint */}
          <p className="absolute bottom-8 text-muted-foreground text-sm">
            Click outside to close
          </p>
        </motion.div>
      )}
    </section>
  )
}
