export default defineNuxtRouteMiddleware(() => {
  const { status, data } = useAuth();

  // Return immediately if user is already authenticated
  if (status.value === "unauthenticated") {
    return navigateTo("/masuk");
  } else if (status.value === "authenticated") {
    if (data.value.user && data.value.user.role !== "admin") {
      return navigateTo("/profil");
    }
  } else {
    return navigateTo("/");
  }
});
