import router from "./router/index";
import store from "./store/index";

router.beforeEach((to, from, next) => {
  debugger;
  if (store.getters.token) {
    if (to.path == "/login") {
      next("/");
    } else {
      next();
    }
  } else {
    if (to.path == "/login" || !to.meta.auth) {
      next();
    } else {
      next("/login");
    }
  }
  // if (to.meta.auth) {
  //   if (store.getters.token) {
  //     next();
  //   } else {
  //     next("/login");
  //   }
  // } else {
  //   next();
  // }
});
