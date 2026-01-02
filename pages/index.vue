<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const client = useSupabaseClient()

// --- ESTADOS ---
const loading = ref(true)
const products = ref<any[]>([])
const search = ref('')
const selectedCategory = ref('')
const categories = ref<string[]>([])

// --- CARREGAR DADOS ---
onMounted(async () => {
  await fetchProducts()
})

const fetchProducts = async () => {
  loading.value = true

  // Busca produtos (apenas colunas necessárias para a vitrine)
  const { data, error } = await client
      .from('products')
      .select('*')
      .order('name')

  if (error) {
    console.error('Erro ao carregar vitrine:', error)
  } else {
    products.value = data || []
    extractCategories(data || [])
  }

  loading.value = false
}

// Extrai categorias únicas para o filtro
const extractCategories = (items: any[]) => {
  const cats = items.map(i => i.category).filter(Boolean)
  // Remove duplicatas usando Set
  categories.value = [...new Set(cats)].sort()
}

// --- FILTRAGEM (COMPUTED) ---
// Filtra a lista automaticamente quando o usuário digita ou clica na categoria
const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.value.toLowerCase())
    const matchesCategory = selectedCategory.value ? product.category === selectedCategory.value : true
    return matchesSearch && matchesCategory
  })
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">

    <header class="bg-white shadow-sm sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div class="flex items-center gap-2">
          <span class="text-2xl">☀️</span>
          <div>
            <h1 class="font-bold text-xl text-gray-800 leading-none">Sol Nascente</h1>
            <p class="text-xs text-gray-500">Temperos e Especiarias</p>
          </div>
        </div>

        <NuxtLink to="/login" class="text-sm font-medium text-green-700 hover:text-green-800 border border-green-700 px-4 py-1 rounded-full transition">
          Área do Vendedor
        </NuxtLink>
      </div>
    </header>

    <div class="bg-green-700 py-8 px-4">
      <div class="max-w-3xl mx-auto text-center space-y-4">
        <h2 class="text-white text-2xl font-bold">O que você procura hoje?</h2>

        <div class="flex flex-col md:flex-row gap-2">
          <input
              v-model="search"
              type="text"
              placeholder="Buscar por nome do tempero..."
              class="flex-1 p-3 rounded-lg shadow border-none outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <select
              v-model="selectedCategory"
              class="p-3 rounded-lg shadow border-none outline-none bg-white text-gray-700 cursor-pointer focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">Todas as Categorias</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>
      </div>
    </div>

    <main class="max-w-7xl mx-auto px-4 py-8">

      <div v-if="loading" class="text-center py-12 text-gray-500">
        Carregando catálogo...
      </div>

      <div v-else-if="filteredProducts.length === 0" class="text-center py-12">
        <p class="text-gray-500 text-lg">Nenhum produto encontrado com estes filtros.</p>
        <button
            @click="search = ''; selectedCategory = ''"
            class="mt-4 text-green-700 font-bold underline"
        >
          Limpar filtros
        </button>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        <div
            v-for="item in filteredProducts"
            :key="item.id"
            class="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 overflow-hidden border border-gray-100 flex flex-col"
        >
          <div class="h-48 bg-gray-100 relative">
            <img
                v-if="item.image_url"
                :src="item.image_url"
                class="w-full h-full object-cover"
                alt="Foto do produto"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-300 text-4xl">
              📷
            </div>

            <span class="absolute top-2 right-2 bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded text-gray-700 shadow-sm">
              {{ item.category }}
            </span>
          </div>

          <div class="p-4 flex flex-col flex-1">
            <div class="flex-1">
              <h3 class="font-bold text-gray-800 text-lg">{{ item.name }}</h3>
              <p class="text-xs text-gray-500 mb-2">
                Código: {{ item.barcode || 'N/A' }} • Peso: {{ item.weight || '-' }}
              </p>

              <p class="text-sm text-gray-600 line-clamp-2 mb-4">
                {{ item.description || 'Sem descrição.' }}
              </p>
            </div>

            <div class="bg-gray-50 p-3 rounded-lg space-y-2">

              <div class="flex justify-between items-center">
                <span class="text-xs font-medium text-gray-500 uppercase">Unidade</span>
                <span class="text-lg font-bold text-green-700">R$ {{ item.price }}</span>
              </div>

              <div v-if="item.package_price" class="pt-2 border-t border-gray-200 flex justify-between items-center">
                <div class="flex flex-col">
                  <span class="text-xs font-bold text-yellow-700 uppercase">Caixa Fechada</span>
                  <span class="text-[10px] text-gray-500">Contém {{ item.package_qty }} un.</span>
                </div>
                <span class="text-sm font-bold text-yellow-700">R$ {{ item.package_price }}</span>
              </div>
            </div>

            <button class="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded transition flex justify-center items-center gap-2">
              <span>🛒</span> Ver Detalhes
            </button>
          </div>

          <div class="px-4 pb-2">
            <div v-if="item.stock > 0" class="text-xs text-center text-green-600 font-medium">
              Disponível em estoque
            </div>
            <div v-else class="text-xs text-center text-red-500 font-bold bg-red-50 py-1 rounded">
              Produto Esgotado
            </div>
          </div>

        </div>

      </div>
    </main>

    <footer class="bg-gray-800 text-gray-300 py-8 text-center mt-12">
      <p class="text-sm">&copy; 2024 Sol Nascente Temperos. Todos os direitos reservados.</p>
    </footer>

  </div>
</template>