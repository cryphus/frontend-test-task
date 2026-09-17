<script setup>
import AvantiModal from '../ui/avanti_modal.vue'
import AvantiInput from '../ui/avanti_input.vue'
import AvantiModalActions from './avanti_modal_actions.vue'
import { useAvantiForm } from '../../composables/avanti_use_form.js'
import { useAvantiProfile } from '../../composables/avanti_use_profile.js'

const MIN_LENGTH = 8

const emit = defineEmits(['close', 'saved'])
const profile = useAvantiProfile()

const { fields, errors, formError, loading, submit } = useAvantiForm({
  currentPassword: '',
  password: '',
  passwordConfirmation: '',
})

function validate(values) {
  const result = {}
  if (!values.currentPassword) result.currentPassword = 'Inserisci la password attuale.'
  if (values.password.length < MIN_LENGTH) result.password = `Minimo ${MIN_LENGTH} caratteri.`
  if (values.password !== values.passwordConfirmation) {
    result.passwordConfirmation = 'Le password non coincidono.'
  }
  return result
}

async function onSubmit() {
  const ok = await submit(validate, (values) => profile.updatePassword(values))
  if (ok) emit('saved', 'Password aggiornata.')
}

function close() {
  emit('close')
}
</script>

<template>
  <AvantiModal
    title="Cambia password"
    subtitle="Scegli una password sicura&#10;di almeno 8 caratteri"
    @close="close"
  >
    <form class="avanti-password-modal" novalidate @submit.prevent="onSubmit">
      <AvantiInput
        v-model="fields.currentPassword"
        label="Password attuale"
        type="password"
        autocomplete="current-password"
        :error="errors.currentPassword"
      />
      <AvantiInput
        v-model="fields.password"
        label="Nuova password"
        type="password"
        autocomplete="new-password"
        :hint="`Minimo ${MIN_LENGTH} caratteri.`"
        :error="errors.password"
      />
      <AvantiInput
        v-model="fields.passwordConfirmation"
        label="Conferma nuova password"
        type="password"
        autocomplete="new-password"
        :error="errors.passwordConfirmation"
      />
      <AvantiModalActions :loading="loading" :error="formError" @cancel="close" />
    </form>
  </AvantiModal>
</template>

<style scoped>
.avanti-password-modal {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

@media (max-width: 767px) {
  .avanti-password-modal {
    gap: 16px;
  }
}
</style>
