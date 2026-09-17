<script setup>
defineProps({
  size: { type: String, default: 'lg', validator: (v) => ['sm', 'md', 'lg'].includes(v) },
})
</script>

<template>
  <span class="avanti-logo" :class="`avanti-logo--${size}`">
    <img class="avanti-logo__mark" src="/images/avanti_logo_mark.svg" alt="" />
    <span class="avanti-logo__text">Avanti</span>
  </span>
</template>

<style scoped>
.avanti-logo {
  display: inline-flex;
  align-items: center;
  color: var(--avanti-text-strong);
  font-weight: 600;
  letter-spacing: -0.03em;
}
.avanti-logo__mark {
  height: auto;
}
.avanti-logo--lg {
  gap: 12px;
  font-size: 32px;
  font-weight: 700;
  line-height: 39px;
  letter-spacing: -1.6px;
  color: #000;
}
.avanti-logo--lg .avanti-logo__mark {
  width: 48px;
}
.avanti-logo--md {
  gap: 10px;
  font-size: 30px;
}
.avanti-logo--md .avanti-logo__mark {
  width: 46px;
}
.avanti-logo--sm {
  gap: 6px;
  font-size: 22px;
}
.avanti-logo--sm .avanti-logo__mark {
  width: 34px;
}
</style>
