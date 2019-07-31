<template>
  <el-menu class="el-menu-demo" mode="horizontal">
    <!-- @select="handleSelect" 
      :default-active="activeIndex"
    -->
    <el-menu-item index="1">
      <img src="../assets/images/eolinker_sim.png" alt="eolinker" />
      <span>|</span>
    </el-menu-item>
    <el-menu-item index="2">
     <router-link :to="{ path: '/'}">帮助中心</router-link>
    </el-menu-item>
    <el-menu-item index="3" class="to">
      <a href="https://www.eolinker.com/#/" target="_blank">前往官网</a>
    </el-menu-item>
    <el-menu-item index="4" class="to">
      <a href="https://www.eolinker.com/#/login" target="_blank">登录</a>
    </el-menu-item>
    <el-menu-item index="5" class="to">
      <a href="https://www.eolinker.com/#/register/" target="_blank">免费注册</a>
    </el-menu-item>
    <el-menu-item class="to">
      <div class="inputdiv"   :class="{empty:isEmpty}"><i class="el-icon-search" @click="search"></i><input   required   v-model="input" placeholder="请输入搜索关键词或内容" @keyup.enter="search"></div>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "Head2",
  data() {
    return {
      input: "",
      isEmpty:false
    };
  },
  props:["productId"],
  methods:{   
    search(){
    if(this.input){
        this.$router.push({
        name:"search",
        query:{
          keywords:this.input,     //需要产品id
          productId:this.productId
        }
      })
    }else{
      this.isEmpty=true
    }
    },
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
a:hover {
  font-weight: bolder;
}
.to {
  float: right;
}
.inputdiv{
  width: 260px;
  border: 1px solid #ccc;
  display: inline-block;
  height: 40px;
  border-radius:50px;
  text-align: center;
  line-height: 40px;
  

}
input{
  height: 30px;
  border:0;
  outline: none
}
.empty{
border: 1px solid red;
}
</style>
