<script setup>
import { computed } from 'vue'
import { avantiIcons } from '../../data/avanti_icons.js'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: String, default: 'md', validator: (v) => ['xs', 'sm', 'md', 'lg'].includes(v) },
  strokeWidth: { type: [Number, String], default: 2 },
})

const paths = computed(() => avantiIcons[props.name] ?? [])
</script>

<template>
  <svg
    class="avanti-icon"
    :class="`avanti-icon--${size}`"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path v-for="path in paths" :key="path" :d="path" />
  </svg>
</template>

<style scoped>
.avanti-icon {
  flex-shrink: 0;
}
.avanti-icon--xs {
  width: 12px;
  height: 12px;
}
.avanti-icon--sm {
  width: 16px;
  height: 16px;
}
.avanti-icon--md {
  width: 20px;
  height: 20px;
}
.avanti-icon--lg {
  width: 24px;
  height: 24px;
}
</style>
