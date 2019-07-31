<template>
  <div class="bigbox">
    <Head2 class="top" :productId="productId" ></Head2>

    <div class="eldiv">
      <div class="inner">
        <el-menu
         active-text-color="#ffd04b"
          :default-active="activeIndex"
          router
        >
          <NavMenu :navMenus="menuData" :productId="productId" ref="nav" v-on:getChil="getChil"></NavMenu>
        </el-menu>
      </div>
    </div>

    <div class="middle">
    产品id：{{productId}}  文章id:{{articleId}}
    <Answer  :articleId="articleId"></Answer>

    </div>
  </div>
</template>

<script>
import Answer from './Answer'
import Head2 from "./Head2";
import NavMenu from "./NavMenu";
export default {
  name: "Question",
  data() {
    return {
      scrollTop: 0,
      activeIndex: "aa",
      productId:'100',
      articleId:'100',//被点击的侧边栏的id
      menuData: [
        {
          //一级
          entity: {
            id: 0,
            name: "API Studio",
            alias: "API Studio"
          }
        },
         {
          //一级
          entity: {
            id: 1,
            name: "API Studio各版本功能对比",
            alias: "API Studio各版本功能对比"
          }
        },
             {
          //一级
          entity: {
            id: 2,
            name: "contentManage",
            icon: "el-icon-rank",
            alias: "四级菜单"
          },
          //er级
          childs: [
            {
              entity: {
                id: 41,
                name: "classifyManage2",
              
                alias: "分类管理"
              },
              //三级
              childs: [
                {
                  entity: {
                    id: 42,
                    name: "classifyManage3",
                    alias: "分类管理"
                  },
                  //四级
                  childs: [
                    {
                      entity: {
                        id: 43,
                        name: "classifyManage4",
                      
                        alias: "分类管理",
                        
                      }
                    }
                  ]
                }
              ]
            },
                {
              entity: {
                id: 21,
                name: "管理项目权限",
                alias: "管理项目权限",
              }
            },
             {
              entity: {
                id: 22,
                name: "API文档管理",
                alias: "API项目管理",
              }
            },
             {
              entity: {
                id: 23,
                name: "API测试",
                alias: "API测试",
              }
            },
             {
              entity: {
                id: 24,
                name: "公共资源管理",
                alias: "公共资源管理",
              }
            },
             {
              entity: {
                id: 25,
                name: "mock API",
                alias: "mock API",
              }
            },
             {
              entity: {
                id: 26,
                name: "API状态码管理",
                alias: "API状态码管理",
              }
            },
             {
              entity: {
                id: 27,
                name: "项目文档管理",
                alias: "项目文档管理",
              }
            },
          ]
        },
        {
          //一级
          entity: {
            id: 3,
            name: "自动化测试1",
            alias: "自动化测试1"
          },
        },
         {
          //一级
          entity: {
            id: 4,
            name: "自动化测试2",
            alias: "自动化测试2"
          },
        },
         {
          //一级
          entity: {
            id: 5,
            name: "自动化测试3",
            alias: "自动化测试3"
          },
        }
        
      ],
  
    };
  },
  components: {
    Head2,
    NavMenu,
    Answer,
  },
  methods: {
    getChil(articleId){
      this.articleId=this.$refs.nav.articleId
    },
    getParams(){
      this.articleId=this.$route.query.articleId
      this.productId=this.$route.query.productId
    }
    },

  mounted() {
    let start = window.location.href.lastIndexOf("/");
    let path = window.location.href.slice(start + 1);
    this.activeIndex = path;
    console.log(path)
  },
  created(){
    this.getParams()
  }

};
</script>

<style  scoped>
.bigbox {
  width: 100%;
  height: 100%;
}
.top {
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}

.middle {
  padding: 0 30px;
  color: #333;
  text-align: center;
  margin-left: 300px;
  margin-right: 450px;
  margin-top: 61px;
  width: 60%;
  position: relative;
}
.eldiv {
background-color:rgb(250, 251, 255);
  color: #333;
  text-align: center;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  margin-top: 61px;
}
.inner{
   overflow: auto;
   
}


</style>




