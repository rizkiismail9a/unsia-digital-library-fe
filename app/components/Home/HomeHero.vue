<script setup>
const router = useRouter();
</script>

<template>
  <section class="hero">
    <h1>Selamat Datang di PustakaKita!</h1>
    <p>
      Temukan petualangan baru, wawasan segar, dan kisah menginspirasi. Mari
      luangkan waktu sejenak untuk membaca hari ini.
    </p>
    <ButtonPrimary
      label="Jelajahi Koleksi Buku"
      @click="router.push('/katalog-buku')"
    />
  </section>
</template>

<style lang="scss" scoped>
/* Page 1: Home */
.hero {
  background: linear-gradient(
    135deg,
    rgba(140, 194, 94, 0.15),
    rgba(0, 124, 128, 0.1)
  );
  border-radius: 16px;
  padding: 3.5rem 2rem;
  text-align: center;
  margin-bottom: 2.5rem;

  h1 {
    font-size: 2.2rem;
    color: var(--clr-navy);
    margin-bottom: 0.8rem;
  }

  p {
    color: var(--clr-muted);
    max-width: 600px;
    margin: 0 auto 1.5rem;
  }
}
</style>
