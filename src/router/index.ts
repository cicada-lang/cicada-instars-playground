import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"
import * as Playground from "../pages/playground"
import About from "../pages/about.vue"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: Playground.Page,
  },
  {
    path: "/about",
    component: About,
  },
]

const router = new VueRouter({
  mode: "history",
  routes,
})

export default router
