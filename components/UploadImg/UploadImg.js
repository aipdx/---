Component({
  properties: {
    imageFiles: {
      type: Array,
      value: []
    }
  },
  data: {},
  methods: {
    // 删除图片
    delImg(e) {
      const {index} = e.currentTarget.dataset
      this.triggerEvent('delImgByIndex', index)
    }
  }
});
