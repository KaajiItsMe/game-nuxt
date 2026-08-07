<template>
  <div class="bg-wallpaper">
    <!-- Global Glass Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark glass-nav">
      <div class="container">
        <NuxtLink class="navbar-brand font-weight-bold text-white" to="/" style="font-family: 'BigSpace'; font-size: 1.5rem; letter-spacing: 2px;">
          Game<span class="text-gradient">25</span>
        </NuxtLink>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <NuxtLink class="nav-link font-weight-bold" to="/" exact-active-class="text-white">Home</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link font-weight-bold" to="/menu" active-class="text-white">Katalog</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link font-weight-bold" to="/tentang" active-class="text-white">Tentang</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Page Content with Transitions -->
    <NuxtPage :transition="{ name: 'page', mode: 'out-in' }" />

    <!-- Global Footer -->
    <footer class="global-footer">
      <div class="container">
        <div class="row">
          <div class="col-md-4 mb-4">
            <div class="footer-brand">Game<span class="text-gradient">25</span></div>
            <p class="footer-tagline mt-2">Platform katalog game premium untuk PC &amp; Konsol. Download gratis, mainkan tanpa batas.</p>
          </div>
          <div class="col-md-2 offset-md-2 mb-4">
            <p class="footer-heading">Navigasi</p>
            <NuxtLink to="/" class="footer-link">Home</NuxtLink>
            <NuxtLink to="/menu" class="footer-link">Katalog Game</NuxtLink>
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
        <p class="footer-bottom">&copy; 2026 Game25. All rights reserved. &nbsp;|&nbsp; Kontak: loremipsum0891@gmail.com</p>
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

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

