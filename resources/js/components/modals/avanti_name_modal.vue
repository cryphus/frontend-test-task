<script setup>
import AvantiModal from '../ui/avanti_modal.vue'
import AvantiInput from '../ui/avanti_input.vue'
import AvantiModalActions from './avanti_modal_actions.vue'
import { useAvantiForm } from '../../composables/avanti_use_form.js'
import { useAvantiProfile } from '../../composables/avanti_use_profile.js'

const emit = defineEmits(['close', 'saved'])
const profile = useAvantiProfile()

const { fields, errors, formError, loading, submit } = useAvantiForm({
  lastName: profile.state.user?.lastName ?? '',
  firstName: profile.state.user?.firstName ?? '',
})

function validate(values) {
  const result = {}
  if (!values.lastName.trim()) result.lastName = 'Inserisci il cognome.'
  if (!values.firstName.trim()) result.firstName = 'Inserisci il nome.'
  return result
}

async function onSubmit() {
  const ok = await submit(validate, (values) =>
    profile.updateName({ lastName: values.lastName.trim(), firstName: values.firstName.trim() }),
  )
  if (ok) emit('saved', 'Nome aggiornato.')
}

function close() {
  emit('close')
}
</script>

<template>
  <AvantiModal
    title="Modifica nome e cognome"
    subtitle="Questi dati compaiono nella scheda cliente&#10;e nel contratto"
    @close="close"
  >
    <form class="avanti-name-modal" novalidate @submit.prevent="onSubmit">
      <AvantiInput v-model="fields.lastName" label="Cognome" autocomplete="family-name" :error="errors.lastName" />
      <AvantiInput v-model="fields.firstName" label="Nome" autocomplete="given-name" :error="errors.firstName" />
      <AvantiModalActions :loading="loading" :error="formError" @cancel="close" />
    </form>
  </AvantiModal>
</template>

<style scoped>
.avanti-name-modal {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

@media (max-width: 767px) {
  .avanti-name-modal {
    gap: 16px;
  }
}
</style>
