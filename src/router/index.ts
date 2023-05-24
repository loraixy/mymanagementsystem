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
        meta: {
          title: 'itemone',
          permiss: '1',
          isSave: false
        },
        component: () => import('../views/system/NavigatorOne/ItemOne/ItemOne.vue')
      },
      {
        path: '/item-two',
        name: 'itemTwo',
        meta: {
          title: 'itemTwo',
          permiss: '1',
          isSave: false
        },
        component: () => import('../views/system/NavigatorOne/ItemTwo/ItemTwo.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import('../views/LoginView/LoginView.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // 浏览器那个标题
  document.title = `${to.meta.title}`
  console.log(to, from)
  const token = localStorage.getItem('lor')
  console.log(token, to.path !== '/login')
  if (!token && to.path !== '/login') {

    console.log(to, from)

    next({ name: 'login' })
    /** 这里不使用next 是因为我还在login页面的时候手动更改浏览器的地址会导致虽然重新回到login页面，
     *  但是浏览器的地址却没有发生变化
     *  主要还是回到/ 会出现
     */

    setTimeout(() => {
      window.location.hash = "/login"
    }, 0);
    console.log(window.location)

  } else if (token && to.path === '/login') {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
