import History from '@/utils/history'
import { GroupCommit } from '@/utils/commit'
import { defineStore } from 'pinia'

export default defineStore({
  id: 'history',
  state: () => ({
    history: new History({ maxlen: 100 })
  }),
  getters: {
    hasPrev: state => state.history.hasPrev(0),
    hasNext: state => state.history.hasNext(1)
  },
  actions: {
    reset () {
      return this.history.reset()
    },
    setMaxlen (maxlen) {
      return this.history.setMaxlen(maxlen)
    },
    push (...commits) {
      return this.history.push(...commits)
    },
    group (...commits) {
      return this.push(new GroupCommit(...commits))
    },
    undo () {
      return this.history.go(-1)
    },
    redo () {
      return this.history.go(1)
    }
  }
})
