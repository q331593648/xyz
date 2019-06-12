<template>
  <div class="home">
    <!-- 123
    <router-link to="/reptile">爬虫</router-link>

    <el-button @click="check">
      检验token
    </el-button> -->
    <template>
      <el-table :data="userData" border style="width: 100%">
        <el-table-column prop="id" label="id"> </el-table-column>
        <el-table-column prop="username" label="用户名"> </el-table-column>
        <el-table-column prop="password" label="密码"> </el-table-column>
        <el-table-column label="头像">
          <template slot-scope="scope">
            <img
              :src="'http://localhost:8123/upload/' + scope.row.url"
              alt=""
              srcset=""
              width="50px"
              height="50px"
              @click.prevent="showPic(scope.row.url)"
            />
          </template>
        </el-table-column>
        <el-table-column label="设置">
          <template slot-scope="scope">
            <el-row type="flex" justify="center">
              <el-col :span="12">
                <el-button type="danger" @click="del(scope.row.id)"
                  >删除</el-button
                >
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-dialog :visible.sync="isShowPic" :show-close="false">
      <img :src="nowPic" alt="" width="100%" />
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, delUser } from "@/api/user";

export default {
  data() {
    return {
      isShowPic: false,
      nowPic: "",
      userData: []
    };
  },
  methods: {
    async del(e) {
      let state = await delUser(e);
      if (state.code == 0) {
        this.getList();
      }
    },
    async getList() {
      let data = await getUserList();
      this.userData = data.data;
    },
    showPic(url) {
      this.nowPic = `${process.env.VUE_APP_BASE_API}/upload/${url}`;
      this.isShowPic = true;
    }
  },
  created() {
    this.getList();
  }
};
</script>
