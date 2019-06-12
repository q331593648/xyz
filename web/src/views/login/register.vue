<template>
  <div class="register">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model.trim="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPassword">
        <el-input
          type="password"
          v-model.trim="ruleForm.checkPassword"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="userPic">
        <el-upload
          class="avatar-uploader"
          action=""
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onChange"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Register } from "api/login";
export default {
  data() {
    var username = (rule, value, callback) => {
      const reg = /^\w{2,12}$/;
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      if (!reg.test(value)) {
        return callback(new Error("用户名不符合要求"));
      }
      callback();
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPassword !== "") {
          this.$refs.ruleForm.validateField("checkPassword");
        }
        callback();
      }
    };
    var validatePassword2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      imageUrl: "",
      usernameErr: false,
      postList: new FormData({ username: "", password: "", file: [] }),
      ruleForm: {
        username: "",
        password: "",
        checkPassword: ""
      },
      rules: {
        password: [{ validator: validatePassword, trigger: "blur" }],
        checkPassword: [{ validator: validatePassword2, trigger: "blur" }],
        username: [{ validator: username, trigger: "blur" }]
      }
    };
  },
  methods: {
    onChange(file) {
      //创建临时的路径来展示图片
      var windowURL = window.URL || window.webkitURL;
      this.imageUrl = windowURL.createObjectURL(file.raw);
      //重新写一个表单上传的方法
      this.postList.set("file", file.raw, file.name);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    submitForm(formName) {
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.postList.set("username", this.ruleForm.username);
          this.postList.set("password", this.ruleForm.password);
          Register(_this.postList).then(res => {
            this.$message({
              message: res.message,
              type: "success"
            });
            if (res.code == 0) {
              this.$emit("closeReg");
            }
          });
        } else {
          this.usernameErr = true;
          this.$message({
            message: "填写有误!",
            type: "error"
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
