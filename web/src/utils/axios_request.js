import axios from "axios";
import { Message, MessageBox } from "element-ui"; //element-ui的message提示
import store from "@/store"; //引入vuex
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 0 // request timeout
});
// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.getters.token && localStorage.getItem("token")) {
      // 让每个请求携带token-- ['Token']为自定义key
      config.headers.common["authorization"] =
        "bearer " + localStorage.getItem("token");
    }
    config.withCredentials = true;
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);
// respone interceptor
service.interceptors.response.use(
  response => {
    //通过自定义状态码来提示***成功事件
    const res = response.data;
    if (res.code !== 0) {
      Message({
        message: res.msg,
        type: "error",
        duration: 5 * 1000
      });
      if (res.code === 70002 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm(
          "你已被登出，可以取消继续留在该页面，或者重新登录",
          "确定登出",
          {
            confirmButtonText: "重新登录",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("userName");
          store.dispatch("token", "");
          store.dispatch("userName", "");
          // store.dispatch("FedLogOut").then(() => {
          location.reload(); // 为了重新实例化vue-router对象 避免bug
          // });
        });
      }
      return Promise.reject("error");
    }
    return response.data;
  },
  error => {
    console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);
export default service;
