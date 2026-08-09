export default defineNuxtRouteMiddleware(() => {
  const { status, data } = useAuth();

  // Return immediately if user is already authenticated
  if (status.value === "authenticated") {
    if (data.value.user) return navigateTo(`/profil`);
    else return navigateTo("/");
  }
});
