<script setup>
import { computed, ref } from 'vue'

const model = defineModel({ type: String, default: '' })

const props = defineProps({
  length: { type: Number, default: 6 },
  invalid: { type: Boolean, default: false },
  label: { type: String, default: 'Codice di verifica' },
})

const cells = ref([])
const digits = computed(() => Array.from({ length: props.length }, (_, i) => model.value[i] ?? ''))

function focusCell(index) {
  const cell = cells.value[Math.max(0, Math.min(index, props.length - 1))]
  cell?.focus()
  cell?.select()
}

function setDigits(start, chars) {
  const next = digits.value.slice()
  chars.forEach((char, offset) => {
    if (start + offset < props.length) next[start + offset] = char
  })
  model.value = next.join('')
  focusCell(start + chars.length)
}

function onInput(index, event) {
  const chars = event.target.value.replace(/\D/g, '').split('')
  event.target.value = digits.value[index]
  if (chars.length) setDigits(index, chars)
}

function onKeydown(index, event) {
  if (event.key === 'Backspace' && !digits.value[index]) {
    event.preventDefault()
    const next = digits.value.slice()
    next[index - 1] = ''
    model.value = next.join('')
    focusCell(index - 1)
  } else if (event.key === 'ArrowLeft') {
    focusCell(index - 1)
  } else if (event.key === 'ArrowRight') {
    focusCell(index + 1)
  }
}

function onPaste(event) {
  event.preventDefault()
  const chars = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, props.length).split('')
  if (chars.length) setDigits(0, chars)
}
</script>

<template>
  <div class="avanti-code-input" :class="{ 'avanti-code-input--invalid': invalid }" role="group" :aria-label="label">
    <input
      v-for="(digit, index) in digits"
      :key="index"
      ref="cells"
      class="avanti-code-input__cell"
      :value="digit"
      type="text"
      inputmode="numeric"
      autocomplete="one-time-code"
      maxlength="6"
      :aria-label="`Cifra ${index + 1}`"
      @input="onInput(index, $event)"
      @keydown="onKeydown(index, $event)"
      @paste="onPaste"
    />
  </div>
</template>

<style scoped>
.avanti-code-input {
  display: flex;
  gap: 10px;
}
.avanti-code-input__cell {
  width: 32px;
  height: 32px;
  padding: 0;
  border: 1px solid #b6dde6;
  border-radius: 0;
  background: var(--avanti-surface);
  color: var(--avanti-text-strong);
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  outline: none;
}
.avanti-code-input__cell:focus {
  border-color: var(--avanti-primary);
  box-shadow: 0 0 0 2px var(--avanti-primary-soft);
}
.avanti-code-input--invalid .avanti-code-input__cell {
  border-color: var(--avanti-danger);
}
</style>
