<script setup>
import Navbar from "~/components/Navbar.vue";
</script>

<template>
  <Html lang="id">
    <Navbar />
    <main>
      <div id="DigitalLibrary">
        <slot />
      </div>
    </main>
  </Html>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Inter", sans-serif;
}

:root {
  --sb-track-color: #e8e8e8;
  --sb-thumb-color: #007c80;
  --sb-size: 2px;
  --clr-light-green: #8cc25e;
  --clr-green: #4dae72;
  --clr-teal: #007c80;
  --clr-dark-teal: #1a6272;
  --clr-navy: #2f4858;
  --clr-bg: #f8faf9;
  --clr-card: #ffffff;
  --clr-text: #2f4858;
  --clr-muted: #6c7a89;
  --clr-border: #e2e8f0;
}

body {
  background-color: var(--clr-bg);
  color: var(--clr-text);
  line-height: 1.6;
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
