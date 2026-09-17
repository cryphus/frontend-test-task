<script setup>
import AvantiIcon from '../ui/avanti_icon.vue'
import AvantiBadge from '../ui/avanti_badge.vue'

defineProps({
  count: { type: Number, default: 0 },
  href: { type: String, default: '#notifiche' },
})
</script>

<template>
  <a class="avanti-notification-button" :href="href" :aria-label="`Notifiche: ${count}`">
    <AvantiIcon name="bell" size="lg" />
    <AvantiBadge v-if="count" class="avanti-notification-button__badge" variant="count">{{ count }}</AvantiBadge>
  </a>
</template>

<style scoped>
.avanti-notification-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 6px;
  color: var(--avanti-primary);
  transition: background-color 0.15s ease;
}
.avanti-notification-button:hover {
  background: var(--avanti-primary-soft);
}
.avanti-notification-button:focus-visible {
  outline: 2px solid var(--avanti-primary);
  outline-offset: 2px;
}
.avanti-notification-button__badge {
  position: absolute;
  top: 3px;
  right: 2px;
  min-width: 14px;
  height: 14px;
  padding: 0 3px;
  font-size: 9px;
  box-shadow: none;
}
</style>
