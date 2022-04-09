import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserSelect from '../views/UserSelect.vue'
import FlashBack from '../views/FlashBack.vue'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/UserSelect',
    name: 'UserSelect',
    component: UserSelect
  },
  {
    path: '/FlashBack',
    name: 'FlashBack',
    component: FlashBack,
    props: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
