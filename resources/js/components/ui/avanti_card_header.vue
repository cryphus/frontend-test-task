<script setup>
import AvantiIcon from './avanti_icon.vue'

defineProps({
  title: { type: String, required: true },
  icon: { type: String, default: '' },
  level: { type: String, default: 'h2' },
})
</script>

<template>
  <div class="avanti-card-header">
    <span v-if="icon" class="avanti-card-header__icon">
      <AvantiIcon :name="icon" size="sm" />
    </span>
    <component :is="level" class="avanti-card-header__title">{{ title }}</component>
    <div v-if="$slots.default" class="avanti-card-header__actions">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.avanti-card-header {
  display: flex;
  align-items: center;
  gap: 10px;
}
.avanti-card-header__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: var(--avanti-radius-sm);
  background: var(--avanti-primary-soft);
  color: var(--avanti-primary);
}
.avanti-card-header__title {
  color: var(--avanti-text-strong);
  font-size: 15px;
  font-weight: 600;
}
.avanti-card-header__actions {
  display: flex;
  gap: 8px;
  margin-left: auto;
}

@media (max-width: 767px) {
  .avanti-card-header__title {
    font-size: 16px;
  }
}
</style>
