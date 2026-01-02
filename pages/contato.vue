<script setup lang="ts">
// Importando o Logo
import logo from '~/assets/solnascente-logo.svg'
</script>

<template>
  <div class="bg-green-900 min-h-[80vh]">

    <div class="bg-white py-12 md:py-16 text-center shadow-sm border-b border-gray-100">
      <div class="max-w-4xl mx-auto px-4 animate-fade-in-up">

        <div class="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-6">
          <img
              :src="logo"
              alt="Sol Nascente"
              class="h-20 md:h-28 w-auto hover:scale-105 transition duration-500 flex-shrink-0"
          />

          <h1 class="text-3xl md:text-5xl font-bold text-gray-800 leading-none">Fale Conosco</h1>
        </div>

        <p class="text-lg text-gray-500 max-w-2xl mx-auto">
          Estamos prontos para atender você. Seja para pedidos, dúvidas ou parcerias, escolha o canal que preferir.
        </p>
      </div>
    </div>

    <div class="max-w-5xl mx-auto px-4 py-12">

      <div class="max-w-3xl mx-auto mb-16">

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition group">
            <div class="bg-green-100 p-4 rounded-full flex-shrink-0 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition duration-300">
              <svg class="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            </div>
            <div class="min-w-0">
              <p class="text-xs text-gray-500 font-bold uppercase">WhatsApp (Vendas)</p>
              <a href="https://wa.me/5562991122981" target="_blank" class="text-lg md:text-xl font-bold text-green-700 hover:underline">
                (62) 99112-2981
              </a>
            </div>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition group">
            <div class="bg-gray-100 p-4 rounded-full flex-shrink-0 text-gray-600 group-hover:bg-gray-600 group-hover:text-white transition duration-300">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            </div>
            <div class="min-w-0">
              <p class="text-xs text-gray-500 font-bold uppercase">Telefone Fixo</p>
              <p class="text-lg md:text-xl font-bold text-gray-800">(62) 3500-1234</p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition group">
            <div class="bg-pink-100 p-4 rounded-full flex-shrink-0 text-[#E1306C] group-hover:bg-[#E1306C] group-hover:text-white transition duration-300">
              <svg class="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </div>
            <div class="min-w-0">
              <p class="text-xs text-gray-500 font-bold uppercase">Instagram</p>
              <a href="https://instagram.com/produtossolnascente" target="_blank" class="text-base md:text-xl font-bold text-pink-700 hover:underline">
                @produtossolnascente
              </a>
            </div>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition group">
            <div class="bg-blue-100 p-4 rounded-full flex-shrink-0 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition duration-300">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v9a2 2 0 002 2z"></path></svg>
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-xs text-gray-500 font-bold uppercase">Email</p>
              <a href="mailto:contato@solnascente.com.br" class="text-base md:text-lg font-bold text-blue-700 hover:underline block truncate md:overflow-visible md:whitespace-normal">
                contato@solnascente.com.br
              </a>
            </div>
          </div>
        </div>

        <div class="mt-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition group">
          <div class="bg-orange-100 p-4 rounded-full flex-shrink-0 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition duration-300">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          </div>
          <div>
            <p class="text-xs text-gray-500 font-bold uppercase">Endereço da Indústria</p>
            <p class="text-lg text-gray-800 leading-tight">
              R. José P. da Silveira - CORA CORALINA,<br class="block md:hidden"> Goianira - GO, 75370-000
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span class="text-2xl">🗺️</span> Nossa Localização
        </h3>
        <div class="w-full h-96 bg-gray-200 rounded-lg overflow-hidden relative">
          <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122390.43350626164!2d-49.488548844263065!3d-16.541183524613956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935e623141c1c2ed%3A0x7cd3038795a827c0!2sSol%20Nascente%20Com%C3%A9rcio%20e%20Ind%C3%BAstria%20de%20Produtos%20Aliment%C3%ADcios!5e0!3m2!1spt-PT!2sbr!4v1767371846944!5m2!1spt-PT!2sbr"
              width="100%"
              height="100%"
              style="border:0;"
              allowfullscreen="true"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}
</style>