<template>
<div class="headbar">
  <el-menu  class="el-menu-demo" mode="horizontal" >
  <div class="btn" @click="changewidth();changetext()">
    <span  > <i   :class='{"iconfont icon-shousuo":isChange,"iconfont icon-zhankai":!isChange}'></i></span>
    <span v-text="spanText"  ></span>
  </div>
  <el-menu-item index="1" @click.native="exit">退出登录</el-menu-item>
</el-menu>
</div>
</template>

<script>
export default {
  name:'headbar',
  data(){
    return{
      spanText:'收缩',
      isChange:false
    }
  },
  methods:{
    changetext:function(){
      this.isChange=!this.isChange
      if(!this.isChange){
        this.spanText = '展开'
      }else{
         this.spanText = '收缩'
      }
    },
    changewidth:function(){
        this.$emit('chsidewidth',this.isChange)
    },
    exit(){
      this.$store.commit('REMOVE_COUNT',this.token)
      this.$router.push('/login');

    }
  }
}
</script>

<style scoped>

.el-menu{
   /* background-color: #00ab6d; */
  height: 53px;
}
.el-menu-item{
  float: right
}
.btn{
  border: 1px solid #ccc;
  font-size: 13px;
  line-height: 10px;
  margin:15px 0 0 30px;
   padding: 10px;
   float:left; /*设置float会自动变为块  */  
}
span{

  cursor:pointer
  
}
</style>


