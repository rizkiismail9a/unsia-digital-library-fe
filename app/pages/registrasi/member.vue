<script setup>
import { Form } from "vee-validate";
import InputText from "~/components/Form/InputText.vue";

const router = useRouter();
const { showToast } = useToast();

definePageMeta({
  middleware: "sidebase-auth",
});

const nim = ref("");
const prodi = ref("");
const validatorMessage = ref("");
const isInputError = ref(false);
const phone = ref("");
const loading = ref(false);
const showSuccessModal = ref(false);
const isPhoneValid = ref(false);

const onUpdateValue = () => {
  validatorMessage.value = "";
  isInputError.value = false;
};

const createMembership = async () => {
  try {
    loading.value = true;

    const data = await useBaseAPI("/api/member/create", {
      method: "POST",
      body: {
        nim: nim.value,
        phone: phone.value.replace(/[^0-9]/, ""),
        prodi: prodi.value,
      },
    });

    if (data.success) {
      showSuccessModal.value = true;
    }
  } catch (error) {
    isInputError.value = true;
    validatorMessage.value = "NIM, Email, atau No. Hp tidak valid";
    if (error.response.errors) {
      showToast(error.response?.errors[0]?.message, "error");
    }
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div id="member-registration-page">
    <div class="auth-container card">
      <h1 style="margin-bottom: 1.5rem; text-align: center">
        Daftar Keanggotaan
      </h1>
      <p style="text-align: center; color: var(--clr-text)">
        Ayo, daftarkan diri menjadi anggota untuk meminjam koleksi buku dari
        HappyLibrary!
      </p>
      <Form
        v-slot="{ errors, meta }"
        class="login-form"
        @submit="createMembership"
      >
        <InputText
          v-model="nim"
          mandatory
          placeholder="Nomor Induk Mahasiswa"
          rules="number"
          name="NIM"
          :input-error="isInputError"
          :validator-message="validatorMessage"
          :errors="errors"
          @update:model-value="onUpdateValue"
        />
        <InputPhone
          v-model:input-phone="phone"
          mandatory
          :input-error="isInputError"
          :validator-message="validatorMessage"
          name="Nomor hp"
          @validate="isPhoneValid = $event"
          @update-value="onUpdateValue"
        />
        <InputText
          v-model="prodi"
          :input-error="isInputError"
          :validator-message="validatorMessage"
          mandatory
          placeholder="Masukkan Prodi"
          name="Prodi"
          :errors="errors"
          @update:model-value="onUpdateValue"
        />

        <ButtonPrimary label="Daftar" :disabled="!meta.valid || isInputError" />
      </Form>
    </div>

    <LazyPopupModal v-model:open="showSuccessModal">
      <template #content>
        <div class="sucess-borrowing">
          <img src="/illustration/kartun-melambai.svg" alt="sukses" />
          <div class="message">
            <p>Hore! Keanggotaanmu Sudah Tercatat!</p>
          </div>
          <ButtonPrimary
            label="Mulai Pinjam Buku"
            @click="router.push('/katalog-buku')"
          />
        </div>
      </template>
    </LazyPopupModal>

    <LazyLoading v-if="loading" />
  </div>
</template>

<style lang="scss" scoped>
#member-registration-page {
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
