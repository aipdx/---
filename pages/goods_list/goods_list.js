import {request} from '../../request/index'

Page({
  data: {
    tabsList: [
      {id: 0, name: '综合'},
      {id: 1, name: '销量'},
      {id: 2, name: '价格'}
    ],
    currentIndex: 0,
    proList: [],
  },
  queryParames: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10,
  },
  totalNum: 0,
  onLoad(options) {
    this.queryParames.cid = options.cid
    this.getProList()
  },
  // 上拉加载更多
  onReachBottom() {
    this.queryParames.pagenum++
    const totalNum = this.totalNum
    const totalPage = Math.ceil(totalNum / this.queryParames.pagesize) // 总页数
    if (this.queryParames.pagenum <= totalPage) {
      this.getProList()
    } else {
      wx.showToast({
        title: '没有更多数据啦',
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.setData({ // 重置数组
      proList: []
    })
    this.queryParames.pagenum = 1 // 重置页码
    this.getProList()
  },
  // 获取渲染数据
  getProList() {
    const params = {
      url: '/goods/search',
      data: {
        ...this.queryParames,
        pagenum: this.queryParames.pagenum
      }
    }
    const proList = this.data.proList
    request(params).then(res => {
      this.totalNum = res.total
      this.setData({
        proList: [...proList, ...res.goods],
      })
    }).finally(e => {
      console.log(e)
      wx.stopPullDownRefresh() // 得到数据后停止加载动画
    })
  },
  // 点击tabs事件
  handleTabs(e) {
    const index = e.detail
    this.setData({
      currentIndex: index
    })
    switch (index) {
      case 0:
        break
      case 1:
        break
      case 3:
        break
      default:
        this.getProList(1)
    }
  }
})