<script setup lang="ts">
import { ref, onMounted } from 'vue'

definePageMeta({
  middleware: 'auth',
  layout: 'admin'
})

const client = useSupabaseClient()
const router = useRouter()

// Estados
const loading = ref(true)
const products = ref<any[]>([])

// Carregar produtos
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
  }

  loading.value = false
}

// --- FUNÇÃO DE EXCLUIR ---
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
    products.value = products.value.filter(p => p.id !== id)
  }
}

onMounted(() => {
  fetchProducts()
})

const logout = async () => {
  await client.auth.signOut()
  router.push('/login')
}
</script>

<template>
  <div class="p-8 max-w-6xl mx-auto">
    <div class="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">Meus Temperos</h1>
        <p class="text-gray-500">Gerencie seu catálogo de divulgação.</p>
      </div>
      <div class="flex gap-3">
        <button @click="logout" class="px-4 py-2 text-red-600 hover:bg-red-50 rounded transition font-medium">
          Sair
        </button>
        <NuxtLink to="/admin/produtos/novo" class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow transition flex items-center gap-2 font-bold">
          <span>+</span> Novo Produto
        </NuxtLink>
      </div>
    </div>

    <div v-if="loading" class="text-center py-20 text-gray-500 animate-pulse">
      Carregando catálogo...
    </div>

    <div v-else-if="products.length === 0" class="text-center py-20 bg-white rounded-lg shadow border border-gray-200">
      <div class="text-6xl mb-4">🧂</div>
      <h3 class="text-xl font-semibold text-gray-700">Catálogo Vazio</h3>
      <p class="text-gray-500 mt-2">Clique no botão verde para começar.</p>
    </div>

    <div v-else class="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Produto / Detalhes</th>
            <th class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Categoria</th>
            <th class="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Ações</th>
          </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
          <tr v-for="item in products" :key="item.id" class="hover:bg-gray-50 transition group">

            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full overflow-hidden border">
                  <img v-if="item.image_url" :src="item.image_url" class="h-10 w-10 object-cover" />
                  <span v-else class="flex h-full w-full items-center justify-center text-xs">📷</span>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-bold text-gray-900">
                    {{ item.name }}
                    <span class="text-gray-500 font-normal text-xs ml-1">
                      ({{ item.weight || '?' }} - {{ item.package_qty || '-' }} un/cx)
                    </span>
                  </div>
                  <div class="text-xs text-gray-500" v-if="item.barcode">EAN: {{ item.barcode }}</div>
                </div>
              </div>
            </td>

            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {{ item.category }}
                </span>
            </td>

            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div class="flex items-center justify-end gap-3">
                <NuxtLink :to="`/admin/produtos/editar/${item.id}`" class="text-indigo-600 hover:text-indigo-900" title="Editar">
                  ✏️
                </NuxtLink>

                <button @click="deleteProduct(item.id)" class="text-red-600 hover:text-red-900" title="Excluir">
                  🗑️
                </button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>