import Vue from "vue";
import App from "./App.vue";
import Element from "element-ui";
import "assets/css/resert.css";
import "assets/css/element-variables.scss";
import router from "./router/index";
import store from "./store/index";
import "assets/icon/iconfont.css";

Vue.config.productionTip = false;

Vue.use(Element);

router.beforeEach((to, from, next) => {
  if (localStorage.hasOwnProperty("token")) {
    next();
  } else {
    if (
      to.path === "/login" ||
      to.path === "/register" ||
      to.path === "/forget"
    ) {
      next();
    } else {
      next("/login");
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
