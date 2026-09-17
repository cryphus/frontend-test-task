<script setup>
import { computed, ref } from 'vue'
import AvantiBadge from '../ui/avanti_badge.vue'
import AvantiButton from '../ui/avanti_button.vue'
import AvantiCodeInput from '../ui/avanti_code_input.vue'
import AvantiIcon from '../ui/avanti_icon.vue'

const CODE_LENGTH = 6

const props = defineProps({
  verified: { type: Boolean, default: false },
  send: { type: Function, required: true },
  confirm: { type: Function, required: true },
})

const emit = defineEmits(['verified', 'sent'])

const codeSent = ref(false)
const code = ref('')
const error = ref('')
const sending = ref(false)
const confirming = ref(false)

const status = computed(() => (props.verified ? 'Verificata' : 'Non verificata'))
const statusIcon = computed(() => (props.verified ? 'check' : 'help'))
const badgeVariant = computed(() => (props.verified ? 'success' : 'light'))
const codeHint = `Inserisci il codice a ${CODE_LENGTH} cifre inviato alla tua email:`
const hasError = computed(() => Boolean(error.value))
const codeComplete = computed(() => code.value.length === CODE_LENGTH)

async function run(flag, task) {
  error.value = ''
  flag.value = true
  try {
    await task()
  } catch (e) {
    error.value = e.errors?.code?.[0] ?? e.message
  } finally {
    flag.value = false
  }
}

function sendCode() {
  return run(sending, async () => {
    await props.send()
    codeSent.value = true
    code.value = ''
    emit('sent')
  })
}

function confirmCode() {
  if (!codeComplete.value) {
    error.value = `Inserisci tutte le ${CODE_LENGTH} cifre del codice.`
    return
  }
  return run(confirming, async () => {
    await props.confirm({ code: code.value })
    codeSent.value = false
    emit('verified')
  })
}
</script>

<template>
  <div class="avanti-email-verify">
    <div class="avanti-email-verify__head">
      <span class="avanti-email-verify__help">
        <AvantiIcon :name="statusIcon" size="xs" :stroke-width="3" />
      </span>
      <span class="avanti-email-verify__title">Verifica email</span>
      <AvantiBadge :variant="badgeVariant">{{ status }}</AvantiBadge>
    </div>

    <p v-if="verified" class="avanti-email-verify__text">Il tuo indirizzo email è verificato.</p>

    <div v-else-if="!codeSent" class="avanti-email-verify__row">
      <p class="avanti-email-verify__text">Verifica il tuo indirizzo email per proteggere il tuo account.</p>
      <AvantiButton class="avanti-email-verify__send" :loading="sending" @click="sendCode">
        Invia codice
      </AvantiButton>
    </div>

    <form v-else class="avanti-email-verify__form" novalidate @submit.prevent="confirmCode">
      <p class="avanti-email-verify__text">Verifica il tuo indirizzo email per proteggere il tuo account.</p>
      <p class="avanti-email-verify__prompt">{{ codeHint }}</p>
      <AvantiCodeInput v-model="code" :length="CODE_LENGTH" :invalid="hasError" />
      <div class="avanti-email-verify__actions">
        <AvantiButton
          class="avanti-email-verify__confirm"
          type="submit"
          size="lg"
          uppercase
          :loading="confirming"
        >
          Conferma
        </AvantiButton>
        <p class="avanti-email-verify__resend">
          <span>Non hai ricevuto il codice?</span>
          <AvantiButton variant="ghost" :loading="sending" @click="sendCode">Invia di nuovo</AvantiButton>
        </p>
      </div>
    </form>

    <p v-if="error" class="avanti-email-verify__error" role="alert">{{ error }}</p>
  </div>
</template>

<style scoped>
.avanti-email-verify {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  border-radius: var(--avanti-radius-md);
  background: var(--avanti-primary-soft);
}
.avanti-email-verify__head {
  display: flex;
  align-items: center;
  gap: 10px;
}
.avanti-email-verify__help {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--avanti-surface);
  color: var(--avanti-text-strong);
}
.avanti-email-verify__title {
  color: var(--avanti-text-strong);
  font-size: 14px;
  font-weight: 500;
}
.avanti-email-verify__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.avanti-email-verify__text {
  color: var(--avanti-muted);
  font-size: 13px;
  line-height: 1.3;
}
.avanti-email-verify__send {
  min-width: 132px;
  min-height: 36px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
}
.avanti-email-verify__form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.avanti-email-verify__prompt {
  margin-top: 16px;
  color: var(--avanti-text);
  font-size: 13px;
}
.avanti-email-verify__actions {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 14px;
}
.avanti-email-verify__confirm {
  min-width: 160px;
  min-height: 36px;
  padding: 6px 24px;
}
.avanti-email-verify__resend {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  color: var(--avanti-muted);
  font-size: 13px;
}
.avanti-email-verify__resend :deep(.avanti-button) {
  font-size: 13px;
}
.avanti-email-verify__error {
  color: var(--avanti-danger);
  font-size: 13px;
}

@media (max-width: 767px) {
  .avanti-email-verify {
    gap: 12px;
    padding: 14px;
  }
  .avanti-email-verify__head {
    justify-content: space-between;
  }
  .avanti-email-verify__title {
    margin-right: auto;
  }
  .avanti-email-verify__row {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  .avanti-email-verify__send {
    width: 100%;
  }
  .avanti-email-verify__prompt {
    margin-top: 6px;
  }
  .avanti-email-verify__actions {
    flex-direction: column;
    align-items: stretch;
    margin-top: 12px;
  }
  .avanti-email-verify__resend {
    align-items: center;
  }
  .avanti-email-verify :deep(.avanti-code-input) {
    gap: 10px;
  }
  .avanti-email-verify :deep(.avanti-code-input__cell) {
    flex: 0 1 32px;
  }
}
</style>
