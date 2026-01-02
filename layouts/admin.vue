<template>
  <div class="min-h-screen bg-gray-50 font-sans">
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-xl font-bold text-green-700">Sol Nascente Admin</h1>
        <span class="text-xs text-gray-400 uppercase font-semibold">Sistema de Catálogo</span>
      </div>
    </header>

    <main class="max-w-7xl mx-auto p-4 md:p-8">
      <slot />
    </main>
  </div>
</template>