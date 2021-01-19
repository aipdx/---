Component({
  properties: {
    tabsList: {
      type: Array,
      value: []
    }
  },
  data: {
    currentIndex: 0
  },
  methods: {
    tabsChange(e) {
      const index = e.currentTarget.dataset.index
      this.triggerEvent('handleTabs', index)
      this.setData({
        currentIndex: index
      })
    }
  }
})
