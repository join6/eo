<template>
      
        <ul class="myul">
          <li v-for="(item,i) in list" class="myli" 
          @click="itemclick(i,item.tag)" 
          :key="i" 
          :class="{'active':index===i}" 
          ref="left">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>{{item.title}}
          <i   v-if="item.tag"      class="myi iconfont"  v-bind:class="{ 'icon-jiantouyouxiao': !ifclick, 'icon-jiantou_down': ifclick }" ></i>
          </li>
        </ul>
</template>

<script>
export default {
name:'NavMenu2',
data(){
    return{
          articleList:[],
          categoryList:[],
        
          index:null,
          ifclick:false,
          list:[]
    }
},
methods: {
   cc(id){
     this.id=id;
   },
   fetchDate(){
     this.$axios({
       method:'get',
       url:'https://mockapi.eolinker.com/K92tLWwc4289a578efb1e4b4e017ddb7340c3053aa3a3b2/eo.com/products',
       params:{
         pid:1
       }
     }).then((response)=>{
       this.articleList=response.data.article
       this.categoryList=response.data.category
       this.hotArticle=response.data.articles
       this.list=response.data.article.concat(response.data.category)
     })
   },
   itemclick(i,tag){
     this.index=i;
     if(!tag){     
      this.$router.push("/course/article/"+i.toString())
      }else{
        this.ifclick=!this.ifclick
       console.log(this.$refs.left[i])
       var oLi=this.$refs.left[i];
       oLi.insertAdjacentHTML('afterend',"<ul><li>xixi</li></ul>")
      }
   },
   
  },
    created(){
    this.fetchDate()
  }
}
</script>

<style scoped>
.myul{
  margin: 0;
  padding: 0;
}
.myli{
  list-style: none;
  display: block;
  width: 100%;
  padding:  10px 0;
  line-height: 30px;
  text-align: left;
 border-bottom: 1px solid #ccc;
 cursor: pointer;
 
}
.myi{
  float:right;
}
.mya{
  text-decoration: none;
  color: black
}
.hover{
  background: rgb(128, 153, 235)
}
.active{
  background: #409EFF;
}

</style>
