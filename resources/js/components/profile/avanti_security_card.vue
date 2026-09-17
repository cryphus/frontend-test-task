<script setup>
import { computed } from 'vue'
import AvantiCard from '../ui/avanti_card.vue'
import AvantiCardHeader from '../ui/avanti_card_header.vue'
import AvantiSecurityRow from './avanti_security_row.vue'
import AvantiEmailVerify from './avanti_email_verify.vue'

const props = defineProps({
  emailVerified: { type: Boolean, default: false },
  emailChangeAllowed: { type: Boolean, default: true },
  sendCode: { type: Function, required: true },
  confirmCode: { type: Function, required: true },
})

const emit = defineEmits(['change-password', 'change-email', 'verified'])

const emailChangeLocked = computed(() => !props.emailChangeAllowed)

function changePassword() {
  emit('change-password')
}

function changeEmail() {
  emit('change-email')
}

function onVerified() {
  emit('verified')
}
</script>

<template>
  <AvantiCard class="avanti-security-card">
    <AvantiCardHeader class="avanti-security-card__header" title="Sicurezza" icon="shield" />
    <AvantiSecurityRow
      text="Cambia la password del tuo account."
      action="Cambia password"
      @action="changePassword"
    />
    <AvantiSecurityRow
      text="Cambia l'indirizzo email del tuo account."
      action="Cambia email"
      :disabled="emailChangeLocked"
      @action="changeEmail"
    />
    <div class="avanti-security-card__verify">
      <AvantiEmailVerify
        :verified="emailVerified"
        :send="sendCode"
        :confirm="confirmCode"
        @verified="onVerified"
      />
    </div>
  </AvantiCard>
</template>

<style scoped>
.avanti-security-card__header {
  padding-bottom: 16px;
}
.avanti-security-card__verify {
  padding-top: 0;
  border-top: 1px solid var(--avanti-border);
}

@media (max-width: 767px) {
  .avanti-security-card__header {
    padding-bottom: 16px;
  }
  .avanti-security-card__verify {
    padding-top: 16px;
  }
}
</style>
