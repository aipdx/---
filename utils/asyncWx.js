/*
* 用Promise封装wx API
* */

export const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

export const wxLogin = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 10000,
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

export const requestPayment = (pay) => {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      ...pay,
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

// 上传图片
export const uploadFile = (params) => {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      ...params,
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}