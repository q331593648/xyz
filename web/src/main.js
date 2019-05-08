import Vue from "vue";
import App from "./App.vue";
import Element from "element-ui";
import "assets/css/resert.css";
import "assets/css/element-variables.scss";
import router from "./router/index";
import store from "./store/index";
import "assets/icon/iconfont.css";
import "./permission";
Vue.config.productionTip = false;

Vue.use(Element);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
