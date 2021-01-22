import {getSearchData} from '../../api/search'

Page({
  data: {
    keyword: '',
    searchList: []
  },
  TimeId: -1,
  onLoad(options) {
  },
  // input的bindinput事件如果用async回显示错误，绑定的该方法不能使用异步，异步请求方法放外边
  handleSearch(e) {
    const {value} = e.detail
    if (!value.trim()) {
      clearTimeout(this.TimeId)
      this.setData({
        searchList: [],
        keyword: ''
      })
      return
    }
    clearTimeout(this.TimeId)
    this.TimeId = setTimeout(() => {
      this.qsearch(value)
    }, 1000)
  },
  async qsearch(query) {
    try {
      const params = {
        query
      }
      const res = await getSearchData(params)
      this.setData({
        searchList: res,
        keyword: query
      })
    } catch (e) {
      console.log(e)
    }
  },
  // 清楚搜索内容
  clearInput() {
    this.setData({
      keyword: ''
    })
  },
  // 取消搜索 -- 返回上一页或者清空输入的内容和数据
  cancelSearch() {
    // 返回上一页
    // wx.navigateBack({
    //   delta: 1
    // })

    // 重置
    this.setData({
      keyword: '',
      searchList: []
    })
  }
})