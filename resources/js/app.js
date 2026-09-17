import '../css/app.css'
import { createApp } from 'vue'
import AvantiApp from './avanti_app.vue'
import { avantiRouter } from './router/avanti_router.js'

createApp(AvantiApp).use(avantiRouter).mount('#app')
