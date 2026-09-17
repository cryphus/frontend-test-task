import { computed, reactive, readonly } from 'vue'
import { avantiApi } from '../services/avanti_api.js'

// Состояние на уровне модуля: общее для всех вызовов useAvantiProfile().
const state = reactive({
  loading: false,
  loaded: false,
  error: '',
  user: null,
  steps: [],
  consultant: null,
  notifications: 0,
})

const formatAmount = (value) =>
  `${new Intl.NumberFormat('it-IT', { useGrouping: 'always' }).format(value).replace(/\./g, ' ')} €`

function applyUser(user) {
  if (user) state.user = { ...state.user, ...user }
}

async function load() {
  if (state.loading || state.loaded) return
  state.loading = true
  state.error = ''
  try {
    const data = await avantiApi.getProfile()
    Object.assign(state, {
      user: data.user,
      steps: data.steps ?? [],
      consultant: data.consultant ?? null,
      notifications: data.notifications ?? 0,
      loaded: true,
    })
  } catch (error) {
    state.error = error.message
  } finally {
    state.loading = false
  }
}

const fullName = computed(() => (state.user ? `${state.user.firstName} ${state.user.lastName}` : ''))
const initials = computed(() =>
  state.user ? `${state.user.firstName[0] ?? ''}${state.user.lastName[0] ?? ''}`.toUpperCase() : '',
)
const completedSteps = computed(() => state.steps.filter((step) => step.status === 'done').length)
const currentStepIndex = computed(() => {
  const index = state.steps.findIndex((step) => step.status === 'current')
  return index === -1 ? completedSteps.value : index
})

const personalRows = computed(() => {
  const user = state.user
  if (!user) return []
  return [
    { label: 'Cognome', value: user.lastName },
    { label: 'Nome', value: user.firstName },
    { label: 'Email', value: user.email },
    { label: 'Importo approvato', value: formatAmount(user.approvedAmount) },
    { label: 'Tipo di documento', value: user.documentType },
    { label: 'Numero di documento', value: user.documentNumber },
  ]
})

const summaryRows = computed(() => personalRows.value.slice(0, 2))

export function useAvantiProfile() {
  return {
    state: readonly(state),
    fullName,
    initials,
    completedSteps,
    currentStepIndex,
    personalRows,
    summaryRows,
    load,
    updateName: async (payload) => applyUser((await avantiApi.updateName(payload)).user),
    updateEmail: async (payload) => applyUser((await avantiApi.updateEmail(payload)).user),
    updatePassword: (payload) => avantiApi.updatePassword(payload),
    sendVerificationCode: () => avantiApi.sendVerificationCode(),
    confirmVerificationCode: async (payload) =>
      applyUser((await avantiApi.confirmVerificationCode(payload)).user),
  }
}
