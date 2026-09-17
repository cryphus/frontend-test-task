<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AvantiLogo from '../ui/avanti_logo.vue'
import AvantiNavItem from './avanti_nav_item.vue'
import AvantiSupportButton from './avanti_support_button.vue'
import AvantiNotificationButton from './avanti_notification_button.vue'
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
          <AvantiNavItem
            v-for="item in avantiNavItems"
            :key="item.label"
            :to="item.to"
            :label="item.label"
            :icon="item.icon"
          />
        </nav>
        <AvantiSupportButton
          class="avanti-header__support"
          :href="avantiSupport.href"
          :label="avantiSupport.label"
          :count="state.notifications"
        />
        <div class="avanti-header__mobile-tools">
          <AvantiNotificationButton :count="state.notifications" />
          <AvantiUserChip :name="initials" :avatar="state.user?.avatar" :initials="initials" compact />
        </div>
      </div>
    </div>
    <div class="avanti-header__inner avanti-header__inner--bottom">
      <AvantiUserChip
        :name="fullName"
        :email="state.user?.email"
        :avatar="state.user?.avatar"
        :initials="initials"
      />
      <AvantiBreadcrumbs :items="breadcrumbs" />
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
  display: flex;
  flex-shrink: 0;
  min-width: 152px;
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
.avanti-header__mobile-tools {
  display: none;
  align-items: center;
  gap: 12px;
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
  .avanti-header__inner--top {
    justify-content: space-between;
    min-height: 62px;
  }
  .avanti-header__logo {
    gap: 6px;
    color: var(--avanti-text);
    font-size: 22px;
    line-height: 27px;
    letter-spacing: -1px;
  }
  .avanti-header__logo :deep(.avanti-logo__mark) {
    width: 34px;
  }
  .avanti-header__brand {
    min-width: 0;
  }
  .avanti-header__nav,
  .avanti-header__support,
  .avanti-header__inner--bottom {
    display: none;
  }
  .avanti-header__mobile-tools {
    display: flex;
  }
}
</style>
