import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { EASE, EASE_INOUT, DURATION } from './gsap-config.js'
import {
  Menu, X, ArrowUpRight, ArrowDown, Mail, Send, Camera,
  Atom, Smartphone, Database, Braces, Wind, Server, Sparkles, Rocket,
  Globe, Heart, QrCode, Bot, CalendarCheck, ShoppingCart, Gift, LifeBuoy,
} from 'lucide-react'
import { useLang } from './i18n.jsx'
import { SITE, PROJECTS } from './data/content.js'

gsap.registerPlugin(ScrollTrigger)

/* ---------- helpers ---------- */

const SCRAMBLE_CHARS = '!<>-_\\/[]{}=+*^?#$%&@abcdef0123456789'

// Декодирует текст слева направо из случайных символов.
// Возвращает функцию отмены.
function scrambleTo(el, text, { duration = 1000, delay = 0 } = {}) {
  let frame
  let start
  const step = (t) => {
    if (!start) start = t
    const p = Math.min((t - start) / duration, 1)
    const reveal = Math.floor(p * text.length)
    let out = ''
    for (let i = 0; i < text.length; i++) {
      out += i < reveal ? text[i] : SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0]
    }
    el.textContent = p < 1 ? out : text
    if (p < 1) frame = requestAnimationFrame(step)
  }
  const id = setTimeout(() => {
    frame = requestAnimationFrame(step)
  }, delay)
  return () => {
    clearTimeout(id)
    cancelAnimationFrame(frame)
    el.textContent = text
  }
}

function Preloader({ onReveal, onDone }) {
  const rootRef = useRef(null)
  const limeRef = useRef(null)
  const darkRef = useRef(null)
  const countRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onReveal()
      onDone()
      return
    }
    const start = performance.now()
    let progress = 0
    const interval = setInterval(() => {
      progress = Math.min(progress + Math.random() * 13, 100)
      const elapsed = performance.now() - start
      const shown = elapsed < 1500 ? Math.min(progress, 99) : progress
      if (countRef.current) countRef.current.textContent = String(Math.floor(shown)).padStart(3, '0')
      if (progress >= 100 && elapsed >= 1500) {
        clearInterval(interval)
        const tl = gsap.timeline({ onComplete: onDone })
        tl.to(rootRef.current.querySelectorAll('.loader-content'), {
          opacity: 0, y: -20, duration: DURATION.fast, ease: 'power2.in',
        })
          .to(darkRef.current, { yPercent: -100, duration: 0.85, ease: EASE_INOUT }, 0.1)
          .to(limeRef.current, { yPercent: -100, duration: 0.85, ease: EASE_INOUT }, 0.3)
          .call(onReveal, [], 0.35)
      }
    }, 90)
    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={rootRef} className="fixed inset-0 z-[100]">
      <div ref={limeRef} className="absolute inset-0 bg-lime-500" />
      <div ref={darkRef} className="absolute inset-0 flex flex-col bg-ink-950 p-8 sm:p-12">
        <div className="loader-content flex flex-1 flex-col items-center justify-center">
          <span className="font-mono text-2xl text-mist-100">
            {SITE.logo}<span className="text-lime-500">.</span>
          </span>
          <span className="mt-3 font-mono text-[11px] uppercase tracking-widest2 text-mist-500">
            portfolio
          </span>
        </div>
        <div className="loader-content flex items-end justify-between">
          <span className="mb-3 font-mono text-[11px] uppercase tracking-widest2 text-mist-500">loading</span>
          <span ref={countRef} className="font-display text-7xl font-extrabold tracking-tighter text-lime-500 sm:text-8xl">
            000
          </span>
        </div>
      </div>
    </div>
  )
}

