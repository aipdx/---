import {wxLogin} from '../../utils/asyncWx'
import {request} from '../../request/index'

Page({
  data: {},
  userInfo: {},
  onLoad(options) {
  },
  async getUserInfo(e) {
    try {
      this.userInfo = e.detail
      const {encryptedData, rawData, iv, signature} = e.detail
      // 获取小程序登陆后的code
      const {code} = await wxLogin()
      const params = {
        url: '/users/wxlogin',
        data: {
          encryptedData,
          rawData,
          iv,
          signature,
          code,
        },
        method: 'POST'
      }
      // const {token} = await request(params) // 这里需要appId
      const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
      // 把token存到本地
      wx.setStorageSync('token', token)
      wx.navigateBack({
        delta: 1 // 1:返回上一级   2:返回上两级
      })
    } catch (e) {
      console.log(e)
    }
  }
})