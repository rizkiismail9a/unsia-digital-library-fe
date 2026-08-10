<script setup>
import { Form } from "vee-validate";
import InputText from "~/components/Form/InputText.vue";

const router = useRouter();
const auth = useAuth();
const route = useRoute();
const { showToast } = useToast();

definePageMeta({
  middleware: ["guest"],
  auth: {
    unauthenticatedOnly: true,
  },
});

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const inputPassType = ref("password");
const inputConfirmPassType = ref("password");
const errorMessage = ref("");
const loading = ref(false);
const showSuccessModal = ref(false);

const registrationNewAccount = async () => {
  try {
    loading.value = true;

    const data = await useBaseAPI("/api/auth/register", {
      method: "POST",
      body: {
        name: name.value,
        email: email.value,
        password: password.value,
        confirm_password: confirmPassword.value,
      },
    });

    if (data.success) {
      showSuccessModal.value = true;
    }
  } catch (error) {
    if (error.response._data) {
      errorMessage.value = error.response._data?.errors[0]?.message;
    }

    console.error(error);
  } finally {
    loading.value = false;
  }
};

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
      validatorMessage.value = "Email atau kata sandi tidak sesuai!";
      return;
    } else {
      if (route.query.callbackUrl) {
        router.push(route.query.callbackUrl);
      }
      router.push("/profil");
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div id="account-registration-page">
    <div class="auth-container card">
      <h1 style="margin-bottom: 1.5rem; text-align: center">Registrasi Akun</h1>
      <p style="text-align: center; color: var(--clr-text)">
        Dengan mendaftar akun, kamu dapat mememiliki akses untuk meminjam
        koleksi buku HappyLibrary!
      </p>
      <div v-if="errorMessage.length" class="input-error">
        {{ errorMessage }}
      </div>
      <Form v-slot="{ errors, meta }" @submit="registrationNewAccount">
        <InputText
          v-model="name"
          mandatory
          placeholder="Masukkan nama lengkap"
          name="Nama"
          :errors="errors"
        />
        <InputText
          v-model="email"
          rules="email"
          mandatory
          placeholder="Masukkan email"
          name="Email"
          :errors="errors"
        />
        <InputText
          v-model="password"
          v-model:type="inputPassType"
          mandatory
          password
          placeholder="Masukkan kata sandi"
          name="Kata sandi"
          :errors="errors"
        />
        <InputText
          v-model="confirmPassword"
          v-model:type="inputConfirmPassType"
          mandatory
          password
          placeholder="Masukkan ulang kata sandi"
          name="Konfirmasi sandi"
          :errors="errors"
        />

        <ButtonPrimary label="Daftar" :disabled="!meta.valid || isInputError" />
      </Form>
    </div>

    <LazyPopupModal v-model:open="showSuccessModal">
      <template #content>
        <div class="sucess-borrowing">
          <img src="/illustration/kartun-melambai.svg" alt="sukses" />
          <div class="message">
            <p>Hore! Akun kamu berhasil dibuat!</p>
          </div>
          <ButtonPrimary label="Mulai Pinjam Buku" @click="loginWithPassword" />
        </div>
      </template>
    </LazyPopupModal>

    <LazyLoading v-if="loading" />
  </div>
</template>

<style lang="scss" scoped>
#account-registration-page {
  max-width: 1100px;
  margin: 2rem auto;
  padding: 0 1.5rem;

  .auth-container {
    max-width: 400px;
    margin: 3rem auto;

    display: flex;
    flex-direction: column;
    gap: 12px;

    .input-error {
      padding: 12px;
      background-color: #fef2f2;
      color: #ef4444;
      border-radius: 12px;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
  }

  .sucess-borrowing {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;

    img {
      width: 200px;
      height: 200px;
    }

    .message {
      display: flex;
      flex-direction: column;
      align-items: center;

      p {
        font-weight: 580;
        font-size: 24px;
      }
    }
  }
}
</style>
