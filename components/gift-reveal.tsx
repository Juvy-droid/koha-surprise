"use client"

import { useCallback, useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react"
import Image from "next/image"
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion"
import { Palette, RotateCcw, Sparkles, X, ZoomIn } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

type Phase = "idle" | "shaking" | "open"
type Piece = { id: number; x: number; y: number; rotate: number; size: number; color: string; delay: number; round: boolean }

const CONFETTI_COLORS = ["#f472b6", "#fbbf24", "#60a5fa", "#34d399", "#c084fc", "#fb7185", "#ffffff"]
const SPARKLES = [
  { left: "6%", top: "46%", size: 18, delay: 0 },
  { left: "88%", top: "56%", size: 22, delay: 0.7 },
  { left: "16%", top: "80%", size: 14, delay: 1.3 },
  { left: "80%", top: "84%", size: 16, delay: 0.3 },
  { left: "50%", top: "40%", size: 12, delay: 1.8 },
]

// The drawing. Falls back to a placeholder if the image file is missing.
function Artwork({ src, alt, sizes }: { src: string; alt: string; sizes: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div className="flex size-full flex-col items-center justify-center gap-3 bg-card p-4 text-center text-muted-foreground">
        <Palette className="size-8 text-primary" />
        <p className="text-xs leading-5">Put the drawing at <span className="font-mono text-primary">public{src}</span></p>
      </div>
    )
  }
  return <Image src={src} alt={alt} fill unoptimized sizes={sizes} onError={() => setFailed(true)} className="object-contain" />
}

