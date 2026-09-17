<script setup>
import AvantiCard from '../ui/avanti_card.vue'
import AvantiCardHeader from '../ui/avanti_card_header.vue'
import AvantiSecurityRow from './avanti_security_row.vue'
import AvantiEmailVerify from './avanti_email_verify.vue'

defineProps({
  emailVerified: { type: Boolean, default: false },
  emailChangeAllowed: { type: Boolean, default: true },
  sendCode: { type: Function, required: true },
  confirmCode: { type: Function, required: true },
})

defineEmits(['change-password', 'change-email', 'verified'])
</script>

<template>
  <AvantiCard class="avanti-security-card">
    <AvantiCardHeader class="avanti-security-card__header" title="Sicurezza" icon="shield" />
    <AvantiSecurityRow
      text="Cambia la password del tuo account."
      action="Cambia password"
      @action="$emit('change-password')"
    />
    <AvantiSecurityRow
      text="Cambia l'indirizzo email del tuo account."
      action="Cambia email"
      :disabled="!emailChangeAllowed"
      @action="$emit('change-email')"
    />
    <div class="avanti-security-card__verify">
      <AvantiEmailVerify
        :verified="emailVerified"
        :send="sendCode"
        :confirm="confirmCode"
        @verified="$emit('verified')"
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
  .avanti-security-card__verify {
    padding-top: 16px;
  }
}
</style>
