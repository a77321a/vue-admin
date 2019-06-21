<template>
  <div class="teacher-classify">
    <el-form inline ref="form" label-width="80px" size="small">
      <el-form-item label="分类名称">
        <el-input placeholder="请输入分类名称关键字" v-model="searchData.keyword"></el-input>
      </el-form-item>
      <el-form-item label=" ">
        <el-button>重置</el-button>
        <el-button type="primary" @click="getClassify" icon="el-icon-search">搜索</el-button>
      </el-form-item>
      <div class="add-classify">
        <el-button
          size="small"
          type="primary"
          @click="addClassifyObj = {};dialogTitle = '新增分类';dialogShow = true"
        >添加分类</el-button>
      </div>
    </el-form>
    <el-table :data="classify" style="width: 100%;margin-bottom: 20px;" size="small" border>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column prop="sort" label="排序" width="180"></el-table-column>
      <el-table-column prop="address" width="160" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="dialogTitle" :visible.sync="dialogShow">
      <el-form
        :model="addClassifyObj"
        :hide-required-asterisk="true"
        :rules="rules"
        ref="dialogForm"
        label-width="80px"
        size="small"
      >
        <el-form-item label="分类名称" prop="name">
          <el-input placeholder="请输入分类名称" v-model="addClassifyObj.name"></el-input>
        </el-form-item>
        <el-form-item label="分类排序" prop="sort">
          <el-input placeholder="请输入分类排序" v-model.number="addClassifyObj.sort"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogShow = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addClassify">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'teacherClassify',
  data() {
    let validSort = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('排序不能为空'))
      } else if (!Number.isInteger(value)) {
        callback(new Error('排序必须是数字'))
      } else {
        callback()
      }
    }
    return {
      classify: [],
      searchData: {},
      dialogShow: false,
      dialogTitle: '新增分类',
      addClassifyObj: {},
      rules: {
        name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
        sort: [{ required: true, trigger: 'blur', validator: validSort }]
      }
    }
  },
  created() {
    this.getClassify()
  },
  methods: {
    getClassify() {
      this.$http.post('/api/teacher/classifylist').then(res => {
        this.classify = res.rows
      })
    },
    addClassify() {
      this.addClassifyObj.parent_id = 0
      this.$refs['dialogForm'].validate(valid => {
        if (valid) {
          if (this.dialogTitle === '新增分类') {
            this.$http
              .post('/api/teacher/addclassify', this.addClassifyObj)
              .then(res => {
                if (res.code === 200) {
                  this.$message.success('操作成功')
                  this.dialogShow = false
                  this.getClassify()
                }
              })
          } else {
            this.$http
              .post('/api/teacher/saveclassify', this.addClassifyObj)
              .then(res => {
                if (res.code === 200) {
                  this.$message.success('操作成功')
                  this.dialogShow = false
                  this.getClassify()
                }
              })
          }
        }
      })
    },
    handleEdit(row) {
      this.addClassifyObj = row
      delete this.addClassifyObj.packageDuration
      this.dialogTitle = '编辑分类'
      this.dialogShow = true
    },
    handleDelete(id) {}
  }
}
</script>
<style lang="scss" scoped>
.teacher-classify {
  .add-classify {
    float: right;
  }
}
</style>
