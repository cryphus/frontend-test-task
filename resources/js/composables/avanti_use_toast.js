import { readonly, ref } from 'vue'

const TOAST_DURATION = 3500
const message = ref('')
let timer = null

export function useAvantiToast() {
  function show(text) {
    message.value = text
    clearTimeout(timer)
    timer = setTimeout(hide, TOAST_DURATION)
  }

  function hide() {
    message.value = ''
  }

  return { message: readonly(message), show, hide }
}
