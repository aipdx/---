Page({
  data: {
    address: []
  },
  onShow() {
    this.getAddress()
  },
  getAddress() {
    const address = wx.getStorageSync('address') // 通过授权得到的地址
    const addressList = wx.getStorageSync('addressList') || [] // 用户自己在新增地址页面添加的
    if (address) {
      addressList.push(address)
      this.setData({
        address: addressList
      })
    }
    console.log(this.data.address)
  }
})