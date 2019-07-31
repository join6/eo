
<template>
  <el-container >
    <el-aside :style="{width: widthData+'px'}" v-on="updatewidth(tag)">
      <Sider></Sider>
    </el-aside>
    <el-main>
      <headbar class="top" v-on:chsidewidth="updatetag($event)"></headbar>
      <!-- markdown界面 -->
        <div class="btnbox" @click="back"  v-if="visible">
        <a >
          <i class="iconfont icon-fanhui"></i> 返回三级列表
        </a>
      </div>
        <div class="btnbox"  v-if="visible">
          <h2 
          style="padding-left:30px"
          >{{this.$route.query.name}}</h2>
        </div>
       <tableWin4  v-if="visible" :level="level"  v-on:acceptValueT="acceptValueT" :path="path"  ></tableWin4>
      <markdownWin v-if="!visible"  v-on:acceptValueW="acceptValueW"  :content="content"  :title="title"  :mdid="mdid" :parentid="this.$route.query.id" ></markdownWin>
    </el-main>
  </el-container>
</template>

<script>
import headbar from "../page/headbar";
import Sider from "./Sider";
import tableWin4 from "./tableWin4"
import markdownWin from "./markdownWin";

export default {
  name: "page4",
  data() {
    return {
      level:'',
    mdid:'',
      title:'',
      tag: false,
      widthData: 200,
      tableData: [],
      visible:true,
      content:'',  
      path:"http://localhost:3000/company4",
     
    }},
  components: {
    headbar: headbar,
    Sider: Sider,
    markdownWin: markdownWin,
    tableWin4:tableWin4
  },
  methods: {
    renderHeader1(h, { column }) {
      // h即为cerateElement的简写
      return h("span", [
        h("i", {
          class: "iconfont icon-zan",
          style: "color:yellow"
        }),
        h("label", column.label)
      ]);
    },
    renderHeader2(h, { column }) {
      // h即为cerateElement的简写
      return h("span", [
        h("i", {
          class: "iconfont icon-caishixin-",
          style: "color:#000;"
        }),
        h("label", column.label)
      ]);
    },
    renderHeader3(h, { column }) {
      // h即为cerateElement的简写
      return h(
        "span",

        [
          h("i", {
            class: "iconfont icon-yueduliang",
            style: "color:#ccc;"
          }),
          h("label", column.label)
        ]
      );
    },

    updatetag(tag) {
      this.tag = tag;
    },
    updatewidth(tag) {
      if (tag) {
        this.widthData = 55;
      }
      if (!tag) {
        this.widthData = 200;
      }
    },
     acceptValueT(childValue,content,title,mdid){
      this.visible=childValue
      this.content=content
      this.title=title
      this.mdid=mdid
      console.log(this.content)
    },
    acceptValueW(childValue){
      this.visible=childValue
    },
    back(){
         this.$router.go(-1)
   },
  },
   mounted(){
    this.level=this.$route.query.name;
    console.log(this.level+"44444444444444")
  }
    }
</script>

<style scoped>
.el-container * {
  margin: 0;
  padding: 0;
}
.el-container {
  position: absolute;
  width: 100%;
  top: 0px;
  left: 0;
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
  border-right: 1px solid #ccc;
}
.el-main {

  color: #333;
  text-align: center;
  /* line-height: 160px; */
} 
.btnbox {
  width: 100%;
  padding: 20px 0;
  background-color: #fff;
  text-align: left;
  border-bottom: 1px solid rgb(245, 235, 235);
}
.btnbox a {
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  display: inline-block;
  margin-left: 30px;
}
.btnbox a:hover {
  color: blue;
}
.btnbox>>>.el-input{
  width: 200px;
}


</style>




