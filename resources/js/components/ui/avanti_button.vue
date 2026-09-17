<script setup>
import { RouterLink } from 'vue-router'
import AvantiIcon from './avanti_icon.vue'

defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'outline', 'neutral', 'soft', 'ghost'].includes(v),
  },
  size: { type: String, default: 'md', validator: (v) => ['sm', 'md', 'lg'].includes(v) },
  type: { type: String, default: 'button' },
  icon: { type: String, default: '' },
  block: { type: Boolean, default: false },
  uppercase: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  to: { type: [String, Object], default: null },
})
</script>

<template>
  <component
    :is="to ? RouterLink : 'button'"
    class="avanti-button"
    :class="[
      `avanti-button--${variant}`,
      `avanti-button--${size}`,
      { 'avanti-button--block': block, 'avanti-button--upper': uppercase, 'avanti-button--loading': loading },
    ]"
    :to="to ?? undefined"
    :type="to ? undefined : type"
    :disabled="to ? undefined : disabled || loading"
  >
    <AvantiIcon v-if="icon" :name="icon" size="md" />
    <span class="avanti-button__label"><slot /></span>
    <slot name="append" />
  </component>
</template>

<style scoped>
.avanti-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border: 1px solid transparent;
  border-radius: var(--avanti-radius-sm);
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease,
    opacity 0.15s ease;
}
.avanti-button:focus-visible {
  outline: 2px solid var(--avanti-primary);
  outline-offset: 2px;
}
.avanti-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
.avanti-button--loading {
  cursor: progress;
}

.avanti-button--sm {
  min-height: 36px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
}
.avanti-button--md {
  min-height: 37px;
  padding: 10px 22px;
  font-size: 14px;
}
.avanti-button--lg {
  min-height: 50px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 400;
}

.avanti-button--primary {
  background: var(--avanti-primary);
  color: #fff;
}
.avanti-button--primary:hover:not(:disabled) {
  background: var(--avanti-primary-dark);
}
.avanti-button--outline {
  background: var(--avanti-surface);
  border-color: var(--avanti-primary);
  color: var(--avanti-primary);
}
.avanti-button--outline:hover:not(:disabled) {
  background: var(--avanti-primary-soft);
}
.avanti-button--neutral {
  background: var(--avanti-surface);
  border-color: var(--avanti-primary-dark);
  color: var(--avanti-text-strong);
}
.avanti-button--neutral:hover:not(:disabled) {
  background: var(--avanti-primary-soft);
}
.avanti-button--soft {
  background: var(--avanti-surface-alt);
  color: var(--avanti-text-strong);
}
.avanti-button--soft:hover:not(:disabled) {
  background: var(--avanti-border);
}
.avanti-button--ghost {
  background: transparent;
  color: var(--avanti-primary);
  padding: 0;
  min-height: 0;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.avanti-button--block {
  display: flex;
  width: 100%;
}
.avanti-button--upper {
  text-transform: uppercase;
  letter-spacing: 0.01em;
}

@media (max-width: 767px) {
  .avanti-button--lg {
    min-height: 44px;
    font-weight: 600;
  }
}
</style>
