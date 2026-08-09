<script setup>
const isLoading = ref(false);
const booksAmount = ref(0);
const memberAmount = ref(0);
const bookStocks = ref(0);
const totalLoans = ref(0);

const chartData = reactive({
  labels: ["Pinjaman Aktif", "Pinjaman Dikembalikan"],
  datasets: [
    {
      data: [],
      backgroundColor: ["#4dae72", "#007c80"],
      borderWidth: 0,
      hoverOffset: 4,
    },
  ],
});

const chartOptions = reactive({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        boxWidth: 12,
        font: { family: "Inter" },
      },
    },
  },
  cutout: "70%",
});

const getStatistics = async () => {
  try {
    isLoading.value = true;
    const data = await useBaseAPI("/api/statistics");

    if (data) {
      booksAmount.value = data.data.totalBooks;
      memberAmount.value = data.data.totalMembers;
      bookStocks.value = data.data.availableBooks;
      totalLoans.value = data.data.totalLoans;

      chartData.datasets[0].data = [
        data.data.activeLoans,
        data.data.returnedLoans,
      ];
    }
  } catch (error) {
    console.error("Gagal mendapatkan data buku", error);
  } finally {
    isLoading.value = false;
  }
};

getStatistics();
</script>

<template>
  <div id="homepage">
    <HomeHero />

    <HomeStatistics
      v-if="!isLoading"
      :book-stocks="bookStocks"
      :total-loans="totalLoans"
      :books-amount="booksAmount"
      :member-amount="memberAmount"
    />

    <div v-else class="skeleton">
      <div class="loading shimmer-loading"></div>
      <div class="loading shimmer-loading"></div>
      <div class="loading shimmer-loading"></div>
      <div class="loading shimmer-loading"></div>
    </div>

    <HomeChart
      v-if="!isLoading"
      :chart-data="chartData"
      :chart-options="chartOptions"
    />

    <div v-else class="loading-card shimmer-loading"></div>
  </div>
</template>

<style lang="scss" scoped>
#homepage {
  max-width: 1100px;
  margin: 2rem auto;
  padding: 0 1.5rem;

  .skeleton {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.2rem;
    margin-bottom: 2rem;

    .loading {
      height: 112px;
      width: 400px;
      border-radius: 10px;
    }
  }

  .loading-card {
    height: 300px;
    width: 100%;
    border-radius: 10px;
  }
}
</style>
