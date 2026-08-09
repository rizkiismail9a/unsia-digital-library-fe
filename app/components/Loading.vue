<template>
  <div class="loading-layout">
    <div class="loader"></div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
/* HTML: <div class="loader"></div> */
.loading-layout {
  display: flex;
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  z-index: 900;
  background-color: rgba(63, 63, 63, 0.709);
}

.loader {
  width: 120px;
  height: 20px;
  border-radius: 20px;
  background: linear-gradient(#8cc25e 0 0) 0/0% no-repeat lightblue;
  animation: l2 2s infinite steps(10);
}
@keyframes l2 {
  100% {
    background-size: 110%;
  }
}
</style>
