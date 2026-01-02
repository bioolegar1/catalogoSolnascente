<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// --- IMAGENS ---
// Certifique-se que estes arquivos existem EXATAMENTE com estes nomes na pasta assets
import bannerImg01 from '~/assets/imagem01.jpg'
import bannerImg02 from '~/assets/imagem02.jpg'
import bannerImg03 from '~/assets/imagem03.jpg'
import canela from '~/assets/canela.webp'
import cravodaindia from '~/assets/cravodaindia.webp'
import pimentadoreino from '~/assets/pimentadoreino.webp'

// --- ESTADOS DO BANNER ---
const currentBanner = ref(0)
const banners = [
  { id: 1, title: 'Temperos e especiarias', subtitle: 'Direto do produtor para sua mesa', image: bannerImg01, icon: '🌿' },
  { id: 2, title: 'Ofertas Especiais', subtitle: 'Confira nossos preços de atacado', image: bannerImg02, icon: '🔥' },
  { id: 3, title: 'Entrega Rápida', subtitle: 'Entregamos qualidade com celeridade', image: bannerImg03, icon: '🚚' }
]

let bannerInterval: any = null

onMounted(() => {
  startBannerRotation()
})

onUnmounted(() => {
  stopBannerRotation()
})

const startBannerRotation = () => {
  bannerInterval = setInterval(() => {
    currentBanner.value = (currentBanner.value + 1) % banners.length
  }, 4000)
}

const stopBannerRotation = () => {
  if (bannerInterval) clearInterval(bannerInterval)
}

const setBanner = (index: number) => {
  stopBannerRotation()
  currentBanner.value = index
  startBannerRotation()
}
</script>

<template>
  <div class="flex flex-col relative w-full overflow-x-hidden">

    <div class="relative w-full h-64 md:h-[500px] overflow-hidden bg-gray-900 group">
      <div class="flex h-full transition-transform duration-700 ease-in-out" :style="{ transform: `translateX(-${currentBanner * 100}%)` }">
        <div v-for="banner in banners" :key="banner.id" class="min-w-full w-full h-full flex-shrink-0 flex items-center justify-center text-white p-8 relative">
          <img :src="banner.image" class="absolute inset-0 w-full h-full object-cover" alt="Banner Promocional" />
          <div class="absolute inset-0 bg-black/30"></div>
          <div class="text-center animate-fade-in-up relative z-10 drop-shadow-xl">
            <div class="text-6xl md:text-8xl mb-4 opacity-90 filter drop-shadow-lg">{{ banner.icon }}</div>
            <h2 class="text-3xl md:text-6xl font-bold mb-3 tracking-tight drop-shadow-lg">{{ banner.title }}</h2>
            <p class="text-lg md:text-2xl opacity-95 font-light drop-shadow-md">{{ banner.subtitle }}</p>
          </div>
        </div>
      </div>
      <div class="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-10">
        <button v-for="(banner, index) in banners" :key="'dot-' + index" @click="setBanner(index)" class="w-3 h-3 rounded-full transition-all duration-300 border border-white shadow-sm" :class="currentBanner === index ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'"></button>
      </div>
    </div>

    <section class="bg-white py-16 md:py-24 px-4">
      <div class="max-w-6xl mx-auto">

        <div class="text-center max-w-4xl mx-auto mb-16 space-y-6 animate-fade-in-up">
          <span class="text-green-600 font-bold uppercase tracking-wider text-sm">Desde 1998</span>
          <h2 class="text-3xl md:text-5xl font-bold text-gray-800 leading-tight">Uma Viagem pelos Sabores</h2>
          <p class="text-lg text-gray-600 leading-relaxed">
            A história dos temperos é uma jornada fascinante que se estende por milênios.
            No <strong>Sol Nascente</strong>, honramos essa tradição trazendo o melhor dessa história para a sua cozinha.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 mb-16">

          <div class="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition duration-300 group border border-gray-100">
            <div class="h-48 overflow-hidden relative">
              <img :src="pimentadoreino" class="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt="Pimenta do Reino">
              <div class="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition"></div>
            </div>
            <div class="p-8">
              <h3 class="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2"><span>⚫</span> Ouro Negro</h3>
              <p class="text-gray-600 text-sm leading-relaxed">
                A <strong>Pimenta do Reino</strong> é indispensável para adicionar profundidade e aquele toque picante aos pratos do dia a dia.
              </p>
            </div>
          </div>

          <div class="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition duration-300 group border border-gray-100">
            <div class="h-48 overflow-hidden relative">
              <img :src="cravodaindia" class="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt="Cravo da Índia">
              <div class="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition"></div>
            </div>
            <div class="p-8">
              <h3 class="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2"><span>🍂</span> Tesouro das Ilhas</h3>
              <p class="text-gray-600 text-sm leading-relaxed">
                O <strong>Cravo-da-Índia</strong> transforma doces e conservas em experiências inesquecíveis.
              </p>
            </div>
          </div>

          <div class="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition duration-300 group border border-gray-100">
            <div class="h-48 overflow-hidden relative">
              <img :src="canela" class="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt="Canela">
              <div class="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition"></div>
            </div>
            <div class="p-8">
              <h3 class="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2"><span>🪵</span> Conforto e Tradição</h3>
              <p class="text-gray-600 text-sm leading-relaxed">
                A <strong>Canela</strong>, com seu aroma quente e doce, evoca memórias de conforto.
              </p>
            </div>
          </div>
        </div>

        <div class="text-center">
          <p class="text-gray-500 mb-6 italic">Cada pitada carrega uma história rica e um legado de aventura.</p>
          <NuxtLink
              to="/produtos"
              class="bg-green-600 hover:bg-green-700 text-white text-lg font-bold py-4 px-12 rounded-full shadow-lg hover:shadow-green-500/30 transition transform hover:-translate-y-1 inline-flex items-center gap-3"
          >
            <span>📜</span> Conferir Nosso Catálogo Completo
          </NuxtLink>
        </div>
      </div>
    </section>

  </div>
</template>

<style>
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fade-in-up 0.3s ease-out forwards;
}
</style>