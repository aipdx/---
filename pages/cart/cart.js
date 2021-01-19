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
    const cartList = wx.getStorageSync('cart') || []
    if (cartList) {
      this.getTotal(cartList)
      this.setData({
        cartList
      })
    }
  },
  // 单个勾选框事件---修改data和缓存里的值
  singleCheck(e) {
    const {checked, index} = e.currentTarget.dataset
    const {cartList} = this.data
    cartList[index].checked = !checked
    this.getTotal(cartList)
    wx.setStorageSync('cart', cartList)
    this.setData({
      cartList
    })
  },
  // 计算总价格，买的总数量，是否全选
  getTotal(cartList) {
    if (Array.isArray(cartList) && cartList.length) {
      // 全选状态 当数组为空时，使用every会返回true,所以先判断下数组的长度
      // 循环太多，统一用forEach
      // let checkedAll = cartList.every(v => v.checked)
      // let totalPrice = cartList.reduce((pre, next) => {
      //   if (next.checked) {
      //     return (pre + next.goods_price * next.num)
      //   } else {
      //     return pre
      //   }
      // }, 0)
      // // 结算总数
      // let buyTotal = cartList.reduce((pre, next) => {
      //   if (next.checked) {
      //     return (pre + next.num)
      //   } else {
      //     return pre
      //   }
      // }, 0)
      let checkedAll = true
      // 总价格 结算总数
      let totalPrice = 0
      let buyTotal = 0
      cartList.forEach(val => {
        if (val.checked) {
          totalPrice += val.goods_price * val.num
          buyTotal += val.num
        } else { // 如果有一个为false，则不是全选
          checkedAll = false
        }
      })
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
    // 数量为1并且点击的是减号
    if (cartList[index].num === 1 && num === -1) {
      wx.showModal({
        title: '提示',
        content: '是否删除该商品?',
        showCancel: true,
        success: res => {
          if (res.confirm) {
            cartList.splice(index, 1)
            if (cartList.length < 1) {
              // 如果商品全部删除，则把全选改为false
              this.setData({
                checkedAll: false
              })
            }
            this.getTotal(cartList)
            this.setData({
              cartList
            })
            wx.setStorageSync('cart', cartList)
          } else if (res.cancel) {
            console.log('点击了取消')
          }
        }
      })
    } else {
      cartList[index].num += num
      this.getTotal(cartList)
      this.setData({
        cartList
      })
    }
  },
  // 全选
  handleCheckAll() {
    const {checkedAll, cartList} = this.data
    if (Array.isArray(cartList) && cartList.length) {
      cartList.forEach(value => value.checked = !checkedAll)
      this.getTotal(cartList)
      this.setData({
        cartList,
        checkedAll: !checkedAll
      })
      wx.setStorageSync('cart', cartList)
    }
  },
  // 结算
  closeAccount() {
    const {cartList, totalPrice, buyTotal, address} = this.data
    if (!cartList.length) {
      wx.showToast({
        title: '您还没有选购商品哦',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (!address.userName) {
      wx.showToast({
        title: '您还没有添加收货地址',
        icon: 'none',
        duration: 2000
      })
      return
    }
    const payOrder = {
      payList: []
    }
    // 获取勾选的商品
    cartList.forEach(value => {
      if (value.checked) {
        payOrder.payList.push(value)
      }
    })
    payOrder.totalPrice = totalPrice
    payOrder.buyTotal = buyTotal
    wx.setStorageSync('payOrder', payOrder)
    // 跳转到支付页面
    wx.navigateTo({
      url: '/pages/pay/pay'
    })
  }
})