import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import exceptionRoutes from '@/router/route.exception'
import asyncRoutes from '@/router/route.async'
import commonRoutes from '@/router/route.common'

const routes: Array<RouteRecordRaw> = [
  // 无鉴权的业务路由 ex:登录
  ...commonRoutes,
  // 带鉴权的业务路由
  ...asyncRoutes,
  // 异常页必须放在路由匹配规则的最后
  ...exceptionRoutes,
]

const router: Router = createRouter({
  // 新的vue-router4 使用 history路由模式 和 base前缀
  history: createWebHistory(import.meta.env.VITE_BASE),
  routes,
})

// 未登录白名单
// const whiteList = ['/login'];
// 路由守卫
router.beforeEach((to, from, next) => {
  // 页签标题
  document.title = (to.meta.title as string) || import.meta.env.VITE_APP_TITLE
  if (!NProgress.isStarted()) {
    NProgress.start()
  }
  next()
  // if (localStorage.getItem('token')) {
  //   if (to.path === '/login') {
  //     next('/home')
  //   } else {
  //     next()
  //   }
  // } else {
  //   if (whiteList.includes(to.path)) {
  //     next()
  //   } else {
  //     next('/login')
  //   }
  // }
})

router.afterEach((to, from) => {
  NProgress.done()
})

export default router
