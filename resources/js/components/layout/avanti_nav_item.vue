<script setup>
import AvantiIcon from '../ui/avanti_icon.vue'

defineProps({
  to: { type: [String, Object], required: true },
  label: { type: String, required: true },
  icon: { type: String, default: '' },
  variant: { type: String, default: 'tab', validator: (v) => ['tab', 'pill'].includes(v) },
})
</script>

<template>
  <RouterLink
    :to="to"
    class="avanti-nav-item"
    :class="`avanti-nav-item--${variant}`"
    active-class="avanti-nav-item--active"
  >
    <AvantiIcon v-if="icon" :name="icon" size="sm" />
    <span>{{ label }}</span>
  </RouterLink>
</template>

<style scoped>
.avanti-nav-item {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  border-radius: var(--avanti-radius-sm);
  color: var(--avanti-text-strong);
  font-weight: 500;
  white-space: nowrap;
  transition: background-color 0.15s ease, color 0.15s ease;
}
.avanti-nav-item:focus-visible {
  outline: 2px solid var(--avanti-primary);
  outline-offset: 2px;
}

.avanti-nav-item--tab {
  flex: 1 1 0;
  min-width: 0;
  max-width: 210px;
  height: 39px;
  padding: 10px 12px;
  background: var(--avanti-surface-alt);
  font-size: 14px;
}
.avanti-nav-item--tab:hover {
  background: var(--avanti-border);
}
.avanti-nav-item--tab.avanti-nav-item--active {
  background: var(--avanti-primary-soft);
  color: var(--avanti-primary);
}

.avanti-nav-item--pill {
  padding: 5px 10px;
  border: 1px solid var(--avanti-border);
  background: var(--avanti-surface);
  font-size: 13px;
}
.avanti-nav-item--pill.avanti-nav-item--active {
  border-color: var(--avanti-primary-soft);
  background: var(--avanti-primary-soft);
  color: var(--avanti-primary);
}
</style>
