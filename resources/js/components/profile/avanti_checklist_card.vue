<script setup>
import { ref, useId } from 'vue'
import AvantiCard from '../ui/avanti_card.vue'
import AvantiBadge from '../ui/avanti_badge.vue'
import AvantiIcon from '../ui/avanti_icon.vue'
import AvantiChecklistItem from './avanti_checklist_item.vue'
import AvantiProgressSegments from './avanti_progress_segments.vue'

defineProps({
  steps: { type: Array, required: true },
  completed: { type: Number, required: true },
})

defineEmits(['open-step'])

const expanded = ref(true)
const bodyId = useId()

function toggle() {
  expanded.value = !expanded.value
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
        <AvantiBadge>{{ completed }} / {{ steps.length }} completati</AvantiBadge>
        <button
          class="avanti-checklist-card__toggle"
          :class="{ 'avanti-checklist-card__toggle--collapsed': !expanded }"
          type="button"
          :aria-expanded="expanded"
          :aria-controls="bodyId"
          :aria-label="expanded ? 'Comprimi' : 'Espandi'"
          @click="toggle"
        >
          <AvantiIcon name="chevronUp" size="sm" />
        </button>
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
          @open="$emit('open-step', step)"
        />
      </ul>
      <AvantiProgressSegments
        class="avanti-checklist-card__progress"
        :total="steps.length"
        :filled="completed"
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
.avanti-checklist-card__toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 1px solid var(--avanti-border);
  border-radius: var(--avanti-radius-sm);
  background: var(--avanti-page);
  color: var(--avanti-text-strong);
  cursor: pointer;
  transition: transform 0.2s ease;
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
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    padding: 20px 16px 16px;
  }
  .avanti-checklist-card__heading {
    max-width: none;
  }
  .avanti-checklist-card__title {
    font-size: 13px;
  }
  .avanti-checklist-card__tools {
    justify-content: space-between;
  }
  .avanti-checklist-card__progress {
    padding: 16px;
  }
}
</style>
