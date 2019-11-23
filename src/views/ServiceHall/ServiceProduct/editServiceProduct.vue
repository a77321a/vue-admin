<!--
 * @Descripttion:新增、编辑活动
 * @Author:
 * @Date: 2019-11-07 18:03:59
 * @LastEditors:
 * @LastEditTime: 2019-11-23 22:34:08
 -->
<template>
  <div id="edit-event">
    <div class="title">基本信息</div>
    <el-form
      style="width:700px"
      ref="formInfo"
      :rules="rules"
      :model="formInfo"
      label-width="80px"
      size="medium"
    >
      <el-form-item label="服务产品" prop="pensionServiceProductId">
        <el-button
          size="small"
          @click="dialogServiceProduce = true"
          icon="el-icon-plus"
        >{{formInfo.pensionServiceProductId ?'重新选择产品':'选择产品'}}</el-button>
        <span
          v-show="formInfo.pensionServiceProductId"
          style="margin-left:10px"
        >已选：{{formInfo.pensionServiceProductName}}</span>
      </el-form-item>
      <el-form-item label="产品简介" prop="description">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5}"
          placeholder="请输入产品简介，最多不超过68个字"
          v-model="formInfo.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="产品封面" prop="indexPic">
        <div style="display:flex;align-items:center;">
          <div v-show="formInfo.indexPic" class="avatar">
            <img :src="$store.state.config.systemConfig[0].dictionaryValue+formInfo.indexPic" alt />
            <Input
              v-model="$store.state.config.systemConfig[0].dictionaryValue+formInfo.indexPic"
              style="display:none"
            />
          </div>
          <el-upload
            action="apii/public/img"
            :show-file-list="false"
            :before-upload="uploadImg"
            accept="image/*"
          >
            <el-button type="primary" icon="ios-cloud-upload-outline">选择文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="产品详情">
        <UEditor v-model="formInfo.detail"></UEditor>
      </el-form-item>
      <div class="title">价格/类型</div>
      <el-form-item label="所属机构" prop="orgId">
        <el-cascader
          clearable
          @change="changeOrg"
          :props="{value:'orgId',label:'orgName',emitPath:false}"
          :options="orgTree"
          v-model="formInfo.orgId"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="服务类型" prop="orgServiceTypeId">
        <el-select clearable v-model="formInfo.orgServiceTypeId" placeholder="请选择">
          <el-option
            v-for="(item, index) in serviceTypeList"
            :key="index"
            :label="item.orgServiceTypeName"
            :value="item.orgServiceTypeId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品价格" prop="orgServiceProductPrice"></el-form-item>
      <el-form-item label="价格" prop="pensionPrice">
        <el-input-number
          :precision="2"
          v-model="formInfo.pensionPrice"
          controls-position="right"
          :min="0"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="划线价">
        <el-input-number
          :precision="2"
          v-model="formInfo.pensionPlineationPrice"
          controls-position="right"
          :min="0"
        ></el-input-number>
      </el-form-item>
      <el-form-item size="large">
        <el-button @click="handleSave" type="primary">立即创建</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      width="60%"
      destroy-on-close
      lock-scroll
      title="选择养老产品"
      :visible.sync="dialogServiceProduce"
    >
      <selectPensionProduct single @selectObject="selectObject"></selectPensionProduct>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogServiceProduce = false;templateObj = {}">取 消</el-button>
        <el-button type="primary" @click="handleSaveSelectProduct">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import selectPensionProduct from '../../../components/SelectTable/selectPensionProduct.vue'

