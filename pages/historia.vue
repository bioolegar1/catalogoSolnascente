<script setup lang="ts">
// Importando imagens para usar no layout
// DICA: Depois substitua por fotos reais da história da empresa
import bannerImg01 from '~/assets/imagem01.jpg' // Use para o topo
import bannerImg02 from '~/assets/imagem02.jpg' // Use para "O Início"
import bannerImg03 from '~/assets/imagem03.jpg' // Use para "Qualidade"
import logo from '~/assets/solnascente-logo.svg'
import temperos from '~/assets/temperos.png'
import pimentadoreino from '~/assets/pimentadoreino.jpg'
import temperosvarios from '~/assets/temperosvarios.jpg'
</script>

<template>
  <div class="bg-white">

    <div class="relative h-[300px] md:h-[400px] flex items-center justify-center bg-gray-900 overflow-hidden">
      <img :src="bannerImg01" class="absolute inset-0 w-full h-full object-cover opacity-40" alt="Temperos Sol Nascente" />

      <div class="relative z-10 text-center text-white px-4 animate-fade-in-up">
        <h1 class="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">Nossa História</h1>
        <p class="text-lg md:text-2xl font-light opacity-90 max-w-2xl mx-auto drop-shadow-md">
          Uma trajetória temperada com dedicação, sabor e respeito à tradição.
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-16 md:py-24">
      <div class="flex flex-col md:flex-row items-center gap-12">

        <div class="w-full md:w-1/2 space-y-6">
          <div class="inline-block bg-green-100 text-green-800 font-bold px-3 py-1 rounded-full text-sm mb-2">
            Desde 1998
          </div>
          <h2 class="text-3xl font-bold text-gray-800">Tudo começou em uma pequena banca...</h2>
          <p class="text-lg text-gray-600 leading-relaxed text-justify">
            O <strong>Sol Nascente</strong> nasceu com a missão simples, mas poderosa, de levar cor, aroma e sabor verdadeiro para a mesa dos brasileiros.
          </p>
          <p class="text-lg text-gray-600 leading-relaxed text-justify">
            Nossa jornada começou há mais de uma década, em Goiânia. O que era apenas uma pequena banca de feira, montada com muito esforço e carinho, logo chamou a atenção. Não vendíamos apenas "pó colorido"; vendíamos essência. A pureza do nosso açafrão e o aroma inconfundível da nossa pimenta conquistaram os primeiros clientes, que se tornaram amigos e parceiros fiéis até hoje.
          </p>
        </div>

        <div class="w-full md:w-1/2">
          <div class="relative rounded-2xl overflow-hidden shadow-2xl rotate-1 hover:rotate-0 transition duration-500 border-4 border-white">
            <img :src="temperos" class="w-full h-auto object-cover" alt="O início da Sol Nascente" />
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p class="text-white font-medium text-sm">📍 Nossas origens em Goiânia</p>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="bg-gray-50 py-16">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center max-w-3xl mx-auto mb-12">
          <h2 class="text-3xl font-bold text-gray-800 mb-4">Nossos Pilares</h2>
          <p class="text-gray-600">Não abrimos mão da qualidade. Nossos processos evoluíram, mas o critério de seleção continua rigoroso como no primeiro dia.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition border border-gray-100 text-center group">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-600 transition duration-300">
              <span class="text-3xl group-hover:scale-110 transition">🌱</span>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">100% Natural</h3>
            <p class="text-gray-600">
              Lutamos contra a artificialidade. Nossos temperos são livres de conservantes agressivos, mantendo a pureza que a sua saúde merece.
            </p>
          </div>

          <div class="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition border border-gray-100 text-center group">
            <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-600 transition duration-300">
              <span class="text-3xl group-hover:scale-110 transition">🤝</span>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Parceria Forte</h3>
            <p class="text-gray-600">
              Conhecemos quem planta. Temos parcerias duradouras com produtores locais, garantindo comércio justo e matéria-prima fresca.
            </p>
          </div>

          <div class="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition border border-gray-100 text-center group">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition duration-300">
              <span class="text-3xl group-hover:scale-110 transition">🚚</span>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Logística Ágil</h3>
            <p class="text-gray-600">
              Atendemos de pequenos comércios a grandes atacadistas com rapidez, garantindo que o produto chegue com o aroma preservado.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-16 md:py-24">
      <div class="flex flex-col md:flex-row-reverse items-center gap-12">

        <div class="w-full md:w-1/2 space-y-6">
          <h2 class="text-3xl font-bold text-gray-800">Do campo para sua Mesa</h2>
          <p class="text-lg text-gray-600 leading-relaxed text-justify">
            O crescimento foi uma consequência natural do nosso compromisso. Hoje, o Sol Nascente deixou de ser apenas uma banca para se tornar uma referência em distribuição no estado de Goiás.
          </p>
          <p class="text-lg text-gray-600 leading-relaxed text-justify">
            Investimos em maquinário moderno para moagem e empacotamento, garantindo higiene total e padronização, sem perder a alma artesanal. Atendemos supermercados, restaurantes renomados e cozinhas industriais, levando o sabor de Goianira para todo o Brasil.
          </p>

          <div class="pt-4">
            <NuxtLink to="/contato" class="text-green-700 font-bold hover:underline flex items-center gap-2">
              Quer ser nosso parceiro? Entre em contato <span>→</span>
            </NuxtLink>
          </div>
        </div>

        <div class="w-full md:w-1/2">
          <div class="grid grid-cols-2 gap-4">
            <img :src="pimentadoreino" class="rounded-xl shadow-lg w-full h-64 object-cover transform translate-y-4" alt="Plantaçao de pimenta" />
            <img :src="temperosvarios" class="rounded-xl shadow-lg w-full h-64 object-cover transform -translate-y-4" alt="Produtos finalizados" />
          </div>
        </div>

      </div>
    </div>

    <div class="bg-green-800 text-white py-20 text-center px-4">
      <div class="max-w-4xl mx-auto">
        <span class="text-4xl block mb-6">☀️</span>
        <h2 class="text-2xl md:text-4xl font-bold leading-tight mb-8">
          "Nosso maior orgulho é saber que, em cada refeição preparada com nossos temperos, existe um pouco da nossa história e muito amor."
        </h2>
        <img :src="logo" alt="Logo Sol Nascente" class="h-16 w-auto mx-auto " />
      </div>
    </div>

  </div>
</template>

<style scoped>
/* Animação simples de entrada */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}
</style>