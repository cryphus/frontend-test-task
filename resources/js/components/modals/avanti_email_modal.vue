<script setup>
import AvantiModal from '../ui/avanti_modal.vue'
import AvantiInput from '../ui/avanti_input.vue'
import AvantiModalActions from './avanti_modal_actions.vue'
import { useAvantiForm } from '../../composables/avanti_use_form.js'
import { useAvantiProfile } from '../../composables/avanti_use_profile.js'

const emit = defineEmits(['close', 'saved'])
const profile = useAvantiProfile()

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const { fields, errors, formError, loading, submit } = useAvantiForm({
  email: profile.state.user?.email ?? '',
})

function validate(values) {
  const email = values.email.trim()
  if (!EMAIL_PATTERN.test(email)) return { email: 'Inserisci un indirizzo email valido.' }
  if (email === profile.state.user?.email) return { email: "Inserisci un'email diversa da quella attuale." }
  return {}
}

async function onSubmit() {
  const ok = await submit(validate, (values) => profile.updateEmail({ email: values.email.trim() }))
  if (ok) emit('saved', 'Email aggiornata. Verifica il nuovo indirizzo.')
}

function close() {
  emit('close')
}
</script>

<template>
  <AvantiModal
    title="Cambia indirizzo email"
    subtitle="Ti invieremo un codice di conferma al nuovo indirizzo.&#10;L’email può essere cambiata una sola volta."
    @close="close"
  >
    <form class="avanti-email-modal" novalidate @submit.prevent="onSubmit">
      <AvantiInput
        v-model="fields.email"
        label="Email"
        type="email"
        autocomplete="email"
        hint="Useremo questa email per le comunicazioni sul credito."
        :error="errors.email"
      />
      <AvantiModalActions :loading="loading" :error="formError" @cancel="close" />
    </form>
  </AvantiModal>
</template>

<style scoped>
.avanti-email-modal {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

@media (max-width: 767px) {
  .avanti-email-modal {
    gap: 16px;
  }
}
</style>
