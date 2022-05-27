import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginPage from '../views/LoginPage.vue'
import TestDrag from '../views/TestDrag.vue'
import TestDragClone from '../views/TestDragClone.vue'

import Store from '../store/index.js'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: {
      isPublic: true
    }
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      isPublic: true
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/test',
    name: 'TestDrag',
    component: TestDrag
  },
  {
    path: '/testClone',
    name: 'TestDragClone',
    component: TestDragClone
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})


router.beforeEach((to, from, next) => {
  if (to.matched.some(page => page.meta.isPublic) || Store.state.auth.token) {
    next()
  } else {
    next('/login')
  }
})

export default router
