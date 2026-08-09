<script setup>
defineProps({
  label: { type: String, default: "" },
});
</script>

<template>
  <button class="btn btn-primary">{{ label }}</button>
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
}

.btn-primary {
  background-color: var(--clr-teal);
  color: white;
}
</style>
