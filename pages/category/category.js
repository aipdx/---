import {request} from '../../request/index'

Page({
  data: {
    leftMenuList: [],
    rightMenuList: [],
    leftIndex: 0,
    scrollTop: 0,
  },
  categoryList: [],
  onLoad() {
    const cates = wx.getStorageSync('cates')
    if (!cates) {
      this.getCategory()
    } else {
      if (Date.now() - cates.time > 1000 * 50) { // 设置一个缓存时间
        this.getCategory()
      } else {
        this.categoryList = cates.data
        this.setCommonData(this.categoryList)
      }
    }
  },
  async getCategory() {
    try {
      const parame = {
        url: '/categories'
      }
      const res = await request(parame)
      this.categoryList = res
      // 存入本地
      wx.setStorageSync('cates', {time: Date.now(), data: this.categoryList})
      this.setCommonData(this.categoryList)
      // request(parame).then(res => {
      //   this.categoryList = res.data.message
      //   // 存入本地
      //   wx.setStorageSync('cates', {time: Date.now(), data: this.categoryList})
      //   this.setCommonData(this.categoryList)
      // })
    } catch (e) {
      console.log(e)
    }
  },
  setCommonData(data) {
    let leftMenuList = data.map(v => v.cat_name)
    let rightMenuList = data[0].children
    this.setData({
      leftMenuList,
      rightMenuList
    })
  },
  handleMenu(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      leftIndex: index,
      rightMenuList: this.categoryList[index].children,
      scrollTop: 0
    })
  }
})