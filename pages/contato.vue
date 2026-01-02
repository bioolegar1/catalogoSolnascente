<template>
  <div class="bg-gray-50 min-h-[80vh]">
    <div class="bg-gray-900 py-12 text-center text-white">
      <h1 class="text-3xl font-bold">Fale Conosco</h1>
      <p class="text-gray-400">Estamos prontos para atender você.</p>
    </div>

    <div class="max-w-5xl mx-auto px-4 py-12">

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div class="space-y-6">
          <h2 class="text-2xl font-bold text-gray-800">Canais de Atendimento</h2>
          <p class="text-gray-600">
            Dúvidas sobre produtos, parcerias ou entregas? Entre em contato por um dos canais abaixo ou preencha o formulário.
          </p>

          <div class="space-y-4 mt-6">
            <div class="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <span class="text-2xl bg-green-100 p-3 rounded-full">📞</span>
              <div>
                <p class="text-xs text-gray-500 font-bold uppercase">Telefone / WhatsApp</p>
                <p class="text-lg font-bold text-green-700">(62) 99999-9999</p>
              </div>
            </div>

            <div class="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <span class="text-2xl bg-blue-100 p-3 rounded-full">📧</span>
              <div>
                <p class="text-xs text-gray-500 font-bold uppercase">Email</p>
                <p class="text-lg font-bold text-blue-700">contato@solnascente.com.br</p>
              </div>
            </div>

            <div class="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <span class="text-2xl bg-orange-100 p-3 rounded-full">📍</span>
              <div>
                <p class="text-xs text-gray-500 font-bold uppercase">Endereço</p>
                <p class="text-gray-800">Setor Central, Goiânia - GO</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <form class="space-y-4" onsubmit="event.preventDefault(); alert('Mensagem enviada (Simulação)!');">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Seu Nome</label>
              <input type="text" class="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500" placeholder="Ex: João Silva" required />
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Seu Email</label>
              <input type="email" class="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500" placeholder="Ex: joao@email.com" required />
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Mensagem</label>
              <textarea rows="4" class="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500" placeholder="Como podemos ajudar?" required></textarea>
            </div>
            <button class="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition">
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>

      <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>🗺️</span> Nossa Localização
        </h3>
        <div class="w-full h-80 bg-gray-200 rounded-lg overflow-hidden relative">
          <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122285.64257850812!2d-49.26479425!3d-16.68689115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef6bd57d8085b%3A0x633190df5b121901!2zR29pw6ZuaWEgLSBHTw!5e0!3m2!1spt-BR!2sbr!4v1715617309999!5m2!1spt-BR!2sbr"
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