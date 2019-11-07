<!--
 * @Descripttion: 活动详情
 * @Author:
 * @Date: 2019-11-07 19:28:01
 * @LastEditors:
 * @LastEditTime: 2019-11-07 20:10:13
 -->
<template>
  <div id="event-info">
    <el-card shadow="never" class="box-card">
      <div class="flex-t-l">
        <img :src="eventInfo.cover" alt />
        <div class="flex-column-t">
          <h4>活动名称</h4>
          <el-form label-position="left" ref="form" :model="eventInfo" label-width="100px">
            <el-form-item>
              <template slot="label">
                <i class="el-icon-alarm-clock"></i>活动时间：
              </template>
              2019/03/23 09：30：00~2019/03/23 09：30：00
            </el-form-item>
            <el-form-item>
              <template slot="label">
                <i class="el-icon-location-outline"></i>活动地点：
              </template>
              南京市xxxxx区
            </el-form-item>
            <el-form-item>
              <template slot="label">
                <i class="el-icon-office-building"></i>所在机构：
              </template>
              尹康社区养老机构
            </el-form-item>
            <el-form-item>
              <template slot="label">
                <i class="el-icon-house"></i>活动室：
              </template>
              尹康社区养老机构
            </el-form-item>
          </el-form>
          <!-- <p>
            <i class="el-icon-alarm-clock"></i> 活动时间：2019/03/23 09：30：00~2019/03/23 09：30：00
          </p>
          <p>
            <i class="el-icon-location-outline"></i>活动地点：南京市xxxxx区
          </p>
          <p>
            <i class="el-icon-alarm-clock"></i> 所在机构：尹康社区养老机构
          </p>
           <p>
            <i class="el-icon-alarm-clock"></i> 活动室：尹康社区养老机构
          </p>-->
        </div>
      </div>
    </el-card>
    <el-tabs style="margin-top:20px;">
      <el-tab-pane label="参与人员" name="first">参与人员</el-tab-pane>
      <el-tab-pane label="服务人员" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="活动总结" name="third">角色管理</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: 'eventInfo',
  data () {
    return {
      eventInfo: {
        cover:
          'https://admin.dingcourse.com/uploads/images/20191105/3f22d612e072c6bc137e72715f29be06.jpg'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 0;
  /deep/.el-form-item__label,
  /deep/.el-form-item__content {
    height: 30px !important;
    line-height: 30px !important;
  }
}
/deep/ .box-card .flex-t-l {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  img {
    float: left;
    width: 210px;
    height: 160px;
    margin-right: 15px;
    vertical-align: middle;
    flex-shrink: 0;
    object-fit: cover;
  }
  .flex-column-t {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
