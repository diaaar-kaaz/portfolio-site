import { createContext, useContext, useEffect, useState } from 'react'

const translations = {
  en: {
    nav: { works: 'Works', about: 'About', stack: 'Stack', process: 'Process', contact: 'Contact' },
    hero: {
      meta: 'Full-stack developer · Web & iOS',
      sub: 'Full-stack developer crafting web apps, native iOS apps and high-converting landing pages — from the first sketch to production.',
      ctaWorks: 'View works',
      ctaContact: 'Get in touch',
      available: 'Available for new projects',
      scroll: 'Scroll',
    },
    works: {
      label: 'Selected works',
      title: 'Recent',
      titleAccent: 'projects.',
      soon: 'Case study coming soon',
      visit: 'Open project',
    },
    about: {
      label: 'About me',
      title: 'Design, code,',
      titleAccent: 'ship.',
      bio1: 'I build complete products on my own: interface, backend, mobile app — one pair of hands, zero hand-offs. Recent work includes a loyalty platform for a coffee chain (web + native iOS) and event landing pages.',
      bio2: 'I care about clean architecture and interfaces that feel expensive: precise typography, smooth motion, no template look.',
      stats: [
        { end: 5, suffix: '+', label: 'projects shipped' },
        { end: 3, suffix: '', label: 'platforms — web, iOS, backend' },
        { end: 12, suffix: '+', label: 'technologies in the stack' },
      ],
    },
    stack: {
      label: 'Toolbox',
      title: 'My',
      titleAccent: 'stack.',
      items: {
        react: 'Web apps & SPAs',
        swift: 'Native iOS apps',
        supabase: 'Database, auth, storage',
        ts: 'Typed, maintainable code',
        tailwind: 'Design systems in code',
        node: 'APIs & integrations',
        motion: 'GSAP · Framer Motion',
        deploy: 'Vercel · App Store',
      },
    },
    process: {
      label: 'How I work',
      title: 'From idea',
      titleAccent: 'to launch.',
      steps: [
        {
          n: '01',
          title: 'Discover',
          text: 'We define the goal, the audience and the references. You get a clear scope, a timeline and a fixed price — before any code is written.',
        },
        {
          n: '02',
          title: 'Design & build',
          text: 'Design system, code, animation. You see progress on a live preview link and give feedback at every step — no black box.',
        },
        {
          n: '03',
          title: 'Launch & support',
          text: 'Deploy, domain, analytics, App Store submission. I stay around after the release — small fixes and advice included.',
        },
      ],
    },
    contact: {
      label: 'Contact',
      title: 'Have a project',
      titleAccent: 'in mind?',
      sub: 'Tell me about it — I usually reply within a few hours.',
      emailCta: 'Write me an email',
      socials: { telegram: 'Telegram', instagram: 'Instagram', email: 'Email' },
    },
    footer: {
      tagline: 'Full-stack developer. Web apps, iOS apps, landing pages.',
      nav: 'Navigation',
      socials: 'Socials',
      status: 'Available for new projects',
      rights: 'All rights reserved.',
    },
  },

  ru: {
    nav: { works: 'Работы', about: 'Обо мне', stack: 'Стек', process: 'Процесс', contact: 'Контакты' },
    hero: {
      meta: 'Full-stack разработчик · Web и iOS',
      sub: 'Full-stack разработчик: веб-приложения, нативные iOS-приложения и продающие лендинги — от первого макета до продакшена.',
      ctaWorks: 'Смотреть работы',
      ctaContact: 'Связаться',
      available: 'Открыт для новых проектов',
      scroll: 'Листай',
    },
    works: {
      label: 'Избранные работы',
      title: 'Последние',
      titleAccent: 'проекты.',
      soon: 'Кейс скоро появится',
      visit: 'Открыть проект',
    },
    about: {
      label: 'Обо мне',
      title: 'Дизайн, код,',
      titleAccent: 'запуск.',
      bio1: 'Делаю продукты целиком и сам: интерфейс, бэкенд, мобильное приложение — одни руки, без передач между командами. Из недавнего: платформа лояльности для сети кофеен (web + нативный iOS) и лендинги мероприятий.',
      bio2: 'Ценю чистую архитектуру и интерфейсы, которые выглядят дорого: точная типографика, плавные анимации, никакого шаблонного вида.',
      stats: [
        { end: 5, suffix: '+', label: 'запущенных проектов' },
        { end: 3, suffix: '', label: 'платформы — web, iOS, backend' },
        { end: 12, suffix: '+', label: 'технологий в стеке' },
      ],
    },
    stack: {
      label: 'Инструменты',
      title: 'Мой',
      titleAccent: 'стек.',
      items: {
        react: 'Веб-приложения и SPA',
        swift: 'Нативные iOS-приложения',
        supabase: 'База, авторизация, файлы',
        ts: 'Типизированный, чистый код',
        tailwind: 'Дизайн-системы в коде',
        node: 'API и интеграции',
        motion: 'GSAP · Framer Motion',
        deploy: 'Vercel · App Store',
      },
    },
    process: {
      label: 'Как я работаю',
      title: 'От идеи',
      titleAccent: 'до запуска.',
      steps: [
        {
          n: '01',
          title: 'Разбор задачи',
          text: 'Определяем цель, аудиторию и референсы. Ты получаешь понятный объём работ, сроки и фиксированную цену — до того, как написана первая строка кода.',
        },
        {
          n: '02',
          title: 'Дизайн и разработка',
          text: 'Дизайн-система, код, анимации. Прогресс виден на живой превью-ссылке, правки обсуждаем на каждом шаге — никакого чёрного ящика.',
        },
        {
          n: '03',
          title: 'Запуск и поддержка',
          text: 'Деплой, домен, аналитика, публикация в App Store. После релиза не пропадаю — мелкие правки и советы включены.',
        },
      ],
    },
    contact: {
      label: 'Контакты',
      title: 'Есть проект',
      titleAccent: 'на примете?',
      sub: 'Расскажи о нём — обычно отвечаю в течение пары часов.',
      emailCta: 'Написать на почту',
      socials: { telegram: 'Telegram', instagram: 'Instagram', email: 'Почта' },
    },
    footer: {
      tagline: 'Full-stack разработчик. Веб-приложения, iOS-приложения, лендинги.',
      nav: 'Навигация',
      socials: 'Соцсети',
      status: 'Открыт для новых проектов',
      rights: 'Все права защищены.',
    },
  },
}

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en')

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
