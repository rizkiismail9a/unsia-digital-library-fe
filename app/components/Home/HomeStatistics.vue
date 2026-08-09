<script setup>
const { formatShortNumber } = useFormatter();

defineProps({
  bookStocks: { type: Number, default: 0 },
  memberAmount: { type: Number, default: 0 },
  totalLoans: { type: Number, default: 0 },
  booksAmount: { type: Number, default: 0 },
});
</script>

<template>
  <section class="stats-grid">
    <div class="stat-card">
      <div class="stat-label">Total Buku Tersedia</div>
      <div class="stat-value">
        {{ formatShortNumber(booksAmount) }}
      </div>
    </div>
    <div class="stat-card accent">
      <div class="stat-label">Total Anggota</div>
      <div class="stat-value">
        {{ formatShortNumber(memberAmount) }}
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Stok Buku Tersedia</div>
      <div class="stat-value">
        {{ formatShortNumber(bookStocks) }}
      </div>
    </div>
    <div class="stat-card accent">
      <div class="stat-label">Total Transaksi Pinjam</div>
      <div class="stat-value">
        {{ formatShortNumber(totalLoans) }}
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.2rem;
  margin-bottom: 2rem;

  .stat-card {
    background: var(--clr-card);
    border: 1px solid var(--clr-border);
    border-radius: 10px;
    padding: 1.2rem;
    border-left: 4px solid var(--clr-green);

    &.accent {
      border-left-color: var(--clr-teal);
    }

    .stat-label {
      font-size: 0.85rem;
      color: var(--clr-muted);
    }

    .stat-value {
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--clr-navy);
      margin-top: 0.2rem;
    }
  }
}
</style>
