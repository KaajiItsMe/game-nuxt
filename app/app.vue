<template>
  <div class="bg-wallpaper">
    <!-- Global Glass Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark glass-nav">
      <div class="container">
        <NuxtLink class="navbar-brand font-weight-bold text-white d-flex align-items-center" to="/" style="border: none;">
          <img src="/logo.png" alt="Agame25" height="40" style="object-fit: contain; mix-blend-mode: screen; border: none; outline: none;">
        </NuxtLink>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto align-items-lg-center">
            <li class="nav-item">
              <NuxtLink class="nav-link font-weight-bold" to="/" exact-active-class="text-white">Home</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link font-weight-bold" to="/tentang" active-class="text-white">Tentang</NuxtLink>
            </li>
            <li class="nav-item position-relative" @mouseenter="showGenre = true" @mouseleave="showGenre = false">
              <a class="nav-link font-weight-bold" href="#" style="cursor: pointer;">Genre ▼</a>
              <transition name="fade">
                <div v-show="showGenre" class="dropdown-menu show" style="position: absolute; top: 100%; left: 0; background: rgba(15,23,42,0.95); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; margin-top: 0; padding: 8px 0; min-width: 150px; z-index: 1000;">
                  <NuxtLink v-for="g in ['Action', 'Adventure', 'RPG', 'Racing', 'Sports', 'Horror', 'Simulation']" :key="g" class="dropdown-item text-white" :to="`/?genre=${g}`" @click="showGenre = false" style="transition: background 0.2s;">
                    {{ g }}
                  </NuxtLink>
                </div>
              </transition>
            </li>
            <li class="nav-item ml-lg-3 mt-2 mt-lg-0">
              <input
                type="text"
                v-model="searchQuery"
                @focus="goToHome"
                class="form-control form-control-sm"
                placeholder="🔍 Cari game..."
                style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; border-radius: 20px; padding: 5px 15px; min-width: 200px;"
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Page Content with Transitions -->
    <NuxtPage :transition="{ name: 'page', mode: 'out-in' }" />

    <!-- Adsterra Native Banner / Smartlink Area -->
    <div class="container my-4 text-center">
      <iframe src="/ad-banner-1.html" width="100%" height="90" frameborder="0" scrolling="no" style="max-width: 100%; overflow: hidden;"></iframe>
    </div>

    <!-- Global Footer -->
    <footer class="global-footer">
      <div class="container">
        <div class="row">
          <div class="col-md-4 mb-4">
            <div class="footer-brand mb-3" style="border: none;">
              <img src="/logo.png" alt="Agame25 Logo" height="50" style="object-fit: contain; mix-blend-mode: screen; border: none; outline: none;">
            </div>
            <p class="footer-tagline mt-2">Platform katalog game premium untuk PC &amp; Konsol. Download gratis, mainkan tanpa batas.</p>
          </div>
          <div class="col-md-2 offset-md-2 mb-4">
            <p class="footer-heading">Navigasi</p>
            <NuxtLink to="/" class="footer-link">Home / Katalog</NuxtLink>
            <NuxtLink to="/tentang" class="footer-link">Tentang Kami</NuxtLink>
          </div>
          <div class="col-md-3 mb-4">
            <p class="footer-heading">Platform</p>
            <span class="footer-link" style="cursor:default;">PC Game</span>
            <span class="footer-link" style="cursor:default;">PS2 Game</span>
            <span class="footer-link" style="cursor:default;">PS3 Game</span>
          </div>
        </div>
        <hr class="footer-divider">
        <p class="footer-bottom">&copy; 2026 Agame25. All rights reserved. &nbsp;|&nbsp; Kontak: loremipsum0891@gmail.com</p>
      </div>
    </footer>

    <!-- Scroll to Top Button -->
    <button
      class="scroll-top-btn"
      :class="{ hidden: !showScrollTop }"
      @click="scrollToTop"
      title="Kembali ke atas"
    >▲</button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const showScrollTop = ref(false)
const showGenre = ref(false)

const searchQuery = useState('searchQuery', () => '')
const router = useRouter()

const goToHome = () => {
  if (router.currentRoute.value.path !== '/') {
    router.push('/')
  }
}

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.dropdown-item:hover {
  background: rgba(255, 255, 255, 0.1) !important;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

