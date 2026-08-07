<template>
  <div class="bg-wallpaper min-vh-100 d-flex flex-column align-items-center justify-content-center text-center px-3 position-relative">
    <div class="hero-bg-decoration top-right"></div>
    <div class="hero-bg-decoration bottom-left"></div>

    <div class="position-relative" style="z-index: 2;">
      <!-- 404 Number -->
      <div style="font-family: 'BigSpace'; font-size: clamp(6rem, 18vw, 14rem); font-weight: 900; line-height: 1; background: linear-gradient(135deg, #334155, #475569); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; user-select: none;">
        404
      </div>

      <!-- Icon -->
      <div style="font-size: 4rem; margin: -16px 0 24px; animation: floatY 3s ease-in-out infinite;">🕹️</div>

      <h1 class="text-white font-weight-bold mb-3" style="font-family: 'Outfit'; font-size: clamp(1.5rem, 4vw, 2.5rem);">
        Game Over — Halaman Tidak Ditemukan
      </h1>
      <p style="color: #64748b; font-size: 1.05rem; max-width: 480px; margin: 0 auto 40px; line-height: 1.7;">
        Halaman yang Anda cari tidak ada atau sudah dihapus. Coba kembali ke beranda atau jelajahi katalog game kami.
      </p>

      <div class="d-flex flex-wrap justify-content-center" style="gap: 16px;">
        <NuxtLink to="/" class="btn btn-beli btn-lg px-5 py-3 font-weight-bold rounded-pill">
          🏠 Kembali ke Beranda
        </NuxtLink>
        <NuxtLink to="/menu" class="btn btn-outline-light btn-lg px-5 py-3 font-weight-bold rounded-pill" style="border-color: rgba(255,255,255,0.15);">
          📚 Lihat Katalog
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ error: Object })
</script>
