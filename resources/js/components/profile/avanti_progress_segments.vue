<script setup>
import { computed } from 'vue'

const props = defineProps({
  total: { type: Number, required: true },
  filled: { type: Number, required: true },
  label: { type: String, default: 'Avanzamento' },
  partial: { type: Boolean, default: false },
})

const segments = computed(() =>
  Array.from({ length: props.total }, (_, index) => ({
    'avanti-progress-segments__item--filled': index < props.filled,
    'avanti-progress-segments__item--partial': props.partial && index === props.filled,
  })),
)
</script>

<template>
  <div
    class="avanti-progress-segments"
    role="progressbar"
    :aria-label="label"
    :aria-valuemin="0"
    :aria-valuemax="total"
    :aria-valuenow="filled"
  >
    <span
      v-for="(segment, index) in segments"
      :key="index"
      class="avanti-progress-segments__item"
      :class="segment"
    />
  </div>
</template>

<style scoped>
.avanti-progress-segments {
  display: flex;
  gap: 4px;
}
.avanti-progress-segments__item {
  flex: 1;
  height: 6px;
  border-radius: var(--avanti-radius-pill);
  background: var(--avanti-border);
  transition: background-color 0.3s ease;
}
.avanti-progress-segments__item--filled {
  background: var(--avanti-primary);
}

@media (max-width: 767px) {
  .avanti-progress-segments__item--partial {
    background: linear-gradient(90deg, var(--avanti-primary), var(--avanti-border));
  }
}
</style>
