<script setup>
defineProps({
  modelValue: { type: String, default: "" },
});

const emit = defineEmits(["update:modelValue"]);

const onInput = (event) => {
  const value = event.target.value;
  emit("update:modelValue", value);
};
</script>

<template>
  <div class="search-bar">
    <input
      type="text"
      class="form-control"
      placeholder="Cari judul buku, penulis, atau topik..."
      :value="modelValue"
      @input="onInput"
    />
  </div>
</template>

<style lang="scss" scoped>
.search-bar {
  .form-control {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--clr-border);
    border-radius: 8px;
    font-size: 0.9rem;
    outline: none;

    &:focus {
      border-color: var(--clr-teal);
    }
  }
}
</style>