function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) setEnabled(true)
  }, [])

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('cursor-custom')
    gsap.set([dotRef.current, ringRef.current], { xPercent: -50, yPercent: -50, x: -100, y: -100 })

    const dotX = gsap.quickTo(dotRef.current, 'x', { duration: 0.12, ease: EASE })
    const dotY = gsap.quickTo(dotRef.current, 'y', { duration: 0.12, ease: EASE })
    const ringX = gsap.quickTo(ringRef.current, 'x', { duration: 0.45, ease: EASE })
    const ringY = gsap.quickTo(ringRef.current, 'y', { duration: 0.45, ease: EASE })

    const move = (e) => {
      dotX(e.clientX); dotY(e.clientY)
      ringX(e.clientX); ringY(e.clientY)
    }
    const over = (e) => {
      if (e.target.closest('a, button')) {
        gsap.to(ringRef.current, { scale: 1.8, opacity: 0.45, duration: DURATION.fast, ease: EASE })
        gsap.to(dotRef.current, { scale: 0.5, duration: DURATION.fast, ease: EASE })
      }
    }
    const out = (e) => {
      if (e.target.closest('a, button')) {
        gsap.to(ringRef.current, { scale: 1, opacity: 1, duration: DURATION.fast, ease: EASE })
        gsap.to(dotRef.current, { scale: 1, duration: DURATION.fast, ease: EASE })
      }
    }
    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)
    return () => {
      document.documentElement.classList.remove('cursor-custom')
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[130] h-9 w-9 rounded-full border border-lime-500/70 mix-blend-difference will-change-transform"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[130] h-2 w-2 rounded-full bg-lime-500 mix-blend-difference will-change-transform"
      />
    </>
  )
}

function SectionHeader({ index, label, title, accent }) {
  return (
    <div data-reveal>
      <p className="font-mono text-xs uppercase tracking-widest2 text-lime-400 mb-5">
        /{index} — {label}
      </p>
      <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-mist-100 tracking-tight text-balance">
        {title}{' '}
        <span className="font-serif italic font-medium gradient-text">{accent}</span>
      </h2>
    </div>
  )
}

