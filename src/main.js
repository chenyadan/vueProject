// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import seller from './components/seller/seller.vue'
import goods from './components/goods/goods.vue'
import ratings from './components/ratings/ratings.vue'
import './common/scss/icon.scss'

Vue.use(VueRouter)
Vue.use(VueResource)
const router=new VueRouter({
  routes:[
    {path:'/',component:goods},
    {path:'/seller',component:seller},
    {path:'/goods',component:goods},
    {path:'/ratings',component:ratings}
  ],
  linkActiveClass:'active'
})
new Vue({
  router,
  render:h=>h(App),
  data:{
    eventHub:new Vue()
  }
}).$mount('#app')
