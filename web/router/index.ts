import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"
import * as Playground from "../pages/playground"
import Help from "../pages/help.vue"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  { path: "/", component: Playground.Page },
  { path: "/:project_id", component: Playground.Page },
  { path: "/help", component: Help },
]

const router = new VueRouter({
  mode: "history",
  routes,
})

export default router
