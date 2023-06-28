import { defineStore } from 'pinia'

export default defineStore({
  id: 'scene',
  state: () => ({
    treeData: [],
    selectedNode: {}
  }),
  getters: {},
  actions: {
    initTree (treeData) {
      this.treeData = treeData
    },
    reset () {
      this.selectedNode = {}
      this.treeData = []
    }
  }
})
