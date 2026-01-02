<script setup lang="ts">
// Importação do Logo
import logo from '~/assets/solnascente-logo.svg'

const route = useRoute()
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col font-sans relative">

    <header class="bg-white shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <NuxtLink to="/" class="flex items-center gap-3">
          <img :src="logo" alt="Logo Sol Nascente" class="h-10 w-auto object-contain" />

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

        <div class="md:hidden">
          <img :src="logo" alt="Logo" class="h-8 w-auto opacity-80" />
        </div>
      </div>
    </header>

    <div class="flex-grow">
      <slot />
    </div>

    <a
        href="https://wa.me/5562991122981?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20falar%20com%20um%20vendedor."
        target="_blank"
        class="fixed bottom-6 right-6 z-[100] bg-[#25D366] hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition transform hover:scale-110 flex items-center justify-center group animate-bounce-slow"
        title="Falar no WhatsApp"
    >
      <svg class="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
    </a>

    <footer class="bg-gray-900 text-gray-300 py-12 border-t border-gray-800 mt-auto">
      <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        <div>
          <div class="flex items-center justify-center md:justify-start gap-4 mb-6">
            <img :src="logo" alt="Logo Rodapé" class="h-12 w-auto" />

            <span class="text-2xl font-bold text-white tracking-tight">Sol Nascente</span>
          </div>
          <p class="text-base text-gray-400 max-w-sm mx-auto md:mx-0 leading-relaxed">
            Sol Nascente Comércio e Indústria de Produtos Alimentícios. Qualidade e sabor para sua mesa.
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
          <div class="space-y-4">
            <p class="text-base flex items-center justify-center md:justify-start gap-3">
              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              <span>(62) 3500-1234</span>
            </p>
            <p class="text-base flex items-center justify-center md:justify-start gap-3">
              <svg class="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              <span>(62) 99112-2981</span>
            </p>
            <p class="text-base flex items-center justify-center md:justify-start gap-3">
              <svg class="w-5 h-5 text-[#E1306C]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              <span>@produtossolnascente</span>
            </p>
            <p class="text-base flex items-start justify-center md:justify-start gap-3 mt-4 text-sm">
              <svg class="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <span>R. José P. da Silveira - CORA CORALINA<br>Goianira - GO, 75370-000</span>
            </p>
          </div>
          <p class="text-xs text-gray-600 mt-8">
            © 2026 Sol Nascente Comércio e Indústria.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
.animate-bounce-slow {
  animation: bounce-slow 3s infinite;
}
</style>