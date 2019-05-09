import Axios from "@/utils/axios_request";
export const Login = data => {
  //获取搜索结果请求
  return Axios({
    url: "login",
    method: "post",
    data
  });
};
export const Register = val => {
  debugger;
  let data = {
    username: val.username,
    password: val.password
  };
  //获取搜索结果请求
  return Axios({
    url: "register",
    method: "post",
    data
  });
};
