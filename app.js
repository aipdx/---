// app.js
App({
  onLaunch() {
    // 将是否iphoneX 信息缓存到全局公众数据中
    this.globalData.isIphoneX = this.isIphoneX()
  },
  // iphoneX兼容 有刘海屏
  isIphoneX() {
    let mobile = wx.getSystemInfoSync()
    if (mobile.model.indexOf("iPhone X") >= 0) {
      return true
    } else {
      return false
    }
  },
  // 常用正则表达式集
  regExps: {
    email: /^[0-9a-zA-Z_]+@[0-9a-zA-Z_]+[\.]{1}[0-9a-zA-Z]+[\.]?[0-9a-zA-Z]+$/, //邮箱
    mobile: /^(?:1\d{2})-?\d{5}(\d{3}|\*{3})$/, //手机号码
    qq: /^[1-9][0-9]{4,9}$/, //QQ
    befitName: /^[a-z0-9A-Z\u4e00-\u9fa5]+$/, //合适的用户名，中文,字母,数字
    befitPwd: /^[a-z0-9A-Z_]+$/, //合适的用户名，字母,数字,下划线
    allNumber: /^[0-9]+.?[0-9]$/ //全部为数字
  },
  // 获取上一页路由
  getPage(index) {
    const pages = getCurrentPages()
    const prevPage = pages[pages.length - index]
    return prevPage
  },
  globalData: {
    isIphoneX: false
  },
})
