"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Home, Calendar, Play, Music, MessageCircle, Heart } from "lucide-react"

const sections = [
  { id: "hero", icon: Home, label: "Home" },
  { id: "timeline", icon: Calendar, label: "Journey" },
  { id: "clips", icon: Play, label: "Clips" },
  { id: "covers", icon: Music, label: "Covers" },
  { id: "messages", icon: MessageCircle, label: "Messages" },
  { id: "credits", icon: Heart, label: "Credits" },
]

export function NavigationDots() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show navigation after scrolling past hero
      const heroHeight = window.innerHeight * 0.5
      setIsVisible(window.scrollY > heroHeight)

      // Determine active section
      const sectionElements = sections.map(s => ({
        id: s.id,
        element: s.id === "hero" ? document.body : document.getElementById(s.id)
      }))

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i]
        if (section.element) {
          const rect = section.id === "hero" 
            ? { top: -window.scrollY } 
            : section.element.getBoundingClientRect()
          
          if (rect.top <= window.innerHeight / 2) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
      transition={{ duration: 0.3 }}
      className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 hidden md:block"
    >
      <div className="flex flex-col items-center gap-3 p-2 rounded-full bg-card/80 backdrop-blur-md border border-border">
        {sections.map((section) => {
          const Icon = section.icon
          const isActive = activeSection === section.id
          
          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="group relative"
              aria-label={`Navigate to ${section.label}`}
            >
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-4 h-4" />
              </motion.div>
              
              {/* Tooltip */}
              <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-card border border-border text-foreground text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {section.label}
              </div>
            </button>
          )
        })}
      </div>
    </motion.nav>
  )
}
