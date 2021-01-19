Page({
  data: {
    userInfo: {}
  },
  onLoad() {
    this.getStorageUserInfo()
  },
  getUserInfo(e) {
    const {userInfo} = e.detail
    console.log(userInfo)
    this.setData({userInfo})
    wx.setStorageSync('userInfo', userInfo)
  },
  getStorageUserInfo() {
    const userInfo = wx.getStorageSync('userInfo')
    console.log(userInfo)
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