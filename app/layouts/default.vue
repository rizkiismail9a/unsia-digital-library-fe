<script setup></script>

<template>
  <Html lang="id">
    <main>
      <div id="DigitalLibrary">
        <slot />
      </div>
    </main>
  </Html>
</template>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Open Sans", sans-serif;
}

main {
  background-color: rgb(212, 212, 212);

  #DigitalLibrary {
    min-height: 100vh;
    background: white;
    margin: auto;
  }
}

body {
  --sb-track-color: #e8e8e8;
  --sb-thumb-color: #007c80;
  --sb-size: 2px;
}

body::-webkit-scrollbar {
  width: var(--sb-size);
}

body::-webkit-scrollbar-track {
  background: var(--sb-track-color);
  border-radius: 3px;
}

body::-webkit-scrollbar-thumb {
  background: var(--sb-thumb-color);
  border-radius: 3px;
}

.shimmer-loading {
  background: #f3f4f6;
  overflow: hidden;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.7),
      transparent
    );
    transform: translateX(-100%);
    animation: shimmer 1.6s infinite;
  }
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
