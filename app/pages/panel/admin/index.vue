<script setup>
import { PhList } from "@phosphor-icons/vue";

const router = useRouter();
const route = useRoute();
const { fetchUser, authedUser } = useCurrentUser();

definePageMeta({
  middleware: ["sidebase-auth", "admin-only"],
});

const showSidebar = ref(false);
const menuOptions = reactive([
  {
    label: "User",
  },
  {
    label: "Buku",
  },
  {
    label: "Pinjaman",
  },
]);

onMounted(() => {
  if (!route.query.table) {
    changeTable("User");
  }
});

const firstLetter = computed(() => {
  if (authedUser.value) {
    return authedUser.value.name[0];
  }

  return "0";
});

const changeTable = (table) => {
  router.push({
    query: {
      table,
    },
  });
};

fetchUser();
</script>

<template>
  <div id="panel-admin">
    <div class="sidebar">
      <div class="sidebar-btn">
        <PhList size="36" color="#2f4858" @click="showSidebar = true" />
      </div>

      <Teleport v-if="showSidebar" to="body">
        <div class="sidebar-layout" @click="showSidebar = false">
          <div class="sidebar-menu">
            <div class="user">
              <div class="avatar">{{ firstLetter }}</div>
              <p class="name">{{ authedUser.name }}</p>
            </div>

            <div
              v-for="menu in menuOptions"
              :key="menu.label"
              :class="['menu', { active: route.query.table === menu.label }]"
              @click="changeTable(menu.label)"
            >
              {{ menu.label }}
            </div>
          </div>
        </div>
      </Teleport>
    </div>
    <div class="panel-admin-content">
      <UserTable v-if="route.query.table === 'User'" />
      <BookTable v-if="route.query.table === 'Buku'" />
      <LoanTable v-if="route.query.table === 'Pinjaman'" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#panel-admin {
  position: relative;

  .panel-admin-content {
    max-width: 1100px;
    margin: 2rem auto;
    padding: 0 1.5rem;
  }

  .sidebar {
    position: fixed;
    top: 70px;
    z-index: 20;
    width: fit-content;

    .sidebar-btn {
      padding: 24px;
    }
  }
}

.sidebar-layout {
  height: 100%;
  inset: 0;
  position: fixed;
  z-index: 100;
  background-color: #2f485869;

  .sidebar-menu {
    background-color: white;
    height: 100vh;
    width: 30%;
    padding: 14px 0;

    .user {
      padding: 16px;
      display: flex;
      align-items: center;
      gap: 12px;

      .avatar {
        width: 40px;
        height: 40px;
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

      .name {
        font-weight: 600;
        font-size: 18px;
      }
    }

    .menu {
      padding: 16px;
      color: var(--clr-dark-teal);
      font-weight: 500;
      letter-spacing: 1px;
    }

    .menu:hover,
    .menu.active {
      background-color: #007c802f;
    }
  }
}
</style>
