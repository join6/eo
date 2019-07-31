<template>
  <div>
    <div class="wrapper">
      <div class="top">
        <h1>如何使用MOCK API</h1>
        <p>最近更新时间:2019-04-25 18:28:28</p>
      </div>
      <div class="section" style="width:100%" v-for="(item, index) in list" :key="index">
        <div
          style="width:100%;height:100%;"
          :style="{'background':item.backgroundcolor,'height':item.height}"
        >
          <h2 class="title">{{item.name}}</h2>
          <p>{{item.content}}</p>
        </div>
      </div>
    </div>
    <div class="foot">
      <div class="foot-div1">
        <div class="foot-div2">
          <span>以上内容对您是否有帮助？</span>
          <input class="btn1" type="button" value="有帮助"  @click="assess(1)" />
          <input class="btn2" type="button" value="没帮助" @click="assess(0)" />
        </div>
      </div>

      <div class="hotask">
        <p class="hotask-p">本产品下的热门提问</p>
        <div v-for="(item,index) in askList" :key="index">
          <router-link tag="a" exact to="/">{{item}}</router-link>
          <!-- router-link中的exact -->
        </div>
      </div>
    </div>
    <nav>
      <b>本页目录</b>
      <div class="fora">
        <a
          class="nav1"
          v-for="(item, index) in navList"
          ref="nav1"
          :key="index"
          @click="jump(index)"
          :class="index==0?'current':''"
        >{{item}}</a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
    name:"Answer",
    data(){
        return{
              scroll: "",
              list:[],
              navList:[],
              askList:[],
              title:[]
        }
    },
    props:["productId","articleId"],
    mounted(){
        window.addEventListener("scroll", this.dataScroll);
    },
    methods:{
          dataScroll: function() {
          this.scroll =document.documentElement.scrollTop || document.body.scrollTop;
    },
    jump(index) {
      let jump = document.getElementsByClassName("section");
      // 获取需要滚动的距离
      let total = jump[index].offsetTop;
      // Chrome
      document.body.scrollTop = total;
  
    },
    loadSroll: function() {
      var self = this;
      var nav1 = this.$refs.nav1;
      var sections = document.getElementsByClassName("section");

      for (var i = sections.length - 1; i >= 0; i--) {
        if (self.scroll >= sections[i].offsetTop - 100) {
          for (var j = 0, len = nav1.length; j < len; j++) {
            if (i == j) {
              nav1[j].classList.add("current");
            } else {
              if (nav1[j].classList.contains("current")) {
                nav1[j].classList.remove("current");
              }
            }
          }
          break;
        }
      }
    },
    assess(status){
       alert(status)
       alert(this.articleId)
      this.$axios({
        method:'get',
        url:"https://mockapi.eolinker.com/K92tLWwc4289a578efb1e4b4e017ddb7340c3053aa3a3b2/eo.com/articles/star",
        params:{
          articleID:this.articleId,
          status:status
        }
      })

    },
   //接受来自父组件的文章id,查询文章   点击或者挂载的时候获取数据
    fetchArticle(){
      this.$axios({
        method:"get",
        url:"http://localhost:3000/article",
        // params:{
        //需要pid和articleid   
        // }
      }).then((response)=>{
        this.list=response.data[2].list;
        this.title=response.data[1].title;
        this.askList=response.data[0].askListA;
        this.navList=response.data[3].navListA;
        if(this.navList.length!=0){
          this.ifnav=true
          console.log(this.ifnav)
        }
      })
    }
  },
 
  watch: {
    scroll: function() {
      this.loadSroll();
    }
  },
  created(){
    this.fetchArticle()

  }
}

</script>

<style scoped>
.wrapper {
  text-align: left;
}
.top {
  padding: 20px 0;
  border-bottom: #ccc 1px solid;
  margin-bottom: 20px;
}
.nav1 {
  display: block;
  width: 150px;
  height: 30px;
  padding-left: 10px;
  line-height: 30px;
  font-size: 12px;
  border-left: 3px solid #ccc;
}
.current {
  color: rgb(50, 82, 221);
  border-left: 3px solid rgb(50, 82, 221);
}
nav {
  position: fixed;
  right: 30px;
  top: 100px;
  text-align: left;
}
.fora {
  margin-top: 10px;
}
.foot {
  height: 500px;
}
.foot-div1 {
  padding-bottom: 50px;
  margin-top: 50px;
  border-bottom: 1px solid #ccc;
}
.foot-div2 {
  border: 1px solid #ccc;
  padding: 10px 20px;
}
input {
  border: none;
  color: white;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  border-radius: 10%;
}
.btn1 {
  background-color: #4caf50;
  margin-left: 30px;
}
.btn2 {
  background-color: rgb(214, 4, 4);
  margin-left: 10px;
}
.hotask {
  width: 300px;
  text-align: left;
  margin-top: 50px;
}
.hotask-p {
  margin-left: 5px;
  font-weight: 900;
  color: rgb(160, 153, 153);
}

.hotask a {
  text-decoration: none;
  font-size: 14px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  color: #000;
  margin-top: 10px;
  display: inline-block;
}
.hotask a:hover {
  color: rgb(98, 194, 194);
}
.hotask a:before {
  content: "\2022";
  color: rgb(27, 24, 24);
  font-size: 10px;
  padding-right: 10px;
}
.title{
  color: #607d8b;
  border-bottom: 5px solid #ccc;
  padding-bottom: 10px
}
</style>
