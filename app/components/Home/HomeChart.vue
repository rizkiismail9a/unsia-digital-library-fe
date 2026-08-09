<script setup>
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);

defineProps({
  chartData: { type: Object, default: null },
  chartOptions: { type: Object, default: null },
});
</script>

<template>
  <section class="card chart-section">
    <div>
      <h3>Ringkasan Aktivitas Peminjaman</h3>
      <p style="color: var(--clr-muted); font-size: 0.9rem; margin-top: 0.4rem">
        Pantau perbandingan antara buku yang sedang aktif dipinjam dan yang
        sudah dikembalikan oleh anggota perpustakaan.
      </p>
    </div>

    <div v-if="chartData" class="chart-container">
      <Doughnut :data="chartData" :options="chartOptions" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.card {
  background: var(--clr-card);
  border: 1px solid var(--clr-border);
  border-radius: 12px;
  padding: 1.5rem;

  &.chart-section {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 1.5rem;
    align-items: center;
  }

  .chart-container {
    position: relative;
    height: 250px;
    display: flex;
    justify-content: center;
  }
}
</style>
