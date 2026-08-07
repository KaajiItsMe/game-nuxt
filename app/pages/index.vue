<template>
  <div>
    <!-- ===== HERO SECTION ===== -->
    <section class="hero-section">
      <div class="hero-bg-decoration top-right"></div>
      <div class="hero-bg-decoration bottom-left"></div>

      <div class="container position-relative" style="z-index: 2;">
        <div class="animate-fadeInUp">
          <p class="section-label animate-fadeInUp-d1">🎮 PLATFORM GAMING PREMIUM</p>
          <h1 class="animate-fadeInUp-d2" style="font-family: 'BigSpace'; font-size: clamp(4rem, 10vw, 9rem); font-weight: 900; letter-spacing: 4px; line-height: 1; margin-bottom: 24px;">
            Game<span class="text-gradient-animated">25</span>
          </h1>
          <p class="animate-fadeInUp-d3" style="color: #94a3b8; font-size: clamp(1rem, 2vw, 1.3rem); max-width: 600px; margin: 0 auto 40px; line-height: 1.8;">
            Destinasi utama Anda untuk mengunduh game premium PC &amp; Konsol.<br>
            Gratis, lengkap, dan selalu diperbarui.
          </p>
          <div class="animate-fadeInUp-d4 d-flex flex-wrap justify-content-center" style="gap: 16px;">
            <NuxtLink to="/menu" class="btn btn-beli btn-lg px-5 py-3 font-weight-bold rounded-pill">
              🚀 Jelajahi Katalog
            </NuxtLink>
            <NuxtLink to="/tentang" class="btn btn-outline-light btn-lg px-5 py-3 font-weight-bold rounded-pill" style="border-color: rgba(255,255,255,0.2);">
              Tentang Kami
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== STATS BAR ===== -->
    <section class="stats-bar animate-fadeIn">
      <div class="container">
        <div class="d-flex flex-wrap justify-content-center align-items-center">
          <div class="stat-item">
            <div class="stat-number">335+</div>
            <div class="stat-label">Game Tersedia</div>
          </div>
          <div class="stat-divider d-none d-md-block mx-4"></div>
          <div class="stat-item">
            <div class="stat-number">3</div>
            <div class="stat-label">Platform</div>
          </div>
          <div class="stat-divider d-none d-md-block mx-4"></div>
          <div class="stat-item">
            <div class="stat-number">100%</div>
            <div class="stat-label">Gratis</div>
          </div>
          <div class="stat-divider d-none d-md-block mx-4"></div>
          <div class="stat-item">
            <div class="stat-number">2026</div>
            <div class="stat-label">Diperbarui</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== FEATURED GAMES ===== -->
    <section class="py-5" style="padding: 80px 0 !important;">
      <div class="container">
        <div class="text-center mb-5">
          <p class="section-label">⭐ PILIHAN KAMI</p>
          <h2 class="section-title">Game Unggulan</h2>
          <p class="section-subtitle">Koleksi terbaik dari berbagai genre yang wajib Anda mainkan</p>
        </div>

        <div v-if="loading" class="row">
          <div v-for="n in 6" :key="n" class="col-lg-2 col-md-4 col-6 mb-4">
            <div class="skeleton-card">
              <div class="skeleton skeleton-img"></div>
              <div class="p-3">
                <div class="skeleton skeleton-line w-full"></div>
                <div class="skeleton skeleton-line w-3/4"></div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="row">
          <div v-for="game in featuredGames" :key="game.id" class="col-lg-2 col-md-4 col-6 mb-4">
            <NuxtLink :to="`/game/${game.id}`" class="similar-card text-decoration-none position-relative">
              <span v-if="isNew(game.created_at)" class="badge-new" style="top: 5px; left: 5px; font-size: 0.65rem; padding: 2px 6px;">NEW</span>
              <img :src="`/${game.image}`" :alt="game.title">
              <div class="similar-card-body">
                <p class="similar-card-title">{{ game.title }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="similar-card-platform">{{ game.platform }}</span>
                  <span v-if="game.avgRating > 0" style="font-size: 0.8rem; color: #fbbf24;">⭐ {{ game.avgRating.toFixed(1) }}</span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>

        <div class="text-center mt-4">
          <NuxtLink to="/menu" class="btn btn-outline-light rounded-pill px-5 py-2" style="border-color: rgba(255,255,255,0.15);">
            Lihat Semua Game →
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ===== WHY US / FEATURES ===== -->
    <section style="padding: 80px 0; background: rgba(15,23,42,0.4);">
      <div class="container">
        <div class="text-center mb-5">
          <p class="section-label">💡 KEUNGGULAN KAMI</p>
          <h2 class="section-title">Kenapa Pilih Agame25?</h2>
          <p class="section-subtitle">Kami berkomitmen memberikan pengalaman gaming terbaik untuk Anda</p>
        </div>
        <div class="row">
          <div class="col-md-4 mb-4">
            <div class="feature-card">
              <div class="feature-icon">🆓</div>
              <h4>100% Gratis</h4>
              <p>Semua game yang tersedia dapat diunduh secara gratis tanpa biaya berlangganan atau pembelian tersembunyi.</p>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="feature-card">
              <div class="feature-icon">📚</div>
              <h4>Katalog Lengkap</h4>
              <p>Lebih dari 335 judul game dari berbagai genre — Action, RPG, Racing, Horror, dan masih banyak lagi.</p>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="feature-card">
              <div class="feature-icon">⚡</div>
              <h4>Info Lengkap</h4>
              <p>Spesifikasi sistem, trailer resmi, panduan komunitas, dan komentar pengguna tersedia di setiap game.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== CTA BANNER ===== -->
    <section style="padding: 80px 0;">
      <div class="container">
        <div class="cta-banner">
          <div class="position-relative" style="z-index: 2;">
            <p class="section-label">🎯 SIAP BERMAIN?</p>
            <h2 class="section-title">Temukan Game Impianmu</h2>
            <p class="section-subtitle mb-4">Lebih dari 335 game menunggu untuk Anda jelajahi sekarang.</p>
            <NuxtLink to="/menu" class="btn btn-beli btn-lg px-5 py-3 font-weight-bold rounded-pill">
              Mulai Jelajahi →
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const supabase = useSupabaseClient()
const loading = ref(true)
const featuredGames = ref([])

const { data } = await useAsyncData('featured-games', async () => {
  const { data: games } = await supabase.from('games').select('id, title, image, platform, created_at').limit(6)
  
  if (games && games.length > 0) {
    const gameIds = games.map(g => g.id)
    const { data: comments } = await supabase.from('comments').select('game_id, rating').in('game_id', gameIds)
    
    return games.map(game => {
      const gameComments = comments?.filter(c => c.game_id === game.id) || []
      const avgRating = gameComments.length > 0 
        ? gameComments.reduce((sum, c) => sum + c.rating, 0) / gameComments.length 
        : 0
      return { ...game, avgRating }
    })
  }
  return []
})

const isNew = (dateStr) => {
  if (!dateStr) return false
  const diffTime = Math.abs(new Date() - new Date(dateStr))
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays <= 7
}

featuredGames.value = data.value || []
loading.value = false
</script>

<style scoped>
.badge-new {
  position: absolute;
  top: 10px;
  left: 10px;
  background: linear-gradient(45deg, #ef4444, #f97316);
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
  z-index: 2;
  box-shadow: 0 4px 10px rgba(239, 68, 68, 0.4);
}
</style>

