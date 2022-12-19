// 需要鉴权的业务路由
import { RouteRecordRaw } from 'vue-router'

const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/account/Login.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../layout/Index.vue'),
  },
]

export default asyncRoutes
