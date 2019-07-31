<template>
  <div class="out">
    <div class="divMask" v-if="loading">
      <div class="in">
      <i class="el-icon-loading"></i><span>loading...</span>
      </div>
    </div>
    <Head style="position:fixed;left:0;top:0;z-index:10;width:100%"></Head>
    <div>
    <div class="left">
      <el-menu :default-active="this.$route.path" router mode="vertical"  >
        <el-menu-item
          v-for="(item,i) in navList"
          ref="items"
          :key="i"
          :index="'/search/result/'+i.toString()"
          @click.native="itemclick(item)"
          class="item"
        >
          <!-- 点击去到同一个页面，并且传递groupId和keywords去请求数据-
          地址拼接:index="'/search/'+i.toString()通过index实现路由  -->
          {{ item.name }}({{item.count}})
        </el-menu-item>
      </el-menu> 


    </div>
     
    <div class="wrapper" >
      <div class="second">
        <el-input v-model="keywords"></el-input>
        <el-button type="primary" round icon="el-icon-search" @click="refreshF">搜索</el-button>
      </div>
    </div>
    <div class="main">
      <p style="margin:20px">搜索到个关于"{{keywords0}}"的内容</p>
      <transition>
      <router-view :productId='this.productId' :keywords="this.keywords" :key="menuKey" ></router-view>
      <!--结果的渲染之处-->
      </transition>
    </div>

    <div class="right">
      <div class="hotask">
        <p class="hotask-p">热门提问</p>
        <div v-for="(item,index) in askList" :key="index">
          <router-link to="/" tag="a" exact>{{item.title}}</router-link>
          <!-- router-link中的exact -->
          <span>{{item.product_name}}</span>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import Head from "./Head";

export default {
  inject: ["reload"],

  name: "Search",
  data() {
    return {
      navList: [],
      keywords: "",
      askList: [],
      keywords0: "",
       loading: false,
       items:{},
       reFresh:true,
        menuKey:1,
        renew:false,
       productId:0
    };
  },

  components: {
    Head
  },
  created() {
    this.getParams();
    this.fetchDate();
    this.fetchAsk();   
  },
  //检测到路由变化时
  watch:{
      '$route':'el'
    },
  methods: {
    //获取被点击产品的productId传递给子组件
    itemclick(ev){
      this.productId=ev.id
    },
     
    el(){
       this.menuKey++;

    },
    refreshF() {
      alert("刷新")
       this.keywords0=this.keywords;
       this.menuKey++;
       this.fetchDate()
    
     
       
    },
    //当被点击时候
    al(ev) {
      this.groupID=ev.id
      console.log( this.groupID)
    
    },
    getParams() {
      // 取到路由带过来的参数
      this.keywords = this.$route.query.keywords;
      this.productId=this.$route.query.productId
      this.keywords0 = this.keywords;
      console.log(this.keywords);

      console.log("当前" + this.$route.path);
      console.log("路由参数");

    },
    //侧边栏数据
    fetchDate() {

       this.loading = true
      this.$axios({
        methos: "get",
        url:
          "https://mockapi.eolinker.com/K92tLWwc4289a578efb1e4b4e017ddb7340c3053aa3a3b2/eo.com/articles/search",
        params: {
          keywords:this.keywords,
          productId: this.productId
        }
      }).then(response => {
        this.loading = false
        console.log("左边");
        // this.tableData = response.body;  resource重视body
        this.navList = response.data.product;
        console.log("xixi ")
        console.log(this.productId)
        var pid=this.productId
      this.$nextTick(()=>{
          if(pid==-1){
           pid=0;
        }else{
           pid-=1;
        }
    console.log(pid)
  this.$refs.items[pid].$el.click()  //根据首页选中的pid点击对应的选项
   
 })
        
        
      });
    },
    fetchAsk() {
      this.$axios({
        method: "get",
        url:
          "https://mockapi.eolinker.com/K92tLWwc4289a578efb1e4b4e017ddb7340c3053aa3a3b2/eo.com/articles/top"
      }).then(response => {
        console.log("右边");
        this.askList = response.data.articles;
      });
    },

  },

};
</script>
 <style scoped>
/* 抖动 */
.out >>> .el-input {
  width: 250px;
}
.wrapper {
  width: 100%;
  height: 80px;
  background-image: url("../assets/images/search_result_bg.png");
  background-position: -2% -1%;
  padding-top: 30px;
position:fixed;
top:60px;
border-bottom:1px solid #ccc
}
ul{
  padding: 0;
  margin:0;
  z-index: 3;
}
.second {
  width: 400px;
  margin: 0 auto;
}

.main {
  margin-left: 300px;
  margin-right: 450px;
  margin-top: 170px;
  width:800px;
  height: 300px;
  translate: translateZ(0);
}
.left {
  height: 100%;
  border-top: 1px solid #ccc;
  border-right: 1px solid #ccc;
  top: 170px;
  width: 300px;
  /* z-index: 3; */
  position: fixed;
  background-color:rgb(250, 251, 255);
}
.right {
  position: fixed; 
  left: 1100px;
  top: 170px;
  width: 400px;
  height: 300px;
 
}
.out >>> .hotask-p {
  margin-left: 5px;
  font-weight: 900;
  color: rgb(160, 153, 153);
}
.hotask span {
  float: right;
  font-weight: bold;
  font-size: 14px;
  color:rgb(160, 153, 153);
  margin-top: 10px;
}
a {
  text-decoration: none;
  font-size: 14px;
  color: #000;
  margin-top: 10px;
  display: inline-block;
}
a:hover {
  color: rgb(98, 194, 194);
}
a:before {
  content: "\2022";
  color: rgb(160, 153, 153);
  font-size: 10px;
  padding-right: 10px;
}
.out>>>.divMask{
  position: absolute;
  text-align: center;
  vertical-align: middle;
  width: 100%;
  height: 100%;
  left: 0px; 
  top: 0px; 
  background: #fff;
  z-index:99;
}
.in{
  width: 100px;
  text-align: center;
 vertical-align: middle;
 padding:20px;
 height: 20px;
  box-shadow:0px 8px 13px rgba(0, 0, 0, 0.1);
   margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

}
.item{
  list-style: none;
  background-color:rgb(250, 251, 255);
  border-bottom: 1px  #ccc solid;
  height: 50px;
   z-index:99;
 
  line-height: 50px;
  width: 100%;
  cursor: pointer;
 
}
.is-active{
  background-color:#409EFF;
  color: #fff
}

</style>


