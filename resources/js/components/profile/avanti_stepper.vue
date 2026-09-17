<script setup>
import AvantiCard from '../ui/avanti_card.vue'
import AvantiStepMarker from './avanti_step_marker.vue'

defineProps({
  steps: { type: Array, required: true },
  current: { type: Number, required: true },
  completed: { type: Number, required: true },
})
</script>

<template>
  <AvantiCard class="avanti-stepper" shadow="card" :padded="false">
    <div class="avanti-stepper__head">
      <span class="avanti-stepper__title">Passo {{ current + 1 }} di {{ steps.length }}</span>
      <span class="avanti-stepper__count">{{ completed }} / {{ steps.length }} completati</span>
    </div>
    <ol class="avanti-stepper__list">
      <li
        v-for="step in steps"
        :key="step.key"
        class="avanti-stepper__item"
        :class="`avanti-stepper__item--${step.status}`"
        :aria-current="step.status === 'current' ? 'step' : undefined"
      >
        <AvantiStepMarker class="avanti-stepper__marker" :status="step.status" :icon="step.icon" />
        <span class="avanti-stepper__label">{{ step.short }}</span>
      </li>
    </ol>
  </AvantiCard>
</template>

<style scoped>
.avanti-stepper {
  gap: 16px;
  padding: 20px 24px;
}
.avanti-stepper__head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 13px;
}
.avanti-stepper__title {
  color: var(--avanti-text-strong);
  font-weight: 600;
}
.avanti-stepper__count {
  color: var(--avanti-muted);
}
.avanti-stepper__list {
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
}
.avanti-stepper__item {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.avanti-stepper__item + .avanti-stepper__item::before {
  content: '';
  position: absolute;
  top: 17px;
  right: 50%;
  width: 100%;
  height: 2px;
  background: var(--avanti-border-strong);
}
.avanti-stepper__item--done + .avanti-stepper__item::before {
  background: var(--avanti-primary);
}
.avanti-stepper__label {
  color: var(--avanti-primary);
  font-size: 11px;
  font-weight: 600;
  text-align: center;
}
.avanti-stepper__item--pending .avanti-stepper__label {
  color: var(--avanti-muted-light);
  font-weight: 400;
}

@media (max-width: 767px) {
  .avanti-stepper {
    gap: 8px;
    padding: 16px;
  }
  .avanti-stepper__head {
    font-size: 11px;
  }
  .avanti-stepper__title {
    font-weight: 700;
  }
  .avanti-stepper__count {
    font-size: 13px;
  }
  .avanti-stepper__marker {
    width: 24px;
    height: 24px;
  }
  .avanti-stepper__marker :deep(.avanti-icon) {
    width: 14px;
    height: 14px;
  }
  .avanti-stepper__item {
    gap: 4px;
  }
  .avanti-stepper__item + .avanti-stepper__item::before {
    top: 11px;
    right: calc(50% + 16px);
    width: calc(100% - 32px);
  }
  .avanti-stepper__label {
    font-size: 10px;
  }
}
</style>
