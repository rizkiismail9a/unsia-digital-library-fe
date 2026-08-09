<script setup>
import { PhSignOut } from "@phosphor-icons/vue";

const auth = useAuth();
const route = useRoute();
const { fetchUser, authedUser, membershipData, isMember, getMembershipStatus } =
  useCurrentUser();

definePageMeta({
  middleware: "sidebase-auth",
});

const loading = ref(false);

const firstLetter = computed(() => {
  if (authedUser.value) {
    return authedUser.value.name[0];
  }

  return "0";
});

const logout = async () => {
  try {
    loading.value = true;
    auth.signOut({ callbackUrl: "/masuk" });
  } catch (error) {
    console.error("error logout", error);
  } finally {
    loading.value = false;
  }
};

await fetchUser();
await getMembershipStatus();
</script>

<template>
  <div id="profile-page">
    <div class="card profile-header">
      <div class="avatar">{{ firstLetter }}</div>
      <div class="identity">
        <h2>{{ authedUser.name }}</h2>
        <p v-if="!isMember" style="color: var(--clr-muted); font-size: 0.9rem">
          Kamu belum menjadi anggota!
          <NuxtLink
            to="/registrasi/member"
            style="
              text-decoration: underline;
              font-weight: 700;
              color: var(--clr-teal);
              cursor: pointer;
            "
          >
            Daftar Sekarang!
          </NuxtLink>
        </p>
        <p v-else style="color: var(--clr-muted); font-size: 0.9rem">
          ID Anggota: {{ membershipData._id }}
        </p>
      </div>

      <PhSignOut size="24" color="red" @click="logout" />
      <LazyLoading v-if="loading" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#profile-page {
  max-width: 1100px;
  margin: 2rem auto;
  padding: 0 1.5rem;

  .card {
    background: var(--clr-card);
    border: 1px solid var(--clr-border);
    border-radius: 12px;
    padding: 1.5rem;

    &.profile-header {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      margin-bottom: 2rem;

      .identity {
        flex: 1;
      }
    }

    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background-color: var(--clr-dark-teal);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      font-weight: 600;
      flex-shrink: 0;
    }
  }

  @media screen and (max-width: 768px) {
    .profile-header {
      flex-direction: column;
      justify-content: center;

      .identity {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
      }
    }
  }
}
</style>
