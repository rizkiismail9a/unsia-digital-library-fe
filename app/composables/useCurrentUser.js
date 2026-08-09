export const useCurrentUser = () => {
  const { data: auth } = useAuth();

  const authedUser = useState("current-user", () => null);
  const pending = useState("current-user-pending", () => false);

  const fetchUser = async () => {
    if (!auth.value?.user?.accessToken) return;

    pending.value = true;

    try {
      const res = await $fetch("/api/user/me", {
        baseURL: useRuntimeConfig().public.apiBaseUrl,
        headers: {
          Authorization: `Bearer ${auth.value.user.accessToken}`,
        },
      });

      authedUser.value = res.user;
    } catch (error) {
      // 500 ke error.vue
      if (error.statusCode >= 500) {
        throw createError({
          statusCode: error.statusCode,
          statusMessage: error.statusMessage,
          fatal: true,
        });
      }

      // Error lain diteruskan ke pemanggil
      throw error;
    } finally {
      pending.value = false;
    }
  };

  return {
    authedUser,
    pending,
    fetchUser,
  };
};
