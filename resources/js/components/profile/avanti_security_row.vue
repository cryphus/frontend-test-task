<script setup>
import AvantiButton from '../ui/avanti_button.vue'

defineProps({
  text: { type: String, required: true },
  action: { type: String, required: true },
  disabled: { type: Boolean, default: false },
})

defineEmits(['action'])
</script>

<template>
  <div class="avanti-security-row">
    <p class="avanti-security-row__text">{{ text }}</p>
    <AvantiButton
      class="avanti-security-row__button"
      variant="outline"
      size="sm"
      :disabled="disabled"
      @click="$emit('action')"
    >
      {{ action }}
    </AvantiButton>
  </div>
</template>

<style scoped>
.avanti-security-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 0;
  border-top: 1px solid var(--avanti-border);
}
.avanti-security-row__text {
  color: var(--avanti-muted);
  font-size: 13px;
}
.avanti-security-row__button {
  min-width: 148px;
}

@media (max-width: 767px) {
  .avanti-security-row {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
  .avanti-security-row__text {
    font-size: 14px;
  }
  .avanti-security-row__button {
    width: 100%;
    min-height: 32px;
    padding: 6px 16px;
  }
}
</style>
