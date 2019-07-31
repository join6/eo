<template>
<el-row class="tac" >
  <el-col >
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
     <el-menu-item index="1">
        <b slot="title">EOLINKER</b>
      </el-menu-item>
      
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">教程及问答管理</span>
      </el-menu-item>
      
    </el-menu>
  </el-col>
</el-row>
</template>

<script>
  export default {
      name:'sidebar',
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
.el-menu-item{
    height:55px;
    line-height: 55px;
   background-color:  #f7f8fc;
   border-bottom: 1px solid rgb(218, 210, 210)
    
}
.is-active{
  background-color: #00ab6d;
  color:white
}
</style>
