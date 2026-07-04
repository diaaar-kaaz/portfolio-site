// ============================================================
//  ЕДИНСТВЕННЫЙ ФАЙЛ, КОТОРЫЙ НУЖНО РЕДАКТИРОВАТЬ.
//
//  Новая работа = один объект в PROJECTS ниже.
//  Скриншот проекта: положи картинку в  public/works/
//  и укажи путь в поле image, например  image: '/works/aromat-web.png'.
//  Пока image не задан — рисуется фирменная градиентная обложка.
// ============================================================

export const SITE = {
  name: 'Diar Kazbekov',
  logo: 'DK',
  email: 'dkazzzbekov@gmail.com',
  // TODO: подставь свои ники вместо заглушек
  telegram: 'https://t.me/yourusername',
  instagram: 'https://instagram.com/yourusername',
}

export const PROJECTS = [
  {
    slug: 'aromat-loyalty-web',
    title: 'Aromat Loyalty — Web',
    year: '2026',
    type: { en: 'Web app', ru: 'Веб-приложение' },
    desc: {
      en: 'Loyalty platform for a coffee chain: QR stamp cards for coffee and desserts, rewards, customer accounts and an admin dashboard for the staff.',
      ru: 'Платформа лояльности для сети кофеен: QR-штамп-карты на кофе и десерты, награды, личные кабинеты и админ-панель для персонала.',
    },
    tags: ['Next.js 14', 'Supabase', 'Tailwind CSS'],
    image: null, // '/works/aromat-web.png'
    link: null, // 'https://...'
    cover: { from: '#2a1a0f', to: '#0d0906', glow: '#d4a574', emblem: 'A' },
  },
  {
    slug: 'aromat-loyalty-ios',
    title: 'Aromat Loyalty — iOS',
    year: '2026',
    type: { en: 'iOS app', ru: 'iOS-приложение' },
    desc: {
      en: 'Native SwiftUI companion app: digital punch cards in your pocket, reward tracking and a smooth App Store-ready experience.',
      ru: 'Нативное SwiftUI-приложение: штамп-карты в кармане, отслеживание наград и опыт уровня App Store — готово к публикации.',
    },
    tags: ['Swift', 'SwiftUI', 'Supabase'],
    image: null, // '/works/aromat-ios.png'
    link: null,
    cover: { from: '#211708', to: '#0d0906', glow: '#e8c894', emblem: 'A' },
  },
  {
    slug: 'evoclub-cs2',
    title: 'EvoClub — CS2 Tournament',
    year: '2026',
    type: { en: 'Landing page', ru: 'Лендинг' },
    desc: {
      en: 'High-energy landing for an esports tournament: live spots counter, registration flow with success screen, particle effects and prize breakdown.',
      ru: 'Драйвовый лендинг киберспортивного турнира: живой счётчик мест, регистрация с экраном успеха, эффекты частиц и призовой фонд.',
    },
    tags: ['React 19', 'Framer Motion', 'Vite'],
    image: null, // '/works/evoclub.png'
    link: null,
    cover: { from: '#26100e', to: '#0d0706', glow: '#ff6b4a', emblem: 'E' },
  },
]
