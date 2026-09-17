<script setup>
import AvantiAvatar from '../ui/avanti_avatar.vue'

defineProps({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  avatar: { type: String, default: '' },
  initials: { type: String, default: '' },
  compact: { type: Boolean, default: false },
})
</script>

<template>
  <div class="avanti-user-chip" :class="{ 'avanti-user-chip--compact': compact }">
    <AvantiAvatar :src="avatar" :alt="name" :initials="initials" :size="compact ? 'sm' : 'md'" :ringed="compact" />
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
  color: var(--avanti-text);
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.avanti-user-chip__email {
  color: var(--avanti-muted);
  font-size: 12px;
  line-height: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.avanti-user-chip--compact {
  gap: 6px;
}
.avanti-user-chip--compact .avanti-user-chip__name {
  color: var(--avanti-text);
  font-size: 13px;
  font-weight: 600;
}
</style>