export default {
  name: 'editEvent',
  components: {
    selectPensionProduct
  },
  data () {
    return {
      dialogServiceProduce: false,
      checkedObject: {},
      serviceTypeList: [],
      formInfo: {},
      rules: {
        pensionServiceProductId: [
          { required: true, message: '请选择服务产品', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请输入产品简介', trigger: 'blur' }
        ],
        indexPic: [
          { required: true, message: '请上传活动封面', trigger: 'change' }
        ],
        orgId: [
          { required: true, message: '请选择所属机构', trigger: 'change' }
        ],
        orgServiceTypeId: [
          { required: true, message: '请选择产品类型', trigger: 'change' }
        ],
        pensionPrice: [
          { required: true, message: '请输入服务价格', trigger: 'blur' }
        ]
      },
      eventRoomList: [],
      orgTree: [],
      productList: [],
      templateObj: [],
      selectObjectList: []
    }
  },
  created () {
    if (this.$route.query.pid) {
      this.getProductInfo()
    }
    this.getOrgList()
    // this.getProductList()
    this.getServiceTypeList()
  },
  methods: {
    changeOrg () {
      this.formInfo.orgServiceTypeId = ''
      this.getServiceTypeList()
    },
    getServiceTypeList () {
      this.$http
        .post('/org/service/type/pageSearch', {
          pageSize: MAXSIZE,
          orgId: this.formInfo.orgId
        })
        .then(res => {
          if (res.code === SUCCESS) {
            this.serviceTypeList = res.payload.records
          }
        })
    },
    /**
     * @descripttion: 选择服务人员
     * @param {type}
     * @return:
     */
    selectObject (data) {
      this.templateObj = data
      console.log(data)
    },
    handleSaveSelectProduct () {
      // this.formInfo.pensionProductId = this.templateObj.pensionServiceProductId
      // this.formInfo.indexPic = this.templateObj.indexPic
      // this.formInfo.detail = this.templateObj.detail
      // this.formInfo.orgServiceProductName = this.templateObj.pensionServiceProductName
      // this.formInfo.description = this.templateObj.description
      // this.formInfo.orgPlineationPrice = this.templateObj.pensionPlineationPrice
      // this.formInfo.orgPrice = this.templateObj.pensionPrice
      // this.formInfo.orgServiceProductPrice = this.pensionServiceProductPrice
      // this.$set(this, 'formInfo', this.templateObj)
      this.$http
        .get(
          '/pension/service/product/detail?pensionServiceProductId=' +
            this.templateObj.pensionServiceProductId
        )
        .then(res => {
          this.formInfo = res.payload
          this.$set(this.formInfo, 'orgServiceTypeId', '')
        })
      this.templateObj = {}
      this.dialogServiceProduce = false
      this.$forceUpdate()
    },
    getOrgList () {
      this.$http.post('/org/tree').then(res => {
        if (res.code === SUCCESS) {
          this.orgTree = res.payload
          this.orgTree.forEach(i => {
            if (i.children.length > 0) {
              i.children.forEach(j => {
                delete j.children
              })
            }
          })
        }
      })
    },
    getProductInfo () {
      this.$http
        .get(
          '/org/service/product/detail?orgServiceProductId=' +
            this.$route.query.pid
        )
        .then(res => {
          if (res.code === SUCCESS) {
            this.formInfo = res.payload
            this.$set(this.formInfo, 'orgId', res.payload.orgDetail.orgId)
            this.$set(
              this.formInfo,
              'orgServiceTypeId',
              res.payload.orgServiceTypeDetail.orgServiceTypeId
            )
            this.$set(
              this.formInfo,
              'pensionPlineationPrice',
              res.payload.orgPlineationPrice
            )
            this.$set(this.formInfo, 'pensionPrice', res.payload.orgPrice)
            this.formInfo.pensionServiceProductId =
              res.payload.pensionServiceProductDetail.pensionServiceProductId
            this.formInfo.pensionServiceProductName =
              res.payload.pensionServiceProductDetail.pensionServiceProductName
            this.$forceUpdate()
          }
        })
    },
    // 保存按钮
    handleSave () {
      this.$refs['formInfo'].validate(valid => {
        if (!valid) return
        let url = this.$route.query.pid
          ? '/org/service/product/update'
          : '/org/service/product/add'
        this.$http
          .post(url, {
            orgServiceProductId: this.$route.query.pid,
            pensionProductId: this.formInfo.pensionServiceProductId,
            description: this.formInfo.description,
            detail: this.formInfo.detail,
            indexPic: this.formInfo.indexPic,
            orgId: this.formInfo.orgId,
            orgPlineationPrice: this.formInfo.pensionPlineationPrice,
            orgPrice: this.formInfo.pensionPrice,
            orgServiceProductName: this.formInfo.pensionServiceProductName,
            orgServiceProductPrice: this.formInfo.pensionServiceProductPrice,
            orgServiceTypeId: this.formInfo.orgServiceTypeId
          })
          .then(res => {
            if (res.code === SUCCESS) {
              this.$message.success('操作成功')
              this.$router.go(-1)
            }
          })
      })
    },
    uploadImg (file) {
      let formdata = new FormData()
      formdata.append('file', file)
      this.$http.postForm('/file/upload', formdata).then(res => {
        if (res.code === SUCCESS) {
          this.formInfo.activityIndexPic = res.payload
        }
      })
      return false
    }
  }
}
</script>
<style lang="scss">
/deep/ .el-cascader-node__prefix {
  top: 10px !important;
}
</style>
