<script setup>
const { showToast } = useToast();
const { dateFormatterLong } = useFormatter();

const columnConfig = [
  {
    label: "id",
    field: "_id",
  },
  {
    label: "Kode",
    field: "loanCode",
  },
  {
    label: "Judul",
    field: "book.title",
  },
  {
    label: "ID Buku",
    field: "book._id",
  },
  {
    label: "Nama",
    field: "member.name",
  },
  {
    label: "NIM",
    field: "member.nim",
  },
  {
    label: "Email",
    field: "member.email",
  },
  {
    label: "Telepon",
    field: "member.phone",
  },
  {
    label: "Prodi",
    field: "member.prodi",
  },
  {
    label: "Status",
    field: "status",
    custom: true,
  },
  {
    label: "Tanggal Peminjaman",
    field: "borrowDate",
    formatter: dateFormatterLong,
  },
  {
    label: "Tenggat Waktu Pinjam",
    field: "dueDate",
    formatter: dateFormatterLong,
  },
  {
    label: "Tanggal Kembali",
    field: "returnDate",
    formatter: dateFormatterLong,
  },
];

const loans = ref([]);
const isLoading = ref(true);

const getAllLoans = async () => {
  try {
    isLoading.value = true;

    const data = await useBaseAPI("/api/loan");

    if (data.success) {
      loans.value = data.data;
    }
  } catch (error) {
    console.error("Gagal mendapatkan buku: ", error);
    showToast("Gagal mendapatkan data buku", "error");
  } finally {
    isLoading.value = false;
  }
};

getAllLoans();
</script>

<template>
  <div id="book-table">
    <h1>Rekaman Data Peminjaman Buku</h1>

    <PanelStaticTable
      :column-config="columnConfig"
      :data="loans"
      search-field="member.name"
      search-placeholder="Cari nama user"
    >
      <template #cell-status="{ item }">
        <div
          :class="[
            'pill',
            {
              blue: item === 'Borrowed',
              red: item === 'Overdue',
              green: item === 'Returned',
            },
          ]"
        >
          {{ item }}
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

  &.blue {
    background-color: #eff6ff;
    color: #3b82f6;
  }

  &.green {
    background-color: #f7fee7;
    color: #65a30d;
  }

  &.red {
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
