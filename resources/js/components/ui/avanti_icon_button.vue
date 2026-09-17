<script setup>
import AvantiIcon from './avanti_icon.vue'

defineProps({
  icon: { type: String, required: true },
  label: { type: String, required: true },
  variant: {
    type: String,
    default: 'plain',
    validator: (v) => ['plain', 'outline', 'filled', 'muted'].includes(v),
  },
  size: { type: String, default: 'md', validator: (v) => ['sm', 'md', 'lg'].includes(v) },
  iconSize: { type: String, default: 'sm' },
})
</script>

<template>
  <button
    class="avanti-icon-button"
    :class="[`avanti-icon-button--${variant}`, `avanti-icon-button--${size}`]"
    type="button"
    :aria-label="label"
    :title="label"
  >
    <AvantiIcon :name="icon" :size="iconSize" />
  </button>
</template>

<style scoped>
.avanti-icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 0;
  border: 1px solid transparent;
  border-radius: 50%;
  background: transparent;
  color: var(--avanti-primary);
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}
.avanti-icon-button:focus-visible {
  outline: 2px solid var(--avanti-primary);
  outline-offset: 2px;
}
.avanti-icon-button--sm {
  width: 24px;
  height: 24px;
}
.avanti-icon-button--md {
  width: 32px;
  height: 32px;
}
.avanti-icon-button--lg {
  width: 40px;
  height: 40px;
}
.avanti-icon-button--plain:hover {
  background: var(--avanti-primary-soft);
}
.avanti-icon-button--outline {
  border-color: var(--avanti-border);
  border-radius: var(--avanti-radius-sm);
  background: var(--avanti-surface-alt);
  color: var(--avanti-text-strong);
}
.avanti-icon-button--outline:hover {
  background: var(--avanti-border);
}
.avanti-icon-button--filled {
  background: var(--avanti-primary);
  color: #fff;
}
.avanti-icon-button--filled:hover {
  background: var(--avanti-primary-dark);
}
.avanti-icon-button--muted {
  background: var(--avanti-surface-alt);
  color: var(--avanti-muted);
}
</style>
