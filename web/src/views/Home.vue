<template>
  <div class="home">123</div>
</template>

<script>
// import { UserInfo } from "@/api/user";

export default {
  methods: {
    getUserInfo() {
      UserInfo().then(res => {
        console.log(res);
      });
    }
  },
  created() {
    // this.getUserInfo();
  }
};
</script>
