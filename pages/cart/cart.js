import {chooseAddress} from '../../utils/asyncWx.js'

Page({
  data: {
    address: {},
    cartList: [],
    checkedAll: false,
    totalPrice: 0,
    buyTotal: 0
  },
  // 因为这个页面会频繁的打开，所有用onShow
  onShow() {
    this.getStorageAddr()
    this.getCartProduct()
  },
  // 获取地址信息
  getStorageAddr() {
    const address = wx.getStorageSync('address')
    if (address) {
      this.setData({
        address
      })
    }
  },
  async getAddress() {
    try {
      let address = await chooseAddress()
      this.setData({
        address
      })
      // 存在本地，方便在其他地方用
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
      wx.setStorageSync('address', address)
    } catch (e) {
      console.log(e)
    }
  },
  // 获取加入购物车的商品
  getCartProduct() {
    const cartList = wx.getStorageSync('cart')
    if (cartList) {
      this.getTotal(cartList)
      this.setData({
        cartList
      })
    }
  },
  // 单个勾选框事件
  singleCheck(e) {
    const {checked, index} = e.currentTarget.dataset
    const {cartList} = this.data
    cartList[index].checked = !checked
    this.getTotal(cartList)
    this.setData({
      cartList
    })
  },
  getTotal(cartList) {
    if (Array.isArray(cartList) && cartList.length) {
      // 全选状态
      const checkedAll = cartList.every(v => v.checked)
      // 总价格
      const totalPrice = cartList.reduce((pre, next) => {
        if (next.checked) {
          return (pre + next.goods_price * next.num)
        } else {
          return pre
        }
      }, 0)
      // 结算总数
      const buyTotal = cartList.reduce((pre, next) => {
        if (next.checked) {
          return (pre + next.num)
        } else {
          return pre
        }
      }, 0)
      this.setData({
        checkedAll,
        totalPrice,
        buyTotal,
      })
    }
  },
  // 增加减少数量
  changeBuyNum(e) {
    const {num, index} = e.currentTarget.dataset
    const {cartList} = this.data
    cartList[index].num += num
    if (cartList[index].num <= 0) {
      cartList[index].num = 0
      wx.showModal({
        content: '是否删除该商品?',
        showCancel: true,
        success: res => {
          if (res.confirm) {
            cartList.splice(index, 1)
            this.setData({
              cartList
            })
            wx.setStorageSync('cart', cartList)
          } else if (res.cancel) {
            cartList[index].num = 1
            this.setData({
              cartList
            })
            wx.setStorageSync('cart', cartList)
          }
        }
      })
    }
    this.getTotal(cartList)
    this.setData({
      cartList
    })
  },
  // 全选
  handleCheckAll() {
    const {checkedAll, cartList} = this.data
    if (checkedAll) {
      cartList.forEach(value => value.checked = false)
      this.setData({
        checkedAll: false
      })
    } else {
      cartList.forEach(value => value.checked = true)
      this.setData({
        checkedAll: true
      })
    }
    this.getTotal(cartList)
    this.setData({
      cartList
    })
  },
  // 结算
  closeAccount() {
    const goodsIds = []
    const {cartList,totalPrice,buyTotal} = this.data
    cartList.forEach(value => {
      if (value.checked) {
        goodsIds.push(value.goods_id)
      }
    })
    console.log('总金额：', totalPrice)
    console.log('总件数：', buyTotal)
    console.log('勾选的ID：', goodsIds)
  }
})