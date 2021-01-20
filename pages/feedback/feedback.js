Page({
  data: {
    tabsList: [
      {id: 0, name: '体验问题', checked: true},
      {id: 1, name: '商品、商家投诉', checked: false}
    ],
  },
  onLoad(options) {},
  handleTabs(e) {
    const index = e.detail
    this.changeTabsByIndex(index)
  },
  // tabs状态修改公共代码
  changeTabsByIndex(index) {
    const {tabsList} = this.data
    tabsList.forEach(v => v.checked = false)
    tabsList[index].checked = true
    this.setData({tabsList})
  }
})