/*
 * @Descripttion:资源中心
 * @Author:
 * @Date: 2019-11-05 10:27:14
 * @LastEditors:
 * @LastEditTime: 2019-11-06 22:18:35
 */
import CommunityAgencyRoute from './CommunityAgency'
import SpaceResource from './SpaceResource'
export default [
  {
    path: 'ResourceCenter',
    component: () => import('@/empty.vue'),
    children: [
      ...CommunityAgencyRoute,
      ...SpaceResource
    ]
  }
]
