<script setup>
import { computed } from 'vue'

const props = defineProps({
  items: { type: Array, required: true },
})

const crumbs = computed(() =>
  props.items.map((item, index) => ({ ...item, linked: Boolean(item.to) && index < props.items.length - 1 })),
)
</script>

<template>
  <nav class="avanti-breadcrumbs" aria-label="Breadcrumb">
    <ol class="avanti-breadcrumbs__list">
      <li v-for="item in crumbs" :key="item.label" class="avanti-breadcrumbs__item">
        <RouterLink v-if="item.linked" :to="item.to" class="avanti-breadcrumbs__link">
          {{ item.label }}
        </RouterLink>
        <span v-else aria-current="page" class="avanti-breadcrumbs__current">{{ item.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.avanti-breadcrumbs__list {
  display: flex;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 14px;
  font-weight: 500;
  line-height: 17px;
}
.avanti-breadcrumbs__item {
  display: flex;
  gap: 8px;
  color: var(--avanti-muted);
}
.avanti-breadcrumbs__item + .avanti-breadcrumbs__item::before {
  content: '/';
  color: var(--avanti-muted-light);
}
.avanti-breadcrumbs__link:hover {
  color: var(--avanti-primary);
}
.avanti-breadcrumbs__current {
  color: var(--avanti-text);
  font-weight: 600;
}
</style>
