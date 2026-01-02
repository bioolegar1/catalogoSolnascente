// nuxt.config.ts
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    modules: ["@nuxtjs/supabase", "@nuxtjs/tailwindcss"],

    supabase: {
        // Desativa o redirecionamento global
        redirect: false,
        // Por segurança extra, configuramos para excluir a raiz explicitamente
        redirectOptions: {
            login: '/login',
            callback: '/confirm',
            exclude: ['/']
        }
    }
});