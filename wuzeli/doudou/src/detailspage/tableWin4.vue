<template>
<div>
    <div>
        <div class="wrapper">
          <!--根据传递过来的id渲染这个id下面的子列表-->
          <div class="btnbox">
            <input type="button" name class="btn" value="+新建教程" @click="back" />
          </div>
          <el-table
            :data="tableData"
            highlight-current-row
            @current-change="handleCurrentChange"
            style="width: 100%"
          >
            <el-table-column label="教程标题"  prop="name" width="400px" style="display:none"></el-table-column>
            <el-table-column label="赞" prop="good" width="80px" :render-header="renderHeader1"></el-table-column>
            <el-table-column label="踩" prop="bad" width="80px" :render-header="renderHeader2"></el-table-column>
            <el-table-column label="阅读量" prop="count" width="100px" :render-header="renderHeader3"></el-table-column>
            <el-table-column label="最新更新时间" prop="time" width="200px"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click.stop="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click.stop="handleDelete(scope.$index, scope.row)"
                >Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
     
      <!-- 新建弹出框 -->
      <!-- 编辑-->
</div>
</template>
<script>
export default {
  name: "tableWin4",
   props:['path','next','level'],
  data() {
    return {
      tableData: [],
      currentRow: "",
      title:"",
      newVisible: false,
      tablevisible:true,
      childValue:false,
      num:"一",
  content:'',
      form1: {
        //新建的分类的数据
        name: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入产品分类名称", trigger: "blur" }
        ]
      }
    };
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
    turn(){
      this.$emit('acceptValue', this.childValue)
    },
    back(){
       this.$emit('acceptValueT', this.childValue)
    },
    
    //获取表格的数据
    fetchtableDate() {
      console.log(this.$route.query.id);
      this.$axios
        .get(this.path) //如何拼接到children
        .then(response => {
          this.tableData = response.data; 
          console.log(response.data);
        });
    },
    handleCurrentChange(val) {
      this.currentRow = val;
      if(val.tag){//产品分类
        this.$router.push({
        //注意是router还是route哭唧唧
        path: this.next,
        query: { name: this.level+">"+this.currentRow.name }
      });
        
      }else{
        this.content=val.content
        this.title=val.title
           console.log('hang '+val.id)
        this.$emit('acceptValueT', this.childValue,this.content,this.title,val.id)  
      }
    
    },
    handleEdit(index, row) {
      //编辑
      this.editVisible = true;
    if(!row.tag){
      this.$emit('acceptValueT', this.childValue)
    }
    },
    //编辑点击确定添加数据
    updateEdit() {
      if (!this.details.name || !this.details.description) {
        alert("请添加完整信息！");
      } else {
        var newData = {
          name: this.details.name,
          description: this.details.description,
          time: this.details.iconurl
        };
        this.$axios
          .patch(this.path+ this.details.id, newData)
          .then(response => {
            this.$message({
              type: "info",
              message: "用户编辑成功",
              duration: 3000
            });
            this.editVisible = false;
          });
      }
    },
    handleDelete(index, row) {
      this.$axios
        .delete(
          this.path +
            this.$route.query.id +
            "/children/" +
            row.name
        )
        .then(response => {
          console.log("shanchuchengg");
        });
    },
   
   
  },
  created() {
    this.fetchtableDate();    
  }
};
</script>

<style  scoped>
.btnbox {
  width: 100%;
  padding: 15px 0;
  background-color: #fff;
  text-align: left;
  border-bottom: 1px solid rgb(245, 235, 235);
}
.wrapper {

  padding:10px 30px;
}
.btn {
  padding: 10px 5px;
  background-color: #fff;
  border-radius: 5px;
  margin-left: 5px;
  outline: none;
}
.el-button {
  padding: 7px 15px;
}

</style>
