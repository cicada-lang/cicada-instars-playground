import Vue from "vue"
import App from "./app.vue"
import router from "./router"
import "./styles/reset.css"

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app")
