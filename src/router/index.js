import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'About',
    component: () => import('../views/Home.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
