<script setup>
import { computed } from 'vue'
import AvantiIcon from '../ui/avanti_icon.vue'
import AvantiStepMarker from './avanti_step_marker.vue'

const props = defineProps({
  title: { type: String, required: true },
  icon: { type: String, required: true },
  status: { type: String, required: true, validator: (v) => ['done', 'current', 'pending'].includes(v) },
})

defineEmits(['open'])

const subtitles = {
  done: 'Completato',
  current: 'Step attuale • Azione richiesta',
  pending: 'In attesa',
}

const subtitle = computed(() => subtitles[props.status])
const markerStatus = computed(() => (props.status === 'done' ? 'done-icon' : props.status))
</script>

<template>
  <li class="avanti-checklist-item" :class="`avanti-checklist-item--${status}`">
    <span class="avanti-checklist-item__icon" :class="`avanti-checklist-item__icon--${markerStatus}`">
      <AvantiIcon :name="icon" size="md" />
    </span>
    <div class="avanti-checklist-item__text">
      <span class="avanti-checklist-item__title">{{ title }}</span>
      <span class="avanti-checklist-item__subtitle">{{ subtitle }}</span>
    </div>
    <AvantiStepMarker v-if="status === 'done'" status="done" size="sm" />
    <button
      v-else
      class="avanti-checklist-item__go"
      type="button"
      :disabled="status === 'pending'"
      :aria-label="`Vai a: ${title}`"
      @click="$emit('open')"
    >
      <AvantiIcon name="arrowRight" size="sm" />
    </button>
  </li>
</template>

<style scoped>
.avanti-checklist-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  border-top: 1px solid var(--avanti-border);
}
.avanti-checklist-item--current {
  background: var(--avanti-primary-soft);
}
.avanti-checklist-item__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
}
.avanti-checklist-item__icon--done-icon {
  background: var(--avanti-primary);
  color: #fff;
}
.avanti-checklist-item__icon--current {
  border: 1.5px solid var(--avanti-primary);
  background: var(--avanti-surface);
  color: var(--avanti-primary);
}
.avanti-checklist-item__icon--pending {
  background: var(--avanti-surface-alt);
  color: var(--avanti-muted-light);
}
.avanti-checklist-item__text {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.avanti-checklist-item__title {
  color: var(--avanti-text-strong);
  font-size: 14px;
  font-weight: 500;
}
.avanti-checklist-item--current .avanti-checklist-item__title {
  font-weight: 600;
}
.avanti-checklist-item--pending .avanti-checklist-item__title {
  color: var(--avanti-muted);
  font-weight: 400;
}
.avanti-checklist-item__subtitle {
  color: var(--avanti-primary);
  font-size: 12px;
}
.avanti-checklist-item--current .avanti-checklist-item__subtitle {
  font-weight: 500;
}
.avanti-checklist-item--pending .avanti-checklist-item__subtitle {
  color: var(--avanti-muted-light);
}
.avanti-checklist-item__go {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: var(--avanti-primary);
  color: #fff;
  cursor: pointer;
}
.avanti-checklist-item__go:hover:not(:disabled) {
  background: var(--avanti-primary-dark);
}
.avanti-checklist-item__go:disabled {
  background: var(--avanti-surface-alt);
  color: var(--avanti-muted);
  cursor: default;
}

@media (max-width: 767px) {
  .avanti-checklist-item {
    gap: 12px;
    padding: 14px 16px;
  }
  .avanti-checklist-item__icon {
    width: 40px;
    height: 40px;
  }
}
</style>
