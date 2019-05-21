import Axios from "@/utils/axios_request";
const api = process.env.VUE_APP_BASE_API;
export const Login = data => {
  //获取搜索结果请求
  debugger
  return Axios({
    url: `${api}/login`,
    method: "post",
    data
  });
};
export const Register = val => {
  let data = {
    username: val.username,
    password: val.password
  };
  //获取搜索结果请求
  return Axios({
    url: `${api}/register`,
    method: "post",
    data
  });
};
