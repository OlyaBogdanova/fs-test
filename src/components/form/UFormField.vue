<script setup lang="ts">
import { FormFieldType, InputField, SelectField } from "@/types";
import { FieldTypesEnum } from "@/types/enums";
import { computed, watchEffect } from "vue";
import { morph } from "@/utils/morth";
import UInput from "./form-fields/UInput.vue";
import USelect from "./form-fields/USelect.vue";
import UCheckbox from "./form-fields/UCheckbox.vue";

const props = defineProps<{
  field: FormFieldType;
}>();

const modelValue = defineModel<string | number>();

const errorsModelValue = defineModel("errors");

const inputType = computed(() =>
  props.field.type === FieldTypesEnum.U_INPUT ? props.field.inputType : "text"
);

const errorMessage = computed(() => {
  const minLength = props.field.validation.minLength;
  const maxLength = props.field.validation.maxLength;
  if (props.field.validation?.required && !modelValue.value) {
    return "Это поле обязательное";
  }
  if (props.field.type === FieldTypesEnum.U_INPUT) {
    if (props.field.validation?.pattern?.value && typeof modelValue.value === "string") {
      return !props.field.validation.pattern.value.test(modelValue.value)
        ? props.field.validation.pattern.errorMessage
        : "";
    }
    if (minLength && modelValue.value.toString().length < minLength) {
      return `Минимальная длина ${minLength} ${morph(minLength)}`;
    }
    if (maxLength && modelValue.value.toString().length > maxLength) {
      return `Максимальная длина ${maxLength} ${morph(maxLength)}`;
    }
  }

  return "";
});

const component = computed(() => {
  switch (props.field.type) {
    case FieldTypesEnum.U_INPUT:
      return UInput;
    case FieldTypesEnum.U_SELECT:
      return USelect;
    case FieldTypesEnum.U_CHECKBOX:
      return UCheckbox;
  }
});

const direction = computed(() =>
  props.field.type === FieldTypesEnum.U_CHECKBOX ? "row" : "column"
);

watchEffect(() => {
  errorsModelValue.value = errorMessage.value;
});
</script>

<template>
  <div class="form-field" :class="{ pt5: field.type === FieldTypesEnum.U_CHECKBOX }">
    <div class="form-field_container">
      <label v-if="field.label && field.type !== FieldTypesEnum.U_CHECKBOX"
        >{{ field.label }}<span v-if="field.validation.required">*</span></label
      >

      <component
        :is="component"
        :type="inputType"
        v-model="modelValue"
        :required="field.validation?.required"
        :placeholder="(field as InputField).placeholder"
        class="form-control"
      >
        <template v-if="field.type === FieldTypesEnum.U_SELECT">
          <option
            v-for="option in (field as SelectField).options"
            :key="option.id"
            :value="option.id"
          >
            {{ option.name }}
          </option>
        </template>
      </component>
      <label v-if="field.label && field.type === FieldTypesEnum.U_CHECKBOX">{{
        field.label
      }}</label>
    </div>
    <div class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.form-field {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  position: relative;
  &.pt5 {
    padding-top: 5px;
  }
}
.form-field_container {
  display: flex;
  flex-direction: v-bind(direction);
}
.error-message {
  position: absolute;
  font-size: 0.8rem;
  bottom: -20px;
  color: $red;
}
</style>
