<script setup lang="ts">
import { ref, onMounted } from 'vue'

definePageMeta({
  middleware: 'auth',
  layout: 'admin'
})

const client = useSupabaseClient()
const router = useRouter()
const route = useRoute()

// --- ESTADOS ---
const loading = ref(false)
const uploading = ref(false)
const categories = ref<any[]>([])
const isCreatingCategory = ref(false)

// Lista de imagens (Visualização)
const productImages = ref<{ name: string, url: string, isMain: boolean }[]>([])

// ESTADO DO FORMULÁRIO
const form = ref({
  name: '',
  description: '',
  category: '',
  barcode: '',
  weight: '',
  package_qty: '' // CAMPO MANTIDO
})

// --- CARREGAR DADOS ---
onMounted(async () => {
  await fetchCategories()
  await fetchProductData()
})

const fetchCategories = async () => {
  const { data } = await client.from('categories').select('*').order('name')
  categories.value = data || []
}

// BUSCA O PRODUTO PELO ID E PREENCHE O FORMULÁRIO
const fetchProductData = async () => {
  loading.value = true
  const productId = route.params.id

  const { data, error } = await client
      .from('products')
      .select('*')
      .eq('id', productId)
      .single()

  if (error || !data) {
    alert('Produto não encontrado.')
    router.push('/admin')
    return
  }

  // Preenche apenas campos relevantes para catálogo
  form.value.name = data.name
  form.value.description = data.description || ''
  form.value.category = data.category
  form.value.barcode = data.barcode || ''
  form.value.weight = data.weight || ''
  // Carrega a quantidade da embalagem
  form.value.package_qty = data.package_qty || ''

  // Reconstrói a lista de imagens para visualização
  const images = []

  if (data.image_url) {
    images.push({
      name: 'Imagem Principal',
      url: data.image_url,
      isMain: true
    })
  }

  if (data.gallery && Array.isArray(data.gallery)) {
    data.gallery.forEach((url: string, index: number) => {
      if (url !== data.image_url) {
        images.push({
          name: `Galeria ${index + 1}`,
          url: url,
          isMain: false
        })
      }
    })
  }

  productImages.value = images
  loading.value = false
}

// --- UPLOAD DE ARQUIVOS ---
const handleFileChange = async (event: any) => {
  const files = event.target?.files
  if (!files || files.length === 0) return

  if (productImages.value.length + files.length > 5) {
    alert('Máximo de 5 imagens permitido.')
    return
  }

  uploading.value = true

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const fileExt = file.name.split('.').pop()
    const uniqueName = `${Date.now()}-${Math.floor(Math.random() * 1000)}.${fileExt}`

    const { error } = await client.storage
        .from('catalog-images')
        .upload(uniqueName, file)

    if (error) {
      alert(`Erro no arquivo ${file.name}: ${error.message}`)
      continue
    }

    const { data: publicData } = client.storage
        .from('catalog-images')
        .getPublicUrl(uniqueName)

    const isFirst = productImages.value.length === 0
    productImages.value.push({
      name: file.name,
      url: publicData.publicUrl,
      isMain: isFirst
    })
  }

  uploading.value = false
  event.target.value = ''
}

const setMainImage = (index: number) => {
  productImages.value = productImages.value.map((img, i) => ({
    ...img,
    isMain: i === index
  }))
}

const removeImage = (index: number) => {
  const itemToRemove = productImages.value[index]
  if (!itemToRemove) return

  const wasMain = itemToRemove.isMain
  productImages.value.splice(index, 1)

  if (wasMain && productImages.value.length > 0) {
    productImages.value[0].isMain = true
  }
}

