"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, ExternalLink, Palette } from "lucide-react";
import { useState } from "react";

interface Contributor {
  name: string;
  role: string;
  message: string;
  avatar?: string;
  image?: string;
  link?: string;
}

interface Artist {
  name: string;
  credit: string;
  twitter?: string;
}

const contributors: Contributor[] = [
  {
    name: "Ephy",
    role: "Programmer",
    message:
      "Hallooo its eepy h y, also known as ephy or nico for the close ones, to be honest i dont know what i wanted to write in here so im currently raw dogging it with what im feeling rn, first of all im very glad i got to your stream a year ago, i never watched streams before but im so happy i stayed, cause ive meet some awesome people that i value more than anything, from pingpoo and toka my wifes, to everyone who has become my close friends, i dont wanna name them but you all know who you are <33, from soapdax i really wanna thank you for all the fun little streams and events ive been part of, from sophia as one of my closest friends i wanna thank you for everything, specially cause i used to really struggle trusting people, and im glad u proved me wrong, love you lil sister and looking forward to keep watching you achieve your goals in all aspects of your life, pls keep the healthy grind up, and never undervalue urself, keep aiming up cause you deserve to reach the peak little brochacho, te quiero mucho y los quiero mucho a todos <33. PD: hope life treats u better and whatever u need u can always hmu, hallo chat love you all, and checkout ysabel on vgen!",
    avatar: "https://static-cdn.jtvnw.net/jtv_user_pictures/2d9c73e1-d1ca-48ad-9d29-5ef8541573fd-profile_image-70x70.png",
    link: "https://x.com/Ephxion",
    image: "https://cdn.discordapp.com/attachments/1394403306352148580/1489428468037845033/image.png?ex=69e8c59b&is=69e7741b&hm=9d26b5a60e251467daf2111b7346ed5205d038a92d22b3d9e52aaf12bc286923&animated=true"
  },
  {
    name: "Erika",
    role: "Design, Visuals and Creative Direction",
    message:
      "Congrats on your big 3, happy third birthday little one, you grew up so fast, ephy especially worked very hard on this and i hope you tear up or ideally cry when you read and see it all. You've worked so hard to build your community and you've grown so much as a person and a singer too so you should be incredibly proud of everything you've achieved. You deserve all the good karma and the best and all the good little comments and messages you've gotten and will get in your affiliate stream, you can be and should be so proud, so don't belittle your hard work!! -from your dearest enrique",
    avatar: "https://pbs.twimg.com/profile_images/1896316297916416000/aoR4gqPe_400x400.jpg",
    link: "https://x.com/ys4_bel_",
    image: "https://media.discordapp.net/attachments/1414033172953432135/1496121184532828304/Untitled_design_1.png?ex=69e8baee&is=69e7696e&hm=eeacca194575cec69b2f749b6d03c37c35037de6621afa8e7b47c7c33e08fef0&animated=true"
  },
];

const artists: Artist[] = [
  { name: "sakurai_mon", credit: "MangaDax Model", twitter: "sakurai_mon" },
  {
    name: "Dhydratedpucci",
    credit: "1.0 Model Art",
    twitter: "Dhydratedpucci",
  },
  { name: "haze_vt", credit: "1.0 Model Rig", twitter: "haze_vt" },
  { name: "Vstartup Studio", credit: "2.0 Model" },
  { name: "senriiok", credit: "2.0 Outfit Design", twitter: "senriiok" },
  {
    name: "Amorrette_EN",
    credit: "2.0 Outfit Design (mascot)",
    twitter: "Amorrette_EN",
  },
  { name: "l__gfx", credit: "Graphics Designer", twitter: "l__gfx" },
  { name: "numileo", credit: "Stream Widgets", twitter: "numileo" },
  { name: "dunkston", credit: "Stream Widgets", twitter: "dunkston" },
  { name: "tokko", credit: "Emotes", twitter: "tokko" },
  { name: "UsagiBaka1", credit: "Emotes", twitter: "UsagiBaka1" },
  { name: "skyboni", credit: "Emotes", twitter: "skyboni" },
  { name: "kovuplus", credit: "Emotes", twitter: "kovuplus" },
  { name: "twt_Ceri", credit: "Emotes", twitter: "twt_Ceri" },
  { name: "pocketnii", credit: "Emotes", twitter: "pocketnii" },
  { name: "Nasu Aisuru", credit: "Emotes", twitter: "Nasu Aisuru" },
  { name: "7cheu", credit: "Emotes", twitter: "7cheu" },
  { name: "jadecor_liny", credit: "Profile Picture", twitter: "jadecor_liny" },
  { name: "kamiiywu", credit: "Banner", twitter: "kamiiywu" },
  { name: "vertastory", credit: "Panels", twitter: "vertastory" },
  { name: "Baily_ovo", credit: "Animated Logo", twitter: "Baily_ovo" },
];

