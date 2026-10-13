"use client"

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import Image from "next/image"
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionProps, type Variants } from "framer-motion"
import { ArrowDown, Gift, Heart, Image as ImageIcon, LockKeyhole, Mic2, Sparkles, Stars, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GiftReveal } from "@/components/gift-reveal"
import { FloatingPhotos } from "@/components/floating-photos"
import { Card, CardContent } from "@/components/ui/card"
import recapContent from "@/data/recap-content.json"

type ChorusCard = {
  name: string
  role: string
  image: string
  message?: string
  video?: string
  audio?: string
  twitch?: string
  photo?: string
  youtube?: string
}

type ThanksPerson = {
  name: string
  role: string
  contribution?: string
}

const friends = recapContent.welcomeImages
const chorusCards = recapContent.chorus as ChorusCard[]
const creators = recapContent.creators as ChorusCard[]
const thanks = recapContent.thanks as ThanksPerson[]


const ease = [0.22, 1, 0.36, 1] as const

type RevealFrom = "up" | "left" | "right" | "scale"

// Fades + slides a block in the first time it scrolls into view.
function Reveal({ children, className, delay = 0, from = "up" }: { children: ReactNode; className?: string; delay?: number; from?: RevealFrom }) {
  const reduce = useReducedMotion()
  const offsets = { up: { y: 56 }, left: { x: -72 }, right: { x: 72 }, scale: { scale: 0.88, y: 28 } }[from]
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, filter: "blur(10px)", ...offsets }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

type Word = { t: string; c?: string }

// Headline that reveals word by word. Pass `active` to trigger manually, otherwise it plays when scrolled into view.
function SplitWords({ words, active, delay = 0, stagger = 0.09 }: { words: Word[]; active?: boolean; delay?: number; stagger?: number }) {
  const reduce = useReducedMotion()
  const container: Variants = { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }
  const word: Variants = {
    hidden: { opacity: 0, y: 44, rotate: 4, filter: "blur(10px)" },
    show: { opacity: 1, y: 0, rotate: 0, filter: "blur(0px)", transition: { duration: 0.8, ease } },
  }
  const trigger: MotionProps = active === undefined
    ? { whileInView: "show", viewport: { once: true, margin: "0px 0px -15% 0px" } }
    : { animate: active ? "show" : "hidden" }
  return (
    <motion.span className="inline" variants={container} initial={reduce ? "show" : "hidden"} {...trigger}>
      {words.map((w, i) => w.t === "\n"
        ? <br key={i} />
        : <span key={i}><motion.span variants={word} className={`inline-block ${w.c ?? ""}`}>{w.t}</motion.span>{" "}</span>)}
    </motion.span>
  )
}

// Soft glow that drifts at a different speed than the page, giving a sense of depth while scrolling.
function ParallaxGlow({ className = "", range = 140 }: { className?: string; range?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [range, -range])
  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div style={{ y }} className={`absolute rounded-full bg-primary/15 blur-[110px] ${className}`} />
    </div>
  )
}

const INTRO_YOUTUBE = "https://youtu.be/zPDxgeGOhn4"

// Accepts a full YouTube link (watch, youtu.be, shorts, live, embed) or just the 11-character video id.
function youtubeEmbed(input: string) {
  const id = input.match(/(?:youtu\.be\/|v=|embed\/|shorts\/|live\/)([\w-]{11})/)?.[1] ?? input.match(/^([\w-]{11})$/)?.[1]
  if (!id) return null
  const start = input.match(/[?&](?:t|start)=(\d+)/)?.[1]
  return `https://www.youtube-nocookie.com/embed/${id}?rel=0${start ? `&start=${start}` : ""}`
}

type FloatingHeart = { id: number; dx: number; dy: number; size: number; rotate: number; duration: number; color: string }

const HEART_COLORS = ["text-pink-400", "text-rose-500", "text-primary", "text-pink-300"]

