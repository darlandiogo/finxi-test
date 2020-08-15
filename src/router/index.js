import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
   // name: 'Home',
    component: Home
  },
  {
    path: '/itens-salvos',
    //name: 'Salvos',
    component: () => import('../views/Salvos.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  //base: process.env.BASE_URL,
  routes
})

export default router
