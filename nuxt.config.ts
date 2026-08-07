// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/supabase'],
  supabase: {
    redirect: false
  },
  app: {
    head: {
      title: 'Game25 - Download Game PC & Konsol - Repack | Crack',
      meta: [
        { name: 'description', content: 'Game25 adalah platform penyedia katalog game untuk PC, PS2, dan PS3. Temukan game favoritmu.' },
        { name: 'keywords', content: 'Game25, repack, crack, free, repacked, cracked, gratis, download game offline' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/source/favicon.ico' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;600;700;900&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap' },
        { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css' }
      ],
      script: [
        { src: 'https://code.jquery.com/jquery-3.5.1.slim.min.js', defer: true },
        { src: 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.2/dist/umd/popper.min.js', defer: true },
        { src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js', defer: true },
        { src: 'https://pl29073817.profitablecpmratenetwork.com/b28996aa6120341251129c15fe0b2824/invoke.js', async: true, 'data-cfasync': 'false' },
        { src: 'https://pl29073818.profitablecpmratenetwork.com/83/5c/9d/835c9da95a9576b968d02c73fe357239.js', async: true },
        { src: 'https://www.highperformanceformat.com/47217ab3a87e7a0f6188604c5507efc9/invoke.js', async: true }
      ]
    }
  },
  css: [
    '~/assets/css/style_tambahan.css',
    '~/assets/css/bg.style.css'
  ]
})
