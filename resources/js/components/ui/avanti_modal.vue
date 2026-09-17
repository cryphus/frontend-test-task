<script setup>
import { onBeforeUnmount, onMounted, useId, useTemplateRef } from 'vue'
import AvantiLogo from './avanti_logo.vue'
import AvantiIconButton from './avanti_icon_button.vue'

defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
})

const emit = defineEmits(['close'])
const titleId = useId()
const dialog = useTemplateRef('dialog')

function close() {
  emit('close')
}

function onKeydown(event) {
  if (event.key === 'Escape') close()
}

function onBackdrop(event) {
  if (event.target === event.currentTarget) close()
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  document.body.classList.add('avanti-scroll-lock')
  dialog.value?.querySelector('input')?.focus()
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.classList.remove('avanti-scroll-lock')
})
</script>

<template>
  <Teleport to="body">
    <div class="avanti-modal" @mousedown="onBackdrop">
      <div ref="dialog" class="avanti-modal__dialog" role="dialog" aria-modal="true" :aria-labelledby="titleId">
        <AvantiIconButton
          class="avanti-modal__close"
          icon="close"
          label="Chiudi"
          size="lg"
          icon-size="lg"
          @click="close"
        />
        <header class="avanti-modal__header">
          <AvantiLogo class="avanti-modal__logo" size="md" />
          <h2 :id="titleId" class="avanti-modal__title">{{ title }}</h2>
          <p v-if="subtitle" class="avanti-modal__subtitle">{{ subtitle }}</p>
        </header>
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<style>
.avanti-scroll-lock {
  overflow: hidden;
}
</style>

<style scoped>
.avanti-modal {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  background: var(--avanti-overlay);
  overflow-y: auto;
  animation: avanti-fade 0.15s ease;
}
.avanti-modal__dialog {
  position: relative;
  width: 100%;
  max-width: 524px;
  margin: auto;
  padding: 24px;
  border-radius: var(--avanti-radius-xl);
  background: var(--avanti-surface);
  animation: avanti-rise 0.2s ease;
}
.avanti-modal__close {
  position: absolute;
  top: 12px;
  right: 20px;
}
.avanti-modal__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin: 20px 0 32px;
  text-align: center;
}
.avanti-modal__logo {
  margin-bottom: 14px;
}
.avanti-modal__title {
  color: var(--avanti-text-strong);
  font-size: 26px;
  font-weight: 600;
  line-height: 1;
  text-transform: uppercase;
}
.avanti-modal__subtitle {
  max-width: 420px;
  color: var(--avanti-muted);
  font-size: 16px;
  line-height: 1.25;
  letter-spacing: 0.02em;
  white-space: pre-line;
}

@keyframes avanti-fade {
  from {
    opacity: 0;
  }
}
@keyframes avanti-rise {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
}

@media (max-width: 767px) {
  .avanti-modal {
    align-items: flex-start;
    padding: 56px 20px 24px;
  }
  .avanti-modal__dialog {
    padding: 16px;
  }
  .avanti-modal__close {
    top: 16px;
    right: 12px;
  }
  .avanti-modal__header {
    margin: 0 0 20px;
    gap: 6px;
  }
  .avanti-modal__logo {
    margin-bottom: 12px;
    font-size: 22px;
  }
  .avanti-modal__title {
    font-size: 18px;
  }
  .avanti-modal__subtitle {
    font-size: 14px;
  }
}
</style>
