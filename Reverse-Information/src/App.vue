
<template>
  <div>
    <div id="text">
      输入内容:
      <input type="text" v-model="text">
      <br>
      <span>反转显示:{{text | myFilter}}</span>
    </div>
  </div>
</template>

<script>

export default {
  filters: {
      myFilter:function(value){
          return value.split('').reverse().join('');
      }
  },
  data () {
    return {
      text:'',
    }
  },
}
</script>

<style>
    #text {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
        height: 40px;
        line-height: 40px;
    }
</style>
