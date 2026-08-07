<template>
  <div class="min-vh-100 bg-wallpaper position-relative">
    <div class="container py-5" style="z-index: 10; position: relative;">
      
      <div class="mb-5 text-center">
        <h1 class="text-white font-weight-bold mb-3" style="font-family: 'Outfit'; font-size: 3rem;">Jelajahi Kategori Game</h1>
        <p style="color: #94a3b8; font-size: 1.1rem; max-width: 600px; margin: 0 auto;">Temukan game favoritmu dari puluhan genre yang tersedia. Dari aksi tembak-tembakan seru hingga teka-teki santai, semuanya ada di sini.</p>
      </div>

      <div class="row" v-if="pending">
        <div class="col-12 text-center py-5">
          <div class="spinner-border text-info" role="status"></div>
          <p class="text-white mt-3">Memuat genre...</p>
        </div>
      </div>
      <div class="row" v-else>
        <div v-for="(genre, idx) in allGenres" :key="idx" class="col-lg-3 col-md-4 col-6 mb-4">
          <NuxtLink :to="`/?genre=${encodeURIComponent(genre.name)}`" class="genre-card">
            <div class="genre-icon">{{ genre.emoji }}</div>
            <h5 class="genre-name">{{ genre.name }}</h5>
            <small class="text-muted mt-2">{{ genre.count }} Game</small>
          </NuxtLink>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

useHead({
  title: 'Kategori Genre - Agame25'
})

const supabase = useSupabaseClient()

// Kamus emoji untuk mencocokkan nama genre secara otomatis
const getEmoji = (genreName) => {
  const map = {
    'action': '⚔️', 'adventure': '🗺️', 'rpg': '🧙‍♂️', 'shooter': '🔫',
    'racing': '🏎️', 'sports': '⚽', 'horror': '🧟', 'simulation': '🚜',
    'strategy': '♟️', 'puzzle': '🧩', 'fighting': '🥊', 'platformer': '🦘',
    'survival': '🏕️', 'stealth': '🥷', 'casual': '🎮', 'open world': '🌍',
    'story rich': '📖', 'co-op': '🤝', 'multiplayer': '🌐', 'indie': '💎',
    'action rpg': '🔥', 'soulslike': '💀', 'dark fantasy': '🦇',
    'choices matter': '⚖️', 'female protagonist': '👧', 'episodic adventure': '📺'
  }
  return map[genreName.toLowerCase()] || '🎮'
}

// Ambil semua game dan ekstrak genre-nya secara dinamis
const { data: allGenres, pending } = await useAsyncData('dynamic-genres', async () => {
  const { data } = await supabase.from('games').select('genres')
  if (!data) return []
  
  const genreCount = {}
  
  data.forEach(game => {
    let genresArray = []
    if (Array.isArray(game.genres)) {
      genresArray = game.genres
    } else if (typeof game.genres === 'string') {
      try { genresArray = JSON.parse(game.genres) } catch(e) {}
    }
    
    if (Array.isArray(genresArray)) {
      genresArray.forEach(g => {
        const cleanGenre = g.trim()
        if (cleanGenre) {
          genreCount[cleanGenre] = (genreCount[cleanGenre] || 0) + 1
        }
      })
    }
  })
  
  // Ubah ke format array dan urutkan berdasarkan abjad
  return Object.keys(genreCount).map(name => ({
    name,
    count: genreCount[name],
    emoji: getEmoji(name)
  })).sort((a, b) => a.name.localeCompare(b.name))
})
</script>

<style scoped>
.genre-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 30px 20px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
}

.genre-card:hover {
  transform: translateY(-8px);
  background: rgba(30, 41, 59, 0.9);
  border-color: rgba(56, 189, 248, 0.5);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5), 0 0 15px rgba(56, 189, 248, 0.2);
}

.genre-icon {
  font-size: 3rem;
  margin-bottom: 15px;
  transition: transform 0.3s ease;
}

.genre-card:hover .genre-icon {
  transform: scale(1.2);
}

.genre-name {
  color: white;
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  margin: 0;
  text-align: center;
  letter-spacing: 0.5px;
}
</style>
