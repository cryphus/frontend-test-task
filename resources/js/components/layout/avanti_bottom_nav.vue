<script setup>
import AvantiNavItem from './avanti_nav_item.vue'
import AvantiSupportButton from './avanti_support_button.vue'
import { avantiNavItems, avantiSupport } from '../../data/avanti_navigation.js'
</script>

<template>
  <nav class="avanti-bottom-nav" aria-label="Navigazione principale">
    <AvantiNavItem
      v-for="item in avantiNavItems"
      :key="item.label"
      :to="item.to"
      :label="item.label"
      :icon="item.icon"
      variant="stacked"
    />
    <AvantiSupportButton
      class="avanti-bottom-nav__support"
      :href="avantiSupport.href"
      :label="avantiSupport.label"
      stacked
    />
  </nav>
</template>

<style scoped>
.avanti-bottom-nav {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 50;
  display: none;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 62px;
  padding: 8px 20px calc(8px + env(safe-area-inset-bottom));
  border-top: 2px solid var(--avanti-primary);
  background: var(--avanti-surface);
}
.avanti-bottom-nav__support {
  flex-shrink: 0;
}

@media (max-width: 767px) {
  .avanti-bottom-nav {
    display: flex;
  }
}

@media (max-width: 359px) {
  .avanti-bottom-nav {
    gap: 6px;
    padding-right: 10px;
    padding-left: 10px;
  }
}
</style>
