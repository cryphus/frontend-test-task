<script setup>
import { onMounted } from 'vue'
import AvantiHeader from './avanti_header.vue'
import AvantiToast from '../ui/avanti_toast.vue'
import { useAvantiProfile } from '../../composables/avanti_use_profile.js'

const { load } = useAvantiProfile()

onMounted(load)
</script>

<template>
  <div class="avanti-layout">
    <AvantiHeader />
    <main class="avanti-layout__main">
      <slot />
    </main>
    <AvantiToast />
  </div>
</template>

<style scoped>
.avanti-layout {
  min-height: 100vh;
  min-height: 100dvh;
  background: var(--avanti-page);
}
.avanti-layout__main {
  max-width: var(--avanti-container);
  margin: 0 auto;
  padding: 0 var(--avanti-gutter) 40px;
}

@media (max-width: 767px) {
  .avanti-layout__main {
    padding-bottom: 32px;
  }
}
</style>
