<template>
  <div class="select-container">
    <select
      :id="id"
      v-model="model"
      @change="handleChange"
      class="select-element"
      :disabled="disabled"
    >
      <option v-if="placeholder" value="" disabled selected>
        {{ placeholder }}
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </option>
      <slot />
    </select>
  </div>
</template>

<script setup lang="ts">
interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface Props {
  options?: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  id?: string;
}

withDefaults(defineProps<Props>(), {
  placeholder: "",
  disabled: false,
  id: "select-" + Math.random().toString(36).substring(2, 9),
});

const model = defineModel<string | number>({ required: true });

const emit = defineEmits<{
  (e: "change", value: string | number): void;
}>();

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit("change", target.value);
};
</script>

<style scoped lang="scss">
.select-element {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid $gray;
  border-radius: 4px;
  font-size: 1rem;
  &:focus {
    border: 1px solid $green;
  }
}

.select-element:disabled {
  background-color: $light;
  cursor: not-allowed;
}
</style>
