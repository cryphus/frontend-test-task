<script setup>
import AvantiAvatar from '../ui/avanti_avatar.vue'
import AvantiBadge from '../ui/avanti_badge.vue'

defineProps({
  name: { type: String, required: true },
  message: { type: String, required: true },
  avatar: { type: String, default: '' },
  unread: { type: Number, default: 0 },
  href: { type: String, default: '#assistenza' },
})
</script>

<template>
  <a class="avanti-chat-popup" :href="href">
    <AvantiAvatar :src="avatar" :alt="name" size="lg" online />
    <span class="avanti-chat-popup__body">
      <span class="avanti-chat-popup__row">
        <span class="avanti-chat-popup__name">{{ name }}</span>
        <AvantiBadge v-if="unread" class="avanti-chat-popup__badge" variant="count">{{ unread }}</AvantiBadge>
      </span>
      <span class="avanti-chat-popup__message">{{ message }}</span>
    </span>
  </a>
</template>

<style scoped>
.avanti-chat-popup {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 24px 16px;
  border-radius: var(--avanti-radius-lg);
  background: var(--avanti-primary);
  color: #fff;
  box-shadow: var(--avanti-shadow-popup);
  transition: transform 0.15s ease;
}
.avanti-chat-popup:hover {
  transform: translateY(-2px);
}
.avanti-chat-popup:focus-visible {
  outline: 2px solid var(--avanti-text);
  outline-offset: 2px;
}
.avanti-chat-popup__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.avanti-chat-popup__row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}
.avanti-chat-popup__name {
  font-size: 22px;
  font-weight: 500;
  line-height: 1.2;
}
.avanti-chat-popup__badge {
  box-shadow: none;
  background: #b91c1c;
}
.avanti-chat-popup__message {
  overflow: hidden;
  font-size: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
