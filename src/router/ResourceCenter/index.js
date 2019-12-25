/*
 * @Descripttion:资源中心
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2019-12-25 16:10:47
 */
import CommunityAgencyRoute from './CommunityAgency'
import SpaceResource from './SpaceResource'
import PensionProduct from './PensionProduct'
import EquipmentResource from './EquipmentResource'
import DataScreen from './DataScreen'

export default [
  {
    path: 'ResourceCenter',
    component: () => import('@/empty.vue'),
    children: [
      ...CommunityAgencyRoute,
      ...SpaceResource,
      ...PensionProduct,
      ...EquipmentResource,
      ...DataScreen
    ]
  }
]
