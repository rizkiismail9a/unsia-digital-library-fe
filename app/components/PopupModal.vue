<script setup>
const open = defineModel("open", { type: Boolean, default: false });

const emits = defineEmits(["close"]);

const closeModal = () => {
  open.value = false;
};
</script>

<template>
  <div v-if="open" class="success-edit-profile" @click.self="closeModal">
    <div class="popup-container">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.success-edit-profile {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 20;
  inset: 0;
  width: 100%;
  height: 100svh;
  background-color: #3741519e;
  padding: 20px;

  .popup-container {
    background-color: white;
    border-radius: 10px;
    padding: 20px;
  }
}
</style>
