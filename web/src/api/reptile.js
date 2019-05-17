import Axios from "@/utils/axios_request";
export const getPic = data => {
  //获取搜索结果请求
  return Axios({
    url: "reptile",
    method: "post",
    data
  });
};
