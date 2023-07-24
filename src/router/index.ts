import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw, RouteMeta } from 'vue-router'
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
    premiss?: '1',
    // 在工作中需要做许多关于提示保存的, 然后以前的项目经常没有,用户那边需要关闭时的一个保存提示.就加上了这个
    isSave?: boolean,
    menu?: string
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
    children: [
      {
        path: '/',
        redirect: '/dashboard'
      },
      {
        path: 'dashboard',
        name: 'DashBoard',
        meta: {
          savePage: true,
          title: '系统首页',
          premiss: '1',
          isSave: false
        },
        component: () => import('../views/system/DashBoard.vue')
      },
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

const pages = import.meta.glob('../views/pages/**/page.ts', { eager: true, import: 'default' })

// console.log('pages =>', pages)

// console.log('vueFile => ', import.meta.glob('../views/pages/*/*/[^/]*.vue'))



function generatePathConfig(): Record<string, any> {
  // 扫描 src/pages 下的所有具有路由文件
  const modules = import.meta.glob('../views/pages/*/*/[^/]*.vue');

  const pathConfig = {} as {
    [key: string]: () => Promise<unknown>
  };
  Object.keys(modules).forEach((filePath) => {

    const routePath = filePath
      .split(filePath.split('/').pop() as string)[0]

    pathConfig[routePath] = modules[filePath];
  });
  return pathConfig;
}
const pagesComps = generatePathConfig()


// Object.entries, 可以把一个数组对象拆成元组数组
const testRoute: RouteRecordRaw[] = Object.entries(pages).map(([path, meta]) => {
  // console.log(path, meta)
  const pageJSPath = path
  path = path.replace('../views/pages', '').replace('/page.ts', '')
  const comPath = pageJSPath.replace('page.ts', '')
  console.log('comPath =>', comPath)
  return {
    path,
    name: path.split('/').filter(Boolean).join('-') || 'index',
    component: pagesComps[comPath],
    meta: meta as RouteMeta | undefined,
  }
})

routes.forEach(item => {
  if (item.children) {
    item.children = [
      ...item.children,
      ...testRoute
    ]
  }
})

console.log('pages =>', testRoute, pagesComps, routes)

const router = createRouter({
  linkActiveClass: 'route-link-active',
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // 浏览器那个标题
  console.log(from)
  document.title = `${to.meta.title}  ${import.meta.env.VITE_APP_TITLE}`
  // 明天解决一下相同路径问题has模式的，得搞一个历史路由模式
  // console.log(to, from)
  const token = localStorage.getItem('lor')
  // console.log(token, to.path !== '/login' )
  if (!token && to.path !== '/login') {

    // console.log(to, from)

    next('/login')
    /** 这里不使用next 是因为我还在login页面的时候手动更改浏览器的地址会导致虽然重新回到login页面，
     *  但是浏览器的地址却没有发生变化
     *  主要还是回到/ 会出现
     */
    // router.push('/login')
    nextTick(() => {
      // console.log('你什么时候执行')
      window.location.hash = "/login"
    })
    // console.log(window.location)

  } else if (token && to.path === '/login') {
    next('/dashboard')
  } else {
    // console.log('你执行了吗')
    next()
  }
})

export default router
