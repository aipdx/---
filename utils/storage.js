export const storage = {
  setStorage(key, value) {
    wx.setStorageSync(key, value)
  },
  getStorage(key) {
    wx.getStorageSync(key)
  },
  clearStorage(key) {
    wx.clearStorageSync(key)
  }
}