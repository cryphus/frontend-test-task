<script setup>
import AvantiIcon from '../ui/avanti_icon.vue'
import AvantiBadge from '../ui/avanti_badge.vue'

defineProps({
  href: { type: String, required: true },
  label: { type: String, default: 'Assistenza' },
  count: { type: Number, default: 0 },
  compact: { type: Boolean, default: false },
})
</script>

<template>
  <a class="avanti-support-button" :class="{ 'avanti-support-button--compact': compact }" :href="href">
    <AvantiIcon name="chat" :size="compact ? 'sm' : 'md'" />
    <span class="avanti-support-button__label">{{ label }}</span>
    <AvantiBadge v-if="count && !compact" class="avanti-support-button__badge" variant="count">
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

.avanti-support-button--compact {
  gap: 8px;
  height: 32px;
  padding: 6px 12px;
}
.avanti-support-button--compact .avanti-support-button__label {
  font-size: 13px;
}
</style>
