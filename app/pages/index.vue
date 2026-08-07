<template>
  <div class="pb-5">
    <!-- Hero Slider (Featured Game) -->
    <div class="container mt-4">
      <div v-if="featuredGame" class="hero-slider-container mb-5">
        <div class="hero-slider-bg">
        <img :src="`/${featuredGame.image}`" :alt="featuredGame.title">
      </div>
      <div class="hero-slider-content container py-5">
        <div class="row align-items-center h-100">
          <div class="col-lg-8">
            <h1 class="hero-game-title">{{ featuredGame.title }}</h1>
            <div class="d-flex flex-wrap gap-2 mb-3">
              <span class="badge-genre" style="background: rgba(16,185,129,0.2); color: #10b981; border: 1px solid #10b981;">V 1.0</span>
              <span class="badge-genre" style="background: rgba(255,255,255,0.1); color: white;">{{ featuredGame.platform }}</span>
              <span class="badge-genre" style="background: rgba(255,255,255,0.1); color: white;">{{ featuredGame.year }}</span>
            </div>
            <p class="hero-game-desc mb-4">
              {{ featuredGame.description?.substring(0, 150) || 'Game premium seru yang wajib kamu mainkan! Download secara gratis dan nikmati keseruannya sekarang juga.' }}...
            </p>
            <div class="d-flex flex-wrap gap-3">
              <NuxtLink :to="`/game/${featuredGame.id}`" class="hero-btn-primary">
                Download Now &rarr;
              </NuxtLink>
              <NuxtLink :to="`/game/${featuredGame.id}`" class="hero-btn-secondary">
                Details &rsaquo;
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
    
    <!-- Social Buttons (Dihide sementara karena belum ada link) -->
    <div class="container mb-5" v-if="false">
      <div class="social-btn-container">
        <a href="#" class="social-btn discord">
          <div class="social-btn-icon">🎮</div>
          <div class="social-btn-text">
            <span>Join us on</span>
            Discord
          </div>
        </a>
        <a href="#" class="social-btn reddit">
          <div class="social-btn-icon">🔥</div>
          <div class="social-btn-text">
            <span>Follow us on</span>
            Reddit
          </div>
        </a>
        <a href="#" class="social-btn nebulo">
          <div class="social-btn-icon">👥</div>
          <div class="social-btn-text">
            <span>Member of</span>
            Nebulo
          </div>
        </a>
        <a href="#" class="social-btn donate">
          <div class="social-btn-icon">💰</div>
          <div class="social-btn-text">
            <span>Support us with</span>
            Donations
          </div>
        </a>
      </div>
    </div>
    <!-- Search & Header -->
    <div class="container pt-4 pb-3">
      <div class="row align-items-center">
        <div class="col-md-6 mb-3 mb-md-0">
          <h2 class="section-heading m-0">Trending Games</h2>
        </div>
        <div class="col-md-6">
          <input
            type="text"
            v-model="searchQuery"
            class="search-modern w-100"
            placeholder="Cari game..."
            style="padding: 10px 20px; font-size: 0.95rem; background: var(--color-card);"
          >
        </div>
      </div>
    </div>

    <!-- Filter & Sort Bar -->
    <div class="container mb-4">
      <div class="d-flex flex-wrap align-items-center justify-content-between">
        <!-- Platform Filter -->
        <div class="mb-2">
          <button
            v-for="p in platforms"
            :key="p"
            class="filter-btn"
            :class="{ active: activePlatform === p }"
            @click="activePlatform = p"
          >{{ p }}</button>
        </div>
        <!-- Sort -->
        <div class="mb-2">
          <select v-model="sortBy" class="input-modern" style="border-radius: 50px !important; padding: 8px 20px !important; font-size: 0.875rem !important; cursor: pointer;">
            <option value="default">Urutan Default</option>
            <option value="az">A → Z</option>
            <option value="za">Z → A</option>
            <option value="year_desc">Tahun Terbaru</option>
            <option value="year_asc">Tahun Terlama</option>
          </select>
        </div>
      </div>
      <!-- Result Count -->
      <div class="d-flex align-items-center flex-wrap" style="gap: 8px;">
        <p class="mt-2 mb-0" style="color: #475569; font-size: 0.875rem;">
          Menampilkan <strong class="text-white">{{ filteredGames.length }}</strong> dari <strong class="text-white">{{ games?.length || 0 }}</strong> game
        </p>
        <span v-if="genreFilter" class="filter-btn active ml-2" style="padding: 4px 14px; font-size: 0.8rem; cursor:pointer;" @click="genreFilter = ''">
          🏷 {{ genreFilter }} &times;
        </span>
      </div>
    </div>

    <!-- Games Grid -->
    <div class="container">
      <!-- Skeleton Loader -->
      <div v-if="pending" class="row">
        <div v-for="n in 12" :key="n" class="col-lg-3 col-md-4 col-6 mb-5">
          <div class="skeleton-card">
            <div class="skeleton skeleton-img"></div>
            <div class="p-3">
              <div class="skeleton skeleton-line w-full"></div>
              <div class="skeleton skeleton-line w-3/4"></div>
              <div class="skeleton skeleton-line w-1/2"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Games -->
      <div v-else class="row" id="game-list">
        <div v-for="game in filteredGames" :key="game.id" class="col-lg-3 col-md-4 col-6 mb-5">
          <NuxtLink :to="`/game/${game.id}`" class="text-decoration-none">
            <div class="card h-100 game-card glass-card border-0 position-relative">
              <span class="badge-platform">{{ game.platform }}</span>
              <span v-if="isNew(game.created_at)" class="badge-new">🔥 NEW</span>
              <div class="img-container">
                <img :src="`/${game.image}`" class="card-img-top w-100" :alt="game.title" style="aspect-ratio: 16/9; object-fit: cover;">
              </div>
              <div class="card-body d-flex flex-column justify-content-between pb-3">
                <h5 class="card-title text-white font-weight-bold mb-2" style="font-size: 1rem; line-height: 1.4;">{{ game.title }}</h5>
                <div>
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <small class="text-muted d-block">{{ game.year }}</small>
                    <span v-if="game.avgRating > 0" style="font-size: 0.8rem; color: #fbbf24;">⭐ {{ game.avgRating.toFixed(1) }}</span>
                  </div>
                  <div class="genres">
                    <span
                      v-for="genre in (game.genres || []).slice(0, 2)"
                      :key="genre"
                      class="badge-genre"
                      @click.prevent="setGenreFilter(genre.trim())"
                    >{{ genre.trim() }}</span>
                  </div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div v-if="filteredGames.length === 0 && !pending" class="col-12 text-center py-5">
          <div style="font-size: 4rem; margin-bottom: 16px;">🔍</div>
          <h3 class="text-white">Game tidak ditemukan.</h3>
          <p style="color: #475569;">Coba kata kunci atau filter yang berbeda.</p>
          <button class="btn btn-outline-light rounded-pill px-4 mt-2" @click="resetFilter">Reset Filter</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const supabase = useSupabaseClient()
