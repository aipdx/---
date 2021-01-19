Page({
  data: {
    address: {},
    payOrder: []
  },
  onLoad() {
    this.getStorageAddr()
    this.getBuyProduct()
    console.log(this.data.payOrder)
  },
  // 获取地址信息
  getStorageAddr() {
    const address = wx.getStorageSync('address')
    if (address) {
      this.setData({
        address
      })
    }
  },
  // 获取选购商品信息
  getBuyProduct() {
    const payOrder = wx.getStorageSync('payOrder')
    if (payOrder) {
      this.setData({
        payOrder
      })
    }
  },
  // 支付
  payOrder() {
    const token = wx.getStorageSync('token')
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/auth'
      })
      return
    }
  }
})