<template>
  <div v-loading="loading">
    <el-button type="primary" @click="getPicList">
      获取图片
    </el-button>
    <Pagination
      :tableTotal="tableTotal"
      @getTableList="getTableList"
    ></Pagination>
    <el-row>
      <template v-for="(item, index) in imgList">
        <el-col :span="6" :key="index">
          <img :src="item" alt="" srcset="" />
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script>
import { getPic } from "api/reptile";
import Pagination from "components/Pagination";
export default {
  data() {
    return {
      imgList: [],
      loading: false,
      tableTotal: 0,
      page: {
        pageNo: 1,
        pageSize: 100
      }
    };
  },
  methods: {
    getTableList(v) {
      this.page.pageNo = v.pageNo;
      this.page.pageSize = v.pageSize;
      this.getPicList();
    },
    getPicList() {
      this.loading = true;
      getPic(this.page).then(res => {
        this.imgList = res.data.data.list;
        this.tableTotal = Number(res.data.data.count) * this.page.pageSize;
        this.loading = false;
      });
    }
  },
  components: {
    Pagination
  }
};
</script>
