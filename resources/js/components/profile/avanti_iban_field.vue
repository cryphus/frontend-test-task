<script setup>
import { computed, ref, useId } from 'vue'
import AvantiIconButton from '../ui/avanti_icon_button.vue'
import { useAvantiToast } from '../../composables/avanti_use_toast.js'

const props = defineProps({
  value: { type: String, default: '' },
  label: { type: String, default: 'IBAN' },
})

const labelId = useId()
const copied = ref(false)
const toast = useAvantiToast()
const displayValue = computed(() => props.value || '-')
const copyLabel = computed(() => (copied.value ? 'IBAN copiato' : 'Copia IBAN'))

async function copy() {
  if (!props.value) {
    toast.show('IBAN non ancora disponibile.')
    return
  }
  await navigator.clipboard.writeText(props.value)
  copied.value = true
  toast.show('IBAN copiato negli appunti.')
}
</script>

<template>
  <div class="avanti-iban-field">
    <span :id="labelId" class="avanti-iban-field__label">{{ label }}</span>
    <div class="avanti-iban-field__box" :aria-labelledby="labelId">
      <span class="avanti-iban-field__value">{{ displayValue }}</span>
      <AvantiIconButton
        icon="copy"
        :label="copyLabel"
        size="sm"
        @click="copy"
      />
    </div>
  </div>
</template>

<style scoped>
.avanti-iban-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.avanti-iban-field__label {
  color: var(--avanti-muted);
  font-size: 12px;
}
.avanti-iban-field__box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 40px;
  padding: 6px 8px 6px 12px;
  border: 1px solid var(--avanti-border);
  border-radius: var(--avanti-radius-sm);
  background: var(--avanti-page);
}
.avanti-iban-field__value {
  color: var(--avanti-text-strong);
  font-size: 13px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  overflow-wrap: anywhere;
}

@media (max-width: 767px) {
  .avanti-iban-field__label {
    font-size: 13px;
  }
  .avanti-iban-field__box {
    min-height: 36px;
  }
}
</style>
