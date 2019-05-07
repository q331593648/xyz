import Axios from "@/utils/axios_request";
export const Login = data => {
  //获取搜索结果请求
  return Axios({
    url: "login",
    method: "post",
    data
  });
};
