<script setup></script>

<template>
  <header>
    <div class="nav-container">
      <div class="logo">
        <div class="logo-badge"></div>
        HappyLibrary
      </div>
      <nav>
        <NuxtLink to="/" id="nav-home" class="active">Home</NuxtLink>
        <NuxtLink to="/katalog-buku" id="nav-books">Katalog Buku</NuxtLink>
        <NuxtLink to="/profil" id="nav-profile">Profil</NuxtLink>
        <NuxtLink to="/masuk" id="nav-auth">Masuk</NuxtLink>
      </nav>
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

      .logo-badge {
        width: 12px;
        height: 12px;
        background-color: var(--clr-light-green);
        border-radius: 50%;
      }
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
  }
}
</style>
