import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import City from "@/views/City";
import Region from "@/views/Region";
import Favorites from "@/views/Favorites";
import w10Days from "@/views/10Days";
import Month from "@/views/Month";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/city/:id',
    name: 'City',
    component: City
  },
  {
    path: '/region',
    name: 'Region',
    component: Region
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: Favorites
  },
  {
    path: '/10days',
    name: '10Days',
    component: w10Days
  },
  {
    path: '/month',
    name: 'Month',
    component: Month
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/*',
    redirect: {name: 'City', params: { id: 0 }}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