function CountUp({ end, suffix = '', duration = 1600 }) {
  const ref = useRef(null)
  const [val, setVal] = useState(0)

  useEffect(() => {
    const el = ref.current
    let raf
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        obs.disconnect()
        const t0 = performance.now()
        const tick = (t) => {
          const p = Math.min((t - t0) / duration, 1)
          setVal(Math.round(end * (1 - Math.pow(1 - p, 3))))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )
    obs.observe(el)
    return () => {
      obs.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [end, duration])

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  )
}

function LangToggle({ className = '' }) {
  const { lang, setLang } = useLang()
  return (
    <div className={`flex items-center rounded-full border border-white/10 p-0.5 font-mono text-xs ${className}`}>
      {['en', 'ru'].map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`rounded-full px-3 py-1.5 uppercase tracking-wider transition-colors ${
            lang === l ? 'bg-lime-500 text-ink-950 font-medium' : 'text-mist-400 hover:text-mist-100'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  )
}

/* ---------- sections ---------- */

function Navbar() {
  const { t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: t.nav.works, href: '#works' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.stack, href: '#stack' },
    { label: t.nav.process, href: '#process' },
    { label: t.nav.contact, href: '#contact' },
  ]

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 px-4">
        <nav
          className={`mx-auto flex max-w-5xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ${
            scrolled ? 'glass-dark shadow-xl shadow-black/40' : 'border border-transparent'
          }`}
        >
          <a href="#home" className="font-mono text-sm font-medium text-mist-100">
            {SITE.logo}<span className="text-lime-400">.</span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-3.5 py-1.5 text-sm text-mist-400 transition-colors hover:text-mist-100"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <LangToggle />
          </div>

          <button
            onClick={() => setOpen(true)}
            className="text-mist-100 md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-ink-950/97 backdrop-blur-xl md:hidden">
          <div className="flex items-center justify-between px-6 py-6">
            <span className="font-mono text-sm text-mist-100">
              {SITE.logo}<span className="text-lime-400">.</span>
            </span>
            <button onClick={() => setOpen(false)} className="text-mist-100" aria-label="Close menu">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-2 px-8">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-4xl font-bold text-mist-100 transition-colors hover:text-lime-400"
              >
                <span className="mr-3 font-mono text-sm text-lime-400">0{i + 1}</span>
                {l.label}
              </a>
            ))}
          </div>
          <div className="px-8 pb-12">
            <LangToggle />
          </div>
        </div>
      )}
    </>
  )
}

function Hero({ ready }) {
  const { t, lang } = useLang()
  const ref = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const [first, last] = SITE.name.split(' ')

  useEffect(() => {
    if (!ready) return
    const ctx = gsap.context(() => {
      gsap.from('.hero-line-1, .hero-line-2', { opacity: 0, duration: 0.4, ease: EASE })
      gsap.from('.hero-meta, .hero-cta, .hero-scroll', {
        y: 24, opacity: 0, duration: 0.8, delay: 0.55, stagger: 0.12, ease: EASE,
      })
    }, ref)
    const cancel1 = scrambleTo(line1Ref.current, first, { duration: 900, delay: 200 })
    const cancel2 = scrambleTo(line2Ref.current, last, { duration: 1100, delay: 450 })
    return () => {
      ctx.revert()
      cancel1()
      cancel2()
    }
  }, [ready])

  const particles = [
    { txt: '{ }', top: '18%', right: '12%', size: 'text-xl', color: 'text-lime-400/70', delay: '0s', r: '-8deg' },
    { txt: '</>', top: '30%', right: '24%', size: 'text-sm', color: 'text-neon-400/60', delay: '1.4s', r: '6deg' },
    { txt: '()=>', top: '44%', right: '9%', size: 'text-base', color: 'text-mist-400/50', delay: '2.6s', r: '-4deg' },
    { txt: '⌘', top: '58%', right: '20%', size: 'text-lg', color: 'text-lime-300/40', delay: '3.4s', r: '10deg' },
  ]

  return (
    <section id="home" ref={ref} className="relative flex min-h-[100dvh] flex-col overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <img
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-20 brightness-50"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/60 via-ink-950/30 to-ink-950" />
      <div className="absolute -left-40 top-1/4 h-[480px] w-[480px] rounded-full bg-lime-600/20 blur-[140px]" />
      <div className="absolute -right-24 top-2/3 h-[380px] w-[380px] rounded-full bg-neon-500/10 blur-[130px]" />

      {particles.map((p) => (
        <span
          key={p.txt}
          className={`animate-float absolute hidden font-mono md:block ${p.size} ${p.color}`}
          style={{ top: p.top, right: p.right, animationDelay: p.delay, '--r': p.r }}
        >
          {p.txt}
        </span>
      ))}

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-6 pb-16 pt-36 sm:px-10 lg:px-16">
        <div className="hero-meta mb-6 flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest2 text-mist-300">
            <span className="ring-pulse h-1.5 w-1.5 rounded-full bg-neon-400" />
            {t.hero.available}
          </span>
          <span className="hidden font-mono text-[11px] uppercase tracking-widest2 text-mist-500 sm:block">
            {t.hero.meta}
          </span>
        </div>

        <h1 className="font-display text-6xl font-extrabold leading-[0.92] tracking-tighter text-mist-100 sm:text-8xl lg:text-9xl">
          <span className="hero-line-1 block"><span ref={line1Ref}>{first}</span></span>
          <span className="hero-line-2 block font-serif font-medium italic gradient-text pr-2">
            <span ref={line2Ref}>{last}</span><span className="caret-blink font-display not-italic text-lime-500">_</span>
          </span>
        </h1>

        <p className="hero-meta mt-8 max-w-xl text-base leading-relaxed text-mist-400 sm:text-lg" key={lang}>
          {t.hero.sub}
        </p>

        <div className="hero-cta mt-10 flex flex-wrap gap-3">
          <a
            href="#works"
            className="magnetic-btn inline-flex items-center gap-2 rounded-full bg-lime-500 px-7 py-3.5 font-display text-sm font-bold text-ink-950 shadow-lg shadow-lime-500/20"
          >
            {t.hero.ctaWorks} <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            className="magnetic-btn glass-dark inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display text-sm font-semibold text-mist-100"
          >
            <Mail className="h-4 w-4 text-lime-400" /> {t.hero.ctaContact}
          </a>
        </div>

        <div className="hero-scroll mt-16 flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest2 text-mist-500">
          <ArrowDown className="h-3.5 w-3.5 animate-bounce text-lime-400" />
          {t.hero.scroll}
        </div>
      </div>
    </section>
  )
}

function Cover({ p }) {
  if (p.image) {
    return (
      <img
        src={p.image}
        alt={p.title}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
    )
  }
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${p.cover.from}, ${p.cover.to})` }}
    >
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div
        className="absolute -right-16 -top-16 h-72 w-72 rounded-full opacity-25 blur-[100px]"
        style={{ background: p.cover.glow }}
      />
      <span
        className="absolute inset-0 flex items-center justify-center font-serif text-[7rem] italic leading-none opacity-90 transition-transform duration-700 group-hover:scale-110 sm:text-[9rem]"
        style={{ color: p.cover.glow }}
      >
        {p.cover.emblem}
      </span>
      <span className="absolute bottom-4 right-5 font-mono text-[10px] uppercase tracking-widest2 text-white/30">
        {p.year}
      </span>
    </div>
  )
}

