import {request} from '../../request/index'

Page({
  data: {
    detailList: {},
    isCollect: false
  },
  params: {
    goods_id: ''
  },
  GoodsInfo: {},
  onShow() {
    const pages = getCurrentPages()
    this.params.goods_id = pages.length && pages[pages.length - 1].options.goods_id
    this.getDetailList()
    this.collectStatus()
  },
  async getDetailList() {
    try {
      const params = {
        url: '/goods/detail',
        data: {
          ...this.params
        }
      }
      const res = await request(params)
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
    const src = e.currentTarget.dataset.src
    let imgList = this.data.detailList.pics.map(v => v.pics_mid)
    wx.previewImage({
      current: src,
      urls: imgList
    })
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
      if (goodsIndex !== -1) {
        this.setData({
          isCollect: true
        })
      } else {
        this.setData({
          isCollect: false
        })
      }
    }
  },
  // 收藏
  collectGoods() {
    const collectGoods = wx.getStorageSync('collectGoods') || []
    if (collectGoods.length) {
      const goodsIndex = collectGoods.findIndex(v => this.params.goods_id == v.goods_id)
      if (goodsIndex !== -1) { // 存在
        this.cancelSuccess(collectGoods, goodsIndex)
      } else {
        this.collectSuccess(collectGoods)
      }
    } else { // 第一次点
      this.collectSuccess(collectGoods)
    }
  },
  // 收藏成功
  collectSuccess(collectGoods) {
    this.setData({
      isCollect: true
    })
    collectGoods.push(this.GoodsInfo)
    wx.setStorageSync('collectGoods', collectGoods)
    wx.showToast({
      title: '收藏成功'
    })
  },
  // 取消收藏
  cancelSuccess(collectGoods, goodsIndex) {
    if (goodsIndex !== -1) {
      collectGoods.splice(goodsIndex, 1)
    }
    this.setData({
      isCollect: false
    })
    wx.showToast({
      title: '取消成功'
    })
    wx.setStorageSync('collectGoods', collectGoods)
  }
})