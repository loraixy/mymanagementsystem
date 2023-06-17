import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomeView from '../views/system/HomeView.vue'
import { nextTick } from 'vue'

declare module 'vue-router' {
  interface RouteMeta {
    // 是可选的
    isAdmin?: boolean
    // 每个路由都必须声明
    requiresAuth?: boolean
    savePage: boolean,
    title: string,
    permiss?: '1',
    // 在工作中需要做许多关于提示保存的, 然后以前的项目经常没有,用户那边需要关闭时的一个保存提示.就加上了这个
    isSave?: boolean
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
    children: [
      {
        path: 'dashboard',
        name: 'DashBoard',
        meta: {
          savePage: true,
          title: '系统首页',
          permiss: '1',
          isSave: false
        },
        component: () => import('../views/system/DashBoard.vue')
      },
      {
        path: 'item-one',
        name: 'ItemOne',
        meta: {
          savePage: true,
          title: 'itemone',
          permiss: '1',
          isSave: false
        },
        component: () => import('../views/pages/NavigatorOne/ItemOne/ItemOne.vue')
      },
      {
        path: 'item-two',
        name: 'ItemTwo',
        meta: {
          savePage: true,
          title: 'itemTwo',
          permiss: '1',
          isSave: false
        },
        component: () => import('../views/pages/NavigatorOne/ItemTwo/ItemTwo.vue')
      },
      {
        path: 'virtual-list',
        name: 'HhhhView',
        meta: {
          savePage: true,
          title: '虚拟列表',
          permiss: '1',
          // 在工作中需要做许多关于提示保存的, 然后以前的项目经常没有,用户那边需要关闭时的一个保存提示.就加上了这个
          isSave: false
        },
        component: () => import('../views/pages/Navigatorhhhhh/HhhhView.vue')
      },
      {
        path: 'group-one',
        name: 'GroupOne',
        meta: {
          savePage: true,
          title: '树形数据',
          permiss: '1',
          // 在工作中需要做许多关于提示保存的, 然后以前的项目经常没有,用户那边需要关闭时的一个保存提示.就加上了这个
          isSave: false
        },
        component: () => import('../views/pages/NavigatorOnetwo/GroupOne.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'LoginView',
    meta: {
      savePage: false,
      title: '登录'
    },
    component: () => import('../views/system/LoginView/LoginView.vue')
  },
]

const router = createRouter({
  linkActiveClass: 'route-link-active',
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // 浏览器那个标题
  document.title = `${to.meta.title} | ${import.meta.env.VITE_APP_TITLE}`
  // 明天解决一下相同路径问题has模式的，得搞一个历史路由模式
  console.log(to, from)
  const token = localStorage.getItem('lor')
  // console.log(token, to.path !== '/login' )
  if (!token && to.path !== '/login') {

    console.log(to, from)

    next('/login')
    /** 这里不使用next 是因为我还在login页面的时候手动更改浏览器的地址会导致虽然重新回到login页面，
     *  但是浏览器的地址却没有发生变化
     *  主要还是回到/ 会出现
     */
    // router.push('/login')
    nextTick(() => {
      console.log('你什么时候执行')
      window.location.hash = "/login"
    })
    console.log(window.location)

  } else if (token && to.path === '/login') {
    next('/dashboard')
  } else {
    console.log('你执行了吗')
    next()
  }
})

export default router