// ─── Contributor Card ─────────────────────────────────────────────────────────
function ContributorCard({
  contributor,
  index,
}: {
  contributor: Contributor;
  index: number;
}) {
  const [avatarError, setAvatarError] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 h-full flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full shrink-0 overflow-hidden bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
              {contributor.avatar && !avatarError ? (
                <img
                  src={contributor.avatar}
                  alt={contributor.name}
                  className="w-full h-full object-cover"
                  onError={() => setAvatarError(true)}
                />
              ) : (
                <span className="text-foreground font-semibold text-sm">
                  {contributor.name.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                {contributor.name}
              </h3>
              <p className="text-primary text-sm font-medium">
                {contributor.role}
              </p>
            </div>
          </div>
          {contributor.link && (
            <a
              href={contributor.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors shrink-0"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>

        {/* Message */}
        <p className="text-foreground leading-relaxed flex-1">
          {contributor.message}
        </p>

        {/* Attached Image - same as Messages component */}
        {contributor.image && (
          <button
            onClick={() => window.open(contributor.image, '_blank')}
            className="w-full rounded-xl overflow-hidden border border-border hover:border-primary/40 transition-colors"
          >
            <img
              src={contributor.image}
              alt={`${contributor.name}'s attachment`}
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          </button>
        )}
      </div>
    </motion.div>
  );
}

// ─── Artist Chip ──────────────────────────────────────────────────────────────
function ArtistChip({ artist, index }: { artist: Artist; index: number }) {
  const inner = (
    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-card border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 group/chip">
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground truncate leading-tight">
          {artist.twitter ? `@${artist.twitter}` : artist.name}
        </p>
        <p className="text-xs text-muted-foreground truncate leading-tight">
          {artist.credit}
        </p>
      </div>
      {artist.twitter && (
        <ExternalLink className="w-3 h-3 text-muted-foreground group-hover/chip:text-primary transition-colors shrink-0 ml-auto" />
      )}
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
    >
      {artist.twitter ? (
        <a href={`https://twitter.com/${artist.twitter}`} target="_blank" rel="noopener noreferrer">
          {inner}
        </a>
      ) : (
        inner
      )}
    </motion.div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function CreditsSection() {
  return (
    <section id="credits" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            <Heart className="w-4 h-4" />
            Made With Love
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            From The Team
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            This project was made possible not only by the following people, but also by everyone who took their time to write wholesome messages,
            hope that kindness gets repaid to every single one of you.
          </p>
        </motion.div>

        {/* Contributor cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contributors.map((contributor, index) => (
            <ContributorCard
              key={contributor.name}
              contributor={contributor}
              index={index}
            />
          ))}
        </div>

        {/* Artists section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16"
        >
          <div className="p-8 rounded-3xl bg-card border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Palette className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                Artists
              </h3>
            </div>
            <p className="text-muted-foreground mb-8 ml-1">
              Many thanks to the lovely people who helped make this journey come true, providing different types of art from emotes, banners, models and more. All of this couldnt have been done without them so pls check them out!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {artists.map((artist, index) => (
                <ArtistChip
                  key={`${artist.name}-${index}`}
                  artist={artist}
                  index={index}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Closing message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-primary/20">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Thank You, Soapdax!
            </h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Finally thanks for everything, from the first streams to the minecraft servers, apex tournaments, subathons, donathons and this wonderful community you have built across the years,
              we know this year is gonna be filled with changes in your life, but we hope everything goes your way and you find sucess in everything you do.
            </p>
            <div className="mt-6 flex items-center justify-center gap-2 text-primary font-medium">
              <Heart className="w-5 h-5 fill-current animate-pulse" />
              <span>With love, from your community</span>
              <Heart className="w-5 h-5 fill-current animate-pulse" />
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-24 text-center"
        >
          <div className="flex items-center justify-center gap-3 text-muted-foreground text-sm">
            <span>SOAPVERSE</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span>Affiliate Anniversary Recap</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span>2026</span>
          </div>
          <p className="mt-2 text-muted-foreground/60 text-xs">
            Made with love by the community, for the community
          </p>
        </motion.footer>
      </div>
    </section>
  );
}