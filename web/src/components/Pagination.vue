<template>
  <div class="block">
    <el-pagination
      :pager-count="7"
      :background="true"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[100, 200, 500, 1000]"
      :page-size="100"
      layout=" prev, pager, next, jumper, total"
      :total="tableTotal"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: ["tableTotal"],
  data() {
    return {
      currentPage: 1, //默认显示页数
      pageNo: 1, //当前页
      pageSize: 100, //每页条
      total: 0 //总数
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageNo = 1;
      this.currentPage = 1;
      this.getTableList();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.getTableList();
    },
    getTableList() {
      let page = { pageSize: this.pageSize, pageNo: this.pageNo };
      this.$emit("getTableList", page);
    },
    changeCurrentPage(v) {
      this.currentPage = v;
    }
  }
};
</script>

<style>
.block .el-pagination__sizes {
  margin: 0 20px 0 20px;
}
.block .el-pagination__total {
  margin-left: 20px;
}
.block .el-pagination__editor.el-input {
  width: 70px;
}
.sideBar .el-dialog {
  min-width: 800px;
}
</style>

<style lang="scss" scoped>
.block {
  text-align: left;
  margin-top: 20px;
  padding-bottom: 20px;
}
</style>
