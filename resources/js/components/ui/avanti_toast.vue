<script setup>
import AvantiIcon from './avanti_icon.vue'
import { useAvantiToast } from '../../composables/avanti_use_toast.js'

const { message, hide } = useAvantiToast()
</script>

<template>
  <Transition name="avanti-toast">
    <div v-if="message" class="avanti-toast" role="status" aria-live="polite">
      <span class="avanti-toast__icon">
        <AvantiIcon name="check" size="sm" :stroke-width="3" />
      </span>
      <span class="avanti-toast__text">{{ message }}</span>
      <button class="avanti-toast__close" type="button" aria-label="Chiudi" @click="hide">
        <AvantiIcon name="close" size="sm" />
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.avanti-toast {
  position: fixed;
  left: 50%;
  bottom: 24px;
  z-index: 200;
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: calc(100% - 32px);
  padding: 12px 16px;
  border-radius: var(--avanti-radius-md);
  background: var(--avanti-text);
  color: #fff;
  font-size: 14px;
  box-shadow: var(--avanti-shadow-popup);
  transform: translateX(-50%);
}
.avanti-toast__icon {
  display: flex;
  padding: 4px;
  border-radius: 50%;
  background: var(--avanti-primary);
}
.avanti-toast__close {
  display: flex;
  padding: 0;
  border: 0;
  background: none;
  color: var(--avanti-muted-light);
  cursor: pointer;
}
.avanti-toast-enter-active,
.avanti-toast-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.avanti-toast-enter-from,
.avanti-toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 12px);
}
</style>
