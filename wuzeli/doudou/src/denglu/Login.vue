<template>
  <div>
    <div class="outer">
         <div class="title">
            <img src="../assets/images/logo.png" />
            <b>EOLINKER后台管理</b>
     </div>
      <div class="login-wrapper">
   
        
        <div class="container">
          <h2 style="padding:10px;text-align:center">登录</h2>
          <el-form
            :rules="rules"
            :model="user"
            status-icon
            ref="user"
            label-width="50px"
            class="demo-user"
          >
            <el-form-item label="账号" prop="admin">
              <el-input v-model="user.admin"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input :type="inputtype" v-model="user.pass" autocomplete="off">
                <i
                  slot="suffix"
                  style="cursor:pointer;"
                  @click="change"
                  class="iconfont"
                  v-bind:class="{'icon-xianshi1':isXianshi,'icon-yincang':isYincang}"
                ></i>
              </el-input>
            </el-form-item>
            <el-checkbox
              v-model="checked"
              style="color:#a0a0a0; margin-left:230px;margin-bottom:10px"
            >一周内自动登录</el-checkbox>
            <el-form-item style="text-align:center">
              <el-button type="primary" @click="submitForm('user')" :disabled="disabled">登录</el-button>
              <el-button @click="resetForm('user')">重置</el-button>
            </el-form-item>
          </el-form>
          <hr />
          <div style="margin-top:60px">
            <span id="span1">还未注册？</span>
            <router-link to="register" id="a1">点击注册</router-link>
            <router-link to="forget" id="a2" @click.native="clearCookie">忘记密码</router-link>
          </div>
          <div style="display:none">{{ exitsVal }}</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  name: "login",
  data() {
    return {
      ifshow: false,
      checked: false,
      inputtype: "password",
      isXianshi: true,
      isYincang: false,
      user: {
        admin: "",
        pass: ""
      },

      ifExist: "",
      disabled: true,
      rules: {
        admin: [
          {
            pattern: /(^1[3|4|5|7|8][0-9]{9}$)|(^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$)/i,
            trigger: "blur",
            message: "请输入正确的手机号或邮箱"
          }
        ]
      }
    };
  },
  methods: {
    //校验账号的输入

    change() {
      this.isXianshi = !this.isXianshi;
      this.isYincang = !this.isYincang;
      if (this.isYincang) {
        this.inputtype = "text";
      } else {
        this.inputtype = "password";
      }
    },
    submitForm(formName) {
      if (this.checked) {
        this.setCookie(this.user.admin, this.user.pass, 7);
      }
      this.$axios({
        methods: "get",
        url:
          "https://mockapi.eolinker.com/K92tLWwc4289a578efb1e4b4e017ddb7340c3053aa3a3b2/eo.com/articles/top",
        params: {
          admin: this.user.admin,
          pass: this.user.pass
        }
      })
        .then(response => {
          this.token = response.data.token;
          this.$store.commit("ADD_COUNT", this.token);
          console.log(this.token);
          if (this.$route.query.redirect) {
            this.$router.push("" + this.$route.query.redirect);
          } else {
            this.$router.push("/");
          }
        })
        .catch(error => {});
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    changePass(value) {
      this.visible = !(value === "show");
    }, //判断渲染，true:暗文显示，false:明文显示
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);
      //字符串拼接cookie
      window.document.cookie =
        "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    //读取cookie
    getCookie: function() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; ");
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("=");
          //判断查找相对应的值
          if (arr2[0] == "userName") {
            this.user.admin = arr2[1];
          } else if (arr2[0] == "userPwd") {
            this.user.pass = arr2[1];
          }
        }
        this.checked = true;
      }
    },
   

    //清除cookie
    clearCookie: function() {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    }
  },
  //页面加载调用获取cookie值
  mounted() {
    this.getCookie();
  },

  computed: {
    exitsVal: function() {
      this.ifExist =
        Number(Boolean(this.user.admin)) + Number(Boolean(this.user.pass));
    }
  },
  watch: {
    ifExist(newVal, oldVal) {
      if (Number(newVal) === 2) this.disabled = false;
      else this.disabled = true;
    }
  }
};
</script>

<style <style scoped>
.outer {
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #f7f8fc;
}
.login-wrapper {
  width:900px;
    margin: 0 auto;
  /* border: 1px solid #ccc; */
  background: url(../assets/images/home_0.jpg) no-repeat;
  background-color: #fff;
  background-position: right ;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}
.top * {
  vertical-align: middle;
}
.top {
  margin-left: 50px;
  padding-bottom: 50px;
}

.container {
  
  padding: 20px;
  width: 350px;
  height: 350px;
  
 
}
#span1 {
  margin-left: 20px;
  font-size: 13px;
}
#a1 {
  text-decoration: none;
  font-size: 13px;
  color: rgb(93, 93, 255);
}
#a1:hover {
  color: blue;
}
#a2 {
  text-decoration: none;
  font-size: 13px;
  color: rgb(165, 165, 168);
  margin-left: 140px;
}
#a2:hover {
  color: #000;
}
hr {
  background-color: #d9dbe2;
}
.title{
 width: 400px;
 height: 100px;
  margin:0 auto;  
  margin-top: 100px
}
img{
  display: inline-block;
  vertical-align:middle
}
b {
  font-size: 24px;
  margin-left: 10px;
  vertical-align:middle
}
</style>