// Easter egg: hearts burst out of the wrapped image while it is hovered. Pass enabled={false} to leave an image untouched.
function HeartBurst({ children, enabled = true }: { children: ReactNode; enabled?: boolean }) {
  const [hearts, setHearts] = useState<FloatingHeart[]>([])
  const [hovering, setHovering] = useState(false)
  const nextId = useRef(0)
  const interval = useRef<number | undefined>(undefined)
  const cutoff = useRef<number | undefined>(undefined)

  const spawn = (count: number, radial: boolean) => {
    const fresh = Array.from({ length: count }, () => {
      const angle = radial ? Math.random() * Math.PI * 2 : -Math.PI / 2 + (Math.random() - 0.5) * 1.4
      const distance = radial ? 90 + Math.random() * 90 : 110 + Math.random() * 100
      return {
        id: nextId.current++,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance - (radial ? 0 : 20),
        size: 14 + Math.random() * 18,
        rotate: (Math.random() - 0.5) * 70,
        duration: 1.4 + Math.random() * 1,
        color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
      }
    })
    setHearts((current) => [...current.slice(-40), ...fresh])
  }

  const stop = () => {
    window.clearInterval(interval.current)
    window.clearTimeout(cutoff.current)
    setHovering(false)
  }

  const start = () => {
    stop()
    setHovering(true)
    spawn(12, true)
    interval.current = window.setInterval(() => spawn(2, false), 200)
    cutoff.current = window.setTimeout(stop, 6000)
  }

  useEffect(() => () => { window.clearInterval(interval.current); window.clearTimeout(cutoff.current) }, [])

  if (!enabled) return <>{children}</>

  return (
    <motion.div
      className="relative"
      onMouseEnter={start}
      onMouseLeave={stop}
      animate={hovering ? { scale: [1, 1.08, 1, 1.08, 1] } : { scale: 1 }}
      transition={hovering ? { duration: 1.1, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
    >
      {children}
      <div className="pointer-events-none absolute inset-0 z-30" aria-hidden="true">
        {hearts.map((heart) => (
          <motion.span
            key={heart.id}
            className={`absolute left-1/2 top-1/2 -ml-2 -mt-2 ${heart.color}`}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
            animate={{ x: heart.dx, y: heart.dy, scale: [0, 1.2, 0.9], opacity: [1, 1, 0], rotate: heart.rotate }}
            transition={{ duration: heart.duration, ease: "easeOut", times: [0, 0.3, 1] }}
            onAnimationComplete={() => setHearts((current) => current.filter((item) => item.id !== heart.id))}
          >
            <Heart className="fill-current drop-shadow-[0_0_6px_rgba(244,114,182,0.7)]" style={{ width: heart.size, height: heart.size }} />
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

function ChorusCardView({ card }: { card: ChorusCard }) {
  const [open, setOpen] = useState(false)
  return (
    <Card className={`group overflow-hidden border-primary/20 bg-background/80 transition-all duration-500 hover:-translate-y-3 hover:rotate-[1deg] hover:border-primary/70 hover:shadow-2xl hover:shadow-primary/20 ${open ? "ring-2 ring-primary/50" : ""}`}>
      <button type="button" onClick={() => setOpen((value) => !value)} className="w-full text-left" aria-expanded={open}>
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary/25 to-card">
          <Image src={card.image} alt={`${card.name} portrait`} fill unoptimized className="object-cover transition duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-3"><div><p className="text-xl font-bold text-white">{card.name}</p><p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{card.role}</p></div><span className="rounded-full border border-white/30 bg-background/70 p-3 text-primary transition-transform group-hover:scale-110 group-active:scale-90">{card.video || card.twitch || card.youtube ? <Video className="size-4" /> : card.audio ? <Mic2 className="size-4" /> : card.photo ? <ImageIcon className="size-4" /> : <Heart className="size-4" />}</span></div>
        </div>
      </button>
      <CardContent className="flex flex-col gap-4 p-5"><p className="text-sm leading-6 text-muted-foreground">{card.message || ""}</p>{open && <div className="animate-in fade-in slide-in-from-top-2 duration-500">{card.photo && <Image src={card.photo} alt={`${card.name} attachment`} width={0} height={0} sizes="(min-width: 1024px) 33vw, 100vw" unoptimized style={{ width: "100%", height: "auto" }} className="rounded-xl border border-border" />}{card.video && <video className="w-full rounded-xl border border-border" controls preload="metadata" src={card.video}><track kind="captions" /></video>}{card.youtube && youtubeEmbed(card.youtube) && <iframe title={`${card.name} YouTube video`} src={youtubeEmbed(card.youtube) ?? undefined} className="aspect-video w-full rounded-xl border border-border" allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture" allowFullScreen loading="lazy" />}{card.audio && <audio aria-label={`${card.name} voice note`} className="w-full" controls preload="metadata" src={card.audio} />}{card.twitch && <iframe title={`${card.name} Twitch clip`} src={`${card.twitch}${card.twitch.includes("?") ? "&" : "?"}parent=localhost`} className="aspect-video w-full rounded-xl border border-border" allow="autoplay; fullscreen" allowFullScreen />}</div>}</CardContent>
    </Card>
  )
}

export function RecapExperience() {
  const [reveals, setReveals] = useState(0)
  const [unlocked, setUnlocked] = useState(false)
  const [troll, setTroll] = useState(false)
  const [introGone, setIntroGone] = useState(false)
  const welcomeRef = useRef<HTMLElement>(null)
  const { scrollYProgress: pageProgress } = useScroll()
  const progressX = useSpring(pageProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  const { scrollYProgress: welcomeProgress } = useScroll({ target: welcomeRef, offset: ["start start", "end start"] })
  const welcomeY = useTransform(welcomeProgress, [0, 1], [0, -110])
  const welcomeOpacity = useTransform(welcomeProgress, [0, 0.85], [1, 0.15])
  const [arrived, setArrived] = useState(false)
  const [popped, setPopped] = useState(false)
  const [imagesReady, setImagesReady] = useState(false)
  const buttonPosition = useMemo(() => reveals === 1 ? "translate-x-40 -translate-y-12 rotate-6" : reveals === 2 ? "-translate-x-40 translate-y-10 -rotate-6" : "", [reveals])

  useEffect(() => {
    document.body.style.overflow = unlocked ? "" : "hidden"
    return () => { document.body.style.overflow = "" }
  }, [unlocked])

  // Always start at the top while the intro overlay is covering the page.
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual"
    window.scrollTo(0, 0)
  }, [])

  // Fully decode the floating images up front so they are ready to animate (big PNGs otherwise paint late and look like they just appear).
  useEffect(() => {
    let cancelled = false
    Promise.all(friends.map((friend) => {
      const image = new window.Image()
      image.src = friend.src
      return image.decode().catch(() => undefined)
    })).then(() => { if (!cancelled) setImagesReady(true) })
    return () => { cancelled = true }
  }, [])

  // After unlocking: fade the intro overlay out, let the archive arrive, then remove the overlay entirely.
  useEffect(() => {
    if (!unlocked) return
    const arriveTimer = window.setTimeout(() => setArrived(true), 700)
    const removeTimer = window.setTimeout(() => setIntroGone(true), 1200)
    // Images pop in only once the overlay is fully gone, so the animation is clearly visible.
    const popTimer = window.setTimeout(() => setPopped(true), 1500)
    return () => { window.clearTimeout(arriveTimer); window.clearTimeout(removeTimer); window.clearTimeout(popTimer) }
  }, [unlocked])

  useEffect(() => {
    const imageSources = [...friends.map((friend) => friend.src), ...chorusCards.map((card) => card.image), ...creators.map((card) => card.image), ...[...chorusCards, ...creators].flatMap((card) => (card.photo ? [card.photo] : []))]
    const mediaSources = [...chorusCards, ...creators].flatMap((card) => [card.video, card.audio, card.twitch].filter((source): source is string => Boolean(source)))
    const images = imageSources.map((src) => {
      const image = new window.Image()
      image.src = src
      return image
    })
    const media = mediaSources.map((src) => {
      const element = document.createElement(src.endsWith(".mp4") || src.includes("twitch") ? "video" : "audio")
      element.preload = "auto"
      element.src = src
      element.load()
      return element
    })
    return () => {
      images.forEach((image) => { image.src = "" })
      media.forEach((element) => { element.src = ""; element.load() })
    }
  }, [])

  const reveal = () => {
    if (reveals < 2) {
      setReveals((value) => value + 1)
      setTroll(true)
      return
    }
    setReveals(3)
    setTroll(false)
    setUnlocked(true)
  }

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <main className="overflow-hidden bg-background text-foreground">
      {!introGone && <section className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-background px-6 py-24 transition-all duration-1000 ${unlocked ? "pointer-events-none scale-110 opacity-0 blur-sm" : ""}`} aria-label="Birthday reveal">
        <motion.div className="absolute inset-0 birthday-grid" initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ duration: 1.8, ease }} />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div className="size-[38rem] rounded-full bg-primary/20 blur-[120px]" initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2, ease }} />
        </div>
        <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center text-center">
          <motion.div className="mb-8" initial={{ opacity: 0, scale: 0, rotate: -40 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 150, damping: 11, delay: 0.5 }}><motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} className="flex size-24 items-center justify-center rounded-3xl border border-primary/30 bg-card/80 shadow-2xl shadow-primary/20"><Gift className="size-11 text-primary" /></motion.div></motion.div>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.9, ease }} className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-muted-foreground">@evilephy</motion.p>
          <h1 className="text-balance text-5xl font-bold tracking-tight sm:text-7xl"><SplitWords active delay={1.1} stagger={0.12} words={[{ t: "A" }, { t: "little" }, { t: "secret" }, { t: "awaits" }, { t: "you" }, { t: "Koha.", c: "text-primary" }]} /></h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.9, ease }} className="mt-6 max-w-md text-pretty text-muted-foreground">Hi koha!, idk why but i think you should press that definitely not suspicious button.</motion.p>
          <motion.div className="mt-2 flex h-24 items-center justify-center" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 170, damping: 12, delay: 2.2 }}>
            <Button onClick={reveal} size="lg" className={`rounded-full px-8 shadow-lg shadow-primary/20 transition-transform duration-500 ${buttonPosition}`}>
              {reveals === 0 ? "Press me" : reveals < 3 ? "Try again" : "Smirk"} {reveals < 3 ? <LockKeyhole data-icon="inline-end" /> : <Sparkles data-icon="inline-end" />}
            </Button>
          </motion.div>
          <motion.div className="mt-3 flex gap-2" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 2.5, ease }} aria-label={`${reveals} of 3 reveals complete`}>
            {[0, 1, 2].map((step) => <span key={step} className={`h-1.5 w-10 rounded-full transition-colors ${step < reveals ? "bg-primary" : "bg-secondary"}`} />)}
          </motion.div>
        </div>
      </section>}

      {unlocked && <div className="fixed inset-0 z-[60] pointer-events-none reveal-explosion" aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /><span /></div>}

      {introGone && <motion.div className="fixed inset-x-0 top-0 z-[55] h-1 origin-left bg-primary" style={{ scaleX: progressX }} aria-hidden="true" />}

      <section ref={welcomeRef} id="welcome" className={`relative flex min-h-screen items-center justify-center border-t border-border/60 px-6 py-28 ${arrived ? "archive-arrival" : "opacity-0"}`}>
        <div className={`celebration-rays ${arrived ? "celebration-rays-visible" : ""}`} aria-hidden="true" />
        {popped && imagesReady && friends.map((friend, index) => (
          <motion.div
            key={friend.name}
            className={`absolute ${friend.position} hidden will-change-transform md:block`}
            initial={{ scale: 0, opacity: 0, rotate: -30 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 11, mass: 0.9, delay: index * 0.12, opacity: { duration: 0.25, delay: index * 0.12 } }}
          >
            <div className={`animate-float-${index + 1}`}>
              <HeartBurst enabled={friend.name === "ysa_abel"}>
                <Image src={friend.src} alt={friend.name} width={96} height={96} unoptimized className="pixelated rounded-2xl border border-primary/30 bg-card/70 p-2 shadow-xl transition duration-300 hover:z-20 hover:scale-150 hover:rotate-6 hover:border-primary hover:shadow-2xl hover:shadow-primary/30" />
              </HeartBurst>
            </div>
          </motion.div>
        ))}
        <motion.div style={{ y: welcomeY, opacity: welcomeOpacity }} className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.p initial={{ opacity: 0, y: 20, letterSpacing: "0.6em" }} animate={arrived ? { opacity: 1, y: 0, letterSpacing: "0.35em" } : undefined} transition={{ duration: 1.1, delay: 0.3, ease }} className="font-mono text-xs uppercase text-primary">smirk</motion.p>
          <h2 className="mt-5 text-balance text-6xl font-bold tracking-tight sm:text-8xl"><SplitWords active={arrived} delay={0.6} stagger={0.14} words={[{ t: "Happy" }, { t: "birthdayyy," }, { t: "Koha!", c: "text-primary" }]} /></h2>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={arrived ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.9, delay: 1.3, ease }} className="mx-auto mt-8 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">Hope you are having a wonderful day, this little gift was crafted with the love of many people that value you in their lifes, hope you like it! pls scroll down slowly thank you.</motion.p>
          <motion.div initial={{ opacity: 0, y: 24, scale: 0.9 }} animate={arrived ? { opacity: 1, y: 0, scale: 1 } : undefined} transition={{ duration: 0.8, delay: 1.6, ease }}>
            <Button onClick={() => scrollTo("story")} variant="outline" className="mt-10 rounded-full">Scroll down :3 <ArrowDown data-icon="inline-end" className="animate-bounce" /></Button>
          </motion.div>
        </motion.div>
      </section>

      <section id="story" className="relative">
        <ParallaxGlow className="-left-40 top-1/4 size-[30rem]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-28 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <div>
            <Reveal from="left"><p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">:3</p></Reveal>
            <h2 className="mt-4 text-4xl font-bold sm:text-6xl"><SplitWords words={[{ t: "A" }, { t: "little" }, { t: "context" }, { t: "for" }, { t: "you." }]} /></h2>
            <Reveal delay={0.25}><p className="mt-6 max-w-md leading-8 text-muted-foreground">Pls watch the following explanation video, it was made by the love and effort of everyone, so i hope you like it, and it helps clear your doubts about what is going on.</p></Reveal>
            <Reveal delay={0.4}><div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground"><Heart className="size-4 animate-pulse text-primary" /> - Juvy</div></Reveal>
          </div>
          <Reveal from="right" delay={0.15}>
            <div className="aspect-video overflow-hidden rounded-3xl border border-primary/30 bg-card shadow-2xl shadow-primary/10">{INTRO_YOUTUBE && youtubeEmbed(INTRO_YOUTUBE) ? <iframe title="Intro video" src={youtubeEmbed(INTRO_YOUTUBE) ?? undefined} className="size-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture" allowFullScreen loading="lazy" /> : <video className="size-full object-cover" controls preload="metadata" poster="/intro.png"><track kind="captions" /><span>Your browser does not support video playback.</span></video>}</div>
          </Reveal>
        </div>
      </section>

      <section id="clips" className="relative overflow-hidden border-y border-border/60 bg-card/30 px-6 py-28">
        <ParallaxGlow className="-right-40 top-10 size-[32rem]" range={180} />
        <div className="relative mx-auto max-w-7xl">
          <Reveal from="left"><p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">happy birthday kohaaa!</p></Reveal>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-4xl font-bold sm:text-6xl"><SplitWords words={[{ t: "From" }, { t: "the" }, { t: "people" }, { t: "\n" }, { t: "who" }, { t: "love" }, { t: "you." }]} /></h2>
            <Reveal from="right" delay={0.2}><p className="max-w-sm text-muted-foreground">Click on any card to open them and see what happens :3</p></Reveal>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{chorusCards.map((card, index) => <Reveal key={card.name} from="up" delay={(index % 3) * 0.14} className="h-full"><ChorusCardView card={card} /></Reveal>)}</div>
        </div>
      </section>

      <footer id="credits" className="relative overflow-hidden border-t border-border/60 bg-card/30 px-6 py-28">
        <ParallaxGlow className="left-1/3 top-1/3 size-[34rem]" range={160} />
        <div className="relative mx-auto max-w-6xl">
          <div className="text-center">
            <Reveal><p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">dumbass 1 and 2</p></Reveal>
            <h2 className="mt-4 text-4xl font-bold sm:text-6xl"><SplitWords words={[{ t: "Made" }, { t: "with" }, { t: "love.", c: "text-primary" }]} /></h2>
            <Reveal delay={0.25}><p className="mx-auto mt-5 max-w-xl text-muted-foreground">Hope you liked this little gift from everyone, hope you continue doing what you love, and hope this works as a reminder of how much you matter to people.</p></Reveal>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">{creators.map((card, index) => <Reveal key={card.name} from={index % 2 === 0 ? "left" : "right"} delay={0.1} className="h-full"><ChorusCardView card={card} /></Reveal>)}</div>
          <GiftReveal />
          <FloatingPhotos className="mx-auto mt-60 max-w-3xl">
            <Reveal><h3 className="text-center text-2xl font-bold">Big thanks to</h3></Reveal>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">{thanks.map((person, index) => <Reveal key={person.name} from="scale" delay={(index % 2) * 0.2}><div className="flex items-center justify-between gap-4 rounded-2xl border border-primary/15 bg-background/50 px-5 py-4 transition hover:-translate-y-1 hover:border-primary/50"><div className="min-w-0 flex-1"><span className="font-semibold">{person.name}</span>{person.contribution && <p className="mt-1 text-sm text-muted-foreground">{person.contribution}</p>}</div><Badge variant="secondary" className="min-w-[4.5rem] shrink-0 justify-center">{person.role}</Badge></div></Reveal>)}</div>
          </FloatingPhotos>
        </div>
      </footer>
    </main>
  )
}

export default RecapExperience

// The names are intentionally stable so additional friend assets can be added without changing the layout.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _unused = friends