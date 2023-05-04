import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Router from 'vue-router'
import login from '../components/login.vue'
import Home from '../components/Home.vue'


const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path:'/login',
    name:'login',
    component: () => import('@/components/login.vue')
  },
  {
    path:'/home',
    name:'home',
    component: () => import('@/components/Home.vue')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//挂载路由导航守卫
router.beforeEach((to,from,next) => {
  //to将要访问的路径
  //from代表从哪个路径跳转过来
  //next是一个函数，表示放行
  //next() 放行    next('/login')强制跳转
  if(to.path === '/login') return next();
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
  next()
})

export default router
