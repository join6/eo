<template>
  <div class="navMenu">

    <template v-for="navMenu in navMenus"  ref="left">
      
      <el-menu-item v-if="!navMenu.childs&&navMenu.entity"  @click.native="searchData($event)"    :id="navMenu.entity.id"
                    :key="navMenu.entity.id" :data="navMenu" :index="'/course/article/'+navMenu.entity.name" 
                   >
        <span class="spanl" slot="title"  @click="searchData($event)"   :id="navMenu.entity.id">{{navMenu.entity.alias}}{{navMenu.entity.id}}</span>
      </el-menu-item>
      <el-submenu v-if="navMenu.childs&&navMenu.entity"  @click.native="searchData($event)"    :id="navMenu.entity.id"
                  :key="navMenu.entity.id" :data="navMenu" :index="'/course/article/'+navMenu.entity.name">
        <template slot="title" >
          <span class="spanl" @click.native="searchData($event)"    :id="navMenu.entity.id"> {{navMenu.entity.alias}}{{navMenu.entity.id}}</span>
        </template>
        <!-- 递归 -->
        <NavMenu :navMenus="navMenu.childs" ref="nav" @click.native="searchData($event)"    :id="navMenu.entity.id" ></NavMenu>
      </el-submenu>
    </template>

  </div>
</template>

<script>
import $ from 'jquery'
  export default {
    name: 'NavMenu',
    props: ['navMenus','productId'],
    data() {
      return {
      articleId:0
      }
    },
    methods: {
    //获取被点击的菜单的id
    searchData: function (event) {
     this.articleId=event.target.getAttribute("id")
   this.$emit("getChil",this.articleId)
    //怎么根据选中的文章的id打开对应的菜单项目
    this.$router.push({ path:'/course/article/'+this.articleId, query:{ articleId:this.articleId, productId:this.productId } })
},
    },
   
  }
</script>

<style scoped>
.navMenu{
  width: 290px;
  background-color:rgb(250, 251, 255);
}
.el-menu-item{
  width: 100%;
}


</style>

