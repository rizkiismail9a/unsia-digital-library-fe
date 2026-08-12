<script setup>
import { Form } from "vee-validate";
import InputText from "~/components/Form/InputText.vue";

const auth = useAuth();
const route = useRoute();
const router = useRouter();

definePageMeta({
  middleware: ["guest"],
  auth: {
    unauthenticatedOnly: true,
  },
});

const email = ref("");
const password = ref("");
const validatorMessage = ref("");
const inputPassType = ref("password");
const isAuthError = ref(false);
const loading = ref(false);

const loginWithPassword = async () => {
  try {
    loading.value = true;

    const res = await auth.signIn("credentials", {
      email: email.value,
      password: password.value,
      redirect: false,
    });

    if (res?.error) {
      // Error dikembalikan ke sini, bukan redirect ke /api/auth/error
      isAuthError.value = true;
      validatorMessage.value = "Email atau kata sandi tidak sesuai!";
      return;
    } else {
      if (route.query.callbackUrl) {
        router.push(route.query.callbackUrl);

        return;
      }
      router.push("/profil");
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const onUpdateValue = () => {
  validatorMessage.value = "";
  isAuthError.value = false;
};
</script>

<template>
  <div id="login-page">
    <div class="auth-container card">
      <h1 style="margin-bottom: 1.5rem; text-align: center">Masuk ke Akun</h1>
      <Form
        v-slot="{ errors, meta }"
        class="login-form"
        @submit="loginWithPassword"
      >
        <InputText
          v-model="email"
          mandatory
          placeholder="Email"
          name="Email"
          rules="email"
          :input-error="isAuthError"
          :validator-message="validatorMessage"
          :errors="errors"
          @update:model-value="onUpdateValue"
        />
        <InputText
          v-model="password"
          v-model:type="inputPassType"
          :input-error="isAuthError"
          :validator-message="validatorMessage"
          mandatory
          password
          placeholder="Masukkan kata sandi"
          name="Kata sandi"
          :errors="errors"
          @update:model-value="onUpdateValue"
        />

        <ButtonPrimary label="Masuk" :disabled="!meta.valid || isAuthError" />
      </Form>
      <p
        style="
          text-align: center;
          margin-top: 1rem;
          font-size: 0.85rem;
          color: var(--clr-muted);
        "
      >
        Belum punya akun?
        <NuxtLink
          to="/registrasi"
          style="color: var(--clr-teal); cursor: pointer"
        >
          Daftar Sekarang
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#login-page {
  max-width: 1100px;
  margin: 2rem auto;
  padding: 0 1.5rem;

  .auth-container {
    max-width: 400px;
    margin: 3rem auto;

    display: flex;
    flex-direction: column;
    gap: 12px;

    form {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
  }
}
</style>