function WorkCard({ p, featured = false }) {
  const { t, lang } = useLang()
  const Wrapper = p.link ? 'a' : 'div'
  const wrapperProps = p.link ? { href: p.link, target: '_blank', rel: 'noreferrer' } : {}

  return (
    <Wrapper
      {...wrapperProps}
      data-reveal
      className={`group overflow-hidden rounded-3xl border border-white/[0.07] bg-ink-900 transition-colors duration-500 hover:border-lime-500/40 ${
        featured ? 'lg:col-span-2 lg:grid lg:grid-cols-5' : ''
      }`}
    >
      <div className={`aspect-[16/10] overflow-hidden ${featured ? 'lg:col-span-3 lg:aspect-auto lg:min-h-[420px]' : ''}`}>
        <Cover p={p} />
      </div>

      <div className={`flex flex-col p-7 sm:p-8 ${featured ? 'lg:col-span-2 lg:justify-center lg:p-12' : ''}`}>
        <div className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest2 text-lime-400">
          {p.type[lang]}
          <span className="h-px flex-1 bg-white/10" />
          <span className="text-mist-500">{p.year}</span>
        </div>

        <h3 className="font-display text-2xl font-bold tracking-tight text-mist-100 sm:text-3xl">
          {p.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-mist-400 sm:text-base">{p.desc[lang]}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {p.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-mist-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold">
          {p.link ? (
            <span className="inline-flex items-center gap-2 text-lime-300 transition-colors group-hover:text-neon-400">
              {t.works.visit}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          ) : (
            <span className="text-mist-500">{t.works.soon}</span>
          )}
        </div>
      </div>
    </Wrapper>
  )
}

function Works() {
  const { t } = useLang()
  return (
    <section id="works" className="relative mx-auto max-w-7xl px-6 py-28 sm:px-10 lg:px-16 lg:py-36">
      <SectionHeader index="01" label={t.works.label} title={t.works.title} accent={t.works.titleAccent} />
      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <WorkCard key={p.slug} p={p} featured={i === 0} />
        ))}
      </div>
    </section>
  )
}