export function GiftReveal({
  src = "/gift-drawing.png",
  alt = "A hand-drawn gift made for you by buns!!",
  title = "A little gift.",
  eyebrow = "<33",
  aspect = 2744 / 2000,
  text = "Buns prepared this lovely gift for you, so we hope you like it <33, once again thank you buns for ur work :3",
}: {
  src?: string
  alt?: string
  title?: string
  eyebrow?: string
  text?: string
  /** width / height of the drawing so it is never cropped */
  aspect?: number
}) {
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState<Phase>("idle")
  const [confetti, setConfetti] = useState<Piece[]>([])
  const [lightbox, setLightbox] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  // Cursor-follow tilt (only while the gift is closed) so it feels like a physical object.
  const stageRef = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const tiltX = useSpring(useTransform(my, [-1, 1], [14, -14]), { stiffness: 140, damping: 14 })
  const tiltY = useSpring(useTransform(mx, [-1, 1], [-18, 18]), { stiffness: 140, damping: 14 })

  const onMove = (event: ReactMouseEvent) => {
    const rect = stageRef.current?.getBoundingClientRect()
    if (!rect) return
    mx.set(((event.clientX - rect.left) / rect.width) * 2 - 1)
    my.set(((event.clientY - rect.top) / rect.height) * 2 - 1)
  }
  const onLeave = () => { mx.set(0); my.set(0) }

  useEffect(() => () => window.clearTimeout(timer.current), [])

  // Lightbox: close on Escape and lock page scroll while it is open.
  useEffect(() => {
    if (!lightbox) return
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setLightbox(false) }
    window.addEventListener("keydown", onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = previous }
  }, [lightbox])

  const openGift = useCallback(() => {
    if (phase !== "idle") return
    setPhase("shaking")
    timer.current = window.setTimeout(() => {
      setConfetti(Array.from({ length: 56 }, (_, id) => ({
        id,
        x: (Math.random() - 0.5) * 620,
        y: -(120 + Math.random() * 360),
        rotate: Math.random() * 900 - 450,
        size: 6 + Math.random() * 9,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        delay: Math.random() * 0.15,
        round: Math.random() > 0.6,
      })))
      setPhase("open")
    }, reduce ? 150 : 1100)
  }, [phase, reduce])

  const closeGift = () => {
    window.clearTimeout(timer.current)
    setConfetti([])
    setPhase("idle")
  }

  const isOpen = phase === "open"
  const shaking = phase === "shaking"

  const boxMotion = reduce
    ? {}
    : shaking
      ? { x: [0, -8, 8, -12, 12, -16, 16, -6, 6, 0], rotate: [0, -3, 3, -5, 5, -7, 7, -2, 2, 0], y: [0, -4, 0, -6, 0, -10, 0], scale: [1, 1.02, 1, 1.04, 1, 1.06, 1] }
      : phase === "idle"
        ? { y: [0, -18, 0, -8, 0], rotate: [0, -2, 2, 0, 0] }
        : { y: 0, x: 0, rotate: 0, scale: 1 }

  const boxTransition = shaking
    ? { duration: 1.05, ease: "easeInOut" as const }
    : phase === "idle" && !reduce
      ? { duration: 1.4, repeat: Infinity, repeatDelay: 2.4, ease: "easeInOut" as const }
      : { duration: 0.4 }

  return (
    <section id="gift" className="relative mt-24 overflow-visible" aria-label="Gift reveal">
      <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        {/* Text side */}
        <div className="text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            transition={{ duration: 0.8, ease }}
            className="font-mono text-xs uppercase tracking-[0.3em] text-primary"
          >
            {eyebrow}
          </motion.p>
          <motion.h3
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } }}
            className="mt-4 text-4xl font-bold sm:text-6xl"
          >
            {title.split(" ").map((word, index) => (
              <span key={index}>
                <motion.span
                  className="inline-block"
                  variants={{ hidden: { opacity: 0, y: 44, rotate: 4, filter: "blur(10px)" }, show: { opacity: 1, y: 0, rotate: 0, filter: "blur(0px)", transition: { duration: 0.8, ease } } }}
                >
                  {word}
                </motion.span>{" "}
              </span>
            ))}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            transition={{ duration: 0.9, delay: 0.35, ease }}
            className="mx-auto mt-6 max-w-md leading-8 text-muted-foreground lg:mx-0"
          >
            {text}
          </motion.p>
          <div className="mt-8 flex h-11 items-center justify-center lg:justify-start">
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.button
                  key="again"
                  type="button"
                  onClick={closeGift}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-5 py-2 text-sm text-muted-foreground transition hover:border-primary hover:text-foreground"
                >
                  <RotateCcw className="size-4" /> Wrap it back up
                </motion.button>
              ) : (
                <motion.p
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="inline-flex items-center gap-2 text-sm text-primary"
                >
                  <motion.span animate={reduce ? undefined : { scale: [1, 1.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }}><Sparkles className="size-4" /></motion.span>
                  {shaking ? "Something is happening..." : "Click the gift"}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Gift side */}
        <motion.div
          ref={stageRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          initial={{ opacity: 0, scale: 0.7, y: 60 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.2 }}
          className="relative mx-auto h-[36rem] w-full max-w-lg origin-bottom scale-[0.8] sm:scale-100"
        >
          {/* Glow + light rays */}
          <motion.div
            aria-hidden="true"
            className="absolute left-1/2 top-[44%] size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[110px]"
            animate={{ opacity: isOpen ? 1 : shaking ? 0.7 : 0.35, scale: isOpen ? 1.15 : shaking ? 0.95 : 0.8 }}
            transition={{ duration: 0.9, ease }}
          />
          <AnimatePresence>
            {isOpen && (
              <motion.div
                aria-hidden="true"
                className="absolute left-1/2 top-[44%] size-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
                style={{ background: "conic-gradient(from 0deg, transparent 0 8%, rgba(255,255,255,0.35) 10%, transparent 14% 33%, rgba(255,255,255,0.3) 35%, transparent 39% 58%, rgba(255,255,255,0.35) 60%, transparent 64% 83%, rgba(255,255,255,0.3) 85%, transparent 89%)", maskImage: "radial-gradient(circle, black 15%, transparent 65%)", WebkitMaskImage: "radial-gradient(circle, black 15%, transparent 65%)" }}
                initial={{ opacity: 0, scale: 0.3, rotate: 0 }}
                animate={{ opacity: 0.5, scale: 1, rotate: 360 }}
                exit={{ opacity: 0 }}
                transition={{ opacity: { duration: 1 }, scale: { duration: 1.2, ease }, rotate: { duration: 40, repeat: Infinity, ease: "linear" } }}
              />
            )}
          </AnimatePresence>

          {/* Idle sparkles */}
          {!isOpen && SPARKLES.map((sparkle, index) => (
            <motion.span
              key={index}
              aria-hidden="true"
              className="absolute text-primary"
              style={{ left: sparkle.left, top: sparkle.top }}
              animate={reduce ? undefined : { opacity: [0, 1, 0], scale: [0.4, 1.2, 0.4], rotate: [0, 90, 180] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: sparkle.delay }}
            >
              <Sparkles style={{ width: sparkle.size, height: sparkle.size }} />
            </motion.span>
          ))}

          {/* The drawing: rises out of the box, floats, and can be enlarged */}
          <motion.div
            className="absolute bottom-[6.5rem] left-1/2 z-10 -ml-[8rem] w-64"
            initial={false}
            animate={isOpen ? { y: -235, scale: 1, opacity: 1, rotate: 0 } : { y: 0, scale: 0.45, opacity: 0, rotate: -14 }}
            transition={isOpen ? { type: "spring", stiffness: 70, damping: 12, delay: 0.45 } : { duration: 0.35 }}
            style={{ pointerEvents: isOpen ? "auto" : "none" }}
          >
            <motion.div
              animate={isOpen && !reduce ? { y: [0, -14, 0], rotate: [-2.5, 2.5, -2.5] } : { y: 0, rotate: 0 }}
              transition={isOpen ? { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.6 } : { duration: 0.3 }}
            >
              <motion.button
                type="button"
                onClick={() => setLightbox(true)}
                whileHover={{ scale: 1.12, rotate: 3 }}
                whileTap={{ scale: 0.95 }}
                className="group relative block w-full cursor-zoom-in rounded-md bg-white p-2.5 pb-8 shadow-2xl shadow-primary/40 outline-none ring-primary focus-visible:ring-2"
                aria-label="Enlarge the drawing"
              >
                <div className="relative w-full overflow-hidden bg-muted" style={{ aspectRatio: aspect }}>
                  <Artwork src={src} alt={alt} sizes="256px" />
                </div>
                <span className="absolute inset-x-0 bottom-1.5 flex items-center justify-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-neutral-500 transition group-hover:text-neutral-900">
                  <ZoomIn className="size-3" /> tap to enlarge
                </span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* The gift box */}
          <motion.div
            className="absolute inset-x-0 bottom-0 z-20 flex h-[16rem] items-end justify-center"
            style={{ rotateX: isOpen ? 0 : tiltX, rotateY: isOpen ? 0 : tiltY, transformPerspective: 900 }}
          >
            <motion.div
              role="button"
              tabIndex={isOpen ? -1 : 0}
              aria-label="Open the gift"
              aria-disabled={isOpen}
              onClick={openGift}
              onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openGift() } }}
              whileHover={phase === "idle" ? { scale: 1.06 } : undefined}
              whileTap={phase === "idle" ? { scale: 0.93 } : undefined}
              animate={boxMotion}
              transition={boxTransition}
              className={`relative h-[12.5rem] w-[15rem] outline-none ${phase === "idle" ? "cursor-pointer" : "cursor-default"}`}
            >
              {/* Body */}
              <div className="absolute inset-x-2 bottom-2 h-40 overflow-hidden rounded-b-2xl rounded-t-md bg-gradient-to-b from-primary to-primary/60 shadow-2xl shadow-primary/40 ring-1 ring-white/10">
                <div className="absolute inset-y-0 left-1/2 w-10 -translate-x-1/2 bg-white/90 shadow-[inset_0_0_12px_rgba(0,0,0,0.12)]" />
                <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black/20 to-transparent" />
                <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-black/20 to-transparent" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-transparent"
                  animate={reduce ? undefined : { opacity: shaking ? [0.3, 1, 0.3] : [0.4, 0.8, 0.4] }}
                  transition={{ duration: shaking ? 0.3 : 3, repeat: Infinity }}
                />
              </div>

              {/* Lid + bow: flies off when opened */}
              <motion.div
                className="absolute inset-x-0 bottom-[8.75rem] z-10 h-14 origin-bottom-left"
                animate={isOpen ? { y: -230, x: -150, rotate: -38, opacity: 0 } : { y: 0, x: 0, rotate: 0, opacity: 1 }}
                transition={isOpen ? { type: "spring", stiffness: 60, damping: 10, opacity: { duration: 1.1, delay: 0.5 } } : { duration: 0.5, ease }}
              >
                <div className="absolute inset-0 overflow-hidden rounded-xl bg-gradient-to-b from-primary to-primary/75 shadow-lg ring-1 ring-white/15">
                  <div className="absolute inset-y-0 left-1/2 w-10 -translate-x-1/2 bg-white/90" />
                  <div className="absolute inset-x-0 top-0 h-2 bg-white/25" />
                </div>
                {/* Bow */}
                <motion.div
                  className="absolute -top-9 left-1/2 -ml-8 h-10 w-16"
                  animate={shaking && !reduce ? { rotate: [0, -12, 12, -16, 16, 0], scale: [1, 1.1, 1, 1.15, 1] } : { rotate: 0, scale: 1 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                >
                  <div className="absolute bottom-0 left-0 size-8 -rotate-12 rounded-full rounded-br-none border-[6px] border-white/90 bg-white/10" />
                  <div className="absolute bottom-0 right-0 size-8 rotate-12 rounded-full rounded-bl-none border-[6px] border-white/90 bg-white/10" />
                  <div className="absolute -bottom-1 left-1/2 size-5 -translate-x-1/2 rounded-md bg-white shadow" />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Confetti burst */}
          <div className="pointer-events-none absolute bottom-[10rem] left-1/2 z-30" aria-hidden="true">
            {confetti.map((piece) => (
              <motion.span
                key={piece.id}
                className={`absolute block ${piece.round ? "rounded-full" : "rounded-[2px]"}`}
                style={{ width: piece.size, height: piece.size * (piece.round ? 1 : 0.6), backgroundColor: piece.color }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
                animate={{ x: [0, piece.x, piece.x * 1.15], y: [0, piece.y, piece.y + 380], opacity: [1, 1, 0], scale: [0, 1, 1], rotate: piece.rotate }}
                transition={{ duration: 2.2, delay: piece.delay, ease: "easeOut", times: [0, 0.45, 1] }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-background/90 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightbox(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Enlarged drawing"
          >
            <motion.div
              className="relative overflow-hidden rounded-lg bg-white p-3 shadow-2xl shadow-primary/40"
              style={{ width: `min(92vw, calc((88vh - 1.5rem) * ${aspect} + 1.5rem))` }}
              initial={{ scale: 0.4, rotate: -6, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.5, rotate: 4, opacity: 0 }}
              transition={{ type: "spring", stiffness: 160, damping: 18 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative w-full overflow-hidden bg-muted" style={{ aspectRatio: aspect }}>
                <Artwork src={src} alt={alt} sizes="92vw" />
              </div>
            </motion.div>
            <button
              type="button"
              onClick={() => setLightbox(false)}
              className="absolute right-5 top-5 rounded-full border border-primary/40 bg-card/80 p-3 text-foreground transition hover:scale-110 hover:border-primary"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default GiftReveal