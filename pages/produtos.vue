<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import logo from '~/assets/solnascente-logo.svg'

// Importando imagem para o banner do topo (Você pode escolher qual usar)
import bannerPage from '~/assets/imagem02.jpg'

const client = useSupabaseClient()

// --- ESTADOS DO SISTEMA ---
const loading = ref(true)
const products = ref<any[]>([])
const search = ref('')
const selectedCategory = ref('')
const categories = ref<string[]>([])

// --- ESTADO DO MODAL ---
const selectedProduct = ref<any>(null)
const activeImage = ref('')

onMounted(async () => {
  await fetchProducts()
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

// --- FILTRAGEM ---
const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.value.toLowerCase())
    const matchesCategory = selectedCategory.value ? product.category === selectedCategory.value : true
    return matchesSearch && matchesCategory
  })
})

// --- RELACIONADOS ---
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

// --- AÇÕES ---
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

const requestQuote = (item: any) => {
  const phone = '5562991122981'
  const message = `Olá! Gostaria de fazer um orçamento do produto: *${item.name}* (Cód: ${item.barcode || 'N/A'}).`
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
  window.open(url, '_blank')
}
</script>

<template>
  <div class="bg-gray-50 min-h-screen">

    <div class="relative h-[300px] md:h-[350px] flex items-center justify-center bg-gray-900 overflow-hidden">
      <img :src="bannerPage" class="absolute inset-0 w-full h-full object-cover opacity-40" alt="Banner Produtos" />

      <div class="relative z-10 text-center text-white px-4 animate-fade-in-up">
        <h1 class="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg tracking-tight">Nossos Produtos</h1>
        <p class="text-lg md:text-2xl font-light opacity-95 drop-shadow-md max-w-2xl mx-auto">
          Qualidade selecionada e sabor autêntico para a sua cozinha.
        </p>
      </div>
    </div>

    <div class="sticky top-0 z-30 bg-gray-50/95 backdrop-blur-sm py-4 px-4 mb-8 shadow-sm transition-all border-b border-gray-200">
      <div class="max-w-5xl mx-auto">
        <div class="flex flex-col md:flex-row gap-4 items-center">

          <div class="flex-1 w-full relative group">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
            <input
                v-model="search"
                type="text"
                placeholder="Busque por nome..."
                class="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 bg-white shadow-sm focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition text-lg"
            />
          </div>

          <select
              v-model="selectedCategory"
              class="w-full md:w-64 p-4 rounded-xl border border-gray-300 bg-white text-gray-700 shadow-sm cursor-pointer focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition text-lg"
          >
            <option value="">Todas as Categorias</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>

        </div>
      </div>
    </div>

    <main class="max-w-7xl mx-auto px-4 w-full pb-12 min-h-[500px]">

      <div v-if="loading" class="text-center py-20">
        <img :src="logo" class="inline-block animate-spin h-16 w-16 mb-4 opacity-50" alt="Carregando..." />
        <p class="text-gray-500 font-medium text-lg">Carregando catálogo...</p>
      </div>

      <div v-else-if="filteredProducts.length === 0" class="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200 mx-auto max-w-2xl">
        <div class="text-6xl mb-4 grayscale opacity-40">🥗</div>
        <h3 class="text-xl font-bold text-gray-600">Nenhum produto encontrado</h3>
        <button
            @click="search = ''; selectedCategory = ''"
            class="mt-6 text-green-700 font-bold hover:bg-green-50 px-6 py-2 rounded-full transition"
        >
          Limpar filtros
        </button>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div
            v-for="item in filteredProducts"
            :key="item.id"
            @click="openProduct(item)"
            class="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col hover:-translate-y-2 cursor-pointer"
        >
          <div class="h-64 bg-gray-100 relative overflow-hidden flex items-center justify-center">
            <img v-if="item.image_url" :src="item.image_url" class="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-in-out" />
            <div v-else class="text-gray-300 text-5xl">📷</div>
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
            <div class="h-64 md:h-[500px] w-full relative overflow-hidden flex items-center justify-center bg-white">
              <img v-if="activeImage" :src="activeImage" class="w-full h-full object-cover animate-fade-in-up" :key="activeImage" />
              <div v-else class="text-6xl text-gray-300">📷</div>
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

              <button
                  @click="requestQuote(selectedProduct)"
                  class="w-full bg-green-600 text-white font-bold py-5 rounded-2xl hover:bg-green-700 transition flex items-center justify-center gap-3 shadow-xl hover:shadow-green-600/30 transform hover:-translate-y-1"
              >
                <span class="text-2xl">📲</span>
                <span class="text-lg">Solicitar Orçamento no WhatsApp</span>
              </button>
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