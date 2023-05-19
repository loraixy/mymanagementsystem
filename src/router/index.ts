import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          title: '系统首页',
          permiss: '1',
          isSave: false
        },
        component: () => import('../views/DashBoard.vue')
      },
      {
        path: '/item-one',
        name: 'itemOne',
        component: () => import('../views/NavigatorOne/ItemOne/ItemOne.vue')
      },
      {
        path: '/item-two',
        name: 'itemTwo',
        component: () => import('../views/NavigatorOne/ItemTwo/ItemTwo.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
