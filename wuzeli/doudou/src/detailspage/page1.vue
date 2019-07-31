
<template>
  <el-container >
    <el-aside :style="{width: widthData+'px'}" v-on="updatewidth(tag)">
      <Sider></Sider>
    </el-aside>
    <el-main>
      
      <headbar class="top" v-on:chsidewidth="updatetag($event)"></headbar>
      <!-- markdown界面 -->
       <div class="btnbox"  v-if="visible">
          <h2 
          style="padding-left:30px"
          >{{this.$route.query.name}} id:{{this.$route.query.id}} </h2>
        </div>
      <tableWin1  v-if="visible" :level="level" v-on:acceptValueT="acceptValueT" :path="path" :next="next" ></tableWin1>
      <markdownWin v-if="!visible"  v-on:acceptValueW="acceptValueW"  :content="content"  :title="title"  :mdid="mdid" :parentid="this.$route.query.id" ></markdownWin>
    </el-main>
  </el-container>
</template>

<script>
import headbar from "../page/headbar";
import Sider from "./Sider";
import tableWin1 from "./tableWin1"
import markdownWin from "./markdownWin";

export default {
  name: "page1",
  data() {
    return {
      mdid:'',
      title:'',
      level:"",
      tag: false,
      widthData: 200,
      tableData: [],
      visible:true,
      content:'',  
      path:"http://localhost:3000/company1",
      next:"/details/level2/:name"
      
    }},
  components: {
    headbar: headbar,
    Sider: Sider,
    markdownWin: markdownWin,
    tableWin1:tableWin1
  },
  methods: {
    renderHeader1(h, { column }) {
      return h("span", [
        h("i", {
          class: "iconfont icon-zan",
          style: "color:yellow"
        }),
        h("label", column.label)
      ]);
    },
    renderHeader2(h, { column }) {
      return h("span", [
        h("i", {
          class: "iconfont icon-caishixin-",
          style: "color:#000;"
        }),
        h("label", column.label)
      ]);
    },
    renderHeader3(h, { column }) {
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
    
  },
  mounted(){    
    this.level=this.$route.query.name;
    console.log(this.level+11111111111111111)
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
.el-main { color: #333;
  text-align: center;
  /* line-height: 160px; */
} 
.btnbox {
  width: 100%;
  padding: 15px 0;
  text-align: left;
 
}

</style>




