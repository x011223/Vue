// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
Vue.config.silent = true

//引入4个主界面组件
import Rank from './components/rank/rank'
    import TopList from './components/toplist/toplist'
import Search from './components/search/search'
    import SingersDetail from './components/singers-detail/singers-detail'
import Singer from './components/singer/singer'    
import Recommend from './components/recommend/recommend'
    import DiscDetail from './components/disc-detail/disc-detail'
import UserCenter from './components/usercenter/usercenter'


//引入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//引入 vue-lazyload
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    loading: require('../src/components/header/header_ico.svg'),
})

import store from './store'

const routes = [
    // {path:'/',redirect:{name:'recommend'}},
    // {name: 'recommend', path: '/recommend', component: Recommend},
    // {name: 'recommend', path: '/singer', component: Singer},
    // {name: 'recommend', path: '/rank', component: Rank},
    // {name: 'recommend', path: '/search', component: Search},
        { path: '/recommend', component: Recommend, children: [
            {path: ':id', component: DiscDetail}
        ]},
        { path: '/singer', component: Singer, children: [
            {path: ':id', component: SingersDetail}
        ]},
        { path: '/rank', component: Rank, children: [
            {path: ':id', component: TopList}
        ]},
        { path: '/search', component: Search, children: [
            {path: ':id', component: SingersDetail}
        ]},
        { path: '/user', component: UserCenter},
]
const router = new VueRouter({
    //不能写成 Router
    routes // （缩写）相当于 routes: routes
})
router.push('/recommend')
// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  store,
  router
}).$mount('#app')
