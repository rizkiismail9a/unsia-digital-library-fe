<script setup>
defineProps({
  label: { type: String, default: "" },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button :disabled="disabled" :class="['btn btn-primary', { disabled }]">
    {{ label }}
  </button>
</template>

<style lang="scss" scoped>
/* UI Components */
.btn {
  display: inline-block;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.9rem;
  text-decoration: none;
  cursor: pointer;
  border: none;
  transition: opacity 0.2s;
  height: 46px;

  &.disabled {
    background-color: #9ca3af;
  }
}

.btn-primary {
  background-color: var(--clr-teal);
  color: white;
}
</style>
