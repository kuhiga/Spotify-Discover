import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import { store } from "./store/index.js";
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
