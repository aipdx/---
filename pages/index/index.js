import {request} from '../../request/index'

Page({
  data: {
    swiperList: [],
    tabsList: [],
    floorList: [],
  },
  onLoad() {
    this.getSwiperList()
    this.getTabsList()
    this.getFloorList()
  },
  getSwiperList() {
    const swierParams = {
      url: '/home/swiperdata',
    }
    request(swierParams).then(res => {
      this.setData({
        swiperList: res
      })
    })
  },
  getTabsList() {
    const tabsParams = {
      url: '/home/catitems',
    }
    request(tabsParams).then(res => {
      this.setData({
        tabsList: res
      })
    })
  },
  getFloorList() {
    const tabsParams = {
      url: '/home/floordata',
    }
    request(tabsParams).then(res => {
      this.setData({
        floorList: res
      })
    })
  }
})