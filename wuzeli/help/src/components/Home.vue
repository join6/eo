<template>
  <div class="out">
    <Head></Head>
    <div class="contain">
      <div class="left">
        <p class="slogan-p">您好，请问需要什么帮助？</p>
        <form>
          <div class="search" :class="{empty:isEmpty}">
            <!-- <select>
              <option value v-for="(item,index) in navList" :key="index">{{item.navItem}}</option>
            </select>-->
            <el-select v-model="value"  placeholder="请选择"  @change="selected" >
              <el-option label="搜全站"  value="-1"  key="-1"></el-option>
              <el-option
                v-for="item in navList"
                :key="item.groupID"
                :label="item.navItem"
                :value="item.groupID"
              ></el-option>
            </el-select>
            <input
              v-model="keywords"
              required
              type="text"
              @keyup.enter="toSearch(keywords)"
              placeholder="请输入搜索关键词或问题"
              class="myinput"
            />
          </div>
          <el-button type="primary" round @click="toSearch(keywords)" icon="el-icon-search">搜索</el-button>
        </form>

        <!-- <p class="jinggao" ><img src="../assets/images/警告.png" width="12px" height="12px">请填写此字段</p> -->
      </div>
      <div class="right">
        <div class="hotask">
          <p class="hotask-p">热门提问</p>
          <div v-for="(item,index) in askList" :key="index">
            <a  @click="toquestion(item)">{{item.title}}</a>
            <!-- router-link中的exact -->
            <span>{{item.product_name}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="middle">
      <div class="wrapper">
        <p class="p1">产品分类</p>
        <p class="p2">您可以根据使用的产品来检索教程</p>
        <div>
          <router-link
            tag="div"
            class="lianjie"
            :to="{name:'course',query:{productId:item.id,articleId:-1}}"
            v-for="(item,index) in sortList"
            :key="index"
            :class="{'borderstyle':index==indexPrev}"
            ref="lianjie"
            @mouseenter.native="borderstyle1(index)"
            @mouseleave.native="borderstyle2(index)"
          >
            <div class="pic">
              <img :src="item.img" width="88px" height="88px" />
            </div>
            <div class="text">
              <p class="p1">{{item.name}}</p>
              <p class="p2">{{item.text}}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-div">
        <ul>
          <li>
            <b>EOLINKER</b>
          </li>
          <li class="myli">
            <a
              href="https://www.eolinker.com/#/product/ams"
              target="_blank"
            >API Studio | API 研发管理与自动化测试</a>
          </li>
          <li class="myli">
            <a href="https://www.eolinker.com/#/product/amt" target="_blank">API Beacon | API 监控</a>
          </li>
          <li class="myli">
            <a
              href="https://www.eolinker.com/#/product/agw"
              rel="nofollow"
              target="_blank"
            >API Gateway | API 微服务网关</a>
          </li>
          <li class="myli">
            <a
              href="https://www.eolinker.com/#/product/dbm"
              rel="nofollow"
              target="_blank"
            >Database Builder | 数据库研发管理</a>
          </li>
        </ul>
        <ul>
          <li>
            <b>公司</b>
          </li>
          <li class="myli">
            <a href="https://www.eolinker.com/#/about" target="_blank" rel="nofollow">关于我们</a>
          </li>
          <li class="myli">
            <a
              href="https://www.eolinker.com/#/register/protocol"
              target="_blank"
              rel="nofollow"
            >服务条款</a>
          </li>
        </ul>
        <ul>
          <li>
            <b>支持</b>
          </li>
          <li class="myli">
            <a href="http://help.eolinker.com" target="_blank" rel="nofollow">帮助中心</a>
          </li>
          <li class="myli">
            <a href="http://blog.eolinker.com" target="_blank" rel="nofollow">Blog&nbsp;博客</a>
          </li>
          <li class="myli">
            <a
              href="https://www.facebook.com/EoLinker-158912544733714/?modal=admin_todo_tour"
              target="_blank"
              rel="nofollow"
            >Facebook&nbsp;脸书</a>
          </li>
          <li class="myli">
            <a href="https://twitter.com/EoLinker" target="_blank" rel="nofollow">Twitter&nbsp;推特</a>
          </li>
          <li class="myli">
            <a
              href="https://www.linkedin.com/company/13627952/admin/updates/"
              target="_blank"
              rel="nofollow"
            >Linkedin&nbsp;领英</a>
          </li>
        </ul>
        <ul>
          <li>
            <b>联系我们</b>
          </li>
          <li class="myli">市场合作：market@eolinker.com</li>
          <li class="myli">购买咨询：sales@eolinker.com</li>
          <li class="myli">运营中心：ops@eolinker.com</li>
          <li class="myli">中国大陆服务支持电话：400-616-0330 法定工作日（9:30-18:30）</li>
          <li class="myli">联系地址：广州市番禺区大学城明志街1号大学城信息枢纽楼3楼</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Head from "./Head";
export default {
  name: "Home",
  data() {
    return {
      value:'',
      keywords: "",
      navList: [],
      askList: [],
      isEmpty: false,
      sortList: [],
      indexPrev: 100,
      groupID:0
    };
  },
  components: {
    Head
  },
  methods: {
    borderstyle1(index) {
      this.indexPrev = index;
    },
    borderstyle2(index) {
      this.indexPrev = 100;
    },
    changeborder() {
      alert("ok");
      this.borderstyle = true;
    },
    selected(vId){  //获取到被选中的groupID
      this.groupID=vId
      console.log(vId)
    },
    //获取产品种类多选框中的数据
    fetchSort() {
      this.$axios({
        method: "get",
        url: "http://localhost:3000/navList"
      }).then(response => {
        this.navList = response.data;
      });
    },
    //获取热门提问与产品图片
    fetchNav() {
      this.$axios({
        method: "get",
        url:
          "https://mockapi.eolinker.com/K92tLWwc4289a578efb1e4b4e017ddb7340c3053aa3a3b2/eo.com/articles/top"
      }).then(response => {
        this.askList = response.data.articles;
        this.sortList = response.data.products;
      });
    },
   
    toSearch(keywords) {
      if (keywords == "") {
        this.isEmpty = true;
      } else {
        console.log(keywords)
        this.$router.push({
          //通过接口传递keywords和pid
          name: "search",
         query: {
            keywords: this.keywords,
            productId:this.groupID
          }
        });
      }
    },
       toquestion(item){
      this.$router.push({
        name:'question',
       query:{
           productId:item.pid,
           articleId:item.id           
        }
      })
    }
  },
  created() {
    this.fetchSort();
    this.fetchNav();
  }
};
</script>

<style scoped>
.out {
  overflow: aoto;
}
.slogan-p {
  font-size: 38px;
  margin-bottom: 30px;
  font-weight: lighter;
}

.contain {
  width: 100%;
  display: flex;
}
.left {
  height: 400px;

  padding: 200px 100px 0 250px;
}
select {
  width: 130px;
  outline: none;
  border: 0;
}
option {
  outline: none;
  padding: 0 20px;
  border: 0;
  font-size: 13px;
}
.right {
  height: 200px;
  flex-grow: 1;
  padding: 100px;
  padding-right: 200px
}
.search {
  width: 400px;
  border: 1px #000 solid;
  padding: 0 10px;
  border-radius: 30px;
  display: inline-block;
}
.empty {
  border: 1px solid red;
}
.jinggao {
  width: 100px;
  margin: 10px auto;
  padding: 5px;
  border: 1px solid #ccc;
  font-size: 12px;
}
.myinput {
  width: 200px;
  padding: 15px;
  border: 0;
  outline: none;
}

.hotask-p {
  margin-left: 5px;
  font-weight: 900;
  color: rgb(160, 153, 153);
  cursor: pointer;
}
.hotask span {
  float: right;
  font-size: 14px;
  color:rgb(160, 153, 153);
  margin-top: 10px;
  cursor: pointer;
}
.hotask a {
  text-decoration: none;
  font-size: 14px;
  color: rgb(15, 12, 12);
  margin-top: 10px;
  display: inline-block;
  cursor: pointer;
}
.hotask a:hover {
  color: rgb(98, 194, 194);
}
.hotask a:before {
  content: "\2022";
  color: rgb(160, 153, 153);
  font-size: 10px;
  padding-right: 10px;
}
.middle {
  width: 100%;
  border-top: 1px solid #ccc;
  margin-bottom: 30px;
}
.lianjie {
  display: inline-block;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  cursor: pointer;
  padding: 10px 10px 15px 0;
  margin: 10px;
}
.lianjie div {
  display: inline-block;
}
img {
  margin: 0;
  padding: 0;
}
.wrapper {
  width: 80%;
  margin: 0 auto;
}
.wrapper {
  margin: 0 auto;
  text-align: center;
}
.p1 {
  font-size: 30px;
  font-weight: lighter;
  margin-bottom: 20px;
}
.p2 {
  font-size: 14px;
  margin-bottom: 20px;
}
.footer {
  width: 100%;
  background: url(../assets/images/index_bg.jpg);
  border-top: 1px solid #eaeaea;
}
.footer-div {
  width: 1100px;
  margin: 0 auto;
  padding: 20px 80px;
  display: flex;
}
.footer-div ul {
  margin: 40px 30px 40px 10px;
  list-style: none;
}
.myli {
  font-size: 13px;
  text-decoration: none;
  margin-top: 10px;
}
.myli a {
  font-size: 13px;
  text-decoration: none;
  color: #000;
}
.myli a:hover {
  text-decoration: underline;
}
.p1 {
  font-weight: 500;
  font-size: 24px;
  padding: 10px 0 0 0;
}
.borderstyle {
  color: #6495ed;
  box-shadow: 0px 8px 13px rgba(0, 0, 0, 0.1);
}
.el-select{
  width: 150px;
}
.left>>>.el-input__inner{
  border:0
}

</style>



