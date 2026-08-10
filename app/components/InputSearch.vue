<script setup>
defineProps({
  modelValue: { type: String, default: "" },
  placeholder: {
    type: String,
    default: "Cari judul buku, penulis, atau topik...",
  },
});

const emit = defineEmits(["update:modelValue"]);

const onInput = (event) => {
  const value = event.target.value;
  emit("update:modelValue", value);
};
</script>

<template>
  <label class="search-bar">
    <input
      type="text"
      class="form-control"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
    />
  </label>
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
