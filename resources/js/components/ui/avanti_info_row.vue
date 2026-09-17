<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], default: '' },
  size: { type: String, default: 'md', validator: (v) => ['sm', 'md'].includes(v) },
})
</script>

<template>
  <div class="avanti-info-row" :class="`avanti-info-row--${size}`">
    <dt class="avanti-info-row__label">{{ label }}</dt>
    <dd class="avanti-info-row__value">{{ value || '—' }}</dd>
  </div>
</template>

<style scoped>
.avanti-info-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
}
.avanti-info-row__label {
  color: var(--avanti-muted);
  font-size: 12px;
}
.avanti-info-row__value {
  margin: 0;
  color: var(--avanti-text-strong);
  font-size: 13px;
  font-weight: 600;
  text-align: right;
  overflow-wrap: anywhere;
}

@media (max-width: 767px) {
  .avanti-info-row__label {
    font-size: 13px;
  }
}
</style>
