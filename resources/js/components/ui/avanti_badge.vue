<script setup>
defineProps({
  variant: {
    type: String,
    default: 'soft',
    validator: (v) => ['soft', 'light', 'count', 'success'].includes(v),
  },
})
</script>

<template>
  <span class="avanti-badge" :class="`avanti-badge--${variant}`">
    <slot />
  </span>
</template>

<style scoped>
.avanti-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--avanti-radius-pill);
  font-weight: 600;
  white-space: nowrap;
}
.avanti-badge--soft {
  padding: 4px 10px;
  background: var(--avanti-primary-soft);
  color: var(--avanti-primary);
  font-size: 12px;
}
.avanti-badge--light {
  padding: 3px 10px;
  background: var(--avanti-surface);
  color: var(--avanti-primary);
  font-size: 11px;
  font-weight: 500;
}
.avanti-badge--success {
  padding: 3px 10px;
  background: var(--avanti-primary);
  color: #fff;
  font-size: 11px;
  font-weight: 500;
}
.avanti-badge--count {
  min-width: 19px;
  height: 16px;
  padding: 2px 5px;
  background: var(--avanti-danger);
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  box-shadow: 0 0 0 2px var(--avanti-surface);
}
</style>
