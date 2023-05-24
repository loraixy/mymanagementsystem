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
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import('../views/LoginView.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('lor')
  console.log(token, to.path !== '/login')
  if (!token && to.path !== '/login') {

    console.log(to, from)

    // next({ name: 'login' })
    window.location.hash = "/login"
    console.log(window.location)

  } else if (token && to.path === '/login') {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
