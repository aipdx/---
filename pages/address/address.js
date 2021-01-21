Page({
  data: {
    address: []
  },
  onShow() {
    this.getAddress()
  },
  // 获取地址信息
  getAddress() {
    const addressList = wx.getStorageSync('addressList') || [] // 用户自己在新增地址页面添加的
    addressList.map(v => {
      if (!v.checked) { // 如果没有checked就添加一个
        v.checked = false
      }
    }) // 给地址添加一个是否选中的标识
    this.setData({
      address: addressList
    })
  },
  // 选择地址
  handleAddress(e) {
    const {index} = e.currentTarget.dataset
    let {address} = this.data
    address.forEach((v, i) => i === index ? v.checked = true : v.checked = false)
    this.setData({
      address
    })
    wx.setStorageSync('addressList', address)
  }
})