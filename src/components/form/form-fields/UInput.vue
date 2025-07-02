<template>
  <div class="input-wrapper">
    <input
      :id="id"
      :type="type"
      v-model="model"
      :placeholder="placeholder"
      :disabled="disabled"
      class="input-field"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from "vue";
defineProps({
  type: {
    type: String as PropType<"text" | "password" | "email" | "number">,
    default: "text",
    validator: (value: string) => {
      return ["text", "password", "email", "number"].includes(value);
    },
  },

  placeholder: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const model = defineModel<string | number>({ required: true });

const id = computed(() => `input-${Math.random().toString(36).slice(2, 11)}`);
</script>

<style scoped lang="scss">
.input-wrapper {
  display: flex;
  flex-direction: column;
}

.input-field {
  padding: 0.5rem;
  border: 1px solid $gray;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  outline: none;
  border-color: $green;
}

.input-field:disabled {
  background-color: $light;
  cursor: not-allowed;
}
</style>
