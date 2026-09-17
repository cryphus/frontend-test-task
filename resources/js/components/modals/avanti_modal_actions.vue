<script setup>
import AvantiButton from '../ui/avanti_button.vue'

defineProps({
  loading: { type: Boolean, default: false },
  error: { type: String, default: '' },
  submitLabel: { type: String, default: 'Salva' },
  cancelLabel: { type: String, default: 'Annulla' },
})

const emit = defineEmits(['cancel'])

function cancel() {
  emit('cancel')
}
</script>

<template>
  <div class="avanti-modal-actions">
    <p v-if="error" class="avanti-modal-actions__error" role="alert">{{ error }}</p>
    <div class="avanti-modal-actions__row">
      <AvantiButton variant="outline" size="lg" block uppercase @click="cancel">
        {{ cancelLabel }}
      </AvantiButton>
      <AvantiButton type="submit" size="lg" block uppercase :loading="loading">
        {{ submitLabel }}
      </AvantiButton>
    </div>
  </div>
</template>

<style scoped>
.avanti-modal-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.avanti-modal-actions__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 36px;
}
.avanti-modal-actions__error {
  color: var(--avanti-danger);
  font-size: 14px;
  text-align: center;
}

@media (max-width: 767px) {
  .avanti-modal-actions__row {
    gap: 12px;
  }
}
</style>
