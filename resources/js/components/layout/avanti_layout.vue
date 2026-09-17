<script setup>
import { onMounted } from 'vue'
import AvantiHeader from './avanti_header.vue'
import AvantiBottomNav from './avanti_bottom_nav.vue'
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
    <AvantiBottomNav />
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
    padding-top: 16px;
    padding-bottom: calc(82px + env(safe-area-inset-bottom));
  }
}
</style>
