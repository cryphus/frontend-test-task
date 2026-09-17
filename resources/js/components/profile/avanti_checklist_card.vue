<script setup>
import { computed, ref, useId } from 'vue'
import AvantiCard from '../ui/avanti_card.vue'
import AvantiBadge from '../ui/avanti_badge.vue'
import AvantiIconButton from '../ui/avanti_icon_button.vue'
import AvantiChecklistItem from './avanti_checklist_item.vue'
import AvantiProgressSegments from './avanti_progress_segments.vue'

const props = defineProps({
  steps: { type: Array, required: true },
  completed: { type: Number, required: true },
})

const emit = defineEmits(['open-step'])

const expanded = ref(true)
const toggleLabel = computed(() => (expanded.value ? 'Comprimi' : 'Espandi'))
const toggleClass = computed(() => ({ 'avanti-checklist-card__toggle--collapsed': !expanded.value }))
const counter = computed(() => `${props.completed} / ${props.steps.length} completati`)
const hasCurrent = computed(() => props.steps.some((step) => step.status === 'current'))
const bodyId = useId()

function toggle() {
  expanded.value = !expanded.value
}

function openStep(step) {
  emit('open-step', step)
}
</script>

<template>
  <AvantiCard class="avanti-checklist-card" shadow="soft" :padded="false">
    <div class="avanti-checklist-card__head">
      <div class="avanti-checklist-card__heading">
        <span class="avanti-checklist-card__eyebrow">Completa tutti gli step</span>
        <h2 class="avanti-checklist-card__title">Per il prelievo dei fondi, completa tutti gli step</h2>
      </div>
      <div class="avanti-checklist-card__tools">
        <AvantiBadge>{{ counter }}</AvantiBadge>
        <AvantiIconButton
          class="avanti-checklist-card__toggle"
          :class="toggleClass"
          icon="chevronUp"
          :label="toggleLabel"
          variant="outline"
          :aria-expanded="expanded"
          :aria-controls="bodyId"
          @click="toggle"
        />
      </div>
    </div>
    <div v-show="expanded" :id="bodyId">
      <ul class="avanti-checklist-card__list">
        <AvantiChecklistItem
          v-for="step in steps"
          :key="step.key"
          :title="step.title"
          :icon="step.icon"
          :status="step.status"
          @open="openStep(step)"
        />
      </ul>
      <AvantiProgressSegments
        class="avanti-checklist-card__progress"
        :total="steps.length"
        :filled="completed"
        :partial="hasCurrent"
      />
    </div>
  </AvantiCard>
</template>

<style scoped>
.avanti-checklist-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 24px;
}
.avanti-checklist-card__heading {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 260px;
}
.avanti-checklist-card__eyebrow {
  color: var(--avanti-primary);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.avanti-checklist-card__title {
  color: var(--avanti-text-strong);
  font-size: 13px;
  font-weight: 600;
  line-height: 1.25;
}
.avanti-checklist-card__tools {
  display: flex;
  align-items: center;
  gap: 10px;
}
.avanti-checklist-card__toggle--collapsed {
  transform: rotate(180deg);
}
.avanti-checklist-card__list {
  margin: 0;
  padding: 0;
  list-style: none;
}
.avanti-checklist-card__progress {
  padding: 16px 24px 20px;
  border-top: 1px solid var(--avanti-border);
}

@media (max-width: 767px) {
  .avanti-checklist-card__head {
    align-items: flex-start;
    gap: 12px;
    padding: 16px;
  }
  .avanti-checklist-card__heading {
    max-width: none;
  }
  .avanti-checklist-card__title {
    font-size: 13px;
  }
  .avanti-checklist-card__tools :deep(.avanti-badge) {
    display: none;
  }
  .avanti-checklist-card__tools .avanti-checklist-card__toggle {
    width: 20px;
    height: 20px;
    margin-top: 6px;
  }
  .avanti-checklist-card__progress {
    padding: 16px;
  }
}
</style>
