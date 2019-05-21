import Axios from "@/utils/axios_request";
const api = process.env.VUE_APP_BASE_API;
export const checkToken = () => {
  //获取搜索结果请求
  return Axios({
    url: `${api}/checkToken`,
    method: "get"
  });
};
