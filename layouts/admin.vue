<template>
  <div class="min-h-screen flex bg-gray-50">
    <aside class="w-64 bg-white shadow-md hidden md:block">
      <div class="p-6">
        <h1 class="text-2xl font-bold text-green-600">Sol Nascente</h1>
      </div>
      <nav class="mt-6 px-4 space-y-2">
        <NuxtLink to="/admin" class="block px-4 py-2 text-gray-700 hover:bg-green-50 rounded">Dashboard</NuxtLink>
        <NuxtLink to="/admin/produtos" class="block px-4 py-2 text-gray-700 hover:bg-green-50 rounded">Produtos</NuxtLink>
      </nav>
    </aside>

    <main class="flex-1 p-8">
      <slot />
    </main>
  </div>
</template>