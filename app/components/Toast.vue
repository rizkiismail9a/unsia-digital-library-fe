<script setup>
import { PhCheckCircle, PhInfo, PhWarning } from "@phosphor-icons/vue";
const { toast } = useToast();

const iconMap = {
  success: PhCheckCircle,
  error: PhWarning,
  info: PhInfo,
};

const colorMap = computed(() => {
  return {
    success: {
      bg: "#f7fee7",
      text: "#65A30D",
    },
    error: {
      bg: "#fef2f2",
      text: "#EF4444",
    },
    info: {
      bg: "#EFF6FF",
      text: "#3B82F6",
    },
  };
});
</script>

<template>
  <Transition name="toast-slide">
    <div
      v-if="toast.show"
      id="lh-toast"
      :style="{ background: colorMap[toast.type].bg }"
    >
      <component
        :is="iconMap[toast.type]"
        weight="fill"
        :color="colorMap[toast.type].text"
        size="20"
      />
      <span :style="{ color: colorMap[toast.type].text }">
        {{ toast.message }}
      </span>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
#lh-toast {
  position: fixed;
  z-index: 1000;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  border-radius: 999px;

  span {
    font-size: 13px;
    font-style: normal;
    font-weight: 580;
    line-height: 20px; /* 153.846% */
    letter-spacing: 0.03px;
  }
}

// Animasi
.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.3s ease;
}

.toast-slide-enter-from {
  opacity: 0;
  transform: translate(-50%, -30px);
}

.toast-slide-leave-to {
  opacity: 0;
  transform: translate(-50%, -30px);
}
</style>
