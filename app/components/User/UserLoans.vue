<script setup>
const { showToast } = useToast();
const { dateFormatterLong } = useFormatter();

const myLoans = ref([]);
const isLoading = ref(true);
const returnLoading = ref(false);

const getMyLoans = async () => {
  try {
    isLoading.value = true;
    const data = await useBaseAPI("/api/loan/my-loans");

    if (data.success) {
      myLoans.value = data.data;
    }
  } catch (error) {
    showToast("Gagal mendapatkan buku pinjaman", "error");

    console.error("Gagal mendapatkan buku pinjaman: ", error);
  } finally {
    isLoading.value = false;
  }
};

const returnBook = async (id) => {
  try {
    returnLoading.value = true;
    const data = await useBaseAPI(`/api/loan/${id}/return`, { method: "PUT" });

    if (data.success) {
      showToast("Buku berhasil dikembalikan!", "success");

      await getMyLoans();
    }
  } catch (error) {
    showToast("Gagal mengembalikan buku", "error");

    console.error("Gagal mengembalikan buku: ", error);
  } finally {
    returnLoading.value = false;
  }
};

getMyLoans();
</script>

<template>
  <div id="user-loans" class="card">
    <h2>Buku Sedang Dipinjam</h2>

    <div v-if="isLoading" class="skeleton shimmer-loading"></div>

    <InfoState
      v-else-if="!isLoading && myLoans.length === 0"
      img="/illustration/empty-box.svg"
      message="Kamu Belum Meminjam Buku Apapun"
      use-button
      button-label="Lihat Katalog Buku"
      @on-button-click="$router.push('/katalog-buku')"
    />

    <div v-else class="borrowed-list">
      <div v-for="loan in myLoans" :key="loan._id" class="borrowed-item">
        <div>
          <strong class="truncate" style="text-transform: capitalize">{{
            loan.book.title
          }}</strong>
          <div style="font-size: 0.8rem; color: var(--clr-muted)">
            Jatuh tempo: {{ dateFormatterLong(loan.dueDate) }}
          </div>
        </div>
        <ButtonPrimary label="Kembalikan" @click="returnBook(loan._id)" />
      </div>
    </div>

    <LazyLoading v-if="returnLoading" />
  </div>
</template>

<style lang="scss" scoped>
.card {
  background: var(--clr-card);
  border: 1px solid var(--clr-border);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .borrowed-list {
    .borrowed-item {
      display: flex;
      justify-content: space-between;
      padding: 0.8rem 0;
      border-bottom: 1px solid var(--clr-border);

      .truncate {
        line-clamp: 1;
        -webkit-line-clamp: 1;
      }

      .badge {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.25rem 0.6rem;
        background-color: rgba(140, 194, 94, 0.2);
        color: var(--clr-dark-teal);
        border-radius: 4px;
        font-size: 0.8rem;
        font-weight: 600;
        margin-bottom: 0.8rem;
      }
    }
  }

  .skeleton {
    width: 100%;
    height: 300px;
  }
}
</style>
