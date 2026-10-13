"use client"

import { useRef, type ReactNode } from "react"
import Image from "next/image"
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion"

type Photo = {
  src: string
  /** which side of the content it floats on */
  side: "left" | "right"
  /** vertical position inside the wrapper */
  top: string
  /** how far it drifts (px) while the section scrolls past: bigger = faster parallax */
  drift: number
  /** resting tilt (deg) and how much extra it spins while scrolling */
  tilt: number
  spin: number
  /** float loop timing */
  floatDuration: number
  floatDelay: number
  /** pixel width of the photo */
  width: number
}

const PHOTOS: Photo[] = [
  { src: "/1.png", side: "left", top: "3%", drift: 140, tilt: -6, spin: 10, floatDuration: 5.5, floatDelay: 0, width: 168 },
  { src: "/2.png", side: "right", top: "27%", drift: -120, tilt: 5, spin: -12, floatDuration: 6.5, floatDelay: 0.8, width: 176 },
  { src: "/3.png", side: "left", top: "52%", drift: 160, tilt: 4, spin: -9, floatDuration: 6, floatDelay: 1.4, width: 160 },
  { src: "/4.png", side: "right", top: "76%", drift: -150, tilt: -5, spin: 11, floatDuration: 5, floatDelay: 0.4, width: 172 },
]

function FloatingPhoto({ photo, progress, reduce }: { photo: Photo; progress: MotionValue<number>; reduce: boolean }) {
  // Scroll-linked drift + spin: each photo moves at its own speed, so they feel like they float at different depths.
  const y = useTransform(progress, [0, 1], reduce ? [0, 0] : [-photo.drift / 2, photo.drift / 2])
  const rotate = useTransform(progress, [0, 1], [photo.tilt - photo.spin / 2, photo.tilt + photo.spin / 2])
  const side = photo.side === "left" ? { left: `-${photo.width + 40}px` } : { right: `-${photo.width + 40}px` }

  return (
    <motion.div className="absolute z-10 hidden xl:block" style={{ top: photo.top, width: photo.width, y, rotate, ...side }}>
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.2, rotate: photo.side === "left" ? -25 : 25 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ type: "spring", stiffness: 120, damping: 12, delay: photo.floatDelay * 0.2 }}
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -14, 0], x: [0, photo.side === "left" ? 6 : -6, 0] }}
          transition={{ duration: photo.floatDuration, repeat: Infinity, ease: "easeInOut", delay: photo.floatDelay }}
        >
          <Image
            src={photo.src}
            alt=""
            width={0}
            height={0}
            sizes={`${photo.width}px`}
            unoptimized
            style={{ width: "100%", height: "auto" }}
            className="rounded-2xl border border-primary/30 bg-card/70 p-2 shadow-xl shadow-primary/20 transition duration-300 hover:scale-110 hover:border-primary hover:shadow-2xl hover:shadow-primary/40"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// Wraps a block of content and floats four photos (1.png to 4.png) in the margins beside it while you scroll past.
export function FloatingPhotos({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion() ?? false
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })

  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      {PHOTOS.map((photo) => <FloatingPhoto key={photo.src} photo={photo} progress={scrollYProgress} reduce={reduce} />)}
      {children}
    </div>
  )
}

export default FloatingPhotos