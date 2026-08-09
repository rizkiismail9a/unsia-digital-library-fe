<script setup>
defineEmits(["onButtonClick", "onSecondButtonClick"]);

const props = defineProps({
  img: { type: String, default: "" },
  message: { type: String, default: "" },
  subMessage: { type: String, default: null },
  useButton: {
    type: Boolean,
    default: false,
  },
  buttonLabel: {
    type: String,
    default: "",
  },
  secondButtonLabel: {
    type: String,
    default: "",
  },
  imageWidth: {
    type: Number,
    default: 200,
  },
  imageHeight: { type: Number, default: 200 },
  buttonActionWidth: { type: String, default: "unset" },
});
</script>

<template>
  <div class="lh-info-state">
    <img
      :src="img"
      alt="empty data"
      :width="imageWidth"
      :height="imageHeight"
    />
    <div class="description">
      <div class="message">
        {{ message }}
      </div>
      <div class="sub-message" v-if="subMessage">
        {{ subMessage }}
      </div>
    </div>
    <div
      v-if="useButton"
      class="action-button"
      :style="{
        width: buttonActionWidth,
      }"
    >
      <ButtonPrimary
        v-if="useButton"
        :label="buttonLabel"
        :disabled="firstButtonDisabled"
        @click="$emit('onButtonClick')"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lh-info-state {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;

  img {
    object-fit: contain;
  }

  .description {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;

    .message {
      color: #121212;
      text-align: center;
      font-size: 18px;
      font-style: normal;
      font-weight: 580;
      line-height: 26px; /* 144.444% */
      letter-spacing: 0.02px;
    }

    .sub-message {
      color: #6b7280;
      text-align: center;
      font-size: 12px;
      font-style: normal;
      font-weight: 424;
      line-height: 20px; /* 166.667% */
      letter-spacing: 0.03px;
    }
  }

  .action-button {
    padding-top: 8px;
    // width: 180px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }
}
</style>
