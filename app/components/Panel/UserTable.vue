<script setup>
const { showToast } = useToast();
const { dateFormatterLong } = useFormatter();

const columnConfig = [
  {
    label: "id",
    field: "_id",
  },
  {
    label: "Nama",
    field: "name",
  },
  {
    label: "Role",
    field: "role",
  },
  {
    label: "Tanggal Terdaftar",
    field: "createdAt",
    formatter: dateFormatterLong,
  },
];

const users = ref([]);
const isLoading = ref(true);

const getAllUsers = async () => {
  try {
    isLoading.value = true;

    const data = await useBaseAPI("/api/user");

    if (data.success) {
      users.value = data.data;
    }
  } catch (error) {
    console.error(error);
    showToast("Gagal mendapatkan data user", "error");
  } finally {
    isLoading.value = false;
  }
};

getAllUsers();
</script>

<template>
  <div id="user-table">
    <h1>Akun Terdaftar</h1>

    <PanelStaticTable
      :column-config="columnConfig"
      :data="users"
      search-field="name"
      search-placeholder="Cari nama user"
    />

    <LazyLoading v-if="isLoading" />
  </div>
</template>

<style lang="scss" scoped>
h1 {
  padding: 18px 0;
  font-size: 24px;
}
</style>
