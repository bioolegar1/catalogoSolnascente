<script setup lang="ts">
// ATENÇÃO: Não adicione imports manuais de 'nuxt/dist/...' aqui.
// O WebStorm pode sugerir, mas eles quebram o projeto.

definePageMeta({
  middleware: 'auth',
  layout: 'admin'
})

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const router = useRouter()

const logout = async () => {
  await supabase.auth.signOut()
  router.push('/login')
}
</script>

<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold text-gray-800">Painel Administrativo</h1>
    <p class="mt-4 text-gray-600">Bem-vindo, {{ user?.email }}</p>

    <div class="mt-8 border p-4 rounded bg-gray-50">
      <p>Aqui entrará a lista de produtos (Issue 05).</p>
    </div>

    <button
        @click="logout"
        class="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Sair do Sistema
    </button>
  </div>
</template>