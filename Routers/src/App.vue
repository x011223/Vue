<template>
  <div>
    <div class="head">
      <router-link :to="{name:'music'}">Enter Music</router-link>
      <router-link :to="{name:'movie'}">Enter Movie</router-link>
    </div>
    <!-- 留坑，非常重要 -->
    <router-view class="router"></router-view>
    <hr>
    <div class="footer">
      我是有底线的
    </div>
  </div>
</template>

<script>  
  // console.log("这是主页")
  export default {
    created () {
      // get请求
      // this.axios.get('')
      // .then(res => {console.log("这是主页")})
      // .catch(err => {console.log("1233")})

      // post请求
      // this.axios.psot('','component="" ')
      // .then(res => {console.log("这是主页")})
      // .catch(err => {console.log("1233")})
    }
  }
</script>

<style scoped>

  .head {
    height: 200px;
    background-color: #0BBCF2;
    text-align: center;
    line-height: 200px;
  }

  .router {
    height: 200px;
    /*background-color: #10DE63;*/
    text-align: center;
    line-height: 200px;
  }

  .footer {
    height: 200px;
    background-color: #FB0D0D;
    text-align: center;
    line-height: 200px;
  }
</style>