// --- ATUALIZAR (UPDATE) ---
const handleUpdate = async () => {
  if (!form.value.name || !form.value.category) {
    alert('Preencha os campos obrigatórios (*)')
    return
  }

  loading.value = true

  try {
    let finalCategory = form.value.category

    if (isCreatingCategory.value) {
      const slug = finalCategory.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
      const { error: catError } = await client.from('categories').insert({ name: finalCategory, slug } as any)
      if (catError) throw catError
    }

    const mainImageObj = productImages.value.find((img) => img.isMain) || productImages.value[0]
    const allImagesUrl = productImages.value.map((img) => img.url)

    const qty = parseInt(String(form.value.package_qty)) || 1

    // UPDATE no Supabase
    const { error } = await client
        .from('products')
        .update({
          name: form.value.name,
          description: form.value.description,
          category: finalCategory,
          image_url: mainImageObj?.url || '',
          gallery: allImagesUrl,
          barcode: form.value.barcode,
          weight: form.value.weight,
          package_qty: qty // Atualiza a quantidade
        } as any)
        .eq('id', route.params.id)

    if (error) throw error

    router.push('/admin')

  } catch (err: any) {
    alert('Erro ao atualizar: ' + err.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-8">
    <div class="mb-6 flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Editar Produto</h1>
        <p class="text-gray-600">Altere os dados de divulgação.</p>
      </div>
      <NuxtLink to="/admin" class="text-sm text-gray-500 hover:underline">Voltar para lista</NuxtLink>
    </div>

    <form @submit.prevent="handleUpdate" class="bg-white p-6 rounded-lg shadow space-y-8 border border-gray-200">

      <div class="bg-gray-50 p-4 rounded border border-gray-200">
        <label class="block text-sm font-bold text-gray-700 mb-2">Imagens do Produto</label>

        <div class="mb-4 flex items-center gap-3">
          <label class="cursor-pointer bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded shadow-sm text-sm font-medium transition">
            <span>📂 Adicionar Fotos</span>
            <input
                type="file"
                multiple
                accept="image/*"
                @change="handleFileChange"
                :disabled="productImages.length >= 5 || uploading"
                class="hidden"
            />
          </label>
          <span v-if="uploading" class="text-sm text-green-600 font-bold animate-pulse">Carregando...</span>
        </div>

        <div v-if="productImages.length > 0" class="flex flex-col gap-2">
          <div
              v-for="(img, index) in productImages"
              :key="index"
              class="flex items-center justify-between bg-white p-3 rounded border"
              :class="img.isMain ? 'border-green-500 ring-1 ring-green-500' : 'border-gray-200'"
          >
            <div class="flex items-center gap-3 overflow-hidden">
              <img :src="img.url" class="w-10 h-10 object-cover rounded bg-gray-100" />
              <div class="flex flex-col">
                <button
                    type="button"
                    @click="setMainImage(index)"
                    class="text-left text-sm font-medium hover:underline"
                    :class="img.isMain ? 'text-green-700 font-bold cursor-default' : 'text-gray-600'"
                >
                  {{ img.isMain ? '★ Imagem Principal' : 'Definir como Principal' }}
                </button>
              </div>
            </div>
            <button
                type="button"
                @click="removeImage(index)"
                class="text-red-500 hover:text-red-700 text-sm font-semibold px-2"
            >
              Excluir
            </button>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="font-bold text-lg text-gray-800 border-b pb-2">📦 Dados Descritivos</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nome do Produto *</label>
            <input v-model="form.name" type="text" class="w-full border border-gray-300 p-2 rounded focus:border-green-500 outline-none" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">EAN / Código</label>
            <input v-model="form.barcode" type="text" class="w-full border border-gray-300 p-2 rounded focus:border-green-500 outline-none" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <textarea v-model="form.description" rows="3" class="w-full border border-gray-300 p-2 rounded focus:border-green-500 outline-none"></textarea>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Peso</label>
            <input v-model="form.weight" type="text" class="w-full border border-gray-300 p-2 rounded focus:border-green-500 outline-none" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Qtd. na Embalagem</label>
            <input v-model="form.package_qty" type="number" class="w-full border border-gray-300 p-2 rounded focus:border-green-500 outline-none" placeholder="Ex: 12" />
          </div>

          <div class="md:col-span-2">
            <div class="flex justify-between items-center mb-1">
              <label class="block text-sm font-medium text-gray-700">Categoria</label>
              <button type="button" @click="isCreatingCategory = !isCreatingCategory" class="text-xs text-blue-600 hover:underline font-bold">
                {{ isCreatingCategory ? 'Cancelar Nova' : '+ Nova Categoria' }}
              </button>
            </div>
            <input v-if="isCreatingCategory" v-model="form.category" type="text" class="w-full border border-blue-300 bg-blue-50 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Nome da nova categoria" />
            <select v-else v-model="form.category" class="w-full border border-gray-300 p-2 rounded focus:border-green-500 outline-none bg-white">
              <option v-for="cat in categories" :key="cat.id" :value="cat.name">{{ cat.name }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="flex justify-end gap-3 pt-4 border-t">
        <NuxtLink to="/admin" class="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded font-medium">Cancelar</NuxtLink>
        <button
            type="submit"
            :disabled="loading || uploading"
            class="px-8 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 font-bold shadow-lg transition transform active:scale-95"
        >
          {{ loading ? 'Salvando...' : 'Salvar Alterações' }}
        </button>
      </div>
    </form>
  </div>
</template>