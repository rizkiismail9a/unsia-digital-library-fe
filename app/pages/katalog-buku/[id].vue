<script setup>
const route = useRoute();

const {
  data: book,
  error,
  refresh,
} = await useAsyncData(`book-${route.params.id}`, async () => {
  const response = await useBaseAPI(`/api/books/${route.params.id}`);
  return response.data;
});

const openPopup = ref(false);

if (error.value) {
  throw createError({
    statusCode: error.value.status || 500,
    statusMessage:
      error.value.status === 404
        ? "Farmer tidak ditemukan"
        : error.value.message,
    fatal: true,
  });
}

const borrowBooks = async () => {
  //   try {
  //     isLoading.value = true;

  //     const data = await useBaseAPI("/api/loan/create", {
  //       method: "POST",
  //        body: {
  //         nim: search.value,
  //         phone: selectedProvince.value,
  //         prodi: ''
  //       },
  //     });

  //     if (data.success) {
  //       openPopup.value = true;
  //     }
  //   } catch (error) {
  //     console.error("Gagal mendapatkan buku: ", error);
  //   } finally {
  //     isLoading.value = false;
  //   }
  openPopup.value = true;
};

const onClosePopup = () => {
  openPopup.value = false;
  refresh();
};
</script>

<template>
  <div v-if="book" id="book-detail">
    <div class="card detail-grid">
      <div class="detail-cover">{{ book.title }}</div>
      <div>
        <span class="badge">{{ book.genre }}</span>
        <h1 style="margin-bottom: 0.5rem; color: var(--clr-navy)">
          {{ book.title }}
        </h1>
        <p style="color: var(--clr-muted); margin-bottom: 1.5rem">
          Oleh: <strong>{{ book.author }}</strong>
        </p>

        <p style="margin-bottom: 1.5rem; color: var(--clr-text)">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum
          voluptatem consequatur ab provident voluptatum dolorem rem dignissimos
          sint suscipit? Vitae voluptas repellat assumenda delectus sint
          suscipit harum nihil rem voluptates!
        </p>

        <div
          style="
            margin-bottom: 2rem;
            font-size: 0.9rem;
            color: var(--clr-muted);
          "
        >
          <div>
            • Stok Tersedia: <strong>{{ book.stock }} Eks.</strong>
          </div>
          <div>• Lokasi Rak: <strong>R-04 B</strong></div>
        </div>

        <ButtonPrimary label="Pinjam Buku" @click="borrowBooks" />
      </div>

      <LazyLoading v-if="isLoading" />

      <PopupModal v-model:open="openPopup">
        <template #content>
          <div class="sucess-borrowing">
            <img src="/illustration/kartun-melambai.svg" alt="sukses" />
            <div class="message">
              <p>Buku Berhasil Dipinjam!</p>
            </div>
            <ButtonPrimary label="Ok, Paham!" @click="onClosePopup" />
          </div>
        </template>
      </PopupModal>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#book-detail {
  max-width: 1100px;
  margin: 2rem auto;
  padding: 0 1.5rem;

  .card {
    background: var(--clr-card);
    border: 1px solid var(--clr-border);
    border-radius: 12px;
    padding: 1.5rem;
  }

  /* Page 5: Book Detail */
  .detail-grid {
    display: grid;
    grid-template-columns: 240px 1fr;
    gap: 2.5rem;

    .detail-cover {
      min-height: 320px;
      background-color: var(--clr-dark-teal);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.2rem;
      text-align: center;
      padding: 1rem;
    }

    .badge {
      display: inline-block;
      padding: 0.25rem 0.6rem;
      background-color: rgba(140, 194, 94, 0.2);
      color: var(--clr-dark-teal);
      border-radius: 4px;
      font-size: 0.8rem;
      font-weight: 600;
      margin-bottom: 0.8rem;
    }

    h1 {
      text-transform: capitalize;
    }
  }

  .sucess-borrowing {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;

    img {
      width: 200px;
      height: 200px;
    }

    .message {
      display: flex;
      flex-direction: column;
      align-items: center;

      p {
        font-weight: 580;
        font-size: 24px;
      }
    }
  }
}

@media (max-width: 768px) {
  .detail-grid {
    grid-template-columns: 1fr !important;
  }
}
</style>
