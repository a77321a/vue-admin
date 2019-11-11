<!--
 * @Descripttion: 新增 、 编辑菜品
 * @Author:
 * @Date: 2019-11-11 15:21:28
 * @LastEditors:
 * @LastEditTime: 2019-11-11 16:49:12
 -->
<template>
  <div id="edit-dish">
    <div class="title">基本信息</div>
    <el-form
      style="width:700px"
      ref="formInfo"
      :rules="rules"
      :model="formInfo"
      label-width="80px"
      size="medium"
    >
      <el-form-item label="菜品名称" prop="foodName">
        <el-input
          show-word-limit
          placeholder="请输入菜品名称，最多不超过28个字"
          :maxlength="28"
          v-model="formInfo.foodName"
        ></el-input>
      </el-form-item>
      <el-form-item label="菜品介绍" prop="foodDescription">
        <el-input
          type="textarea"
          show-word-limit
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入菜品介绍，最多不超过68个字"
          :maxlength="69"
          v-model="formInfo.foodDescription"
        ></el-input>
      </el-form-item>
      <el-form-item label="菜品封面" prop="indexPic">
        <el-upload action="#" list-type="picture-card" :before-upload="uploadImg">
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
      </el-form-item>
      <div class="title">上架信息</div>
      <el-form-item label="所属机构" prop>
        <el-select clearable v-model="formInfo.content" style="width:220px" placeholder="请选择">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜品类型" prop="foodType">
        <el-select clearable v-model="formInfo.foodType" style="width:220px" placeholder="请选择">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="适应季节" prop="season">
        <el-select clearable v-model="formInfo.season" style="width:220px" placeholder="请选择">
          <el-option label="全部" value="-1"></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input-number v-model="formInfo.price" :precision="2" controls-position="right" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="划线价" prop="salePrice">
        <el-input-number
          v-model="formInfo.salePrice"
          :precision="2"
          controls-position="right"
          :min="0"
        ></el-input-number>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'editDish',
  data () {
    return {
      formInfo: {
        indexPic: [],
        price: 0,
        salePrice: 0,
        foodDescription: '',
        foodName: '',
        foodType: '',
        season: ''
      },
      rules: {
        foodName: [
          { required: true, message: '请输入菜品名称', trigger: 'blur' }
        ],
        price: [{ required: true, message: '请输入菜品价格', trigger: 'blur' }],
        salePrice: [
          { required: true, message: '请输入划线价格', trigger: 'blur' }
        ],
        foodType: [
          { required: true, message: '请选择菜品类型', trigger: 'change' }
        ],
        indexPic: [
          { required: true, message: '请选择菜品图片', trigger: 'change' }
        ],
        foodDescription: [
          { required: true, message: '请输入菜品介绍', trigger: 'blur' }
        ],
        season: [
          { required: true, message: '请选择菜品适用季节', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    if (this.$route.query.fid) {
      this.getFoodInfo()
    }
  },
  methods: {
    uploadImg (file) {
      let formdata = new FormData()
      formdata.append('file', file)
      this.$http.postForm('/file/upload', formdata).then(res => {
        if (res.code === SUCCESS) {
          this.formInfo.indexPic.push({
            url: `http://118.24.54.72:8061/${res.payload}`
          })
        }
      })
      return false
    },
    handleRemove () {},
    handleSave () {
      this.$refs['formInfo'].validate(valid => {
        if (!valid) return
        if (this.$route.query.fid) {
          this.$http.post('/food/update', this.formInfo).then(res => {
            if (res.code === SUCCESS) {
              this.$message.success('操作成功')
              this.$router.go(-1)
            }
          })
        } else {
          this.$http.post('/food/add', this.formInfo).then(res => {
            if (res.code === SUCCESS) {
              this.$message.success('操作成功')
              this.$router.go(-1)
            }
          })
        }
      })
    },
    getFoodInfo () {
      this.$http.get('/food/get?foodId=' + this.$route.query.fid).then(res => {
        if (res.code === SUCCESS) {
          this.formInfo = res.payload
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
