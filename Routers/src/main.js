// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// Vue.config.productionTip = false

// axios
// import Axios from 'axios'
// Vue.prototype.$axios = Axios


//Axios.default.baseURL = '**********'


import VueRouter from 'vue-router'
Vue.use(VueRouter);//插件都是挂载属性

import NotFound from './components/notFound.vue'
import Music from './components/music.vue'
import Movie from './components/movie.vue'

import Oumei from './components/oumei.vue'
import Huayu from './components/huayu.vue'

let router = new VueRouter({
	routes:[
		{path:'/',redirect:{name:'music'}},
		{name:'music',path:'/music',component:Music,children:[
			{name: 'music_oumei',path:'oumei',component:Oumei},
			//  path:'/oumei'表示http://localhost:8080/#/oumei  --- 绝对路径
			//  path:'oumei'表示http://localhost:8080/#/music/oumei   --- 相对父级路径
			{name: 'music_huayu',path:'huayu',component:Huayu}
		]},
		{name:'movie',path:'/movie',component:Movie},
		{path:'*',component:NotFound},
	]
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  router,
  components: { App }
}) 


