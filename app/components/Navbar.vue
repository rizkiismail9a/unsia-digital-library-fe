<script setup>
import { PhBook, PhList } from "@phosphor-icons/vue";

const showSidebar = ref(false);
</script>

<template>
  <header>
    <div class="nav-container">
      <div class="logo">
        <PhBook size="24" colro="--clr-light" weight="fill" />
        HappyLibrary
      </div>
      <nav>
        <NuxtLink to="/" id="nav-home" class="active">Home</NuxtLink>
        <NuxtLink to="/katalog-buku" id="nav-books">Katalog Buku</NuxtLink>
        <NuxtLink to="/profil" id="nav-profile">Profil</NuxtLink>
        <NuxtLink to="/masuk" id="nav-auth">Masuk</NuxtLink>
      </nav>

      <PhList
        size="24"
        colro="--clr-light"
        class="sidebar-btn"
        @click="showSidebar = true"
      />
    </div>

    <div v-if="showSidebar" class="sidebar" @click="showSidebar = false">
      <div class="menu">
        <NuxtLink to="/" id="nav-home" class="active">Home</NuxtLink>
        <NuxtLink to="/katalog-buku" id="nav-books">Katalog Buku</NuxtLink>
        <NuxtLink to="/profil" id="nav-profile">Profil</NuxtLink>
        <NuxtLink to="/masuk" id="nav-auth">Masuk</NuxtLink>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  background-color: var(--clr-card);
  border-bottom: 1px solid var(--clr-border);
  position: sticky;
  top: 0;
  z-index: 100;

  .nav-container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 1rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
      font-weight: 700;
      font-size: 1.25rem;
      color: var(--clr-dark-teal);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    nav {
      display: flex;
      gap: 1.5rem;

      a {
        text-decoration: none;
        color: var(--clr-muted);
        font-weight: 500;
        font-size: 0.9rem;
        cursor: pointer;
        transition: color 0.2s;

        &:hover,
        &.router-link-exact-active.router-link-active {
          color: var(--clr-teal);
        }
      }
    }

    .sidebar-btn {
      display: none;
    }
  }
}

@media screen and (max-width: 768px) {
  nav {
    display: none !important;
  }
}

@media screen and (max-width: 768px) {
  .sidebar-btn {
    display: block !important;
  }

  .sidebar {
    display: flex;
    position: fixed;
    align-items: flex-end;
    flex-direction: column;
    inset: 0;
    right: 0;
    width: 100%;
    height: 1000svh;
    background-color: rgba(53, 53, 53, 0.349);

    .menu {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 24px;
      background-color: white;
      height: 100svh;
      width: 50%;
      position: relative;

      a {
        text-decoration: none;
        color: var(--clr-muted);
        font-weight: 500;
        font-size: 0.9rem;
        cursor: pointer;
        transition: color 0.2s;

        &:hover,
        &.router-link-exact-active.router-link-active {
          color: var(--clr-teal);
        }
      }
    }
  }
}
</style>
