Component({
  properties: {
    tabsList: {
      type: Array,
      value: []
    }
  },
  data: {},
  methods: {
    tabsChange(e) {
      const index = e.currentTarget.dataset.index
      this.triggerEvent('handleTabs', index)
    }
  }
})
