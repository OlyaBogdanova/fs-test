<template>
  <label class="checkbox-container">
    <input
      type="checkbox"
      v-model="model"
      :disabled="disabled"
      @change="handleChange"
      class="checkbox-input"
    />
  </label>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  }
);

const model = defineModel<boolean>({
  default: false,
});

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  model.value = target.checked;
};
</script>

<style scoped lang="scss">
.checkbox-container {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.checkbox-input {
  margin-right: 8px;
  cursor: pointer;
  width: 20px;
  height: 20px;
}

.checkbox-input:disabled {
  cursor: not-allowed;
}

.checkbox-input:disabled + .checkbox-label {
  cursor: not-allowed;
  opacity: 0.7;
}
</style>
