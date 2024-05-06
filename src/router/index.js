import { createRouter, createWebHistory } from 'vue-router'
import Login from "../views/Login.vue";
import Home from "../views/Index.vue"
import Bookings from "../views/Bookings.vue"
import addRoute from "../views/addRoute.vue"
import addLocation from "../views/addLocation.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component:Home
    },
    {
      path: '/bookings',
      name: 'bookings',
      component:Bookings
    },
    {
      path: '/addRoute',
      name: 'addRoute',
      component:addRoute
    },
    {
      path: '/addLocation',
      name: 'addLocation',
      component:addLocation
    },
  ]
})
router.beforeEach((to,from,next)=>{
  if (!localStorage.getItem('admin')){
    if (to.name==='login'){
      next();
    }else {
      router.push('/login')
    }
  }else {
    next();
  }
})
export default router