const route = useRoute()

const searchQuery = ref('')
const activePlatform = ref('Semua')
const sortBy = ref('default')
const genreFilter = ref(route.query.genre || '')

const platforms = ['Semua', 'PC', 'PS2', 'PS3']

// Featured Game for Hero
const featuredGame = computed(() => {
  if (games.value && games.value.length > 0) {
    // Return the latest game (assuming sorted or just first item)
    return games.value[0]
  }
  return null
})

const { data: games, pending } = await useAsyncData('games', async () => {
  const { data: allGames } = await supabase.from('games').select('*')
  
  if (allGames && allGames.length > 0) {
    const { data: comments } = await supabase.from('comments').select('game_id, rating')
    
    return allGames.map(game => {
      const gameComments = comments?.filter(c => c.game_id === game.id) || []
      const avgRating = gameComments.length > 0 
        ? gameComments.reduce((sum, c) => sum + c.rating, 0) / gameComments.length 
        : 0
      return { ...game, avgRating }
    })
  }
  return []
})

const filteredGames = computed(() => {
  if (!games.value) return []
  let list = [...games.value]

  // Platform filter
  if (activePlatform.value !== 'Semua') {
    list = list.filter(g => g.platform?.toUpperCase() === activePlatform.value.toUpperCase())
  }

  // Genre filter (from clicking badge)
  if (genreFilter.value) {
    list = list.filter(g => g.genres && g.genres.some(genre => genre.trim().toLowerCase() === genreFilter.value.toLowerCase()))
  }

  // Search filter
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(g =>
      g.title?.toLowerCase().includes(q) ||
      (g.genres && g.genres.some(genre => genre.toLowerCase().includes(q)))
    )
  }

  // Sort
  if (sortBy.value === 'az') list.sort((a, b) => a.title.localeCompare(b.title))
  else if (sortBy.value === 'za') list.sort((a, b) => b.title.localeCompare(a.title))
  else if (sortBy.value === 'year_desc') list.sort((a, b) => (b.year || 0) - (a.year || 0))
  else if (sortBy.value === 'year_asc') list.sort((a, b) => (a.year || 0) - (b.year || 0))

  return list
})

const resetFilter = () => {
  searchQuery.value = ''
  activePlatform.value = 'Semua'
  sortBy.value = 'default'
  genreFilter.value = ''
}

const setGenreFilter = (genre) => {
  genreFilter.value = genreFilter.value === genre ? '' : genre
  searchQuery.value = ''
}

const isNew = (dateStr) => {
  if (!dateStr) return false
  const diffTime = Math.abs(new Date() - new Date(dateStr))
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays <= 7
}
</script>

<style scoped>
.card-hover-effect {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
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

