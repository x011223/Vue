// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

//引入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//引入Resource
import VueResource from 'vue-resource'
Vue.use(VueResource)

import NotFound from './components/notFound/notfound.vue'
import Goods from './components/goods/goods.vue'
import Ratings from './components/ratings/ratings.vue'
import Sellers from './components/sellers/sellers.vue'
// import cartList from './components/cartlist/cartlist.vue'

/* eslint-disable no-new */
let router = new VueRouter({
	routes:[
		{path:'/',redirect:{name:'goods'}},
			{name:'goods',path:'/goods',component:Goods},
			{name:'ratings',path:'/ratings',component:Ratings},
			{name:'sellers',path:'/sellers',component:Sellers},
		{path:'*',component:NotFound},
	]
});

const app = new Vue({
  router,
  template:'<App />',
  components: { App }
}).$mount('#app');
