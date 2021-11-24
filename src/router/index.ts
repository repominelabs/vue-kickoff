import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LayoutDefault from '../views/layouts/LayoutDefault.vue'
import LayoutNav from '../views/layouts/LayoutNav.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/pages/Home.vue'),
    meta: {
      layout: LayoutNav
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/pages/Login.vue'),
    meta: {
      layout: LayoutDefault
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/pages/Register.vue'),
    meta: {
      layout: LayoutDefault
    }
  },
  {
    path: '/administration',
    name: 'Administration',
    component: () => import('../views/pages/Administration.vue'),
    meta: {
      layout: LayoutNav,
      search: 'user'
    }
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('../views/pages/Products.vue'),
    meta: {
      layout: LayoutNav,
      search: 'product'
    }
  },
  {
    path: '/pricing',
    name: 'Pricing',
    component: () => import('../views/pages/Pricing.vue'),
    meta: {
      layout: LayoutNav
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router