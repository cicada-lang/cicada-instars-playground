import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"
import * as Playground from "../pages/playground"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: Playground.Page,
  },
]

const router = new VueRouter({
  mode: "history",
  routes,
})

export default router
