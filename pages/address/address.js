Page({
  data: {
    address: [], // 所有地址数组
    slideButtons: [{ // 左滑按钮配置
      type: 'warn',
      text: '删除'
    }],
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
    this.setData({address: addressList})
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
  },
  slideButtonTap(e) {
    const {index} = e.detail // index对应的是slideButtons数组的索引 index为多少就表示点击的是数组的第几个
    const currentIndex = e.currentTarget.dataset.index // 点击当前的索引
    let {address} = this.data
    if (index === 0) { // 删除
      wx.showModal({
        content: '确认删除吗',
        success: (res) => {
          if (res.confirm) { // 用户点击了确定
            address.splice(currentIndex, 1) // 删除当前索引对应的数据
            this.setData({address})
            wx.setStorageSync('addressList', address)
          } else {
            console.log('用户点击了取消')
          }
        }
      })
    }
  }
})