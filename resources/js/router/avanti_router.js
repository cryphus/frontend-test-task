import { createRouter, createWebHistory } from 'vue-router'

const AvantiProfilePage = () => import('../pages/avanti_profile_page.vue')
const AvantiPlaceholderPage = () => import('../pages/avanti_placeholder_page.vue')

export const avantiRoutes = [
  { path: '/', redirect: { name: 'profile' } },
  { path: '/home', name: 'home', component: AvantiPlaceholderPage, meta: { title: 'Home' } },
  { path: '/documenti', name: 'documents', component: AvantiPlaceholderPage, meta: { title: 'Documenti' } },
  { path: '/profilo', name: 'profile', component: AvantiProfilePage, meta: { title: 'Profilo' } },
  { path: '/:pathMatch(.*)*', redirect: { name: 'profile' } },
]

export const avantiRouter = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: avantiRoutes,
  scrollBehavior: () => ({ top: 0 }),
})

avantiRouter.afterEach((to) => {
  document.title = `Avanti — ${to.meta.title ?? 'Profilo'}`
})
