import { defineRule } from "vee-validate";

export default defineNuxtPlugin((nuxtApp) => {
  defineRule("required", (value, [field]) => {
    if (!value || !value.length) {
      return field + " tidak boleh kosong!";
    }
    return true;
  });

  defineRule("number", (value) => {
    if (/[^0-9]/g.test(value.replace(/[.]/g, ""))) {
      return "Hanya boleh memasukkan angka";
    }

    return true;
  });

  defineRule("email", (value) => {
    // Field is empty, should pass
    if (!value || !value.length) {
      return true;
    }

    // Check if email
    if (!/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/.test(value)) {
      return "Format email tidak sesuai";
    }

    return true;
  });

  defineRule("min", (value, [field, limit]) => {
    if (!value || !value.length) {
      return true;
    }

    if (value.length < limit) {
      return `Warning: ${field} minimal ${limit} karakter`;
    }

    return true;
  });

  defineRule("username", (value) => {
    const regex = /^[a-zA-Z0-9_]+$/g;

    if (!regex.test(value)) {
      return "Karakter username tidak valid";
    }

    return true;
  });
});
