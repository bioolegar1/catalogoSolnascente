<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue'

// Importação do Logo e Imagens
import logo from '~/assets/solnascente-logo.svg'
import bannerImg01 from '~/assets/imagem01.jpg'
import bannerImg02 from '~/assets/imagem02.jpg'
import bannerImg03 from '~/assets/imagem03.jpg'

// ... (Resto do script continua igual ao anterior) ...
// (Apenas certifique-se de manter o script que você já tem, importando o logo)

const client = useSupabaseClient()
const loading = ref(true)
const products = ref<any[]>([])
const search = ref('')
const selectedCategory = ref('')
const categories = ref<string[]>([])
const selectedProduct = ref<any>(null)
const activeImage = ref('')
const currentBanner = ref(0)
const banners = [
  { id: 1, title: 'Temperos Frescos', subtitle: 'Direto do produtor para sua mesa', image: bannerImg01, icon: '🌿' },
  { id: 2, title: 'Ofertas Especiais', subtitle: 'Confira nossos preços de atacado', image: bannerImg02, icon: '🔥' },
  { id: 3, title: 'Entrega Rápida', subtitle: 'Enviamos para todo o Brasil', image: bannerImg03, icon: '🚚' }
]

let bannerInterval: any = null

onMounted(async () => {
  await fetchProducts()
  startBannerRotation()
})

onUnmounted(() => {
  stopBannerRotation()
})

const fetchProducts = async () => {
  loading.value = true
  const { data, error } = await client.from('products').select('*').order('name')
  if (!error) {
    products.value = data || []
    extractCategories(data || [])
  }
  loading.value = false
}

const extractCategories = (items: any[]) => {
  const cats = items.map(i => i.category).filter(Boolean)
  categories.value = [...new Set(cats)].sort()
}

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.value.toLowerCase())
    const matchesCategory = selectedCategory.value ? product.category === selectedCategory.value : true
    return matchesSearch && matchesCategory
  })
})

