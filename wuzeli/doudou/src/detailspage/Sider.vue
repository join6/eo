<template>
<el-row class="tac" >
  <el-col >
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
     <el-menu-item index="1">
        <i class="iconfont icon-fanhui"   @click="fanhui"></i>&nbsp;&nbsp;&nbsp;
        <span slot="title"  @click="fanhui" >返回产品分类列表</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-document-copy"></i>
        <span slot="title">教程管理</span>
      </el-menu-item>
       <el-menu-item index="3">
        <i class="el-icon-question"></i>
        <span slot="title">问答管理</span>
      </el-menu-item>
      
    </el-menu>
  </el-col>
</el-row>
</template>

<script>
  export default {
      name:'Sider',
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      //返回上一级菜单
      fanhui(){
        this.$router.go(-1)
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