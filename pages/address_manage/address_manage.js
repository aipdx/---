const app = getApp()
Page({
  data: {
    form: {
      userName: '',
      telNumber: '',
      addrDetail: '',
      region: [], // 省市区数据
    },
    customItem: '', // 自定义picker显示的内容
  },
  Postcode: '', // 邮编
  onLoad() {},
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
  submitForm(e) {
    if (!this.validateForm(e)) return
    // userName,telNumber...对应的是input的name属性
    const {userName, telNumber, region, addrDetail} = e.detail.value
    const addressList = wx.getStorageSync('addressList') || []
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
  }
})