const relatedProducts = computed(() => {
  if (!selectedProduct.value) return []
  let list = products.value.filter(p =>
      p.category === selectedProduct.value.category &&
      p.id !== selectedProduct.value.id
  )
  if (list.length < 4) {
    const others = products.value.filter(p =>
        p.category !== selectedProduct.value.category &&
        p.id !== selectedProduct.value.id
    )
    list = [...list, ...others]
  }
  return list.slice(0, 4)
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

const openProduct = (item: any) => {
  selectedProduct.value = item
  activeImage.value = item.image_url || ''
  const modalContent = document.getElementById('modal-content')
  if (modalContent) modalContent.scrollTop = 0
}

const closeProduct = () => {
  selectedProduct.value = null
  activeImage.value = ''
}
</script>

<template>
  <div class="flex flex-col relative">

    <div class="relative w-full h-64 md:h-[400px] overflow-hidden bg-gray-900 group">
      <div class="flex h-full transition-transform duration-700 ease-in-out" :style="{ transform: `translateX(-${currentBanner * 100}%)` }">
        <div v-for="banner in banners" :key="banner.id" class="w-full h-full flex-shrink-0 flex items-center justify-center text-white p-8 relative">
          <img :src="banner.image" class="absolute inset-0 w-full h-full object-cover" alt="Banner Promocional" />
          <div class="absolute inset-0 bg-black/20"></div>
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

    <div class="bg-gray-50 border-b border-gray-200 py-8 px-4 sticky top-[0px] z-30 shadow-sm transition-all">
      <div class="max-w-5xl mx-auto">
        <div class="flex flex-col md:flex-row gap-4 items-center">
          <div class="flex-1 w-full relative group">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input v-model="search" type="text" placeholder="Busque por nome..." class="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 bg-white shadow-sm focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition text-lg" />
          </div>
          <select v-model="selectedCategory" class="w-full md:w-64 p-4 rounded-xl border border-gray-300 bg-white text-gray-700 shadow-sm cursor-pointer focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition text-lg">
            <option value="">Todas as Categorias</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>
      </div>
    </div>

    <main class="max-w-7xl mx-auto px-4 py-12 w-full">
      <div v-if="loading" class="text-center py-20">
        <img :src="logo" class="inline-block animate-spin h-16 w-16 mb-4 opacity-50" alt="Carregando..." />
        <p class="text-gray-500 font-medium text-lg">Carregando catálogo...</p>
      </div>

      <div v-else-if="filteredProducts.length === 0" class="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200 mx-auto max-w-2xl">
        <div class="text-6xl mb-4 grayscale opacity-40">🥗</div>
        <h3 class="text-xl font-bold text-gray-600">Nenhum produto encontrado</h3>
        <button @click="search = ''; selectedCategory = ''" class="mt-6 text-green-700 font-bold hover:bg-green-50 px-6 py-2 rounded-full transition">Limpar filtros</button>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div v-for="item in filteredProducts" :key="item.id" @click="openProduct(item)" class="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col hover:-translate-y-2 cursor-pointer">
          <div class="h-64 bg-gray-100 relative overflow-hidden">
            <img v-if="item.image_url" :src="item.image_url" class="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-in-out" />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-300 text-5xl bg-gray-50">📷</div>
            <span class="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">{{ item.category }}</span>
          </div>
          <div class="p-6 flex flex-col flex-1 justify-between">
            <div>
              <h3 class="font-bold text-gray-800 text-xl leading-tight mb-2 group-hover:text-green-700 transition">{{ item.name }}</h3>
              <div class="flex flex-wrap gap-2 text-xs text-gray-500 mb-4">
                <span v-if="item.weight" class="bg-gray-100 px-2.5 py-1 rounded-md text-gray-600 font-bold border border-gray-200">⚖️ {{ item.weight }}</span>
                <span v-if="item.package_qty" class="bg-yellow-50 text-yellow-800 px-2.5 py-1 rounded-md font-bold border border-yellow-200">📦 Caixa c/ {{ item.package_qty }}</span>
              </div>
              <p class="text-sm text-gray-600 line-clamp-3 leading-relaxed">{{ item.description || 'Produto selecionado com a qualidade e tradição Sol Nascente.' }}</p>
            </div>
            <div class="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
              <span class="text-xs font-bold text-green-600 uppercase tracking-wider group-hover:underline">Ver Detalhes</span>
              <span class="text-green-600 group-hover:translate-x-1 transition">→</span>
            </div>
          </div>
        </div>
      </div>
    </main>

    <div v-if="selectedProduct" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" @click="closeProduct"></div>
      <div id="modal-content" class="bg-white rounded-3xl shadow-2xl w-full max-w-6xl overflow-hidden relative z-10 flex flex-col animate-fade-in-up max-h-[95vh] overflow-y-auto">
        <button @click="closeProduct" class="absolute top-4 right-4 z-20 bg-white/90 p-2 rounded-full shadow hover:bg-gray-100 text-gray-600 transition">❌</button>
        <div class="flex flex-col md:flex-row">
          <div class="w-full md:w-1/2 bg-gray-100 min-h-[400px] flex flex-col">
            <div class="flex-1 relative overflow-hidden">
              <img v-if="activeImage" :src="activeImage" class="w-full h-full object-cover animate-fade-in-up" :key="activeImage" />
              <div v-else class="w-full h-full flex items-center justify-center text-6xl text-gray-300">📷</div>
            </div>
            <div v-if="selectedProduct.gallery && selectedProduct.gallery.length > 1" class="p-4 bg-white border-t flex gap-3 overflow-x-auto">
              <button v-for="(img, idx) in selectedProduct.gallery" :key="idx" @click="activeImage = img" class="w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition hover:opacity-100" :class="activeImage === img ? 'border-green-600 opacity-100 ring-2 ring-green-100' : 'border-gray-200 opacity-60 hover:border-green-400'">
                <img :src="img" class="w-full h-full object-cover" />
              </button>
            </div>
          </div>
          <div class="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{{ selectedProduct.category }}</span>
                <span class="text-xs text-gray-400 font-mono">ID: {{ selectedProduct.id }}</span>
              </div>
              <h2 class="text-4xl font-bold text-gray-900 mb-2 leading-tight">{{ selectedProduct.name }}</h2>
              <p class="text-sm text-gray-500 mb-8 font-mono">Cód Barras: {{ selectedProduct.barcode || '---' }}</p>
              <div class="flex gap-4 mb-8 text-sm">
                <div class="bg-gray-50 px-5 py-3 rounded-xl border border-gray-100 flex-1 text-center">
                  <span class="block text-gray-500 text-xs uppercase font-bold mb-1">Peso Líq.</span>
                  <span class="font-bold text-gray-800 text-xl">{{ selectedProduct.weight || '-' }}</span>
                </div>
                <div class="bg-yellow-50 px-5 py-3 rounded-xl border border-yellow-100 flex-1 text-center">
                  <span class="block text-yellow-600 text-xs uppercase font-bold mb-1">Na Caixa</span>
                  <span class="font-bold text-yellow-800 text-xl">{{ selectedProduct.package_qty ? `${selectedProduct.package_qty} un` : 'Unitário' }}</span>
                </div>
              </div>
              <div class="prose prose-base text-gray-600 mb-10">
                <h3 class="font-bold text-gray-900 mb-2 text-lg">Sobre o Produto</h3>
                <p class="leading-relaxed">{{ selectedProduct.description || 'Produto de alta qualidade selecionado especialmente para você, garantindo sabor e satisfação.' }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 border-t border-gray-100 p-8">
          <h3 class="font-bold text-gray-800 text-xl mb-6 flex items-center gap-2"><span>✨</span> Veja também</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="related in relatedProducts" :key="related.id" @click="openProduct(related)" class="bg-white p-3 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-green-200 transition group">
              <div class="h-32 bg-gray-100 rounded-lg overflow-hidden mb-3 relative">
                <img v-if="related.image_url" :src="related.image_url" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                <div v-else class="w-full h-full flex items-center justify-center text-gray-300">📷</div>
              </div>
              <div class="space-y-1">
                <span class="text-[10px] text-gray-500 uppercase font-bold">{{ related.category }}</span>
                <h4 class="font-bold text-gray-800 text-sm truncate leading-tight">{{ related.name }}</h4>
                <p class="text-xs text-green-600 font-bold mt-1 group-hover:underline">Ver detalhes →</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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