export const useCurrentUser = () => {
  const { data: auth } = useAuth();

  const authedUser = useState("current-user", () => null);
  const pending = useState("current-user-pending", () => false);
  const membershipData = useState("current-membership-data", () => null);
  const isMember = useState("current-member-status", () => false);

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

  const getMembershipStatus = async () => {
    if (!auth.value?.user?.accessToken) return;

    try {
      const data = await $fetch("/api/member/my-membership", {
        baseURL: useRuntimeConfig().public.apiBaseUrl,
        headers: {
          Authorization: `Bearer ${auth.value.user.accessToken}`,
        },
      });

      if (data.success) {
        isMember.value = data.data.email === authedUser.value.email;
        membershipData.value = data.data;
      }
    } catch (error) {
      console.error("Gagal mendapatkan data membership: ", error);
    }
  };

  return {
    authedUser,
    pending,
    isMember,
    membershipData,
    fetchUser,
    getMembershipStatus,
  };
};
