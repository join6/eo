<template>
  <div>
    <div class="btnbox" @click="back">
        <a  >
          <i class="iconfont icon-fanhui"></i> 返回教程列表
        </a>
      </div>
    <div class="wrapper">
      <div class="btnbox">
       <label style="margin-left:20px">标题:</label>
<el-input v-model="titlemd" placeholder="请输入标题" ></el-input>
  <input type="button"  class="btn" value="保存"  @click="savemd"/>
      </div>
      <div class="editor">
        <mavon-editor style="height: 100%" v-model="value" :subfield="subfield"  :defaultOpen="defaultData"  placeholder="开始新建教程内容..."  ></mavon-editor>
      </div>
    </div>
  </div>
</template>
<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: "markdownWin",

  data() {
    return {
      change:false,
     value:'',
     defaultData: "preview",
      titlemd:'',
      rowid:'',
      bgcolor:false,
      childValue:true,
      subfield:true
    };
  },
  props:["content","title","mdid","parentid"],
  components: {
    mavonEditor
  },
  
  methods: {
    savemd() {
    alert("baox")
       var newData = {
          name:this.titlemd,
          title:this.titlemd,
          content:this.value,
        };   
      if(this.rowid){    //编辑
          this.$axios
          .patch( "http://localhost:3000/company1/"+this.rowid, newData)
          .then(response => {
            this.$message({
              type: "info",
              message: "用户编辑成功",
              duration: 3000
            });
      })
      }else{
          this.$axios
          .post( "http://localhost:3000/company1", newData)
          .then(response => {
            this.$message({
              type: "info",
              message: "用户编辑成功",
              duration: 3000
            });
      })
      }               
       this.$emit('acceptValueW', this.childValue)                   
     


    },
    //md中的内容改变的话打印变化
    show(value,render){
     this.value=render
    console.log(render)
    },
    
    back(value,render){
     if(this.value!==this.content){
         this.$confirm('当前页面中存在未保存的改动，离开页面将导致改动失效，请确认是否离开当前页面？',  {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          //选择确定，关闭md窗口，不保留改变
           this.$emit('acceptValueW', this.childValue)
           this.value=this.content

        }).catch(()=>{
        })
     }else{
         this.$emit('acceptValueW', this.childValue)
     }
   },

  
  },
  mounted(){
   console.log(this.content)
    this.value=this.content
    this.titlemd=this.title
    this.rowid=this.mdid
    if(this.rowid){   //如果没有rowid说明是预览模式
      this.subfield=false 
    }
  }
};
</script>
 <style scoped>
.editor {
  width: 100;
  height: 580px;
}
.btnbox {
  width: 100%;
  padding: 20px 0;
  background-color: #fff;
  text-align: left;
  border-bottom: 1px solid rgb(245, 235, 235);
}
.wrapper {
  
  padding: 30px;
}

.btn {
  padding: 5px 10px;
  background-color:#ADD8E6;
  border-radius: 5px;
  margin-left: 800px;
  outline: none;
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
  width:300px;
}

</style>
