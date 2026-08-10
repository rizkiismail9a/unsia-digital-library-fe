<script setup>
const { showToast } = useToast();
const { dateFormatterLong } = useFormatter();

const columnConfig = [
  {
    label: "id",
    field: "_id",
  },
  {
    label: "Judul",
    field: "title",
  },
  {
    label: "Pengarang",
    field: "author",
  },
  {
    label: "Genre",
    field: "genre",
  },
  {
    label: "ISBN",
    field: "isbn",
  },
  {
    label: "Stock",
    field: "stock",
  },
  {
    label: "Tanggal Publikasi",
    field: "published",
    formatter: dateFormatterLong,
  },
  {
    label: "Tanggal Masuk",
    field: "createdAt",
    formatter: dateFormatterLong,
  },
  {
    label: "Status",
    field: "deletedAt",
    custom: true,
  },
  {
    label: "Lihat",
    field: "url",
    custom: true,
  },
  {
    label: "Aksi",
    field: "deleteId",
    custom: true,
  },
];

const books = ref([]);
const isLoading = ref(true);

const getBooksList = async () => {
  try {
    isLoading.value = true;

    const data = await useBaseAPI("/api/books/all-books?includesDeleted=true");

    if (data.success) {
      books.value = data.data.map((item) => ({
        ...item,
        url: {
          url: `/katalog-buku/${item._id}`,
          isDeleted: item.deletedAt !== null,
        },
        deleteId: { id: item._id, isDeleted: item.deletedAt !== null },
      }));
    }
  } catch (error) {
    console.error("Gagal mendapatkan buku: ", error);
    showToast("Gagal mendapatkan data buku", "error");
  } finally {
    isLoading.value = false;
  }
};

const deleteBook = async (id) => {
  try {
    isLoading.value = true;

    const data = await useBaseAPI(`/api/books/delete-book/${id}`, {
      method: "DELETE",
    });

    if (data.success) {
      showToast("Buku berhasil dihapus", "success");
      getBooksList();
    }
  } catch (error) {
    console.error("Gagal mendapatkan buku: ", error);
    showToast("Gagal mendapatkan data buku", "error");
  } finally {
    isLoading.value = false;
  }
};

getBooksList();
</script>

<template>
  <div id="book-table">
    <h1>Rekaman Data Koleksi Buku</h1>

    <PanelStaticTable
      :column-config="columnConfig"
      :data="books"
      search-field="title"
      search-placeholder="Cari judul buku"
    >
      <template #cell-deletedAt="{ item }">
        <div :class="['pill', { active: item === null, finished: item }]">
          {{ item ? "Dihapus" : "Tersedia" }}
        </div>
      </template>
      <template #cell-url="{ item }">
        <NuxtLink v-if="!item.isDeleted" :to="item.url" class="book-link">
          Lihat Buku
        </NuxtLink>
        <p v-else :to="item.url" class="book-link" :style="{ color: 'grey' }">
          Buku Sudah Dihapus
        </p>
      </template>
      <template #cell-deleteId="{ item }">
        <div v-if="!item.isDeleted" class="delete" @click="deleteBook(item.id)">
          Hapus Buku
        </div>
        <div v-else class="book-link" :style="{ color: 'grey' }">
          Buku Sudah Dihapus
        </div>
      </template>
    </PanelStaticTable>

    <LazyLoading v-if="isLoading" />
  </div>
</template>

<style lang="scss" scoped>
h1 {
  padding: 18px 0;
  font-size: 24px;
}

.pill {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  border-radius: 999px;
  font-size: 11px;
  font-style: normal;
  font-weight: 424;
  line-height: 16px; /* 145.455% */
  letter-spacing: 0.05px;
  padding: 2px 8px;

  &.active {
    background-color: #eff6ff;
    color: #3b82f6;
  }

  &.finished {
    background-color: #fef2f2;
    color: #ef4444;
  }
}

.book-link {
  font-size: 11px;
  color: var(--clr-green);
  display: block;
  width: 100px;
  width: 100%;
}

.delete {
  font-size: 11px;
  color: white;
  display: block;
  width: 100px;
  cursor: pointer;
  padding: 8px;
  background-color: #ef4444;
  border-radius: 10px;
}
</style>
