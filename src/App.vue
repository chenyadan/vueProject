<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <div class="content">
      <router-view :seller="seller"></router-view>
    </div>
  </div>
</template>

<script>
import VHeader from './components/head/head.vue'
// import eventHub from './common/js/eventHub.js'
export default {
  components: {
    VHeader //注意命名方式:两个连接的大写字母用"-"分开，否则不加"-"
  },
  data(){
    return{
      seller:{

      }
    }
  },
  created(){
    this.$http.get('/api/seller').then(response=>{
        response=response.body;
        this.seller=response.data;
        // this.addCart()
    })
  }
  // methods:{
  //   addCart(){
  //      this.$root.eventHub.$emit('seller',this.seller)
  //   }
  // }
}
</script>

<style lang="scss" rel="stylesheet/scss">
 #app{
    .tab{
      display:flex;
      width:100%;
      height:40px;
      line-height:40px;
      // border-1px(rgba(7,17,27,0.1));
      .tab-item{
        flex:1;
        text-align:center;
        a{
          display:block;
          text-decoration:none;
          font-size:16px;
          color:rgb(77,85,93);
        }
       .active{
            color:rgb(240,20,93)
       }  
      }
   }
    
 }
</style>
