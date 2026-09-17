<script setup>
import { computed } from 'vue'
import AvantiIcon from '../ui/avanti_icon.vue'

const props = defineProps({
  status: { type: String, required: true, validator: (v) => ['done', 'current', 'pending'].includes(v) },
  icon: { type: String, default: '' },
  size: { type: String, default: 'md', validator: (v) => ['sm', 'md', 'lg'].includes(v) },
})

const iconName = computed(() => (props.status === 'done' ? 'check' : props.icon))
const iconSize = computed(() => (props.size === 'lg' ? 'lg' : 'sm'))
const iconStroke = computed(() => (props.status === 'done' ? 2.5 : undefined))
const classes = computed(() => [`avanti-step-marker--${props.status}`, `avanti-step-marker--${props.size}`])
</script>

<template>
  <span class="avanti-step-marker" :class="classes">
    <AvantiIcon :name="iconName" :size="iconSize" :stroke-width="iconStroke" />
  </span>
</template>

<style scoped>
.avanti-step-marker {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 50%;
  border: 1.5px solid transparent;
}
.avanti-step-marker--sm {
  width: 28px;
  height: 28px;
}
.avanti-step-marker--md {
  width: 36px;
  height: 36px;
}
.avanti-step-marker--lg {
  width: 44px;
  height: 44px;
}
.avanti-step-marker--done {
  background: var(--avanti-primary);
  color: #fff;
}
.avanti-step-marker--current {
  border-color: var(--avanti-primary);
  background: var(--avanti-surface);
  color: var(--avanti-primary);
}
.avanti-step-marker--pending {
  border-color: var(--avanti-border-strong);
  background: var(--avanti-surface-alt);
  color: var(--avanti-muted);
}
.avanti-step-marker--lg.avanti-step-marker--current {
  background: var(--avanti-surface);
}
.avanti-step-marker--lg.avanti-step-marker--pending {
  border-color: transparent;
  color: var(--avanti-muted-light);
}
</style>
