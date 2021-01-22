import {getAllOrder} from '../../api/order'

Page({
  data: {
    tabsList: [
      {id: 0, name: '全部订单', checked: true},
      {id: 1, name: '待付款', checked: false},
      {id: 2, name: '待收货', checked: false},
      {id: 3, name: '退款/退货', checked: false},
    ],
    orderList: []
  },
  // onShow 没有options参数，把传递过来的参数时用getCurrentPages()
  // 索引最大的一个就是当前页面，数组最后一个
  onShow() {
    const token = wx.getStorageSync('token')
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/auth'
      })
      return
    }
    const pages = getCurrentPages()
    const {type} = pages.length && pages[pages.length - 1].options
    const index = type - 1
    this.changeTabsByIndex(index)
    this.getOrderList(type)
  },
  handleTabs(e) {
    const index = e.detail
    this.changeTabsByIndex(index)
    this.getOrderList(index + 1)
  },
  async getOrderList(type) {
    try {
      const param = {
        type: Number(type)
      }
      const {orders} = await getAllOrder(param)
      this.setData({
        orderList: orders.map(v => ({...v, create_time_cn: (new Date(v.create_time * 1000).toLocaleString())}))
      })
    } catch (e) {
      console.log(e)
    }
  },
  // tabs状态修改公共代码
  changeTabsByIndex(index) {
    const {tabsList} = this.data
    tabsList.forEach(v => v.checked = false)
    tabsList[index].checked = true
    this.setData({tabsList})
  }
})