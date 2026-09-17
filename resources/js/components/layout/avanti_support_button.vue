<script setup>
import AvantiIcon from '../ui/avanti_icon.vue'
import AvantiBadge from '../ui/avanti_badge.vue'

defineProps({
  href: { type: String, required: true },
  label: { type: String, default: 'Assistenza' },
  count: { type: Number, default: 0 },
  stacked: { type: Boolean, default: false },
})
</script>

<template>
  <a
    class="avanti-support-button"
    :class="{ 'avanti-support-button--stacked': stacked }"
    :href="href"
  >
    <AvantiIcon name="chat" :size="stacked ? 'sm' : 'md'" />
    <span class="avanti-support-button__label">{{ label }}</span>
    <AvantiBadge v-if="count && !stacked" class="avanti-support-button__badge" variant="count">
      {{ count }}
    </AvantiBadge>
  </a>
</template>

<style scoped>
.avanti-support-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  height: 39px;
  padding: 10px 12px;
  border-radius: var(--avanti-radius-sm);
  background: var(--avanti-primary);
  color: #fff;
  transition: background-color 0.15s ease;
}
.avanti-support-button:hover {
  background: var(--avanti-primary-dark);
}
.avanti-support-button:focus-visible {
  outline: 2px solid var(--avanti-primary);
  outline-offset: 2px;
}
.avanti-support-button__label {
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}
.avanti-support-button__badge {
  position: absolute;
  top: -8px;
  right: -8px;
}

.avanti-support-button--stacked {
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  width: 108px;
  height: 43px;
  padding: 4px 8px;
}
.avanti-support-button--stacked .avanti-support-button__label {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0;
}
</style>
