export default defineNuxtRouteMiddleware((to, from) => {
    const user = useSupabaseUser()

    // Se o usuário NÃO existe e está tentando acessar qualquer rota
    // nós o mandamos para o login.
    if (!user.value) {
        return navigateTo('/login')
    }
})