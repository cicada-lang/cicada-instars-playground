import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"
import Playground from "../views/playground.vue"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: Playground,
  },
]

const router = new VueRouter({
  routes,
})

export default router
