<script setup lang="ts">
import UFormField from "./UFormField.vue";
import { computed, reactive } from "vue";
import { type FormFieldType } from "@/types";
import UButton from "../button/UButton.vue";

interface Props {
  fields: FormFieldType[];
  callback: () => {};
}
const props = defineProps<Props>();

const formData = reactive({});
const errors = reactive({});

const isFormValid = computed(() => Object.values(errors).every((el) => !el));
const submitForm = () => props.callback();
</script>

<template>
  <form @submit.prevent="submitForm" class="form">
    <div class="form-fields_container">
      <UFormField
        v-for="(field, index) in fields"
        :key="index"
        :field="field"
        v-model="formData[field.name]"
        v-model:errors="errors[field.name]"
      />
    </div>
    <UButton type="submit" :disabled="!isFormValid">Регистрация</UButton>
  </form>
</template>

<style lang="scss" scoped>
.form-fields_container,
.form {
  display: flex;
  flex-direction: column;
}

.form {
  gap: 20px;
}
</style>
