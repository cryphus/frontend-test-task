<script setup>
defineProps({
  total: { type: Number, required: true },
  filled: { type: Number, required: true },
  label: { type: String, default: 'Avanzamento' },
})
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
      v-for="index in total"
      :key="index"
      class="avanti-progress-segments__item"
      :class="{ 'avanti-progress-segments__item--filled': index <= filled }"
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
</style>
