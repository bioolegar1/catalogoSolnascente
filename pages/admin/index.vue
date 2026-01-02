<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

definePageMeta({
  middleware: 'auth',
  layout: 'admin'
})

const client = useSupabaseClient()
const router = useRouter()

// --- ESTADOS ---
const loading = ref(true)
const products = ref<any[]>([])

// Estados de Filtro
const search = ref('')
const selectedCategory = ref('')
const categories = ref<string[]>([])

// --- CARREGAR DADOS ---
const fetchProducts = async () => {
  loading.value = true

  const { data, error } = await client
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

  if (error) {
    console.error('Erro ao buscar produtos:', error)
  } else {
    products.value = data || []
    extractCategories(data || [])
  }

  loading.value = false
}

// Extrai categorias únicas dos produtos carregados
const extractCategories = (items: any[]) => {
  const cats = items.map(i => i.category).filter(Boolean)
  // Remove duplicatas e ordena
  categories.value = [...new Set(cats)].sort()
}

// --- FILTRAGEM AUTOMÁTICA ---
const filteredProducts = computed(() => {
  return products.value.filter(item => {
    // Filtro por Texto (Nome)
    const matchName = item.name.toLowerCase().includes(search.value.toLowerCase())
    // Filtro por Categoria
    const matchCat = selectedCategory.value ? item.category === selectedCategory.value : true

    return matchName && matchCat
  })
})

// --- AÇÕES ---
const deleteProduct = async (id: number) => {
  const confirmDelete = window.confirm('Tem certeza que deseja excluir este produto? Essa ação não tem volta.')

  if (!confirmDelete) return

  const { error } = await client
      .from('products')
      .delete()
      .eq('id', id)

  if (error) {
    alert('Erro ao excluir: ' + error.message)
  } else {
    // Atualiza a lista local removendo o item
    products.value = products.value.filter(p => p.id !== id)
  }
}

const logout = async () => {
  await client.auth.signOut()
  router.push('/login')
}

onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">

    <div class="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Gerenciar Catálogo</h1>
        <p class="text-gray-500 text-sm">Adicione, edite ou remova itens da vitrine.</p>
      </div>
      <div class="flex gap-3">
        <button
            @click="logout"
            class="px-4 py-2 text-red-600 border border-red-200 hover:bg-red-50 rounded transition font-medium text-sm"
        >
          Sair do Sistema
        </button>
        <NuxtLink
            to="/admin/produtos/novo"
            class="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 shadow-sm transition font-bold text-sm flex items-center gap-2"
        >
          + Novo Produto
        </NuxtLink>
      </div>
    </div>

    <div class="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-100 flex flex-col md:flex-row gap-4">
      <div class="flex-1">
        <label class="block text-xs font-bold text-gray-500 mb-1 uppercase">Buscar por nome</label>
        <input
            v-model="search"
            type="text"
            placeholder="Digite o nome do produto..."
            class="w-full border border-gray-300 p-2.5 rounded bg-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition"
        />
      </div>

      <div class="w-full md:w-64">
        <label class="block text-xs font-bold text-gray-500 mb-1 uppercase">Filtrar por Categoria</label>
        <select
            v-model="selectedCategory"
            class="w-full border border-gray-300 p-2.5 rounded bg-white focus:border-green-500 outline-none transition"
        >
          <option value="">Todas as Categorias</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>
    </div>

    <div v-if="loading" class="text-center py-12 text-gray-500">
      Carregando dados...
    </div>

    <div v-else-if="filteredProducts.length === 0" class="text-center py-12 bg-gray-50 rounded border border-dashed border-gray-300">
      <h3 class="text-lg font-semibold text-gray-600">Nenhum produto encontrado</h3>
      <p class="text-gray-500 text-sm mt-1">Tente mudar os filtros ou adicione um novo item.</p>
      <button
          v-if="search || selectedCategory"
          @click="search = ''; selectedCategory = ''"
          class="mt-4 text-green-600 font-bold hover:underline text-sm"
      >
        Limpar Filtros
      </button>
    </div>

    <div v-else class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 border border-gray-200">
        <thead class="bg-gray-50">
        <tr>
          <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Imagem</th>
          <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Produto</th>
          <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Categoria</th>
          <th class="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Detalhes (Peso/Emb)</th>
          <th class="px-4 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Ações</th>
        </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="item in filteredProducts" :key="item.id" class="hover:bg-gray-50 transition">

          <td class="px-4 py-3 whitespace-nowrap w-20">
            <div class="h-12 w-12 bg-gray-100 rounded overflow-hidden border border-gray-200 flex items-center justify-center">
              <img v-if="item.image_url" :src="item.image_url" class="h-full w-full object-cover" />
              <span v-else class="text-[10px] text-gray-400 text-center leading-tight px-1">Sem Foto</span>
            </div>
          </td>

          <td class="px-4 py-3">
            <div class="text-sm font-bold text-gray-900">{{ item.name }}</div>
            <div class="text-xs text-gray-500 font-mono mt-0.5" v-if="item.barcode">EAN: {{ item.barcode }}</div>
          </td>

          <td class="px-4 py-3 whitespace-nowrap">
            <span class="px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full bg-green-50 text-green-700 border border-green-100">
              {{ item.category }}
            </span>
          </td>

          <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
            <div><span class="font-semibold">Peso:</span> {{ item.weight || '-' }}</div>
            <div><span class="font-semibold">Na Caixa:</span> {{ item.package_qty ? item.package_qty + ' un' : 'Unitário' }}</div>
          </td>

          <td class="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
            <div class="flex items-center justify-end gap-2">
              <NuxtLink
                  :to="`/admin/produtos/editar/${item.id}`"
                  class="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded transition text-xs font-bold"
              >
                Editar
              </NuxtLink>

              <button
                  @click="deleteProduct(item.id)"
                  class="text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-1 rounded transition text-xs font-bold"
              >
                Excluir
              </button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>