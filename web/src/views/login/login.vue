<template>
  <div class="login">
    <el-row>
      <el-col>登录界面</el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-input placeholder="用户名" v-model.trim="username" clearable>
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-input
          placeholder="密码"
          v-model.trim="password"
          clearable
          type="password"
          @keyup.native.13="login"
        >
          <i slot="prefix" class="el-input__icon el-icon-key"></i>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-button type="text" @click="isReg = true">点击注册</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-button type="primary" @click="login">
          登录
        </el-button>
      </el-col>
    </el-row>

    <el-dialog
      title="用户注册"
      :visible.sync="isReg"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="30%"
      center
    >
      <Register v-if="isReg" @closeReg="closeReg"></Register>
    </el-dialog>
  </div>
</template>

<script>
import { Login } from "@/api/login";
import Register from "./register";
export default {
  data() {
    return {
      username: "",
      password: "",
      isReg: false
    };
  },
  methods: {
    login() {
      if (!this.username || !this.password) {
        this.$message("帐号或密码不能为空");
        return;
      }
      Login({
        username: this.username,
        password: this.password
      }).then(res => {
        localStorage.setItem("userName", res.data.username);
        localStorage.setItem("token", res.data.token);
        this.$store.dispatch("token", res.data.token);
        this.$store.dispatch("userName", res.data.username);
        this.$router.push("/");
      });
    },
    closeReg() {
      this.isReg = false;
    }
  },
  components: {
    Register
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 400px;
  height: 300px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.el-row {
  text-align: center;
  width: 80%;
}
.el-col {
  margin-bottom: 20px;
}
.el-button {
  width: 100%;
}
</style>
