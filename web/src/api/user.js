import Axios from "@/utils/axios_request";
const api = process.env.VUE_APP_BASE_API;
export const getUserList = () => {
  //获取搜索结果请求
  return Axios({
    url: `${api}/home/userList`,
    method: "get"
  });
};
export const delUser = id => {
  //获取搜索结果请求
  return Axios({
    url: `${api}/home/userOperation/del/${id}`,
    method: "get"
  });
};
