import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        auth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/login/login.vue")
    },
    {
      path: "/reptile",
      name: "reptile",
      component: () => import("../views/reptile.vue")
    }
  ]
});
