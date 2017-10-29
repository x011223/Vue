<template>
  <div>
    <v-header :sellers="sellers">顶部</v-header>
    <div id="tab">
      <router-link :to="{name:'goods'}" class="tab-items">商品</router-link>
      <router-link :to="{name:'ratings'}" class="tab-items">评论</router-link>
      <router-link :to="{name:'sellers'}" class="tab-items">商家</router-link>
    </div>
    <router-view :sellers="sellers"></router-view>
  </div>
</template>

<script>

  import Header from './components/Header/header.vue'
  const err_ok = 0;

  export default {
    name: 'app',
    data() {
      return {
        sellers: {
          
        }
      }
    },
    components: {
      'v-header':Header,
    },
    created() {
      this.$http.get('/api/sellers').then( (response) => {
        response = response.body;
        if (response.errno === err_ok) {
          this.sellers = response.data;
        }
      });
    }
  }
</script>

<style scoped>
  #tab {
    text-align: center;  
    display: flex;
  }
 .tab-items {
    color: #1CEEF9;
    text-decoration: none;    
    flex: 1;
    height: 40px;
    font-size: 24px;
    line-height: 40px;
  }
  .router-link-active {
    color: #F24C4C;
  }
</style>

