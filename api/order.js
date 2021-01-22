import {request} from '../request/index'

// 获取所以订单
export function getAllOrder(data) {
  return request({
    url: '/my/orders/all',
    method: 'get',
    data
  },'isToken')
}

// 创建订单
export function createOrder(data) {
  return request({
    url: '/my/orders/create',
    method: 'post',
    data
  },'isToken')
}

// 获取支付参数
export function unifiedOrder(data) {
  return request({
    url: '/my/orders/req_unifiedorder',
    method: 'post',
    data
  },'isToken')
}

// 订单是否支付成功
export function checkOrder(data) {
  return request({
    url: '/my/orders/chkOrder',
    method: 'post',
    data
  },'isToken')
}