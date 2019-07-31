// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'   //引入router.js路由组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import './assets/iconfont/iconfont.css'
import Vuex from 'vuex'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)
Vue.use(Vuex)
Vue.use(ElementUI)


Vue.prototype.$axios = axios 
Vue.config.productionTip = false


const ADD_COUNT = 'ADD_COUNT';
const REMOVE_COUNT = 'REMOVE_COUNT';


//注册状态管理全局参数
var store = new Vuex.Store({
  state:{
    token:'',
   
  },
  mutations: {
    //写法与getters相类似
    //组件想要对于vuex 中的数据进行的处理
    //组件中采用this.$store.commit('方法名') 的方式调用，实现充分解耦
    //内部操作必须在此刻完成(同步)
    [ADD_COUNT] (state, token) { // 第一个参数为 state 用于变更状态 登录
     sessionStorage.setItem("token", token);
      state.token = token;
    },
    [REMOVE_COUNT] (state, token) { // 退出登录
 
     sessionStorage.removeItem("token", token);
 
      state.token = token;
    },
   
  }
});





router.beforeEach((to, from, next) => {
  store.state.token =sessionStorage.getItem('token');//获取本地存储的token
 console.log("本地"+ store.state.token)
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (store.state.token) {  // 通过vuex state获取当前的token是否存
     next();
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
  }
)





new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});