<script setup>
import { useRoute } from 'vue-router'
import AvantiPageState from '../components/ui/avanti_page_state.vue'
import AvantiButton from '../components/ui/avanti_button.vue'

const route = useRoute()
</script>

<template>
  <AvantiPageState :title="route.meta.title" text="Questa sezione sarà disponibile a breve.">
    <AvantiButton variant="outline" size="sm" :to="{ name: 'profile' }">Vai al profilo</AvantiButton>
  </AvantiPageState>
</template>
