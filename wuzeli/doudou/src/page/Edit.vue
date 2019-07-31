<template>
    <div>
<el-dialog title="收货地址" :visible.sync="editVisible">
  <el-form :model="form">
    <el-form-item label="活动名称" >
      <el-input v-model="form.name" autocomplete="off">{{details.name}}</el-input>
    </el-form-item>
     <el-form-item label="描述" >
      <el-input v-model="form.description" autocomplete="off">{{details.description}}</el-input>
    </el-form-item>
      <el-form-item label="图标" >
      <el-input v-model="form.iconurl" autocomplete="off">{{details.iconurl}}</el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="editVisible = false">确定</el-button>
    <el-button @click="editVisible = false">取消</el-button>
  </div>
</el-dialog>

</div>

</template>
<script>
  export default {
    name:"Edit",
    data() {
      return {
        form: {
          name: '',
          description: '',
          iconurl:''
        },
       
      };
    },
    props:["editVisible","details"]
  };
</script>




<style>

</style>
