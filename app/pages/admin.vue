<template>
  <div class="min-vh-100 py-5" style="background-color: #0f172a; padding-top: 100px !important;">
    <div class="container">
      
      <!-- LOGIN SECTION -->
      <div v-if="!user" class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
          <div class="glass-card p-5 rounded-lg text-center">
            <h2 class="text-white mb-4" style="font-family: 'BigSpace'; letter-spacing: 2px;">Admin Login</h2>
            <p class="text-muted mb-4">Masuk menggunakan akun Supabase kamu.</p>
            
            <form @submit.prevent="handleLogin">
              <div class="mb-3 text-left">
                <label class="label-modern">Email</label>
                <input v-model="email" type="email" class="form-control input-modern" required>
              </div>
              <div class="mb-4 text-left">
                <label class="label-modern">Password</label>
                <input v-model="password" type="password" class="form-control input-modern" required>
              </div>
              <button type="submit" class="btn btn-beli w-100 py-2 font-weight-bold" :disabled="loading">
                {{ loading ? 'Loading...' : 'Login' }}
              </button>
              <p v-if="errorMsg" class="text-danger mt-3">{{ errorMsg }}</p>
            </form>
          </div>
        </div>
      </div>

      <!-- DASHBOARD SECTION -->
      <div v-else>
        <div class="d-flex justify-content-between align-items-center mb-5">
          <h2 class="text-white" style="font-family: 'BigSpace'; letter-spacing: 2px;">Admin Dashboard</h2>
          <button @click="handleLogout" class="btn btn-outline-danger px-4">Logout</button>
        </div>

        <div class="tab-nav mb-4">
          <button class="tab-btn" :class="{ active: activeTab === 'reports' }" @click="activeTab = 'reports'">Laporan Link Rusak</button>
          <button class="tab-btn" :class="{ active: activeTab === 'games' }" @click="activeTab = 'games'">Kelola Game</button>
        </div>

        <!-- TAB: REPORTS -->
        <div v-if="activeTab === 'reports'" class="glass-card p-4 rounded-lg">
          <h4 class="text-white mb-4">Laporan Link Rusak</h4>
          <div v-if="loadingReports" class="text-center text-white">Memuat...</div>
          <div v-else-if="reports.length === 0" class="text-center text-muted">Tidak ada laporan.</div>
          <div v-else class="table-responsive">
            <table class="table table-dark table-hover" style="background: transparent;">
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>ID Game</th>
                  <th>Judul Game</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="r in reports" :key="r.id">
                  <td>{{ new Date(r.created_at).toLocaleDateString() }}</td>
                  <td>{{ r.game_id }}</td>
                  <td>{{ r.game_title }}</td>
                  <td>
                    <span :class="r.status === 'pending' ? 'text-warning' : 'text-success'">{{ r.status.toUpperCase() }}</span>
                  </td>
                  <td>
                    <button v-if="r.status === 'pending'" class="btn btn-sm btn-success" @click="markReportDone(r.id)">Tandai Selesai</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- TAB: GAMES -->
        <div v-if="activeTab === 'games'" class="glass-card p-4 rounded-lg">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h4 class="text-white mb-0">Daftar Game</h4>
            <button class="btn btn-beli" @click="openGameModal()">+ Tambah Game Baru</button>
          </div>
          
          <div v-if="loadingGames" class="text-center text-white">Memuat...</div>
          <div v-else class="table-responsive">
            <table class="table table-dark table-hover" style="background: transparent;">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Judul</th>
                  <th>Platform</th>
                  <th>Tahun</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="g in games" :key="g.id">
                  <td>{{ g.id }}</td>
                  <td>{{ g.title }}</td>
                  <td>{{ g.platform?.toUpperCase() }}</td>
                  <td>{{ g.year }}</td>
                  <td>
                    <button class="btn btn-sm btn-primary mr-2" @click="openGameModal(g)">Edit</button>
                    <button class="btn btn-sm btn-danger" @click="deleteGame(g.id)">Hapus</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>

    <!-- MODAL FORM GAME -->
    <div v-if="showModal" class="modal-backdrop" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 1050; display: flex; align-items: center; justify-content: center; overflow-y: auto;">
      <div class="glass-card p-4 rounded-lg w-100 my-5" style="max-width: 800px; max-height: 90vh; overflow-y: auto;">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h4 class="text-white m-0">{{ editingGame ? 'Edit Game' : 'Tambah Game Baru' }}</h4>
          <button class="btn text-white" @click="showModal = false" style="font-size: 1.5rem;">&times;</button>
        </div>
        
        <form @submit.prevent="saveGame" class="form-modern row">
          <div class="col-md-8 mb-3">
            <label class="label-modern">Judul Game</label>
            <input v-model="form.title" type="text" class="form-control input-modern" required>
          </div>
          <div class="col-md-4 mb-3">
            <label class="label-modern">Platform</label>
            <select v-model="form.platform" class="form-control input-modern" required>
              <option value="pc">PC</option>
              <option value="ps2">PS2</option>
              <option value="ps3">PS3</option>
            </select>
          </div>
          <div class="col-md-6 mb-3">
            <label class="label-modern">Tahun Rilis</label>
            <input v-model="form.year" type="number" class="form-control input-modern" required>
          </div>
          <div class="col-md-6 mb-3">
            <label class="label-modern">Harga (misal: Free, Rp 100.000)</label>
            <input v-model="form.price" type="text" class="form-control input-modern">
          </div>
          <div class="col-md-6 mb-3">
            <label class="label-modern">Gambar (Path: source/nama.jpg)</label>
            <input v-model="form.image" type="text" class="form-control input-modern" required>
          </div>
          <div class="col-md-6 mb-3">
            <label class="label-modern">Genre (Pisahkan dgn koma)</label>
            <input v-model="form.genres_text" type="text" class="form-control input-modern" placeholder="Action, Adventure, RPG" required>
          </div>
          <div class="col-12 mb-3">
            <label class="label-modern">Link Download</label>
            <input v-model="form.link" type="text" class="form-control input-modern" placeholder="https://...">
          </div>
          <div class="col-12 mb-3">
            <label class="label-modern">Link Trailer (Embed Youtube)</label>
            <input v-model="form.trailer" type="text" class="form-control input-modern" placeholder="https://www.youtube.com/embed/...">
          </div>
          <div class="col-12 mb-3">
            <label class="label-modern">Deskripsi</label>
            <textarea v-model="form.description" class="form-control input-modern" rows="4" required></textarea>
          </div>
          
          <div class="col-12 mt-3">
            <button type="submit" class="btn btn-beli px-5 py-2 font-weight-bold" :disabled="saving">
              {{ saving ? 'Menyimpan...' : 'Simpan Game' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

// Login State
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

// Dashboard State
const activeTab = ref('reports')

const handleLogin = async () => {
  loading.value = true
  errorMsg.value = ''
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  if (error) {
    errorMsg.value = error.message
  } else {
    fetchReports()
    fetchGames()
  }
  loading.value = false
}

const handleLogout = async () => {
  await supabase.auth.signOut()
}

// Reports Logic
const reports = ref([])
const loadingReports = ref(false)

const fetchReports = async () => {
  if (!user.value) return
  loadingReports.value = true
  const { data } = await supabase.from('reports').select('*').order('created_at', { ascending: false })
  reports.value = data || []
  loadingReports.value = false
}

const markReportDone = async (id) => {
  await supabase.from('reports').update({ status: 'done' }).eq('id', id)
  fetchReports()
}

// Games Logic
const games = ref([])
const loadingGames = ref(false)
const showModal = ref(false)
const editingGame = ref(false)
const saving = ref(false)

const form = ref({
  id: null,
  title: '',
  platform: 'pc',
  year: 2026,
  price: 'Free',
  image: 'source/image.jpg',
  genres_text: '',
  link: '',
  trailer: '',
  description: ''
})

const fetchGames = async () => {
  if (!user.value) return
  loadingGames.value = true
  const { data } = await supabase.from('games').select('id, title, platform, year').order('id', { ascending: false })
  games.value = data || []
  loadingGames.value = false
}

const openGameModal = async (game = null) => {
  if (game) {
    editingGame.value = true
    // Fetch full game data
    const { data } = await supabase.from('games').select('*').eq('id', game.id).single()
    if (data) {
      form.value = {
        ...data,
        genres_text: data.genres ? data.genres.join(', ') : ''
      }
    }
  } else {
    editingGame.value = false
    form.value = {
      id: null,
      title: '',
      platform: 'pc',
      year: new Date().getFullYear(),
      price: 'Free',
      image: 'source/game_placeholder.jpg',
      genres_text: '',
      link: '',
      trailer: '',
      description: ''
    }
  }
  showModal.value = true
}

const saveGame = async () => {
  saving.value = true
  const payload = {
    title: form.value.title,
    platform: form.value.platform,
    year: form.value.year,
    price: form.value.price,
    image: form.value.image,
    link: form.value.link,
    trailer: form.value.trailer,
    description: form.value.description,
    genres: form.value.genres_text.split(',').map(g => g.trim()).filter(g => g)
  }

  if (editingGame.value) {
    await supabase.from('games').update(payload).eq('id', form.value.id)
  } else {
    await supabase.from('games').insert(payload)
  }
  
  saving.value = false
  showModal.value = false
  fetchGames()
  alert('Data game berhasil disimpan!')
}

const deleteGame = async (id) => {
  if (confirm('Yakin ingin menghapus game ini? Tindakan ini tidak bisa dibatalkan.')) {
    await supabase.from('games').delete().eq('id', id)
    fetchGames()
  }
}

// Initial fetch if already logged in
onMounted(() => {
  if (user.value) {
    fetchReports()
    fetchGames()
  }
})
</script>

<style scoped>
/* Tambahan style untuk Modal jika diperlukan */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: rgba(255,255,255,0.05);
}
::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.2);
  border-radius: 4px;
}
</style>
