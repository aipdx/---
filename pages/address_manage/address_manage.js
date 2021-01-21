const app = getApp()
Page({
  data: {
    form: {
      userName: '',
      telNumber: '',
      addrDetail: '',
      region: ['请选择省市区/县', '', ''], // 省市区数据 第一个可以当placeholder
    },
    customItem: '', // 自定义picker显示的内容
  },
  Postcode: '', // 邮编
  AddressId: -1,
  onShow() {
    const {id} = app.getPage(1).options
    if (id >= 0) {
      this.AddressId = id
      this.getEditAddress(id)
    }
  },
  // 省市区选择事件
  bindRegionChange(e) {
    const {value, code, postcode} = e.detail
    // console.log(code) // 统计用区划代码
    // postcode 是邮政编码
    this.Postcode = postcode
    this.setData({
      'form.region': value
    })
  },
  // 提交表单
  submitForm(e) {
    if (!this.validateForm(e)) return
    // userName,telNumber...对应的是input的name属性
    const {userName, telNumber, region, addrDetail} = e.detail.value
    const addressList = wx.getStorageSync('addressList') || []
    if (this.AddressId >= 0) { // 编辑地址
      addressList[this.AddressId].userName = userName
      addressList[this.AddressId].telNumber = telNumber
      addressList[this.AddressId].postalCode = this.Postcode
      addressList[this.AddressId].provinceName = region[0]
      addressList[this.AddressId].cityName = region[1]
      addressList[this.AddressId].countyName = region[2]
      addressList[this.AddressId].detailInfo = addrDetail
      addressList[this.AddressId].all = region[0] + region[1] + region[2] + addrDetail
    } else { // 新增地址
      const address = {
        userName,
        telNumber,
        postalCode: this.Postcode,
        provinceName: region[0],
        cityName: region[1],
        countyName: region[2],
        detailInfo: addrDetail,
        all: region[0] + region[1] + region[2] + addrDetail
      }
      addressList.push(address)
    }
    wx.setStorageSync('addressList', addressList)
    wx.showToast({
      title: '提交成功',
    })
    wx.navigateBack({
      delta: 1
    })
  },
  // 验证form
  validateForm(e) {
    const telReg = app.regExps.mobile
    const {userName, telNumber, region, addrDetail} = e.detail.value
    if (!userName.trim()) {
      wx.showToast({
        title: '请先填写姓名',
        icon: "none"
      })
      return false
    }
    if (!telNumber.trim() || !telReg.test(telNumber)) {
      wx.showToast({
        title: '请先填正确的手机号',
        icon: "none"
      })
      return false
    }
    if (!region.length) {
      wx.showToast({
        title: '请先选择省市区',
        icon: "none"
      })
      return false
    }
    if (!addrDetail.trim()) {
      wx.showToast({
        title: '请先填写详细信息',
        icon: "none"
      })
      return false
    }
    return true
  },
  // 编辑地址获取需要编辑的地址信息
  getEditAddress(id) {
    const addressList = wx.getStorageSync('addressList') || []
    const address = addressList[id]
    this.setData({
      'form.userName': address.userName,
      'form.telNumber': address.telNumber,
      'form.addrDetail': address.detailInfo,
      'form.region': [address.provinceName, address.cityName, address.countyName],
    })
  },
  // 重置表单
  restForm() {
    this.setData({
      'form.userName': '',
      'form.telNumber': '',
      'form.addrDetail': '',
      'form.region': []
    })
    wx.navigateBack({
      delta: 1
    })
  }
})