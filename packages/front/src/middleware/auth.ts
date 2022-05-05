export default defineNuxtRouteMiddleware((to, from) => {
  const { $auth } = useNuxtApp();
  if ($auth && !$auth.isLoggedIn()) {
    return navigateTo({ path: '/login', replace: true });
  }
});
