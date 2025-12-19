<script setup lang="ts">
import { ref, onMounted } from 'vue'

const email = ref('')
const password = ref('')
const logs = ref<string[]>([]) // Vamos guardar os logs para mostrar na tela

// Função para adicionar mensagens na tela
const addLog = (msg: string) => {
  logs.value.push(`${new Date().toLocaleTimeString()} - ${msg}`)
  console.log(msg)
}

const client = useSupabaseClient()

// Teste ao carregar a página
onMounted(() => {
  addLog('Página carregada.')

  // Tenta ler a URL do Supabase (sem mostrar a chave inteira por segurança)
  try {
    // @ts-ignore
    const url = client.supabaseUrl
    if (url) {
      addLog('✅ Supabase URL detectada: ' + url)
    } else {
      addLog('❌ ERRO FATAL: Supabase URL não encontrada! Verifique o .env')
    }
  } catch (e) {
    addLog('❌ ERRO ao tentar ler cliente Supabase: ' + e)
  }
})

const handleLogin = async () => {
  addLog('Botão clicado. Tentando logar...')

  if (!email.value || !password.value) {
    addLog('⚠️ Campos vazios. Preencha email e senha.')
    return
  }

  try {
    const { data, error } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })

    if (error) {
      addLog('❌ ERRO do Supabase: ' + error.message)
      addLog('Dica: Verifique se o usuário existe em Authentication > Users')
    } else {
      addLog('✅ SUCESSO! Usuário logado: ' + data.user?.email)
      addLog('Redirecionando...')
      await navigateTo('/admin')
    }
  } catch (err: any) {
    addLog('🔥 ERRO CRÍTICO (Catch): ' + err.message)
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">

    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold mb-4">Login de Diagnóstico</h1>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <input v-model="email" type="email" placeholder="Email" class="w-full border p-2 rounded" />
        <input v-model="password" type="password" placeholder="Senha" class="w-full border p-2 rounded" />
        <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">
          TENTAR ENTRAR
        </button>
      </form>
    </div>

    <div class="mt-8 w-full max-w-lg bg-black text-green-400 p-4 rounded font-mono text-sm shadow-lg border-2 border-green-600">
      <h3 class="font-bold border-b border-green-600 mb-2 pb-1">LOGS DO SISTEMA:</h3>
      <div v-if="logs.length === 0">Aguardando ações...</div>
      <div v-for="(log, index) in logs" :key="index" class="mb-1">
        {{ log }}
      </div>
    </div>

  </div>
</template>