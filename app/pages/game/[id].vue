<template>
  <div v-if="game" class="position-relative min-vh-100">
    <!-- Blurred Background -->
    <div class="detail-bg-blur" :style="{ backgroundImage: `url('/${game.image}')` }"></div>
    <div class="detail-bg-overlay"></div>

    <div class="container position-relative py-5" style="z-index: 10;">
      <!-- Back Button -->
      <div class="mb-4 d-flex align-items-center justify-content-between">
        <NuxtLink to="/menu" class="btn btn-outline-light rounded-pill px-4 font-weight-bold" style="background: rgba(255,255,255,0.1); backdrop-filter: blur(5px);">
          &larr; Kembali ke Katalog
        </NuxtLink>
        <button class="btn-share" @click="shareGame">
          🔗 Salin Link
        </button>
      </div>

      <!-- Game Hero -->
      <div class="row align-items-start mb-4">
        <div class="col-lg-4 col-md-5 mb-4 mb-md-0">
          <div class="glass-card rounded-lg overflow-hidden shadow-lg p-2">
            <img :src="`/${game.image}`" class="w-100 rounded" :alt="game.title">
          </div>
        </div>
        <div class="col-lg-8 col-md-7">
          <h1 class="font-weight-bold text-white mb-2" style="font-family: 'Outfit', sans-serif; font-size: clamp(1.8rem, 4vw, 3rem); text-shadow: 0 4px 10px rgba(0,0,0,0.5); line-height: 1.2;">{{ game.title }}</h1>

          <!-- Badges & Rating -->
          <div class="mb-3 d-flex flex-wrap align-items-center" style="gap: 8px;">
            <span class="badge-platform position-static">{{ game.platform?.toUpperCase() }}</span>
            <span class="badge-genre" style="cursor:default; pointer-events:none;">{{ game.year }}</span>
            <NuxtLink
              v-for="genre in (game.genres || [])"
              :key="genre"
              :to="`/menu?genre=${encodeURIComponent(genre.trim())}`"
              class="badge-genre"
              style="text-decoration:none;"
              @click.prevent="goToGenre(genre.trim())"
            >🏷 {{ genre.trim() }}</NuxtLink>
            <div v-if="avgRating > 0" class="d-flex align-items-center ml-2">
              <div class="star-display">
                <span v-for="s in 5" :key="s" class="star" :class="{ active: s <= Math.round(avgRating) }">★</span>
              </div>
              <small class="text-muted ml-1">({{ comments.length }})</small>
            </div>
          </div>

          <!-- Description -->
          <div class="glass-card p-4 rounded-lg mb-4 text-light" style="line-height: 1.8;">
            <h5 class="text-gradient font-weight-bold mb-3" style="font-family: 'Outfit';">TENTANG GAME INI</h5>
            <p style="color: #94a3b8; margin: 0;">{{ game.description }}</p>
          </div>

          <!-- Price & Download -->
          <div class="d-flex flex-wrap align-items-center" style="gap: 16px;">
            <div class="glass-card px-4 py-3 rounded-lg">
              <span class="d-block" style="color: #64748b; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px;">Harga Resmi</span>
              <strong class="text-white" style="font-size: 1.3rem;">{{ game.price || 'Free' }}</strong>
            </div>
            <a v-if="game.link" :href="game.link" target="_blank" class="btn btn-beli px-4 py-3 font-weight-bold">
              ⬇ Download Sekarang
            </a>
            <span v-else class="text-muted">Link belum tersedia</span>
            <button v-if="game.link" class="btn btn-outline-danger px-3 py-2 font-weight-bold" @click="reportBrokenLink" :disabled="reportingLink" style="border-radius: 8px; font-size: 0.9rem;" title="Lapor jika link download mati">
              {{ reportingLink ? '⏳' : '⚠️ Lapor Link Rusak' }}
            </button>
          </div>
        </div>
      </div>

      <!-- TAB NAVIGATION -->
      <div class="tab-nav mb-5 mt-4">
        <button class="tab-btn" :class="{ active: activeTab === 'info' }" @click="activeTab = 'info'">📋 Info & Trailer</button>
        <button class="tab-btn" :class="{ active: activeTab === 'comments' }" @click="activeTab = 'comments'">
          💬 Komentar <span v-if="comments.length" style="font-size: 0.75rem; opacity: 0.7;">({{ comments.length }})</span>
        </button>
        <button class="tab-btn" :class="{ active: activeTab === 'guides' }" @click="activeTab = 'guides'">
          📖 Panduan <span v-if="guides.length" style="font-size: 0.75rem; opacity: 0.7;">({{ guides.length }})</span>
        </button>
        <button class="tab-btn" :class="{ active: activeTab === 'similar' }" @click="activeTab = 'similar'">🎯 Game Serupa</button>
      </div>

      <!-- TAB: INFO & TRAILER -->
      <div v-if="activeTab === 'info'">
        <div class="row">
          <div class="col-lg-6 mb-4">
            <h3 class="text-white mb-4" style="font-family: 'Outfit'; font-weight: 700; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 12px;">Trailer Resmi</h3>
            <div class="rounded-lg overflow-hidden shadow-lg border border-secondary">
              <iframe v-if="game.trailer" width="100%" height="315" :src="game.trailer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              <div v-else class="p-5 text-center glass-card" style="border: none;">
                <p style="color: #475569;">Trailer belum tersedia.</p>
              </div>
            </div>
          </div>
          <div class="col-lg-6 mb-4">
            <h3 class="text-white mb-4" style="font-family: 'Outfit'; font-weight: 700; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 12px;">Spesifikasi Sistem</h3>
            <div class="glass-card p-4 rounded-lg text-light">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <h6 class="text-gradient font-weight-bold mb-3" style="font-family: 'Outfit';">Minimum</h6>
                  <ul class="list-unstyled" style="font-size: 0.88rem; color: #94a3b8;" v-if="game.req_min">
                    <li class="mb-2"><strong class="text-muted">OS:</strong> {{ game.req_min.os }}</li>
                    <li class="mb-2"><strong class="text-muted">CPU:</strong> {{ game.req_min.processor }}</li>
                    <li class="mb-2"><strong class="text-muted">RAM:</strong> {{ game.req_min.memory }}</li>
                    <li class="mb-2"><strong class="text-muted">GPU:</strong> {{ game.req_min.graphics }}</li>
                    <li><strong class="text-muted">HDD:</strong> {{ game.req_min.storage }}</li>
                  </ul>
                </div>
                <div class="col-md-6">
                  <h6 class="text-gradient font-weight-bold mb-3" style="font-family: 'Outfit';">Recommended</h6>
                  <ul class="list-unstyled" style="font-size: 0.88rem; color: #94a3b8;" v-if="game.req_rec">
                    <li class="mb-2"><strong class="text-muted">OS:</strong> {{ game.req_rec.os }}</li>
                    <li class="mb-2"><strong class="text-muted">CPU:</strong> {{ game.req_rec.processor }}</li>
                    <li class="mb-2"><strong class="text-muted">RAM:</strong> {{ game.req_rec.memory }}</li>
                    <li class="mb-2"><strong class="text-muted">GPU:</strong> {{ game.req_rec.graphics }}</li>
                    <li><strong class="text-muted">HDD:</strong> {{ game.req_rec.storage }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB: COMMENTS -->
      <div v-if="activeTab === 'comments'">
        <!-- Form Komentar -->
        <div class="form-modern mb-5">
          <h5 class="text-white font-weight-bold mb-4" style="font-family: 'Outfit';">✍ Tulis Komentar</h5>
          <div class="row">
            <div class="col-md-4 mb-3">
              <label class="label-modern">Nama Kamu</label>
              <input v-model="newComment.user_name" type="text" class="form-control input-modern" placeholder="cth: Gamer123">
            </div>
            <div class="col-md-8 mb-3">
              <label class="label-modern">Rating</label>
              <div class="star-rating">
                <span v-for="s in 5" :key="s" class="star" :class="{ active: s <= newComment.rating }" @click="newComment.rating = s">★</span>
              </div>
            </div>
            <div class="col-12 mb-3">
              <label class="label-modern">Komentarmu</label>
              <textarea v-model="newComment.content" class="form-control input-modern" rows="3" placeholder="Bagaimana pendapatmu tentang game ini?"></textarea>
            </div>
            <div class="col-12">
              <button class="btn btn-beli px-4 py-2" @click="submitComment" :disabled="submittingComment">
                {{ submittingComment ? 'Mengirim...' : '📤 Kirim Komentar' }}
              </button>
              <span v-if="commentSuccess" class="ml-3 text-success">✅ Komentar berhasil dikirim!</span>
            </div>
          </div>
        </div>

        <!-- Daftar Komentar -->
        <div v-if="comments.length === 0" class="text-center py-5 glass-card rounded-lg">
          <div style="font-size: 3rem;">💬</div>
          <p style="color: #475569;" class="mt-2">Belum ada komentar. Jadilah yang pertama!</p>
        </div>
        <div v-else>
          <h5 class="text-white mb-4" style="font-family: 'Outfit';">{{ comments.length }} Komentar</h5>
          <div class="comment-card" v-for="comment in comments" :key="comment.id">
            <div class="d-flex justify-content-between align-items-start">
              <div>
                <span class="comment-author">{{ comment.user_name }}</span>
                <span class="comment-date ml-2">{{ formatDate(comment.created_at) }}</span>
              </div>
              <div class="star-display">
                <span v-for="s in 5" :key="s" class="star" :class="{ active: s <= comment.rating }">★</span>
              </div>
            </div>
            <p class="comment-text">{{ comment.content }}</p>
          </div>
        </div>
      </div>

      <!-- TAB: GUIDES -->
      <div v-if="activeTab === 'guides'">
        <!-- Form Guide Dihapus (Hanya Admin) -->

        <!-- Daftar Guide -->
        <div v-if="guides.length === 0" class="text-center py-5 glass-card rounded-lg">
          <div style="font-size: 3rem;">📖</div>
          <p style="color: #475569;" class="mt-2">Belum ada panduan. Bantu gamer lain dengan berbagi tips!</p>
        </div>
        <div v-else>
          <h5 class="text-white mb-4" style="font-family: 'Outfit';">{{ guides.length }} Panduan</h5>
          <div class="guide-card" v-for="guide in guides" :key="guide.id">
            <div class="guide-header" @click="guide._open = !guide._open">
              <div>
                <p class="guide-title">{{ guide.title }}</p>
                <span class="guide-author">oleh {{ guide.author }} · {{ formatDate(guide.created_at) }}</span>
              </div>
              <span style="color: #10b981; font-size: 1.2rem;">{{ guide._open ? '▲' : '▼' }}</span>
            </div>
            <div class="guide-body" v-if="guide._open">{{ guide.content }}</div>
          </div>
        </div>
      </div>

      <!-- TAB: SIMILAR GAMES -->
      <div v-if="activeTab === 'similar'">
        <h3 class="text-white mb-4" style="font-family: 'Outfit'; font-weight: 700;">Game dengan Genre Serupa</h3>
        <div v-if="similarGames.length === 0" class="text-center py-5 glass-card rounded-lg">
          <p style="color: #475569;">Tidak ada game serupa yang ditemukan.</p>
        </div>
        <div class="row" v-else>
          <div class="col-lg-3 col-md-4 col-6 mb-4" v-for="sg in similarGames" :key="sg.id">
            <NuxtLink :to="`/game/${sg.id}`" class="similar-card">
              <img :src="`/${sg.image}`" :alt="sg.title">
              <div class="similar-card-body">
                <p class="similar-card-title">{{ sg.title }}</p>
                <span class="similar-card-platform">{{ sg.platform }}</span>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- Loading State -->
  <div v-else class="min-vh-100 d-flex justify-content-center align-items-center">
    <div class="text-center">
      <div class="spinner-border text-success mb-3" role="status" style="width: 3rem; height: 3rem;"></div>
      <p style="color: #475569;">Memuat data game...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from '#app'

const route = useRoute()
const id = Number(route.params.id)
const supabase = useSupabaseClient()

// Active tab
const activeTab = ref('info')

// Share Game
const shareGame = () => {
  navigator.clipboard.writeText(window.location.href)
  alert('✅ Link berhasil disalin!')
}

// Navigate to catalog with genre filter
const router = useRouter()
const goToGenre = (genre) => {
  router.push({ path: '/menu', query: { genre } })
}

// Format Date
const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

// Fetch game data
const { data: gameData } = await useAsyncData(`game-${id}`, async () => {
  const { data } = await supabase.from('games').select('*').eq('id', id).single()
  return data
})
const game = computed(() => gameData.value)

// Fetch comments
const { data: commentsData, refresh: refreshComments } = await useAsyncData(`comments-${id}`, async () => {
  const { data } = await supabase.from('comments').select('*').eq('game_id', id).order('created_at', { ascending: false })
  return data || []
})
const comments = computed(() => commentsData.value || [])
const avgRating = computed(() => {
  if (!comments.value.length) return 0
  return comments.value.reduce((acc, c) => acc + c.rating, 0) / comments.value.length
})

// Fetch guides
const { data: guidesData, refresh: refreshGuides } = await useAsyncData(`guides-${id}`, async () => {
  const { data } = await supabase.from('guides').select('*').eq('game_id', id).order('created_at', { ascending: false })
  return data?.map(g => ({ ...g, _open: false })) || []
})
const guides = computed(() => guidesData.value || [])

// Fetch similar games
const { data: similarData } = await useAsyncData(`similar-${id}`, async () => {
  if (!gameData.value?.genres?.length) return []
  const firstGenre = gameData.value.genres[0]
  const { data } = await supabase.from('games').select('id, title, image, platform').neq('id', id).limit(8)
  return data?.filter(g => g.id !== id).slice(0, 4) || []
})
const similarGames = computed(() => similarData.value || [])

// New Comment form
const newComment = ref({ user_name: '', content: '', rating: 5 })
const submittingComment = ref(false)
const commentSuccess = ref(false)

const submitComment = async () => {
  if (!newComment.value.user_name.trim() || !newComment.value.content.trim()) {
    alert('Nama dan komentar tidak boleh kosong.')
    return
  }
  submittingComment.value = true
  await supabase.from('comments').insert({
    game_id: id,
    user_name: newComment.value.user_name,
    content: newComment.value.content,
    rating: newComment.value.rating
  })
  newComment.value = { user_name: '', content: '', rating: 5 }
  commentSuccess.value = true
  await refreshComments()
  submittingComment.value = false
  setTimeout(() => commentSuccess.value = false, 3000)
}

// Report Broken Link
const reportingLink = ref(false)

const reportBrokenLink = async () => {
  if (confirm('Apakah kamu yakin ingin melaporkan bahwa link download game ini rusak/mati?')) {
    reportingLink.value = true
    await supabase.from('reports').insert({
      game_id: id,
      game_title: game.value.title
    })
    reportingLink.value = false
    alert('Terima kasih! Laporan link rusak berhasil dikirim dan akan segera diperbaiki.')
  }
}
</script>

<style scoped>
.detail-bg-blur {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-size: cover;
  background-position: center;
  filter: blur(20px);
  transform: scale(1.1);
  z-index: 1;
  pointer-events: none;
}
.detail-bg-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: linear-gradient(to bottom, rgba(15, 23, 42, 0.7) 0%, rgba(15, 23, 42, 1) 100%);
  z-index: 2;
  pointer-events: none;
}
</style>

