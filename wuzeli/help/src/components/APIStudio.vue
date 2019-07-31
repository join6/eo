<template>
  <div>
    <span>{{this.$route.path}}+productId:{{this.productId}}</span>
    <div
      v-for="(item,index) in searchresults"
      :key="index"
     @click="tocourse(item)"
      class="link"
    >
    <!-- 是否需要this?通过to需要传递被点击的文章的pid用于获取左侧导航 需要articleId获取右侧对应的文章，要将文章id传给course,course传给article -->
    <span class='span1'>教程</span>  <!-- 记得将a变为keywords -->
      <span  v-html="highlight(item.title,keywords)" class='span2'></span>
      <p  class="p1" v-html="highlight(item.content,keywords)"></p>
      <p class="p2">{{item.productList}}</p>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  name: "APIStudio",
  data() {
    return {
      searchresults: [],
      myproductId:-1,//当文章被点击的时候获取到的文章和种类的id
      myarticleId:-1
    }
  },
  props: ["keywords",'productId',"renew"],

    
  methods: {
    tocourse(item){
      console.log(item.pid)
      console.log(item.id)     
      this.$router.push({
       path:'/course/article/'+item.pid,
        query:{productId:item.pid,articleId:item.id}
      }) 
    },
  

    fetchDate() {
     console.log(this.keywords)
     console.log(this.productId)
     this.$axios({
        methos:'get',
        url:'https://mockapi.eolinker.com/K92tLWwc4289a578efb1e4b4e017ddb7340c3053aa3a3b2/eo.com/articles/search',
        params:{
          keywords:this.keywords,
          productId:this.productId
        }
      }).then(response => {
        console.log("我是组件")
      
        this.searchresults=response.data.article;
      });
    },
      highlight:function(words,query){
      var reg=new RegExp('('+query+')',"g");
      return words.replace(reg, '<span style="color:red">' + query + '</span>')
  },
 
  },
  created() {
    this.fetchDate();
  },
 

};
</script>

<style  scoped>
.link{
 cursor: pointer;
  margin:20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc
}
.span1{
  font-size: 13px;
  display: inline-block;
  background-color: #409EFF;
  color: #fff;
  padding:  3px 5px;
  border-radius: 4px;
  margin-right: 5px
}
.span2{
  font-size: 18px
}
.p2{
  margin-top:10px;
  font-size: 10px
}
</style>


