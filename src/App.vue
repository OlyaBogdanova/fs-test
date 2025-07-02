<script setup>
import { fields } from "@/configs/login-form-config";
import UFormBuilder from "@/components/form/UFormBuilder.vue";

const onSubmit = () => alert("Отправка формы");
</script>

<template>
  <main>
    <div class="form_title">Регистрация</div>
    <UFormBuilder :fields="fields" :callback="onSubmit" />
  </main>
</template>

<style scoped>
.form_title {
  font-weight: bold;
  font-size: 32px;
}
@media (max-width: 768px) {
  .form_title {
    font-size: 24px;
  }
}
</style>
