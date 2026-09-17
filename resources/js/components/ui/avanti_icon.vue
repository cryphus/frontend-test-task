<script setup>
import { computed } from 'vue'
import { avantiIcons } from '../../data/avanti_icons.js'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: String, default: 'md', validator: (v) => ['xs', 'sm', 'md', 'lg'].includes(v) },
  // Толщина в единицах сетки иконки; по умолчанию — визуально как 2 в сетке 24.
  strokeWidth: { type: [Number, String], default: null },
})

const icon = computed(() => {
  const entry = avantiIcons[props.name] ?? []
  return Array.isArray(entry) ? { box: 24, paths: entry } : entry
})
const viewBox = computed(() => `0 0 ${icon.value.box} ${icon.value.box}`)
const stroke = computed(() => props.strokeWidth ?? icon.value.stroke ?? (2 * icon.value.box) / 24)
</script>

<template>
  <svg
    class="avanti-icon"
    :class="`avanti-icon--${size}`"
    :viewBox="viewBox"
    fill="none"
    stroke="currentColor"
    :stroke-width="stroke"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path v-for="path in icon.paths" :key="path" :d="path" />
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
