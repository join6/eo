<template>
  <div class="outer">
       <div class="title">
            <img src="../assets/images/logo.png" />
            <b>EOLINKER后台管理</b>
     </div>
    <div class="login-wrapper">
        
      <div class="container">
        <h2 style="padding:10px;text-align:center">注册</h2>
        <el-form
          :model="ruleForm"
          status-icon
          ref="ruleForm"
          label-width="50px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="admin">
            <el-input v-model="ruleForm.admin" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input :type="inputtype" v-model="ruleForm.pass" autocomplete="off">
              <i
                slot="suffix"
                style="cursor:pointer;"
                @click="change"
                class="iconfont"
                v-bind:class="{'icon-xianshi1':isXianshi,'icon-yincang':isYincang}"
              ></i>
            </el-input>
          </el-form-item>
          <el-form-item style="text-align:center">
            <el-button type="primary" @click="submitForm('ruleForm')" :disabled='disabled'>注册</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <hr />
        <div style="margin-top:60px;text-align:center">
          <span id="span1">已有账号？</span>
          <router-link to="login" id="a1">点击登录</router-link>
        </div>
         <div style="display:none" >{{ exitsVal }}</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "login",
  data() {
    return {
      inputtype: "password",
      isXianshi: true,
      isYincang: false,
      ifExist:'',
      ruleForm: {
        admin: "",
        pass: ""
      },
       disabled:true
    };
  },
  methods: {
    change() {
      this.isXianshi = !this.isXianshi;
      this.isYincang = !this.isYincang;
      if (this.isYincang) {
        this.inputtype = "text";
      } else {
        this.inputtype = "password";
      }
    },
    submitForm(formName) {},
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
   computed:{
    exitsVal:function(){
        this.ifExist=Number(Boolean(this.ruleForm.admin))+Number(Boolean(this.ruleForm.pass));
    }
  },
  watch:{
ifExist(newVal,oldVal){
      if(Number(newVal) === 2) 
      this.disabled=false
      else this.disabled=true
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
/* .login-wrapper {
  width: 400px;
  height: 500px;
  margin:200px auto;
} */
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
img{
  display: inline-block;
  vertical-align:middle
}
b {
  font-size: 24px;
  margin-left: 10px;
  vertical-align:middle
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
</style>
