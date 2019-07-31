<!-- Table 组件提供了单选的支持，
// 只需要配置highlight-current-row属性即可实现单选 
之后由current-change事件来管理选中时触发的事件，它会传入currentRow，oldCurrentRow-->
<template>
  <div>
    <div class="btnbox">
      <input
        type="button"
        name
        class="btn"
        value="+新建产品分类"
        @click="dialogFormVisible = true;form={}"
      />
    </div>
    <el-table
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width:100%"
    >
      <el-table-column label="产品分类"  prop="name"  width="300px" ></el-table-column>
      <el-table-column label="最后编辑时间" prop="time" width="300px"></el-table-column>
      <el-table-column label="操作" width="300px">
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

    <el-dialog title="新建产品分类" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" v-if="dialogFormVisible">
        <el-form-item label="产品分类名称" style="display:block" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品分类描述" prop="description">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品分类icon" style="text-align:left" prop="icon">
          <el-upload
            action=""
            accept="image/jpeg, image/png"
            :on-change="onchange"
            :on-success="handleSuccess"
            :auto-upload="false"
            :show-file-list="false"
          >
            <el-button slot="trigger" size="small" type="primary"  v-text="text"></el-button>
             <!-- <el-button slot="trigger" size="small" type="primary"  :disabled="!rechoice"  @click.native="removepic()">重新选择</el-button> -->
            <div v-if="imgsrc"><img :src="imgsrc"  width="80px" height="80px"></div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="add">确定</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <!--                         编辑                                   -->
    <el-dialog title="编辑产品分类" :visible.sync="editVisible">
      <!--v-if="dialogFormVisible" -->
      <el-form :model="details" :rules="rules" v-if="editVisible">
        <el-form-item label="产品分类名称" style="display:block;" prop="name">
          <el-input v-model="details.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品分类描述" prop="description">
          <el-input v-model="details.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品分类icon" style="text-align:left" >
          <el-upload
            action=""
            accept="image/jpeg, image/png"
            :on-change="onchange"
            :on-success="handleSuccess"
            :auto-upload="false"
            :show-file-list="false"
          >
            <el-button slot="trigger" size="small" type="primary"  v-text="text"></el-button>
             <!-- <el-button slot="trigger" size="small" type="primary"  :disabled="!rechoice"  @click.native="removepic()">重新选择</el-button> -->
            <div v-if="details.icon"><img :src="details.icon"  width="80px" height="80px"></div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateEdit">确定</el-button>
        <el-button @click="editVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [], //列表的数据
      search: "",
      dialogFormVisible: false,
      editVisible: false,
      currentRow: {},
      imgsrc:'',
      text:"上传icon",
      details: {}, //编辑的数据
      form: {
        //新建的数据
        name: "",
        description: "",
      },
      
    
      rules: {
        name: [
          { required: true, message: "请输入产品分类名称", trigger: "blur" }
        ],
        description: [
          { required: true, message: "请输入产品分类描述", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    //点击列表行时后的方法
    handleCurrentChange(val) {
      //暂时解决两次调用的问题
      if (val) {
        this.currentRow = val;
        console.log(this.currentRow.id);
        this.$router.push({
          path: "/details/level1/:name",
          query: {
            id: this.currentRow.id,
            name: this.currentRow.name
          }
        });
      }
      event.stopPropagation(); //阻止冒泡到外层div中
    },

    handleEdit(index, row) {
      //编辑
      this.editVisible = true;
      this.details = row;
    },
    //编辑点击确定添加数据
    updateEdit() {
      if (!this.details.name || !this.details.description||!this.imgsrc) {
        alert("请添加完整信息！");
      } else {
        var newData = {
          name: this.details.name,
          description: this.details.description,
          icon: this.imgsrc
        };
        this.$axios
          .patch("http://localhost:3000/company0/" + this.details.id, newData)
          .then(response => {
            this.$message({
              type: "info",
              message: "用户编辑成功",
              duration: 3000
            });
            this.fetchtableDate();
            this.editVisible = false;
          });
      }
    },
    handleDelete(index, row) {
      //删除
      this.$axios
        .delete("http://localhost:3000/company0/" + row.id)
        .then(response => {
          console.log("shanchuchengg");
          this.fetchtableDate();
        });
    },

    //获取表格的数据
    fetchtableDate() {
      this.$axios
        .get(
          "http://localhost:3000/company0/"
        )
        .then(response => {
          this.tableData = response.data;
        });
    },

    //图片上传前的检验
   
      //当上传图片后，调用onchange方法，获取图片本地路径
      onchange(file,fileList){
      const ok = file.type === 'image/jpeg'||'image/png';
        if (!ok) {
          this.$message.error('上传图片只能是JPG或png格式!');
        }else{
          this.text="重新选择"
          var _this = this;
                var event = event || window.event;
                var file = event.target.files[0];
                var reader = new FileReader(); 
                this.icon=reader.result
                
                //转base64
                reader.onload = function(e) {
                  _this.imgsrc = e.target.result 
                }
                reader.readAsDataURL(file)
                console.log(this.imgsrc)
              
        }
     

      },
    //获取图片的路径后放到表单元素
    handleSuccess(res, file) {

      this.imgsrc=URL.createObjectURL(file.raw)
      console.log(this.imgsrc)
      this.$message({
        type: "info",
        message: "图片上传成功",
        duration: 3000
      });

    },
    //提交新建信息
    add(e) {
      if (!this.form.name||!this.form.description||!this.imgsrc) {
        alert("请添加完整信息！");
      } else {
        var newData = {
          name: this.form.name,
          description: this.form.description,
          icon: this.imgsrc
        };
        this.$axios
          .post("http://localhost:3000/company0", newData)
          .then(response => {
            this.$message({
              type: "info",
              message: "用户添加成功",
              duration: 3000
            });
            this.dialogFormVisible = false;
            this.fetchtableDate();
          });
      }
      e.preventDefault();
    },
   
  },
  created() {
    this.fetchtableDate();
  }
};
</script>

<style scoped>
.btnbox {
  width: 100%;
  padding: 15px 0;
  background-color: #fff;
  text-align: left;
  border-bottom: 1px solid rgb(245, 235, 235);
}

.btn {
  padding: 10px 5px;
  background-color: #fff;
  border-radius: 5px;
  margin-left: 5px;
  outline: none;
}
#push {
  padding: 3px;
}
</style>



