import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import Home from "../components/home.vue";
import Start from "../components/start.vue";
const routes = [
  { path: "/", component: Start },
  { path: "/home", component: Home },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
