/*
 * @Descripttion:养老产品
 * @Author:
 * @Date: 2019-11-06 10:20:37
 * @LastEditors:
 * @LastEditTime: 2019-11-18 18:26:06
 */
export default [
  {
    path: 'pensionProduct',
    name: 'pensionProduct',
    component: () => import('@/views/ResourceCenter/PensionProduct/pensionProduct.vue'),
    meta: {
      title: '产品中心',
      root: true
    }
  },
  {
    path: 'editPensionProduct',
    name: 'editPensionProduct',
    component: () => import('@/views/ResourceCenter/PensionProduct/editPensionProduct.vue'),
    meta: {
      title: '新增/编辑产品',
      parent: 'pensionProduct'
    }
  },
  {
    path: 'productType',
    name: 'productType',
    component: () => import('@/views/ResourceCenter/PensionProduct/productType.vue'),
    meta: {
      title: '产品目录',
      root: true
    }
  }
]
