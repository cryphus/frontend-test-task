<script setup>
import AvantiAvatar from '../ui/avanti_avatar.vue'

defineProps({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  avatar: { type: String, default: '' },
  initials: { type: String, default: '' },
})
</script>

<template>
  <div class="avanti-user-chip">
    <AvantiAvatar :src="avatar" :alt="name" :initials="initials" />
    <div class="avanti-user-chip__text">
      <span class="avanti-user-chip__name">{{ name }}</span>
      <span v-if="email" class="avanti-user-chip__email">{{ email }}</span>
    </div>
  </div>
</template>

<style scoped>
.avanti-user-chip {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}
.avanti-user-chip__text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.avanti-user-chip__name {
  color: var(--avanti-text-strong);
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.avanti-user-chip__email {
  color: var(--avanti-muted);
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
