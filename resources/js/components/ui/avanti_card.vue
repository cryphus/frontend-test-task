<script setup>
import { computed } from 'vue'

const props = defineProps({
  padded: { type: Boolean, default: true },
  shadow: { type: String, default: 'none', validator: (v) => ['none', 'card', 'soft'].includes(v) },
  tag: { type: String, default: 'section' },
})

const classes = computed(() => [`avanti-card--shadow-${props.shadow}`, { 'avanti-card--padded': props.padded }])
</script>

<template>
  <component
    :is="tag"
    class="avanti-card"
    :class="classes"
  >
    <slot />
  </component>
</template>

<style scoped>
.avanti-card {
  display: flex;
  flex-direction: column;
  background: var(--avanti-surface);
  border: 1px solid var(--avanti-border);
  border-radius: var(--avanti-radius-lg);
  overflow: hidden;
}
.avanti-card--padded {
  padding: 24px;
}
.avanti-card--shadow-card {
  box-shadow: var(--avanti-shadow-card);
}
.avanti-card--shadow-soft {
  box-shadow: var(--avanti-shadow-soft);
}

@media (max-width: 767px) {
  .avanti-card--padded {
    padding: 16px;
  }
}
</style>
