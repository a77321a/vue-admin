<!--
 * @Descripttion:空间资源
 * @Author:
 * @Date: 2019-11-06 22:19:24
 * @LastEditors:
 * @LastEditTime: 2019-11-09 17:15:47
 -->
<template>
  <div id="space-resource">
    <div class="tree-title">
      <span class="left">名称</span>
      <span class="right">操作</span>
    </div>
    <el-tree draggable :allow-drop="allowDrop" :data="data" node-key="id" default-expand-all>
      <div class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span style="float:right">
          <el-button
            type="text"
            size="mini"
            @click="() => append(node,data)"
          >{{data.type == 1 ? '新增县' : '新增乡'}}</el-button>
          <el-button type="text" size="mini" @click="() => remove(node, data)">删除</el-button>
        </span>
      </div>
    </el-tree>
  </div>
</template>
<script>
import VueAMap, { AMapManager } from 'vue-amap'
let amapManager = new AMapManager()
VueAMap.initAMapApiLoader({
  key: '307510b98ac36649578b31a1c86cb116',
  plugin: [
    'AMap.Autocomplete',
    'AMap.PlaceSearch',
    'AMap.Scale',
    'AMap.OverView',
    'AMap.ToolBar',
    'AMap.MapType',
    'AMap.PolyEditor',
    'AMap.CircleEditor',
    'AMap.Geolocation',
    'AMap.Geocoder'
  ],
  v: '1.4.4'
})
export default {
  name: 'spaceResource',
  data () {
    let self = this
    return {
      amapManager,
      map: {},
      searchOption: {
        city: '南京',
        citylimit: true
      },
      markers: [],
      dialogVisible: true,
      data: [
        {
          id: 1,
          label: '一级 1',
          type: 1,
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          type: 1,
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          type: 1,
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2'
            }
          ]
        }
      ],
      nearbyInfo: [], // 周边信息---高德反馈（周边建筑信息）
      address: '', // 城市信息---高德反馈（省市区、adcode）
      zoom: 13, // 地图缩放
      events: {
        init: o => {},
        click: e => {
          // 点击地图的时候，获取点的击经纬度，并将地图中心点移自此处
          let { lng, lat } = e.lnglat
          self.lng = lng
          self.lat = lat
          // 这里通过高德 SDK 完成。
          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: 'all'
          })
          geocoder.getAddress([lng, lat], function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              if (result && result.regeocode) {
                self.address = result.regeocode.formattedAddress
                self.open(self.address)
                self.$nextTick()
              }
            }
          })
        }
      },
      mapCenter: [121.59996, 31.197646],
      plugin: [
        {
          enableHighAccuracy: true, // 是否使用高精度定位，默认:true
          timeout: 100000, // 超过10秒后停止定位，默认：无穷大
          maximumAge: 0, // 定位结果缓存0毫秒，默认：0
          convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true, // 显示定位按钮，默认：true
          buttonPosition: 'RB', // 定位按钮停靠位置，默认：'LB'，左下角
          showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true, // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
          extensions: 'all',
          pName: 'Geolocation',
          events: {
            init (o) {
              var geolocation = new AMap.Geolocation({
                enableHighAccuracy: true, // 是否使用高精度定位，默认:true
                timeout: 10000, // 超过10秒后停止定位，默认：5s
                buttonPosition: 'RB', // 定位按钮的停靠位置
                zoomToAccuracy: true // 定位成功后是否自动调整地图视野到定位点
              })
              // o 是高德地图定位插件实例

              geolocation.getCurrentPosition((status, result) => {
                console.log(status, result)
                if (result && result.position) {
                  self.lng = result.position.lng
                  self.lat = result.position.lat
                  self.center = [self.lng, self.lat]
                  self.loaded = true
                  self.$nextTick()
                }
              })
            }
          }
        }
      ]
    }
  },
  methods: {
    allowDrop (draggingNode, dropNode, type) {
      console.log(draggingNode, dropNode)
      if (draggingNode.level === dropNode.level) {
        if (draggingNode.data.aboveId === dropNode.data.aboveId) {
          return type === 'prev' || type === 'next'
        }
      } else {
        // 不同级进行处理
        return false
      }
    },
    sort (draggingNode, dropNode, type, event) {
      /* console.log('排序')
      console.log(dropNode)   //dropNode.parent.childNodes =[] 拖拽之后的重新组合的数组 */
      let obj = {
        aboveId: '',
        arr: []
      }
      obj.aboveId = dropNode.data.aboveId
      for (let item of dropNode.parent.childNodes) {
        obj.arr.push(item.data.id)
      }
      // this.updateOrderMe(obj)
    },
    updateOrderMe (obj) {
      this.$http
        .post('url', { aboveId: obj.aboveId, ids: obj.arr })
        .then(res => {
          if (!res.data.success) {
            this.$message.warning(res.data.msg)
          }
        })
    },
    open (str) {
      this.$confirm(`确定选择地址：${str}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    append (node, data) {
      console.log(data, node)
    },
    remove (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    onSearchResult (pois) {
      let latSum = 0
      let lngSum = 0
      if (pois.length > 0) {
        pois.forEach(poi => {
          let { lng, lat } = poi
          lngSum += lng
          latSum += lat
          this.markers.push({ position: [poi.lng, poi.lat] })
        })
        let center = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        }
        this.mapCenter = [center.lng, center.lat]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
#space-resource {
  /deep/ .el-dialog__body {
    padding: 15px;
    padding-top: 0;
  }
  .tree-title {
    display: block;
    height: 40px;
    line-height: 40px;
    font-size: 13px;
    font-weight: 700;
    background-color: rgb(241, 241, 241);
    padding: 0px 20px;
    text-align: center;
    .left {
      float: left;
    }
    .right {
      float: right;
    }
  }
  .custom-tree-node {
    padding-right: 20px;
    width: 100%;
  }
  /deep/ .el-tree-node__content {
    height: 40px;
    line-height: 40px;
  }
}
</style>
