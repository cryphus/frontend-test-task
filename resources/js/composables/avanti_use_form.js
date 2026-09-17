import { reactive, ref } from 'vue'

/**
 * Состояние формы: поля, ошибки по полям, общая ошибка, флаг отправки.
 * Ошибки 422 от Laravel раскладываются по ключам `errors`.
 */
export function useAvantiForm(initial) {
  const fields = reactive({ ...initial })
  const errors = reactive({})
  const formError = ref('')
  const loading = ref(false)

  function resetErrors() {
    Object.keys(errors).forEach((key) => delete errors[key])
    formError.value = ''
  }

  function setErrors(map) {
    Object.entries(map).forEach(([key, messages]) => {
      errors[key] = Array.isArray(messages) ? messages[0] : messages
    })
  }

  async function submit(validate, action) {
    resetErrors()
    const localErrors = validate(fields)
    if (Object.keys(localErrors).length) {
      setErrors(localErrors)
      return false
    }
    loading.value = true
    try {
      await action({ ...fields })
      return true
    } catch (error) {
      if (error.errors && Object.keys(error.errors).length) setErrors(error.errors)
      else formError.value = error.message
      return false
    } finally {
      loading.value = false
    }
  }

  return { fields, errors, formError, loading, submit }
}
