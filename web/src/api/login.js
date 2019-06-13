import Axios from "@/utils/axios_request";
const api = process.env.VUE_APP_BASE_API;
export const Login = data => {
  //获取搜索结果请求
  return Axios({
    url: `${api}/user/login`,
    method: "post",
    data
  });
};
export const Register = val => {
  //获取搜索结果请求
  return Axios({
    url: `${api}/user/register`,
    method: "post",
    data: val
  });
};
