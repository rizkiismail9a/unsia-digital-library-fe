<script setup>
import { PhEye, PhEyeClosed, PhXCircle } from "@phosphor-icons/vue";
import { ErrorMessage, Field, useField } from "vee-validate";

const inputType = defineModel("type", {
  type: String,
  default: "text",
});

const emit = defineEmits([
  "update:modelValue",
  "useAi",
  "update:type",
  "change",
  "blur",
]);

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  rules: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  useAi: {
    type: Boolean,
    default: false,
  },

  /**
   * Validator message bila perlu
   */
  validatorMessage: { type: String, default: "" },

  /**
   * Untuk kebutuhan validasi warning
   * Warning tetap lolos dari validasi
   */
  warningMessage: { type: String, default: "" },
  mandatory: {
    type: Boolean,
    default: false,
  },
  /**
   * Custom input error, jika perlu diset jadi error, walaupun vee-validate gak deteksi error
   */

  inputError: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  showWarning: {
    type: Boolean,
    default: false,
  },
  password: {
    type: Boolean,
    default: false,
  },
  /**
   * error object dari komponen Form punya vee-validate
   */
  errors: {
    type: Object,
    default: null,
  },
});

const { value } = useField(props.name);

const showPassword = ref(false);

const onInput = (event) => {
  emit("update:modelValue", event.target.value);
};

const onUpdatePasswordVisibility = () => {
  showPassword.value = !showPassword.value;

  if (!showPassword.value) {
    inputType.value = "password";
  } else {
    inputType.value = "text";
  }
};
</script>

<template>
  <label :for="name.trim().replace(/\s/g, '-')">
    <div class="header">
      <div class="label-text" v-if="label.length">
        <span>{{ label }}</span> <sup v-if="mandatory">*</sup>
      </div>
    </div>

    <!-- Inputan -->
    <div
      :class="[
        'input-wrapper',
        {
          warning: showWarning && !disabled,
          disabled: disabled,
          error: (errors[name] || inputError) && mandatory && !disabled,
          valid: !errors[name] && value && mandatory && !disabled,
          bgWhite: !value,
          bgAlt: !value,
        },
      ]"
    >
      <div v-if="$slots['left-attribute']" class="left-attribute">
        <slot name="left-attribute"> </slot>
      </div>
      <Field
        :id="name.trim().replace(/\s/g, '-')"
        :name="name"
        :type="inputType"
        :placeholder="placeholder"
        :rules="mandatory ? `required:${name}|${rules}` : rules"
        :model-value="modelValue"
        validate-on-input
        autocomplete="off"
        @input="onInput"
        @keyup="$emit('change')"
        @blur="$emit('blur')"
        @update:model-value="(value) => $emit('update:modelValue', value)"
      />

      <div v-if="$slots['right-attribute']" class="right-attribute">
        <slot name="right-attribute"></slot>
      </div>

      <div v-if="password" class="password">
        <PhEye
          v-if="!showPassword"
          @click="onUpdatePasswordVisibility"
          color="#1F2937"
          size="20"
        />
        <PhEyeClosed
          v-else
          @click="onUpdatePasswordVisibility"
          color="#1F2937"
          size="20"
        />
      </div>
    </div>

    <!-- Error message -->

    <div v-if="inputError" class="validator-message">
      <PhXCircle color="red" size="14" weight="fill" />
      <span>
        {{ validatorMessage }}
      </span>
    </div>

    <ErrorMessage v-else-if="errors[name]" v-slot="{ message }" :name="name">
      <div v-if="errors[name] && mandatory" class="validator-message">
        <PhXCircle color="red" size="14" weight="fill" />
        <span>
          {{ message }}
        </span>
      </div>
    </ErrorMessage>
  </label>
</template>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

::placeholder {
  color: #6b7280;
  font-size: 16px;
  font-style: normal;
  font-weight: 424;
  line-height: 26px; /* 162.5% */
  letter-spacing: 0.02px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  box-sizing: border-box;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;

    .label-text {
      display: flex;
      gap: 3px;

      span {
        color: #121212;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px; /* 128.571% */
        letter-spacing: 0.3px;
      }

      sup {
        color: #ed4141;
      }
    }
  }

  .input-wrapper {
    border-radius: 12px;
    border: 1px solid #d9d9d9;
    box-shadow: 0px 0px 2px 0px rgba(31, 113, 99, 0.48);
    height: 54px;
    display: flex;
    align-items: center;
    overflow: hidden;

    &.bgWhite {
      background-color: white;
    }

    &.bgAlt {
      background-color: #f9fafb;
    }

    input {
      margin: 0 14px;
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      color: #1f2937;
      font-size: 16px;
      font-style: normal;
      font-weight: 424;
      line-height: 26px;
      letter-spacing: 0.02px;
      background-color: transparent;
    }

    .right-attribute {
      color: #121212;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 18px; /* 128.571% */
      letter-spacing: 0.3px;
      height: 100%;
      display: flex;
      padding: 12px;
      justify-content: center;
      align-items: center;
      gap: 2px;
      background: #f3f4f6;
      border-left: 1px solid #e5e7eb;
    }

    .password {
      color: #121212;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 18px; /* 128.571% */
      letter-spacing: 0.3px;
      height: 100%;
      display: flex;
      padding: 12px;
      justify-content: center;
      align-items: center;
      gap: 2px;
    }

    .left-attribute {
      color: #121212;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 18px; /* 128.571% */
      letter-spacing: 0.3px;
      height: 100%;
      display: flex;
      padding: 12px;
      justify-content: center;
      align-items: center;
      gap: 2px;
      background: #f3f4f6;
      border-right: 1px solid #e5e7eb;
    }

    &.disabled {
      background-color: #f3f4f6 !important;
      border-color: #e5e7eb !important;

      input {
        color: #9ca3af !important;
      }
    }

    &.valid {
      border: 1px solid #4dae72;
    }

    &.error {
      border-radius: 12px;
      border: 1px solid #ed4141 !important;
    }
  }

  .validator-message {
    display: flex;
    align-items: center;
    padding: 2px 0;
    justify-content: flex-start;
    gap: 4px;

    span {
      color: #ed4141;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 18px; /* 150% */
      letter-spacing: 0.3px;
      text-align: left;
    }

    span.warning {
      color: #ed7607;
    }

    img {
      height: 15px;
      width: 15px;
    }
  }
}
</style>
