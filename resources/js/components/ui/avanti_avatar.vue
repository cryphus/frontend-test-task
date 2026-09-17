<script setup>
defineProps({
  src: { type: String, default: '' },
  alt: { type: String, default: '' },
  initials: { type: String, default: '' },
  size: { type: String, default: 'md', validator: (v) => ['sm', 'md', 'lg'].includes(v) },
  online: { type: Boolean, default: false },
  ringed: { type: Boolean, default: false },
})
</script>

<template>
  <span class="avanti-avatar" :class="[`avanti-avatar--${size}`, { 'avanti-avatar--ringed': ringed }]">
    <img v-if="src" class="avanti-avatar__image" :src="src" :alt="alt" />
    <span v-else class="avanti-avatar__initials">{{ initials }}</span>
    <span v-if="online" class="avanti-avatar__dot" />
  </span>
</template>

<style scoped>
.avanti-avatar {
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
}
.avanti-avatar__image,
.avanti-avatar__initials {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
.avanti-avatar__initials {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--avanti-primary-soft);
  color: var(--avanti-primary);
  font-weight: 600;
}
.avanti-avatar--sm {
  width: 32px;
  height: 32px;
}
.avanti-avatar--md {
  width: 40px;
  height: 40px;
}
.avanti-avatar--lg {
  width: 60px;
  height: 60px;
}
.avanti-avatar--ringed .avanti-avatar__image,
.avanti-avatar--ringed .avanti-avatar__initials {
  border: 1.5px solid var(--avanti-primary);
}
.avanti-avatar__dot {
  position: absolute;
  right: -6px;
  bottom: -2px;
  width: 19px;
  height: 19px;
  border: 3px solid #fff;
  border-radius: 50%;
  background: var(--avanti-primary);
}
</style>
