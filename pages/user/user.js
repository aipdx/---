Page({
  data: {
    userInfo: {}
  },
  onShow() {
    this.getStorageUserInfo()
  },
  // 点击登录获取用户信息
  getUserInfo(e) {
    const {userInfo} = e.detail
    this.setData({userInfo})
    wx.setStorageSync('userInfo', userInfo)
  },
  // 获取本地缓存用户信息
  getStorageUserInfo() {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({userInfo})
    }
  },
  // 联系客服
  freeTell() {
    wx.makePhoneCall({
      phoneNumber: '400-618-4000'
    })
  }
})