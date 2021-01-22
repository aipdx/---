import {request} from '../request/index'

// 获取商品详情数据
export function getGoodsDetail(data) {
  return request({
    url: '/goods/detail',
    method: 'get',
    data
  })
}

// 搜索数据
export function getGoodsSearch(data) {
  return request({
    url: '/goods/search',
    method: 'get',
    data
  })
}