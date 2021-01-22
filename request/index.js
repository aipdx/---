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
  return new Promise(((resolve, reject) => {
    wx.request({
      ...params,
      header: header,
      url: ENV.baseURL + params.url,
      success: result => {
        if (result.data.meta.status === 200) {
          resolve(result.data.message) // 直接返回结果，需要结构一样
        }
      },
      fail: err => {
        wx.showToast({
          title: '获取数据失败',
          icon: "none",
          duration: 2000
        })
        reject(err)
      },
      complete(res) {
        ajaxTimes--
        if (ajaxTimes === 0) {
          wx.hideLoading() // 当所有的请求都完成时再关闭loading
        }
      }
    })
  }))
}