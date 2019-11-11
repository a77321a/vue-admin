/*
 * @Descripttion:养老产品
 * @Author:
 * @Date: 2019-11-06 10:20:37
 * @LastEditors:
 * @LastEditTime: 2019-11-09 11:44:16
 */
export default [
  {
    path: 'pensionProduct',
    name: 'pensionProduct',
    component: () => import('@/views/ResourceCenter/PensionProduct/pensionProduct.vue'),
    meta: {
      title: '养老产品',
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
      title: '产品类型',
      root: true
    }
  }
]
