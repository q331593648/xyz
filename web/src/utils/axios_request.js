import axios from "axios";
import { Message } from "element-ui"; //element-ui的message提示
// import store from "@/store"; //引入vuex
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 5000 // request timeout
});
// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    debugger;
    // if (store.getters.token) {
    //   // 让每个请求携带token-- ['Token']为自定义key
    //   config.headers["Token"] = localStorage.getItem("Token");
    // }
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
    debugger;
    //通过自定义状态码来提示***成功事件
    let MSG = "";
    const res = response.data;
    if (res.code !== 0) {
      if (res.code === -100) {
        window.localStorage.removeItem("Authorization");
        location.reload();
      }
      MSG = res.msg;
      Message({
        message: MSG,
        type: "error",
        duration: 3 * 1000,
        showClose: true
      });
    }
    return response;
  },
  error => {
    //通过状态码来提示 **失败事件
    let MSG = "";
    if (error.code === "ECONNABORTED") {
      MSG = "连接超时，请刷新页面查看当前状态！";
    } else if (error.message === "Network Error") {
      MSG = "没有网络连接！";
    } else if (error.response) {
      MSG = error.response.data.msg || "请求错误，请重试！";
    }
    Message({
      message: MSG,
      type: "error",
      duration: 3 * 1000,
      showClose: true
    });
    return Promise.reject(error);
  }
);
export default service;
