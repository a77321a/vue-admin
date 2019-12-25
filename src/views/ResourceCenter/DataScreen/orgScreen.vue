<!--
 * @Descripttion:
 * @Author:
 * @Date: 2019-12-25 16:05:37
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2019-12-25 16:41:00
 -->
<template>
  <div id="org-srceen">
    <el-row :gutter="10" justify="space-around">
      <el-col
        v-for="(item, index) in orgList"
        :key="index"
        :xs="11"
        :sm="7"
        :md="7"
        :lg="5"
        :xl="5"
      >
        <el-card :body-style="{ padding: '0px' }" class="box-card">
          <el-image :src="item.indexPic" class="box-image"></el-image>
          <h2>{{item.orgName}}</h2>
          <el-link class="link" :underline="false" @click="openScreenUrl(item)" type="primary">点击查看</el-link>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'orgScreen',
  data () {
    return {
      orgList: []
    }
  },
  created () {
    let userInfo = JSON.parse(localStorage.userInfo)
    console.log(userInfo)
    let userType = userInfo.superAdmin
    if (userType) {
      this.orgList = [
        {
          orgName: '机构大屏',
          indexPic: '',
          url: `http://118.24.54.72:8078/#/?x-token=${userInfo.token}`
        }
      ]
    } else {
      if (Array.isArray(userInfo.orgEntities)) {
        let arr = []
        userInfo.orgEntities.forEach(i => {
          arr.push({
            orgName: i.orgName,
            indexPic:
              this.$store.state.config.systemConfig[0].dictionaryValue +
              '' +
              i.indexPic,
            url: `http://118.24.54.72:8078/#/secondpage?orgId=${
              i.parentOrgId
            }&x-token=${userInfo.token}`
          })
        })
        console.log(arr)
        this.orgList = arr
      }
    }
  },
  methods: {
    openScreenUrl (item) {
      window.open(item.url, '_target')
    }
  }
}
</script>
<style lang="scss" scoped>
.box-card {
  text-align: center;
  h2 {
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .link {
    margin-bottom: 5px;
  }
  .box-image {
    display: block;
    height: 100px;
  }
}
</style>
