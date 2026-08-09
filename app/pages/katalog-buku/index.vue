<script setup>
import InfoState from "~/components/InfoState.vue";
import InputSearch from "~/components/InputSearch.vue";

const router = useRouter();

const searchQuery = ref("");
const isLoading = ref(true);
const books = ref([]);

const filteredBooks = computed(() => {
  return books.value.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );
});

const getBooksList = async () => {
  try {
    isLoading.value = true;

    const data = await useBaseAPI("/api/books/all-books");

    if (data) {
      books.value = data.data;
    }
  } catch (error) {
    console.error("Gagal mendapatkan buku: ", error);
  } finally {
    isLoading.value = false;
  }
};

const openBookDetail = (id) => {
  router.push(`/katalog-buku/${id}`);
};

getBooksList();
</script>

<template>
  <div id="katalog-buku">
    <h1>Katalog Buku</h1>

    <InputSearch v-model="searchQuery" />

    <div
      :class="[
        {
          flex: filteredBooks.length <= 0,
          'books-grid': filteredBooks.length > 0,
        },
      ]"
    >
      <template v-if="!isLoading">
        <div
          v-for="book in filteredBooks"
          :key="book._id"
          class="card book-card"
          @click="openBookDetail(book._id)"
        >
          <div
            class="book-cover truncate"
            style="background-color: var(--clr-dark-teal)"
          >
            {{ book.title }}
          </div>
          <h2 class="book-title truncate">{{ book.title }}</h2>
          <p class="book-author">{{ book.author }}</p>
          <p class="book-author">{{ book.genre }}</p>
        </div>

        <InfoState
          v-if="filteredBooks.length === 0"
          img="/illustration/empty-box.svg"
          message="Buku yang kamu cari tidak ketemu"
          sub-message="Coba ganti kata kunci pencarian"
        />
      </template>

      <template v-else>
        <div class="card-skeleton shimmer-loading"></div>
        <div class="card-skeleton shimmer-loading"></div>
        <div class="card-skeleton shimmer-loading"></div>
        <div class="card-skeleton shimmer-loading"></div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#katalog-buku {
  max-width: 1100px;
  margin: 2rem auto;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .books-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.5rem;

    &.flex {
      display: flex !important;
      align-items: center;
      justify-content: center;
    }

    .card {
      background: var(--clr-card);
      border: 1px solid var(--clr-border);
      border-radius: 12px;
      padding: 1.5rem;
    }

    .book-card {
      cursor: pointer;
      transition: transform 0.2s;

      &:hover {
        transform: translateY(-4px);
      }

      .book-cover {
        height: 220px;
        background: #1a6272;
        background: linear-gradient(
          360deg,
          rgba(26, 98, 114, 1) 0%,
          rgba(0, 124, 128, 1) 50%,
          rgba(77, 174, 114, 1) 100%
        );
        border-radius: 8px;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 500;
        text-align: center;
        padding: 1rem;
        text-transform: capitalize;
        line-clamp: 1;
        -webkit-line-clamp: 1;
      }

      .book-title {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 0.2rem;
        text-transform: capitalize;
        line-clamp: 2;
        -webkit-line-clamp: 2;
      }

      .book-author {
        font-size: 0.85rem;
        color: var(--clr-muted);
      }
    }

    .card-skeleton {
      border-radius: 12px;
      width: 100%;
      height: 350px;
    }
  }
}
</style>