function Services() {
  const { t } = useLang()
  const icons = [Globe, Heart, QrCode, Bot, CalendarCheck, ShoppingCart, Gift, LifeBuoy]

  return (
    <section id="services" className="relative border-y border-white/[0.06] bg-ink-900/50">
      <div className="mx-auto max-w-7xl px-6 py-28 sm:px-10 lg:px-16 lg:py-36">
        <SectionHeader index="02" label={t.services.label} title={t.services.title} accent={t.services.titleAccent} />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.services.items.map((s, i) => {
            const Icon = icons[i]
            return (
              <div
                key={s.title}
                data-reveal
                className="group rounded-2xl border border-white/[0.07] bg-ink-900 p-6 transition-colors duration-300 hover:border-lime-500/40 sm:p-7"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
                  <Icon className="h-5 w-5 text-lime-400 transition-colors group-hover:text-neon-400" />
                </div>
                <h3 className="mt-5 font-display text-base font-bold text-mist-100">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist-500">{s.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function About() {
  const { t } = useLang()
  return (
    <section id="about" className="relative">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-28 sm:px-10 lg:grid-cols-2 lg:gap-20 lg:px-16 lg:py-36">
        <div>
          <SectionHeader index="03" label={t.about.label} title={t.about.title} accent={t.about.titleAccent} />
          <div data-reveal className="mt-8 space-y-5 text-base leading-relaxed text-mist-400 sm:text-lg">
            <p>{t.about.bio1}</p>
            <p>{t.about.bio2}</p>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-2">
          {t.about.stats.map((s) => (
            <div
              key={s.label}
              data-reveal
              className="flex items-baseline justify-between gap-6 border-b border-white/[0.07] py-6"
            >
              <span className="font-display text-5xl font-extrabold tracking-tight gradient-text sm:text-6xl">
                <CountUp end={s.end} suffix={s.suffix} />
              </span>
              <span className="max-w-[220px] text-right font-mono text-xs uppercase tracking-wider text-mist-500">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Stack() {
  const { t } = useLang()
  const items = [
    { icon: Atom, name: 'React · Next.js', key: 'react' },
    { icon: Smartphone, name: 'Swift · SwiftUI', key: 'swift' },
    { icon: Database, name: 'Supabase', key: 'supabase' },
    { icon: Braces, name: 'TypeScript', key: 'ts' },
    { icon: Wind, name: 'Tailwind CSS', key: 'tailwind' },
    { icon: Server, name: 'Node.js', key: 'node' },
    { icon: Sparkles, name: 'Motion', key: 'motion' },
    { icon: Rocket, name: 'Deploy', key: 'deploy' },
  ]

  return (
    <section id="stack" className="mx-auto max-w-7xl px-6 py-28 sm:px-10 lg:px-16 lg:py-36">
      <SectionHeader index="04" label={t.stack.label} title={t.stack.title} accent={t.stack.titleAccent} />
      <div
        data-reveal
        className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-4"
      >
        {items.map(({ icon: Icon, name, key }) => (
          <div
            key={key}
            className="group bg-ink-900 p-7 transition-colors duration-300 hover:bg-ink-800 sm:p-8"
          >
            <Icon className="h-6 w-6 text-lime-400 transition-colors group-hover:text-neon-400" />
            <p className="mt-5 font-display text-base font-semibold text-mist-100">{name}</p>
            <p className="mt-1.5 text-sm text-mist-500">{t.stack.items[key]}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Process() {
  const { t } = useLang()
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.process-card')
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return
        gsap.to(card, {
          scale: 0.93,
          opacity: 0.35,
          filter: 'blur(5px)',
          ease: 'none',
          scrollTrigger: {
            trigger: cards[i + 1],
            start: 'top bottom-=140',
            end: 'top top+=180',
            scrub: true,
          },
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="process" ref={ref} className="border-y border-white/[0.06] bg-ink-900/50">
      <div className="mx-auto max-w-5xl px-6 py-28 sm:px-10 lg:px-16 lg:py-36">
        <SectionHeader index="05" label={t.process.label} title={t.process.title} accent={t.process.titleAccent} />

        <div className="mt-16 flex flex-col gap-8">
          {t.process.steps.map((s, i) => (
            <div
              key={s.n}
              className="process-card glass-dark sticky rounded-3xl p-8 sm:p-12"
              style={{ top: `${104 + i * 18}px` }}
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10">
                <span className="font-serif text-6xl italic leading-none gradient-text sm:text-7xl">{s.n}</span>
                <div>
                  <h3 className="font-display text-2xl font-bold text-mist-100 sm:text-3xl">{s.title}</h3>
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-mist-400 sm:text-lg">{s.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const { t } = useLang()
  const socials = [
    { icon: Mail, label: t.contact.socials.email, value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: Send, label: t.contact.socials.telegram, value: '@' + SITE.telegram.split('/').pop(), href: SITE.telegram },
    { icon: Camera, label: t.contact.socials.instagram, value: '@' + SITE.instagram.split('/').pop(), href: SITE.instagram },
  ]

  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-600/15 blur-[160px]" />
      <div className="relative mx-auto max-w-4xl px-6 py-32 text-center sm:px-10 lg:py-44">
        <p data-reveal className="font-mono text-xs uppercase tracking-widest2 text-lime-400">
          /06 — {t.contact.label}
        </p>
        <h2
          data-reveal
          className="mt-6 font-display text-5xl font-extrabold tracking-tighter text-mist-100 sm:text-7xl"
        >
          {t.contact.title}{' '}
          <span className="font-serif font-medium italic gradient-text">{t.contact.titleAccent}</span>
        </h2>
        <p data-reveal className="mx-auto mt-6 max-w-md text-base text-mist-400 sm:text-lg">
          {t.contact.sub}
        </p>

        <div data-reveal className="mt-10">
          <a
            href={`mailto:${SITE.email}`}
            className="magnetic-btn inline-flex items-center gap-3 rounded-full bg-lime-500 px-9 py-4 font-display text-base font-bold text-ink-950 shadow-xl shadow-lime-500/20"
          >
            {t.contact.emailCta} <ArrowUpRight className="h-5 w-5" />
          </a>
        </div>

        <div data-reveal className="mt-14 grid gap-3 sm:grid-cols-3">
          {socials.map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="group rounded-2xl border border-white/[0.07] bg-ink-900 p-5 text-left transition-colors hover:border-lime-500/40"
            >
              <Icon className="h-5 w-5 text-lime-400 transition-colors group-hover:text-neon-400" />
              <p className="mt-3 font-display text-sm font-semibold text-mist-100">{label}</p>
              <p className="mt-0.5 truncate font-mono text-xs text-mist-500">{value}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const { t } = useLang()
  const links = [
    { label: t.nav.works, href: '#works' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.stack, href: '#stack' },
    { label: t.nav.process, href: '#process' },
  ]

  return (
    <footer className="border-t border-white/[0.06] bg-ink-900/60">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:px-10 md:grid-cols-3 lg:px-16">
        <div>
          <p className="font-mono text-lg font-medium text-mist-100">
            {SITE.logo}<span className="text-lime-400">.</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-mist-500">{t.footer.tagline}</p>
          <p className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 text-mist-400">
            <span className="ring-pulse h-1.5 w-1.5 rounded-full bg-neon-400" />
            {t.footer.status}
          </p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest2 text-mist-500">{t.footer.nav}</p>
          <div className="mt-4 flex flex-col gap-2.5">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-mist-400 transition-colors hover:text-mist-100">
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest2 text-mist-500">{t.footer.socials}</p>
          <div className="mt-4 flex flex-col gap-2.5 text-sm">
            <a href={`mailto:${SITE.email}`} className="text-mist-400 transition-colors hover:text-mist-100">
              {SITE.email}
            </a>
            <a href={SITE.telegram} target="_blank" rel="noreferrer" className="text-mist-400 transition-colors hover:text-mist-100">
              Telegram
            </a>
            <a href={SITE.instagram} target="_blank" rel="noreferrer" className="text-mist-400 transition-colors hover:text-mist-100">
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.05]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 font-mono text-[11px] text-mist-500 sm:flex-row sm:px-10 lg:px-16">
          <span>© {new Date().getFullYear()} {SITE.name}</span>
          <span>{t.footer.rights}</span>
        </div>
      </div>
    </footer>
  )
}

/* ---------- app ---------- */

export default function App() {
  const { lang } = useLang()
  const [booted, setBooted] = useState(false)
  const [showLoader, setShowLoader] = useState(true)
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({ duration: DURATION.slow })
    lenisRef.current = lenis
    lenis.stop()
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const el = document.querySelector(a.getAttribute('href'))
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el, { offset: -80 })
    }
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('click', onClick)
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    if (booted) lenisRef.current?.start()
  }, [booted])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 36,
          opacity: 0,
          duration: 0.9,
          ease: EASE,
          scrollTrigger: { trigger: el, start: 'top 86%', once: true },
        })
      })
    })
    const id = setTimeout(() => ScrollTrigger.refresh(), 250)
    return () => {
      clearTimeout(id)
      ctx.revert()
    }
  }, [])

  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 150)
    return () => clearTimeout(id)
  }, [lang])

  return (
    <div className="relative">
      {showLoader && <Preloader onReveal={() => setBooted(true)} onDone={() => setShowLoader(false)} />}
      <Cursor />
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero ready={booted} />
        <Works />
        <Services />
        <About />
        <Stack />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
