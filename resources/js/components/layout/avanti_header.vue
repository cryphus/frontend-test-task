<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AvantiLogo from '../ui/avanti_logo.vue'
import AvantiNavItem from './avanti_nav_item.vue'
import AvantiSupportButton from './avanti_support_button.vue'
import AvantiBreadcrumbs from './avanti_breadcrumbs.vue'
import AvantiUserChip from './avanti_user_chip.vue'
import { avantiNavItems, avantiSupport } from '../../data/avanti_navigation.js'
import { useAvantiProfile } from '../../composables/avanti_use_profile.js'

const route = useRoute()
const { state, fullName, initials } = useAvantiProfile()

const breadcrumbs = computed(() => [
  { label: 'Piattaforma', to: { name: 'home' } },
  { label: route.meta.title ?? 'Home' },
])
</script>

<template>
  <header class="avanti-header">
    <div class="avanti-header__top">
      <div class="avanti-header__inner avanti-header__inner--top">
        <RouterLink :to="{ name: 'home' }" class="avanti-header__brand" aria-label="Avanti — Home">
          <AvantiLogo class="avanti-header__logo" />
        </RouterLink>
        <nav class="avanti-header__nav" aria-label="Navigazione principale">
          <AvantiNavItem v-for="item in avantiNavItems" :key="item.label" v-bind="item" />
        </nav>
        <AvantiSupportButton
          class="avanti-header__support"
          :href="avantiSupport.href"
          :label="avantiSupport.label"
          :count="state.notifications"
        />
        <AvantiSupportButton
          class="avanti-header__support-compact"
          :href="avantiSupport.href"
          :label="avantiSupport.label"
          compact
        />
      </div>
    </div>
    <div class="avanti-header__inner avanti-header__inner--bottom">
      <AvantiUserChip
        class="avanti-header__user"
        :name="fullName"
        :email="state.user?.email"
        :avatar="state.user?.avatar"
        :initials="initials"
      />
      <AvantiBreadcrumbs class="avanti-header__crumbs" :items="breadcrumbs" />
      <nav class="avanti-header__pills" aria-label="Navigazione">
        <AvantiNavItem
          v-for="item in avantiNavItems"
          :key="item.label"
          :to="item.to"
          :label="item.shortLabel"
          variant="pill"
        />
      </nav>
    </div>
  </header>
</template>

<style scoped>
.avanti-header__top {
  border-bottom: 1px solid var(--avanti-border);
  background: var(--avanti-surface);
}
.avanti-header__inner {
  display: flex;
  align-items: center;
  max-width: var(--avanti-container);
  margin: 0 auto;
  padding: 0 var(--avanti-gutter);
}
.avanti-header__inner--top {
  gap: 52px;
  min-height: 110px;
}
.avanti-header__inner--bottom {
  justify-content: space-between;
  gap: 20px;
  min-height: 60px;
}
.avanti-header__brand {
  flex-shrink: 0;
}
.avanti-header__nav {
  display: flex;
  flex: 1;
  gap: 12px;
  max-width: 660px;
}
.avanti-header__support {
  margin-left: auto;
}
.avanti-header__support-compact,
.avanti-header__pills {
  display: none;
}

@media (max-width: 1023px) {
  .avanti-header__inner--top {
    gap: 24px;
  }
  .avanti-header__nav :deep(.avanti-icon) {
    display: none;
  }
}

@media (max-width: 767px) {
  .avanti-header__top {
    border-bottom-color: var(--avanti-border-strong);
  }
  .avanti-header__inner--top {
    justify-content: space-between;
    min-height: 55px;
  }
  .avanti-header__logo {
    font-size: 22px;
    gap: 6px;
  }
  .avanti-header__logo :deep(.avanti-logo__mark) {
    width: 34px;
  }
  .avanti-header__nav,
  .avanti-header__support,
  .avanti-header__crumbs {
    display: none;
  }
  .avanti-header__support-compact {
    display: inline-flex;
  }
  .avanti-header__inner--bottom {
    gap: 8px;
    min-height: 50px;
    padding-top: 8px;
    padding-bottom: 4px;
  }
  .avanti-header__user :deep(.avanti-user-chip__email) {
    display: none;
  }
  .avanti-header__user :deep(.avanti-avatar) {
    width: 32px;
    height: 32px;
  }
  .avanti-header__pills {
    display: flex;
    gap: 8px;
  }
}

@media (max-width: 359px) {
  .avanti-header__user :deep(.avanti-user-chip__name) {
    display: none;
  }
}
</style>
