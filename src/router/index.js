import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import City from "@/views/City";
import Region from "@/views/Region";
import Favorites from "@/views/Favorites";
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
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
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
