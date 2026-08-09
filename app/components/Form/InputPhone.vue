<script setup>
import { PhInfo, PhXCircle } from "@phosphor-icons/vue";
import "vue-tel-input/vue-tel-input.css";

const value = defineModel("inputPhone", { default: "" });

const emits = defineEmits(["updateValue", "validate"]);

defineProps({
  name: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  mandatory: {
    type: Boolean,
    default: false,
  },
  /**
   * Validator message bila perlu
   */
  validatorMessage: { type: String, default: "" },

  /**
   * Jika perlu trigger error di luar validator
   */
  inputError: {
    type: Boolean,
    default: false,
  },
});

const isEmpty = ref(false);
const maxNumberExceeded = ref(false);
// Default true, agar saat klik inputan langsung muncul validasi
const warning = ref(true);
const isFocused = ref(false);

const phone = reactive({
  value: "",
  isBlurred: false,
  inputValue: {
    formatted: "+62",
    valid: false,
    country: undefined,
  },
  options: {
    autoFormat: true,
    inputOptions: {
      showDialCode: true,
      showDialCodeInList: true,
    },
    mode: "international",
    validCharactersOnly: true,
    defaultCountry: "ID",
  },
});

const onInput = (event) => {
  const length = event.target._value.replace(/[^0-9]/g, "").length;

  emits("updateValue", event.target._value);

  const empty = length === 0 && this.mandatory;
  const maxReached = length > 15;
  const tooShort = length > 0 && length < 9;

  // Update status validasi utama
  maxNumberExceeded.value = maxReached;
  isEmpty.value = empty;
  warning.value = tooShort;

  // Hitung validitas utama input
  const isValid = !maxNumberExceeded.value && !isEmpty.value && !tooShort;
  phone.inputValue.valid = isValid;

  emits("validate", isValid);
};
</script>

<template>
  <label for="name.trim().replace(/\s/g, '-')">
    <ClientOnly>
      <vue-tel-input
        v-bind="phone.options"
        :id="name.trim().replace(/\s/g, '-')"
        v-model="value"
        :class="[
          'input-wrapper',
          {
            error: (isFocused && !phone.inputValue.valid) || inputError,
            valid: phone.inputValue.valid && !warning,
            warning: isFocused && warning,
            bgWhite: value && value.length,
            bgAlt: !value || (value && value.length === 0),
          },
        ]"
        placeholder="081 xxx-xxxx-xxxx"
        @input="onInput"
        @focus="isFocused = true"
      ></vue-tel-input>
      <!-- Error messages -->
      <div v-if="!phone.inputValue.valid && !warning" class="validator-message">
        <template v-if="maxNumberExceeded">
          <PhXCircle color="red" size="14" weight="fill" />
          <span> Nomor Hp maksimal 15 karakter </span>
        </template>
        <template v-if="isEmpty && mandatory">
          <PhXCircle color="red" size="14" weight="fill" />
          <span> Nomor Hp tidak boleh kosong </span>
        </template>
      </div>
      <!-- Inputan valid, tapi error harus dipicu seperti kasus registrasi -->
      <div
        v-if="phone.inputValue.valid && inputError"
        class="validator-message"
      >
        <PhXCircle color="red" size="14" weight="fill" />
        <span> {{ validatorMessage }} </span>
      </div>
      <!-- Warning message -->
      <div v-if="isFocused && warning" class="validator-message">
        <template v-if="value.length < 9">
          <PhInfo color="orange" size="14" weight="fill" />
          <span class="warning"> Nomor Hp minimal 9 karakter </span>
        </template>
      </div>
    </ClientOnly>
  </label>
</template>

<style scoped lang="scss">
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
}

.input-wrapper {
  border-radius: 12px;
  border: 1px solid #d9d9d9;
  box-shadow: 0px 0px 2px 0px rgba(31, 113, 99, 0.48);
  padding: 14px 0;
  height: 54px;
  display: flex;
  align-items: center;
  position: relative;
  // overflow: hidden; // Ini nanti gak muncul dropdown benderanya

  &.bgWhite {
    background-color: white;
  }

  &.bgAlt {
    background-color: #f9fafb;
  }

  &:deep(input) {
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
    padding-left: 70px;
    background-color: transparent;
  }

  &:deep(.vti__dropdown) {
    background-color: #f9fafb;
    position: absolute;
    height: 52px !important;
    padding: 0 7px;
    border-radius: 6px 0 0 6px;
    border-right: 1px solid #e5e7eb;
  }
}

.input-wrapper:focus-within {
  border-radius: 12px;
  border: 1px solid #005e4e;
  background-color: white;
}

.input-wrapper.valid {
  border: 1px solid #4dae72;
}

.input-wrapper.error {
  border-radius: 12px;
  border-color: #ed4141 !important;
}

.input-wrapper.warning {
  border-color: #ed7607 !important;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;

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
</style>
