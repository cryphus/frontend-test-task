<script setup>
import { computed, ref } from 'vue'
import AvantiStepper from '../components/profile/avanti_stepper.vue'
import AvantiPersonalCard from '../components/profile/avanti_personal_card.vue'
import AvantiSecurityCard from '../components/profile/avanti_security_card.vue'
import AvantiChecklistCard from '../components/profile/avanti_checklist_card.vue'
import AvantiChatPopup from '../components/profile/avanti_chat_popup.vue'
import AvantiNameModal from '../components/modals/avanti_name_modal.vue'
import AvantiEmailModal from '../components/modals/avanti_email_modal.vue'
import AvantiPasswordModal from '../components/modals/avanti_password_modal.vue'
import AvantiPageState from '../components/ui/avanti_page_state.vue'
import { useAvantiProfile } from '../composables/avanti_use_profile.js'
import { useAvantiToast } from '../composables/avanti_use_toast.js'

const profile = useAvantiProfile()
const { state, personalRows, summaryRows, completedSteps, currentStepIndex } = profile
const toast = useAvantiToast()

const modals = {
  name: AvantiNameModal,
  email: AvantiEmailModal,
  password: AvantiPasswordModal,
}
const activeModal = ref(null)
const modalComponent = computed(() => modals[activeModal.value] ?? null)

function openModal(name) {
  activeModal.value = name
}

function closeModal() {
  activeModal.value = null
}

function onSaved(message) {
  closeModal()
  toast.show(message)
}

function onVerified() {
  toast.show('Email verificata con successo.')
}

function onOpenStep(step) {
  toast.show(`${step.title}: sezione in arrivo.`)
}
</script>

<template>
  <AvantiPageState v-if="!state.user" :loading="state.loading" :error="state.error" />

  <div v-else class="avanti-profile-page">
    <div class="avanti-profile-page__main">
      <AvantiStepper :steps="state.steps" :current="currentStepIndex" :completed="completedSteps" />
      <AvantiPersonalCard
        :rows="personalRows"
        :iban="state.user.iban"
        editable
        show-iban
        @edit="openModal('name')"
      />
      <AvantiSecurityCard
        :email-verified="state.user.emailVerified"
        :email-change-allowed="state.user.emailChangeAllowed"
        :send-code="profile.sendVerificationCode"
        :confirm-code="profile.confirmVerificationCode"
        @change-password="openModal('password')"
        @change-email="openModal('email')"
        @verified="onVerified"
      />
    </div>

    <aside class="avanti-profile-page__side">
      <AvantiPersonalCard class="avanti-profile-page__summary" :rows="summaryRows" compact />
      <AvantiChecklistCard :steps="state.steps" :completed="completedSteps" @open-step="onOpenStep" />
      <AvantiChatPopup
        v-if="state.consultant"
        class="avanti-profile-page__chat"
        :name="state.consultant.name"
        :message="state.consultant.message"
        :avatar="state.consultant.avatar"
        :unread="state.consultant.unread"
      />
    </aside>

    <component :is="modalComponent" v-if="modalComponent" @close="closeModal" @saved="onSaved" />
  </div>
</template>

<style scoped>
.avanti-profile-page {
  display: grid;
  grid-template-columns: minmax(0, 792fr) minmax(0, 464fr);
  align-items: start;
  gap: 40px;
}
.avanti-profile-page__main,
.avanti-profile-page__side {
  display: flex;
  flex-direction: column;
  gap: 32px;
  min-width: 0;
}

@media (max-width: 1099px) {
  .avanti-profile-page {
    grid-template-columns: minmax(0, 1fr);
    gap: 32px;
  }
  .avanti-profile-page__summary {
    display: none;
  }
}

@media (max-width: 767px) {
  .avanti-profile-page {
    gap: 20px;
  }
  .avanti-profile-page__main,
  .avanti-profile-page__side {
    gap: 20px;
  }
  .avanti-profile-page__chat {
    display: none;
  }
}
</style>
