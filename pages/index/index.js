import {getSwiperData, getCatitems, getFloorData} from '../../api/home'

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
    getSwiperData().then(res => {
      this.setData({
        swiperList: res
      })
    })
  },
  getTabsList() {
    getCatitems().then(res => {
      this.setData({
        tabsList: res
      })
    })
  },
  getFloorList() {
    getFloorData().then(res => {
      this.setData({
        floorList: res
      })
    })
  }
})