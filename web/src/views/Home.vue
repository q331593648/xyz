<template>
  <div class="home">
    123
    <router-link to="/reptile">爬虫</router-link>

    <el-button @click="check">
      检验token
    </el-button>
  </div>
</template>

<script>
import { checkToken } from "@/api/user";

export default {
  methods: {
    check() {
      checkToken().then(res => {
        debugger;
      });
    }
  }
};
</script>
