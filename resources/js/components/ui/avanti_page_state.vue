<script setup>
import { computed } from 'vue'

const props = defineProps({
  loading: { type: Boolean, default: false },
  error: { type: String, default: '' },
  title: { type: String, default: '' },
  text: { type: String, default: '' },
})

const message = computed(() => props.error || props.text)
</script>

<template>
  <div class="avanti-page-state" :class="{ 'avanti-page-state--error': error }" role="status">
    <span v-if="loading" class="avanti-page-state__spinner" aria-hidden="true" />
    <p v-if="loading" class="avanti-page-state__text">Caricamento…</p>
    <template v-else>
      <h1 v-if="title" class="avanti-page-state__title">{{ title }}</h1>
      <p class="avanti-page-state__text">{{ message }}</p>
      <slot />
    </template>
  </div>
</template>

<style scoped>
.avanti-page-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 50vh;
  padding: 40px 16px;
  text-align: center;
}
.avanti-page-state__spinner {
  width: 36px;
  height: 36px;
  border: 3px solid var(--avanti-primary-soft);
  border-top-color: var(--avanti-primary);
  border-radius: 50%;
  animation: avanti-spin 0.8s linear infinite;
}
.avanti-page-state__title {
  color: var(--avanti-text-strong);
  font-size: 24px;
  font-weight: 600;
}
.avanti-page-state__text {
  color: var(--avanti-muted);
  font-size: 14px;
}
.avanti-page-state--error .avanti-page-state__text {
  color: var(--avanti-danger);
}

@keyframes avanti-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
