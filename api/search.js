import {request} from '../request/index'

// 获取所以订单
export function getSearchData(data) {
  return request({
    url: '/goods/qsearch',
    method: 'get',
    data
  })
}