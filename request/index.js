import ENV from './dev'

let ajaxTimes = 0 // 异步请求的个数

export const request = (params, isToken) => {
  let header = {...params.header} // 避免覆盖传递过来的header
  // 全局设置token 传params的时候需要携带token的多传一个参数
  if (isToken) {
    const token = wx.getStorageSync('token')
    if (token) {
      header['Authorization'] = token
    }
  }
  ajaxTimes++
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      header: header,
      url: params.customUrl || ENV.baseURL + params.url, // params.customUrl自定义的url，有些接口可能baseURL也不同
      success: result => {
        if (result.data.meta.status === 200) {
          resolve(result.data.message) // 直接返回结果，需要结构一样
        } else {
          reject(result.meta.msg)
        }
      },
      fail: err => {
        wx.showToast({
          title: '获取数据失败',
          icon: "none",
          duration: 2000
        })
        reject(err.data)
      },
      complete(res) {
        ajaxTimes--
        if (ajaxTimes === 0) {
          wx.hideLoading() // 当所有的请求都完成时再关闭loading
        }
      }
    })
  })
}