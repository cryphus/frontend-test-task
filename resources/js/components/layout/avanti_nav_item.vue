<script setup>
import AvantiIcon from '../ui/avanti_icon.vue'

defineProps({
  to: { type: [String, Object], required: true },
  label: { type: String, required: true },
  icon: { type: String, default: '' },
  variant: { type: String, default: 'tab', validator: (v) => ['tab', 'stacked'].includes(v) },
})
</script>

<template>
  <RouterLink
    :to="to"
    class="avanti-nav-item"
    :class="`avanti-nav-item--${variant}`"
    active-class="avanti-nav-item--active"
  >
    <span v-if="icon" class="avanti-nav-item__icon">
      <AvantiIcon :name="icon" size="sm" :stroke-width="variant === 'tab' ? 2 : 1.25" />
    </span>
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

.avanti-nav-item__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.avanti-nav-item--tab {
  flex: 1 1 0;
  min-width: 0;
  height: 38px;
  padding: 10px 12px;
  border: 1px solid var(--avanti-primary-soft);
  background: var(--avanti-page);
  color: var(--avanti-text);
  font-size: 14px;
  line-height: 17px;
}
.avanti-nav-item--tab .avanti-nav-item__icon {
  width: 18px;
  height: 18px;
  color: var(--avanti-muted);
}
.avanti-nav-item--tab:hover {
  background: var(--avanti-primary-soft);
}
.avanti-nav-item--tab.avanti-nav-item--active {
  background: var(--avanti-primary-soft);
  color: var(--avanti-primary);
}
.avanti-nav-item--tab.avanti-nav-item--active .avanti-nav-item__icon {
  color: var(--avanti-primary);
}

.avanti-nav-item--stacked {
  flex-direction: column;
  gap: 4px;
  padding: 0 2px;
  color: var(--avanti-text);
  font-size: 14px;
}
.avanti-nav-item--stacked :deep(.avanti-icon) {
  width: 20px;
  height: 20px;
}
.avanti-nav-item--stacked.avanti-nav-item--active {
  color: var(--avanti-primary);
  font-weight: 600;
}

</style>
