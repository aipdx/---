Page({
  data: {
    userInfo: {},
    collectNum: 0
  },
  onShow() {
    this.getStorageUserInfo()
    this.getCollectNum()
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
  // 获取收藏的商品数
  getCollectNum() {
    const collectList = wx.getStorageSync('collectGoods') || []
    this.setData({
      collectNum: collectList.length
    })
  },
  // 联系客服
  freeTell() {
    wx.makePhoneCall({
      phoneNumber: '400-618-4000'
    })
  }
})