<script setup>
import AvantiCard from '../ui/avanti_card.vue'
import AvantiCardHeader from '../ui/avanti_card_header.vue'
import AvantiInfoRow from '../ui/avanti_info_row.vue'
import AvantiButton from '../ui/avanti_button.vue'
import AvantiIbanField from './avanti_iban_field.vue'

defineProps({
  rows: { type: Array, required: true },
  title: { type: String, default: 'Dati personali' },
  editable: { type: Boolean, default: false },
  showIban: { type: Boolean, default: false },
  iban: { type: String, default: '' },
  compact: { type: Boolean, default: false },
})

const emit = defineEmits(['edit'])

function edit() {
  emit('edit')
}
</script>

<template>
  <AvantiCard class="avanti-personal-card" :class="{ 'avanti-personal-card--compact': compact }">
    <AvantiCardHeader :title="title">
      <AvantiButton v-if="editable" variant="neutral" @click="edit">Modifica nome</AvantiButton>
    </AvantiCardHeader>
    <dl class="avanti-personal-card__list">
      <AvantiInfoRow v-for="row in rows" :key="row.label" :label="row.label" :value="row.value" />
    </dl>
    <AvantiIbanField v-if="showIban" :value="iban" />
  </AvantiCard>
</template>

<style scoped>
.avanti-personal-card {
  gap: 16px;
}
.avanti-personal-card__list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0;
}
.avanti-personal-card--compact .avanti-personal-card__list {
  gap: 12px;
}
.avanti-personal-card--compact :deep(.avanti-info-row__value) {
  font-weight: 500;
}

@media (max-width: 767px) {
  .avanti-personal-card :deep(.avanti-button) {
    min-height: 31px;
    padding: 7px 12px;
    font-size: 12px;
  }
  .avanti-personal-card__list {
    gap: 12px;
  }
}
</style>
