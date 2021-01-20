import {uploadFile} from '../../utils/asyncWx'

Page({
  data: {
    tabsList: [
      {id: 0, name: '体验问题', checked: true},
      {id: 1, name: '商品、商家投诉', checked: false}
    ],
    imageFiles: [],
    detailValue: ''
  },
  // 外网的图片路径数组
  UploadImgs: [],
  onLoad(options) {
  },
  // tabs切换
  handleTabs(e) {
    const index = e.detail
    this.changeTabsByIndex(index)
  },
  // tabs状态修改公共代码
  changeTabsByIndex(index) {
    const {tabsList} = this.data
    tabsList.forEach(v => v.checked = false)
    tabsList[index].checked = true
    this.setData({tabsList})
  },
  // 上传图片
  handleChooseImg() {
    // 使用原生API
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        this.setData({
          // 一张张的选的时候，需要拼接一下
          imageFiles: [...this.data.imageFiles, ...tempFilePaths]
        })
      }
    })
  },
  // 删除图片
  delImgByIndex(e) {
    const index = e.detail
    let {imageFiles} = this.data
    imageFiles.splice(index, 1)
    this.setData({
      imageFiles
    })
  },
  // 获取文本域内容
  getDetailValue(e) {
    this.setData({
      detailValue: e.detail.value
    })
  },
  // 提交
  submitInfo() {
    const {imageFiles, detailValue} = this.data
    if (!detailValue.trim()) {
      wx.showToast({
        title: '请先输入您的问题',
        icon: 'none',
        duration: 2000
      })
      return
    }
    // 显示正在上传图片
    wx.showLoading({
      title: '正在提交',
      mask: true
    })
    if (imageFiles.length) {
      // 上传图片到专门的服务器
      // https://developers.weixin.qq.com/miniprogram/dev/api/network/upload/wx.uploadFile.html
      // 上传文件API不支持多文件同时上传，需要遍历数组，挨个上传
      let params = {
        url: 'https://img.coolcr.cn/api/upload',
        name: 'image',
        formData: '',
      }
      try {
        imageFiles.forEach(async (value, index) => {
          params.filePath = value
          const res = await uploadFile(params)
          let result = JSON.parse(res.data)
          this.UploadImgs.push(result.data.url)
          // 全部上传完
          if (index === imageFiles.length - 1) {
            this.reset()
            console.log('把文本的内容和外网的图片数组（this.UploadImgs）提交到后台接口')
            console.log('图片：', this.UploadImgs)
            console.log('问题描述：', detailValue)
          }
          // wx.uploadFile({
          //   url: 'https://img.coolcr.cn/api/upload',
          //   // 要上传文件资源的路径
          //   filePath: value,
          //   // 上传文件的名称，和后台商定，后台通过这个名称来获取数据
          //   name: 'image',
          //   // 顺带的文本信息
          //   formData: '',
          //   success: (res) => {
          //     let result = JSON.parse(res.data)
          //     this.UploadImgs.push(result.data.url)
          //     // 全部上传完
          //     if (index === imageFiles.length - 1) {
          //       this.reset()
          //       console.log('把文本的内容和外网的图片数组（this.UploadImgs）提交到后台接口')
          //       console.log('图片：', this.UploadImgs)
          //       console.log('问题描述：', detailValue)
          //     }
          //   },
          //   fail: (err) => {},
          //   complete: () => {},
          // })
        })
      } catch (e) {
        console.log(e)
      }
    } else {
      this.reset()
      console.log('只提交了文本')
    }
  },
  // 重置该页面
  reset() {
    wx.hideLoading()
    // 重置当前页面
    this.setData({
      imageFiles: [],
      detailValue: ''
    })
    // 返回上一个页面
    wx.navigateBack({
      delta: 1
    })
  }
})