Page({
  data: {
    tabsList: [
      {id: 0, name: '商品收藏', checked: true},
      {id: 1, name: '品牌收藏', checked: false},
      {id: 2, name: '店铺收藏', checked: false},
      {id: 3, name: '浏览足迹', checked: false},
    ],
    collectList: []
  },
  // 用onShow好些，因为如果从收藏点入到详情，取消收藏后再返回，数据要变化
  onShow() {
    this.getCollectList()
  },
  // 获取收藏列表
  getCollectList() {
    const collectList = wx.getStorageSync('collectGoods') || []
    if (collectList.length) {
      this.setData({
        collectList
      })
    }
  },
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