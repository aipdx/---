import {getGoodsDetail} from '../../api/goods'

Page({
  data: {
    detailList: {},
    isCollect: false, // 商品是否被收藏
    galleryImgList: [], // 预览大图数组
    showGallery: false, // 是否显示预览大图
    currentImg: 0, // 当前预览大图的index,从0开始
  },
  params: {
    goods_id: ''
  },
  GoodsInfo: {},
  onShow() {
    // getCurrentPages() 函数用于获取当前页面栈的实例，
    // 以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面。
    const pages = getCurrentPages()
    this.params.goods_id = pages.length && pages[pages.length - 1].options.goods_id
    this.getDetailList()
    this.collectStatus()
  },
  async getDetailList() {
    try {
      const params = {
        ...this.params
      }
      const res = await getGoodsDetail(params)
      this.GoodsInfo = res
      this.setData({
        detailList: {
          goods_name: res.goods_name,
          goods_price: res.goods_price,
          // iphone部分手机不支持 .webp格式的图片
          // 最好是和后端人员沟通让他们改
          // 前端可以自己替换.webp -->.jpg (不可取)
          goods_introduce: res.goods_introduce.replace(/\.webp/g, '.jpg'),
          pics: res.pics,
        }
      })
    } catch (e) {
      console.log(e)
    }
  },
  // 点击预览大图
  previewImg(e) {
    const {src, index} = e.currentTarget.dataset
    let imgList = this.data.detailList.pics.map(v => v.pics_mid)
    // 使用weui
    this.setData({
      galleryImgList: imgList,
      currentImg: index,
      showGallery: true,
    })
    // 原生预览大图
    // wx.previewImage({
    //   current: src,
    //   urls: imgList
    // })
  },
  // 加入购物车
  addToCart() {
    let cart = wx.getStorageSync('cart') || []
    // 判断cart是否存在改商品
    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)
    // 不存在
    if (index < 0) {
      this.GoodsInfo.num = 1
      this.GoodsInfo.checked = true
      cart.push(this.GoodsInfo)
    } else { // 存在
      cart[index].num++
    }
    wx.setStorageSync('cart', cart)
    wx.showToast({
      title: '加入成功',
      icon: "success",
      duration: 1500,
      mask: true
    })
  },
  // 立即购买
  buy() {

  },
  // 进入页面判断是否已收藏
  collectStatus() {
    const collectGoods = wx.getStorageSync('collectGoods') || []
    if (collectGoods.length) {
      const goodsIndex = collectGoods.findIndex(v => this.params.goods_id == v.goods_id)
      this.setData({
        isCollect: goodsIndex !== -1 ? true : false
      })
    }
  },
  // 点击收藏
  collectGoods() {
    const collectGoods = wx.getStorageSync('collectGoods') || []
    const goodsIndex = collectGoods.findIndex(v => this.params.goods_id == v.goods_id)
    if (goodsIndex !== -1) { // 存在
      this.cancelCollect(collectGoods, goodsIndex)
    } else {
      this.collectSuccess(collectGoods)
    }
  },
  // 收藏成功
  collectSuccess(collectGoods) {
    this.setData({
      isCollect: true,
    })
    collectGoods.push(this.GoodsInfo)
    wx.setStorageSync('collectGoods', collectGoods)
    wx.showToast({
      title: '收藏成功',
      mask: true
    })
  },
  // 取消收藏
  cancelCollect(collectGoods, goodsIndex) {
    collectGoods.splice(goodsIndex, 1)
    this.setData({
      isCollect: false
    })
    wx.showToast({
      title: '取消成功',
      mask: true
    })
    wx.setStorageSync('collectGoods', collectGoods)
  }
})