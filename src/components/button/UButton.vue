<template>
  <button
    class="base-button"
    :class="{
      'base-button--disabled': disabled,
      [`base-button--${variant}`]: variant,
      [`base-button--${size}`]: size,
    }"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  /**
   * Button variant style
   * @values 'primary', 'secondary', 'text'
   */
  variant: {
    type: String,
    default: "primary",
    validator: (value) => ["primary", "secondary", "text"].includes(value),
  },
  /**
   * Button size
   * @values 'small', 'medium', 'large'
   */
  size: {
    type: String,
    default: "medium",
    validator: (value) => ["small", "medium", "large"].includes(value),
  },
  /**
   * Disabled state
   */
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);

const handleClick = (event) => {
  if (!props.disabled) {
    emit("click", event);
  }
};
</script>

<style scoped lang="scss">
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  padding: 0.5em 1em;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s ease;
}

.base-button--primary {
  background-color: $green;
  color: white;
}

.base-button--primary:hover {
  background-color: $green;
}

.base-button--secondary {
  background-color: $light;
  color: #333;
}

.base-button--secondary:hover {
  background-color:  $light;
}

.base-button--text {
  background-color: transparent;
  color: $green;
  padding: 0;
}

.base-button--text:hover {
  text-decoration: underline;
}

.base-button--small {
  font-size: 0.8rem;
  padding: 0.3em 0.6em;
}

.base-button--medium {
  font-size: 1rem;
}

.base-button--large {
  font-size: 1.2rem;
  padding: 0.6em 1.2em;
}

.base-button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
