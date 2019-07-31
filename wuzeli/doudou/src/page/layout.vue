<template>
  <el-container>
      <el-aside :style="{width: widthData+'px'}"  v-on="updatewidth(tag)">
        <sidebar></sidebar>
      </el-aside>
      <el-main>
        <headbar class="top"  v-on:chsidewidth="updatetag($event)"></headbar>
        <div class="wrapper"><maintable></maintable></div>
      </el-main>
    </el-container>
</template>

<script>
import headbar from './headbar'
import sidebar from './sidebar'
import maintable from './maintable'
export default {
  name: "App",
  data(){
    return{
      title:'xxxx',
      tag:false,
      widthData:200
    }
  },
  components:{
    'headbar':headbar,
    'sidebar':sidebar,
    'maintable':maintable
  },
  methods:{
    updatetag(tag){
      this.tag=tag;
    },
    updatewidth(tag){
      if(tag){
        this.widthData=55
      }
      if(!tag){
        this.widthData=200
      }
    }
    
  }
};
</script>

<style  scoped>
.el-container *{
  margin: 0;
  padding: 0;
}
.el-container{
  position: absolute; 
  width: 100%; 
  top: 0px ; 
  left: 0 ; 
  bottom: 0;
   background: url(../assets/images/home_11.png) no-repeat;
  background-position:bottom right;
}
.el-aside {
  background-color:  #f7f8fc;
  color: #333;
  text-align: center;
  line-height: 200px;
  float: left;
  height: 100%;
  border-right: 1px solid #ccc;
}
.el-main {
  

  color: #333;
  text-align: center;  
 
  /* line-height: 160px; */
}
/* .top{
  width: 100%;
} */
.wrapper{
  padding:30px;
 
}
</style>
