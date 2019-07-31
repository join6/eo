<template>
     <el-menu
    
    class="el-menu-demo"
    mode="horizontal"

  >
    <el-menu-item index="1">
        <img src="../assets/images/eolinker_sim.png" alt="eolinker">
        <span>|</span>
    </el-menu-item>
    <el-menu-item index="2"><router-link :to="{ path: '/'}">帮助中心</router-link></el-menu-item>
    <el-menu-item index="3" class="to">
      <a href="https://www.eolinker.com/#/" target="_blank" >前往官网</a>
    </el-menu-item>
    <el-menu-item index="4" class="to">
    <a href="https://www.eolinker.com/#/login" target="_blank">登录</a>
         </el-menu-item>
    <el-menu-item index="5" class="to">
    <a href="https://www.eolinker.com/#/register/" target="_blank">免费注册</a>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
    name:'Head'
}



</script>

<style scoped>

a{
    text-decoration: none
}
a:hover{
    font-weight: bolder
}
.to{
    float: right;
}

</style>
