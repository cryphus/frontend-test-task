<script setup>
import { computed, ref, useId } from 'vue'
import AvantiIcon from './avanti_icon.vue'

const model = defineModel({ type: String, default: '' })

const props = defineProps({
  label: { type: String, required: true },
  type: { type: String, default: 'text' },
  hint: { type: String, default: '' },
  error: { type: String, default: '' },
  autocomplete: { type: String, default: 'off' },
  placeholder: { type: String, default: '' },
})

const inputId = useId()
const hintId = `${inputId}-hint`
const revealed = ref(false)

const isPassword = computed(() => props.type === 'password')
const inputType = computed(() => (isPassword.value && revealed.value ? 'text' : props.type))
const message = computed(() => props.error || props.hint)

function toggleReveal() {
  revealed.value = !revealed.value
}
</script>

<template>
  <div class="avanti-input" :class="{ 'avanti-input--invalid': error }">
    <label class="avanti-input__label" :for="inputId">{{ label }}</label>
    <div class="avanti-input__control">
      <input
        :id="inputId"
        v-model="model"
        class="avanti-input__field"
        :type="inputType"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :aria-invalid="Boolean(error)"
        :aria-describedby="message ? hintId : undefined"
      />
      <button
        v-if="isPassword"
        class="avanti-input__reveal"
        type="button"
        :aria-label="revealed ? 'Nascondi password' : 'Mostra password'"
        @click="toggleReveal"
      >
        <AvantiIcon :name="revealed ? 'eyeOff' : 'eye'" size="lg" :stroke-width="1.5" />
      </button>
    </div>
    <p v-if="message" :id="hintId" class="avanti-input__hint">
      <AvantiIcon name="info" size="sm" :stroke-width="1.5" />
      <span>{{ message }}</span>
    </p>
  </div>
</template>

<style scoped>
.avanti-input {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.avanti-input__label {
  color: var(--avanti-text);
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.01em;
}
.avanti-input__control {
  position: relative;
}
.avanti-input__field {
  width: 100%;
  height: 50px;
  padding: 0 52px 0 12px;
  border: 1px solid var(--avanti-border);
  border-radius: var(--avanti-radius-sm);
  background: var(--avanti-surface);
  color: var(--avanti-text-strong);
  font-size: 18px;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.avanti-input__field:focus {
  border-color: var(--avanti-primary);
  box-shadow: 0 0 0 3px var(--avanti-primary-soft);
}
.avanti-input__reveal {
  position: absolute;
  top: 50%;
  right: 14px;
  display: flex;
  padding: 0;
  border: 0;
  background: none;
  color: var(--avanti-border-strong);
  cursor: pointer;
  transform: translateY(-50%);
}
.avanti-input__reveal:hover {
  color: var(--avanti-muted);
}
.avanti-input__hint {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--avanti-muted);
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 0.03em;
}
.avanti-input__hint :deep(.avanti-icon) {
  color: var(--avanti-primary);
}
.avanti-input--invalid .avanti-input__field {
  border-color: var(--avanti-danger);
}
.avanti-input--invalid .avanti-input__hint,
.avanti-input--invalid .avanti-input__hint :deep(.avanti-icon) {
  color: var(--avanti-danger);
}

@media (max-width: 767px) {
  .avanti-input {
    gap: 8px;
  }
  .avanti-input__label {
    color: var(--avanti-muted);
    font-size: 12px;
    font-weight: 500;
  }
  .avanti-input__field {
    height: 44px;
    font-size: 16px;
  }
  .avanti-input__hint {
    font-size: 12px;
  }
}
</style>
