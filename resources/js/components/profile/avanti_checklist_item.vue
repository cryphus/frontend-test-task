<script setup>
import { computed } from 'vue'
import AvantiIcon from '../ui/avanti_icon.vue'
import AvantiIconButton from '../ui/avanti_icon_button.vue'
import AvantiStepMarker from './avanti_step_marker.vue'

const props = defineProps({
  title: { type: String, required: true },
  icon: { type: String, required: true },
  status: { type: String, required: true, validator: (v) => ['done', 'current', 'pending'].includes(v) },
})

const emit = defineEmits(['open'])

const subtitles = {
  done: 'Completato',
  current: 'Step attuale • Azione richiesta',
  pending: 'In attesa',
}

const subtitle = computed(() => subtitles[props.status])
const isDone = computed(() => props.status === 'done')
const isPending = computed(() => props.status === 'pending')
const goVariant = computed(() => (isPending.value ? 'muted' : 'filled'))
const goLabel = computed(() => `Vai a: ${props.title}`)
const itemClass = computed(() => `avanti-checklist-item--${props.status}`)
const iconClass = computed(() => `avanti-checklist-item__icon--${props.status}`)

function open() {
  emit('open')
}
</script>

<template>
  <li class="avanti-checklist-item" :class="itemClass">
    <span class="avanti-checklist-item__icon" :class="iconClass">
      <AvantiIcon :name="icon" size="md" />
    </span>
    <div class="avanti-checklist-item__text">
      <span class="avanti-checklist-item__title">{{ title }}</span>
      <span class="avanti-checklist-item__subtitle">{{ subtitle }}</span>
    </div>
    <AvantiStepMarker v-if="isDone" status="done" size="sm" />
    <AvantiIconButton
      v-else
      class="avanti-checklist-item__go"
      icon="arrowRight"
      :label="goLabel"
      :variant="goVariant"
      :disabled="isPending"
      @click="open"
    />
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
.avanti-checklist-item__icon--done {
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

@media (max-width: 767px) {
  .avanti-checklist-item {
    gap: 12px;
    padding: 16px;
  }
  .avanti-checklist-item__icon {
    width: 36px;
    height: 36px;
  }
  .avanti-checklist-item__icon :deep(.avanti-icon) {
    width: 18px;
    height: 18px;
  }
  .avanti-checklist-item .avanti-checklist-item__go {
    width: 28px;
    height: 28px;
  }
}
</style>
