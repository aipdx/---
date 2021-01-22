import {request} from '../request/index'

// 获取轮播图
export function getSwiperData() {
  return request({
    url: '/home/swiperdata',
    method: 'get'
  })
}

// 获取轮播图下面的tabs
export function getCatitems() {
  return request({
    url: '/home/catitems',
    method: 'get'
  })
}

// 获取楼层数据
export function getFloorData() {
  return request({
    url: '/home/floordata',
    method: 'get'
  })
}