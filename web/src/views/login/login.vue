<template>
  <div class="login">
    <el-button type="primary">123</el-button>
    <el-button type="primary" size="medium">123</el-button>
    <el-button type="primary" size="small">123</el-button>
    <el-button type="primary" size="mini">123</el-button>
    <el-link type="primary">主要链接</el-link>
    <el-link type="success">成功链接</el-link>
    <el-link type="warning">警告链接</el-link>
    <el-link type="danger">危险链接</el-link>
    <el-link type="info">信息链接</el-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "123"
    };
  }
};
</script>

<style lang="scss" scoped>
.login {
  background: #fff;
}
</style>
