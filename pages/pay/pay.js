import {createOrder,unifiedOrder,checkOrder} from '../../api/order'
import {requestPayment} from '../../utils/asyncWx'

Page({
  data: {
    address: {},
    payOrder: []
  },
  onLoad() {
    this.getStorageAddr()
    this.getBuyProduct()
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
  // 获取选购商品信息
  getBuyProduct() {
    const payOrder = wx.getStorageSync('payOrder')
    if (payOrder) {
      this.setData({
        payOrder
      })
    }
  },
  // 支付--先判断是否有token，没有就先授权获取token
  async payOrder() {
    try {
      const token = wx.getStorageSync('token')
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/auth'
        })
        return
      }
      const {totalPrice, payList} = this.data.payOrder
      const consignee_addr = this.data.address.all
      const goods = []
      payList.forEach(val => {
        goods.push({
          goods_id: val.goods_id,
          goods_number: val.num,
          goods_price: val.goods_price,
        })
      })
      const params = {
        order_price: totalPrice,
        goods,
        consignee_addr,
      }
      // 创建订单 获取订单id
      const {order_number} = await createOrder(params)
      // 获取支付参数
      const payParams = {
        order_number
      }
      // 用订单id获取到微信支付需要的pay
      const {pay} = await unifiedOrder(payParams)
      // 调用微信内置的支付API --- 发起微信支付
      await requestPayment(pay)
      // 查询订单---看看订单是否支付成功
      const orderListParams = {
        order_number
      }
      const res = await checkOrder(orderListParams)
      console.log(res) // 可以根据这个返回值来判断是否支付成功
      wx.showToast({
        title: '支付成功'
      })
      // 购买成功后删除本地的购物车的数据
      const cart = wx.getStorageSync('cart')
      const newPayList = cart.filter(v => !v.checked)
      wx.setStorageSync('cart', newPayList)
      // 支付成功跳转到订单页面
      wx.navigateTo({
        url: '/pages/order/order'
      })
    } catch (e) {
      wx.showToast({
        title: '支付失败',
        icon: "none"
      })
      console.log(e)
    }
  }
})