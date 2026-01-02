<script setup lang="ts">
import { ref, onMounted } from 'vue'

definePageMeta({
  middleware: 'auth',
  layout: 'admin'
})

const client = useSupabaseClient()
const router = useRouter()

// --- ESTADOS ---
const loading = ref(false)
const uploading = ref(false)
const categories = ref<any[]>([])
const isCreatingCategory = ref(false)

// Lista de imagens
const productImages = ref<{ name: string, url: string, isMain: boolean }[]>([])

// ESTADO DO FORMULÁRIO
const form = ref({
  name: '',
  description: '',
  category: '',
  barcode: '',
  weight: '',
  package_qty: '' // CAMPO MANTIDO: Quantidade na embalagem
})

// --- CARREGAR DADOS ---
onMounted(async () => {
  fetchCategories()
})

const fetchCategories = async () => {
  const { data } = await client.from('categories').select('*').order('name')
  categories.value = data || []
  if (categories.value.length > 0) {
    form.value.category = categories.value[0].name
  }
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
    const firstItem = productImages.value[0]
    if (firstItem) firstItem.isMain = true
  }
}

// --- SALVAR ---
const handleSave = async () => {
  if (!form.value.name || !form.value.category) {
    alert('Preencha o Nome e a Categoria.')
    return
  }

  if (productImages.value.length === 0) {
    alert('Adicione pelo menos uma foto.')
    return
  }

  loading.value = true

  try {
    let finalCategory = form.value.category

    // 1. Categoria Nova
    if (isCreatingCategory.value) {
      const slug = finalCategory
          .toLowerCase()
          .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          .replace(/\s+/g, '-')
          .replace(/[^\w-]+/g, '')

      const { error: catError } = await client
          .from('categories')
          .insert({ name: finalCategory, slug: slug } as any)

      if (catError) throw catError
    }

    const mainImageObj = productImages.value.find((img) => img.isMain) || productImages.value[0]
    const allImagesUrl = productImages.value.map((img) => img.url)

    // Tratamento da quantidade (padrão 1 se vazio)
    const qty = parseInt(String(form.value.package_qty)) || 1

    // Insert
    const { error } = await client
        .from('products')
        .insert({
          name: form.value.name,
          description: form.value.description,
          category: finalCategory,
          image_url: mainImageObj?.url || '',
          gallery: allImagesUrl,
          barcode: form.value.barcode,
          weight: form.value.weight,
          package_qty: qty, // SALVANDO A QUANTIDADE
          price: 0,
          stock: 0
        } as any)

    if (error) throw error

    router.push('/admin')

  } catch (err: any) {
    alert('Erro ao salvar: ' + err.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-8">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Novo Produto</h1>
      <p class="text-gray-600">Cadastro para catálogo (Divulgação).</p>
    </div>

    <form @submit.prevent="handleSave" class="bg-white p-6 rounded-lg shadow space-y-8 border border-gray-200">

      <div class="bg-gray-50 p-4 rounded border border-gray-200">
        <label class="block text-sm font-bold text-gray-700 mb-2">Imagens do Produto</label>

        <div class="mb-4 flex items-center gap-3">
          <label class="cursor-pointer bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded shadow-sm text-sm font-medium transition">
            <span>📂 Selecionar Arquivos</span>
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
          <span v-else class="text-xs text-gray-500">Máximo 5 imagens</span>
        </div>

        <div v-if="productImages.length > 0" class="flex flex-col gap-2">
          <div
              v-for="(img, index) in productImages"
              :key="index"
              class="flex items-center justify-between bg-white p-3 rounded border"
              :class="img.isMain ? 'border-green-500 ring-1 ring-green-500' : 'border-gray-200'"
          >
            <div class="flex items-center gap-3 overflow-hidden">
              <input
                  type="radio"
                  :name="'mainImage'"
                  :checked="img.isMain"
                  @change="setMainImage(index)"
                  class="w-4 h-4 text-green-600 focus:ring-green-500 cursor-pointer"
              />
              <div class="flex flex-col">
                <span class="text-sm font-medium text-gray-700 truncate max-w-[200px]" :title="img.name">
                  {{ img.name }}
                </span>
                <span v-if="img.isMain" class="text-[10px] text-green-600 font-bold uppercase">
                  Principal (Capa)
                </span>
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
        <h3 class="font-bold text-lg text-gray-800 border-b pb-2">📦 Dados do Produto</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nome do Produto *</label>
            <input v-model="form.name" type="text" class="w-full border border-gray-300 p-2 rounded focus:border-green-500 outline-none" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Código (Opcional)</label>
            <input v-model="form.barcode" type="text" class="w-full border border-gray-300 p-2 rounded focus:border-green-500 outline-none" placeholder="Referência..." />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <textarea v-model="form.description" rows="3" class="w-full border border-gray-300 p-2 rounded focus:border-green-500 outline-none"></textarea>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Peso/Volume</label>
            <input v-model="form.weight" type="text" class="w-full border border-gray-300 p-2 rounded focus:border-green-500 outline-none" placeholder="Ex: 500g" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Qtd. na Embalagem</label>
            <input v-model="form.package_qty" type="number" class="w-full border border-gray-300 p-2 rounded focus:border-green-500 outline-none" placeholder="Ex: 12 un" />
          </div>

          <div class="md:col-span-2">
            <div class="flex justify-between items-center mb-1">
              <label class="block text-sm font-medium text-gray-700">Categoria</label>
              <button
                  type="button"
                  @click="isCreatingCategory = !isCreatingCategory; form.category = ''"
                  class="text-xs text-blue-600 hover:underline font-bold"
              >
                {{ isCreatingCategory ? 'Cancelar Nova' : '+ Nova Categoria' }}
              </button>
            </div>

            <input
                v-if="isCreatingCategory"
                v-model="form.category"
                type="text"
                placeholder="Digite o nome..."
                class="w-full border border-blue-300 bg-blue-50 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <select
                v-else
                v-model="form.category"
                class="w-full border border-gray-300 p-2 rounded focus:border-green-500 outline-none bg-white"
            >
              <option disabled value="">Selecione...</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.name">{{ cat.name }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="flex justify-end gap-3 pt-4 border-t">
        <NuxtLink to="/admin" class="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded font-medium">Cancelar</NuxtLink>
        <button
            type="submit"
            :disabled="loading || uploading || productImages.length === 0"
            class="px-8 py-3 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 font-bold shadow-lg transition transform active:scale-95"
        >
          {{ loading ? 'Salvando...' : 'Salvar Produto' }}
        </button>
      </div>
    </form>
  </div>
</template>