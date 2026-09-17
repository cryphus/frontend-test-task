import { avantiMockProfile } from '../data/avanti_mock_profile.js'

// Mock включается при сборке без Laravel (__AVANTI_STANDALONE__) или через VITE_AVANTI_MOCK.
const useMock = import.meta.env.VITE_AVANTI_MOCK
  ? import.meta.env.VITE_AVANTI_MOCK === 'true'
  : __AVANTI_STANDALONE__

const apiBase = import.meta.env.VITE_AVANTI_API_BASE ?? '/api'

export class AvantiApiError extends Error {
  constructor(message, status, errors = {}) {
    super(message)
    this.status = status
    this.errors = errors
  }
}

function readCsrfToken() {
  const meta = document.querySelector('meta[name="csrf-token"]')
  if (meta) return { 'X-CSRF-TOKEN': meta.getAttribute('content') }
  const cookie = document.cookie.split('; ').find((row) => row.startsWith('XSRF-TOKEN='))
  return cookie ? { 'X-XSRF-TOKEN': decodeURIComponent(cookie.split('=')[1]) } : {}
}

async function request(method, path, body) {
  const response = await fetch(`${apiBase}${path}`, {
    method,
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      ...readCsrfToken(),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = response.status === 204 ? {} : await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new AvantiApiError(data.message ?? 'Errore di rete', response.status, data.errors)
  }
  return data
}

const mockState = structuredClone(avantiMockProfile)
const MOCK_CODE_LENGTH = 6
const wait = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms))

const mock = {
  async getProfile() {
    await wait()
    return structuredClone(mockState)
  },
  async updateName({ firstName, lastName }) {
    await wait()
    Object.assign(mockState.user, { firstName, lastName })
    return { user: structuredClone(mockState.user) }
  },
  async updateEmail({ email }) {
    await wait()
    if (!mockState.user.emailChangeAllowed) {
      throw new AvantiApiError("L'email può essere cambiata una sola volta.", 422, {
        email: ["L'email può essere cambiata una sola volta."],
      })
    }
    Object.assign(mockState.user, { email, emailVerified: false, emailChangeAllowed: false })
    return { user: structuredClone(mockState.user) }
  },
  async updatePassword({ currentPassword }) {
    await wait()
    if (currentPassword.length < 8) {
      throw new AvantiApiError('Password attuale non corretta.', 422, {
        currentPassword: ['Password attuale non corretta.'],
      })
    }
    return {}
  },
  async sendVerificationCode() {
    await wait()
    return {}
  },
  async confirmVerificationCode({ code }) {
    await wait()
    if (code.length !== MOCK_CODE_LENGTH) {
      throw new AvantiApiError('Codice non valido.', 422, { code: ['Codice non valido.'] })
    }
    mockState.user.emailVerified = true
    return { user: structuredClone(mockState.user) }
  },
}

const real = {
  getProfile: () => request('GET', '/profile'),
  updateName: (payload) => request('PUT', '/profile/name', payload),
  updateEmail: (payload) => request('PUT', '/profile/email', payload),
  updatePassword: (payload) => request('PUT', '/profile/password', payload),
  sendVerificationCode: () => request('POST', '/profile/email/verification'),
  confirmVerificationCode: (payload) => request('POST', '/profile/email/verification/confirm', payload),
}

export const avantiApi = useMock ? mock : real
