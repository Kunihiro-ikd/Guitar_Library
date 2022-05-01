import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '../src/components/HelloWorld.vue'
import TestDragAndDrop from '../src/components/dragAndDrop.vue'


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
      {
          path: '/',
          component: HelloWorld,
      },
      {
          path: '/guide',
          component: HelloWorld,
      },
      {
          path: '/test',
          component: TestDragAndDrop,
      },
      

  ],
})

export default router
