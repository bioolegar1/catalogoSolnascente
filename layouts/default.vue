<script setup lang="ts">
// Menu ativo baseado na rota
const route = useRoute()
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col font-sans relative">

    <header class="bg-white shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        <NuxtLink to="/" class="flex items-center gap-2">
          <span class="text-3xl">☀️</span>
          <div>
            <h1 class="font-bold text-2xl text-gray-800 leading-none tracking-tight">Sol Nascente</h1>
            <p class="text-xs text-gray-500 font-medium">Temperos e Especiarias</p>
          </div>
        </NuxtLink>

        <nav class="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          <NuxtLink to="/" class="hover:text-green-600 transition" :class="{ 'text-green-700 font-bold': route.path === '/' }">Home</NuxtLink>
          <NuxtLink to="/historia" class="hover:text-green-600 transition" active-class="text-green-700 font-bold">Nossa História</NuxtLink>
          <NuxtLink to="/" class="hover:text-green-600 transition">Produtos</NuxtLink>
          <NuxtLink to="/contato" class="hover:text-green-600 transition" active-class="text-green-700 font-bold">Contato</NuxtLink>
        </nav>

        <div class="md:hidden text-2xl">☀️</div>
      </div>
    </header>

    <div class="flex-grow">
      <slot />
    </div>

    <a
        href="https://wa.me/5562999999999?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20falar%20com%20um%20vendedor."
        target="_blank"
        class="fixed bottom-6 right-6 z-[100] bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition transform hover:scale-110 flex items-center justify-center group animate-bounce-slow"
        title="Falar no WhatsApp"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
      </svg>
      <span class="absolute right-full mr-4 bg-white text-gray-800 px-3 py-1 rounded shadow-md text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
        Fale Conosco
      </span>
    </a>

    <footer class="bg-gray-900 text-gray-300 py-12 border-t border-gray-800 mt-auto">
      <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        <div>
          <div class="flex items-center justify-center md:justify-start gap-3 mb-6">
            <span class="text-4xl">☀️</span>
            <span class="text-2xl font-bold text-white tracking-tight">Sol Nascente</span>
          </div>
          <p class="text-base text-gray-400 max-w-sm mx-auto md:mx-0 leading-relaxed">
            Especialistas em temperos que transformam receitas. Qualidade, sabor e tradição para o seu negócio.
          </p>
        </div>

        <div>
          <h4 class="text-white font-bold mb-6 uppercase text-sm tracking-widest border-b border-gray-700 pb-2 inline-block">Navegação</h4>
          <ul class="space-y-3 text-base">
            <li><NuxtLink to="/" class="hover:text-green-400 transition">Início</NuxtLink></li>
            <li><NuxtLink to="/historia" class="hover:text-green-400 transition">Nossa História</NuxtLink></li>
            <li><NuxtLink to="/contato" class="hover:text-green-400 transition">Fale Conosco</NuxtLink></li>
            <li class="pt-4 mt-4 border-t border-gray-800">
              <NuxtLink to="/login" class="text-gray-500 hover:text-white transition text-xs flex items-center justify-center md:justify-start gap-1">
                🔒 Área do Vendedor
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-white font-bold mb-6 uppercase text-sm tracking-widest border-b border-gray-700 pb-2 inline-block">Contato</h4>
          <div class="space-y-3">
            <p class="text-base flex items-center justify-center md:justify-start gap-2"><span>📞</span> (62) 99999-9999</p>
            <p class="text-base flex items-center justify-center md:justify-start gap-2"><span>📧</span> contato@solnascente.com.br</p>
            <p class="text-base flex items-center justify-center md:justify-start gap-2"><span>📍</span> Goiânia - GO</p>
          </div>
        </div>
      </div>
    </footer>

  </div>
</template>

<style>
/* Animação suave para o botão do WhatsApp */
@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
.animate-bounce-slow {
  animation: bounce-slow 3s infinite;
}
</style>