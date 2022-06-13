import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/demo/HomeView.vue'
import LoginPage from '../views/demo/LoginPage.vue'
import DemoDrag from '../views/demo/DemoDrag.vue'
import DemoDragClone from '../views/demo/DemoDragClone.vue'
import DemoSavedList from '../views/demo/DemoSavedList.vue'


import store from '../store/index.js'

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
    component: DemoDrag
  },
  {
    path: '/demo/create',
    name: 'TestDragClone',
    component: DemoDragClone
  },
  {
    path: '/demo/saved_list',
    name: 'DemoSavedList',
    component: DemoSavedList
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})


router.beforeEach((to, from, next) => {
  console.log('store!!!');
  console.log(store);
  if (to.meta.isPublic) {
    console.log('router 誰でもアクセス可能');
    next()
  } else if (!to.meta.isPublic && localStorage.accessToken) {
    console.log('router ログイン必要 遷移可能');
    next()
  } else if (!to.meta.isPublic && !localStorage.accessToken) {
    console.log('router ログイン必要 遷移不可');
    next('/login')
  }
  if (to.matched.some(page => page.meta.isPublic) || store.state.auth.token) {
    next()
  } else {
    next('/login')
  }
})

export default router
