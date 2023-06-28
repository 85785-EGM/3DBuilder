import { defineStore } from 'pinia'
import { watch, reactive } from 'vue'
import { clone } from '@/utils/common'

const localStorage = window.localStorage
const LOCAL_STORAGE_NAME = 'SETTING'
const DEFAULT_SETTING = {
}
let isWatch = false

/**
 * 点云模型点的大小 POINT_CLOUD_SIZE
 * 点云模型点的颜色 POINT_CLOUD_COLOR
 * 是否网格化模型 MESHER_MODEL
 *
 * 选中的点云的颜色 SELECT_POINT_CLOUD_COLOR
 * 选中的点云的大小 SELECT_POINT_CLOUD_SIZE
 *
 * 平移步长 TRANSLATE_STEP
 * 旋转步长 ROTATE_STEP
 *
 * 暗黑模式 DARK_MODEL
 */

export default defineStore({
  id: 'setting',
  state: () => ({}),
  actions: {
    init () {
      if (!isWatch) {
        isWatch = true
        watch(
          () => Object.values(reactive(this.$state)),
          () => this.saveAll()
        )
      }

      this.getAll()
    },

    clearAll () {
      localStorage.removeItem(LOCAL_STORAGE_NAME)
      this.getAll()
    },

    getAll () {
      const values = localStorage.getItem(LOCAL_STORAGE_NAME)
      const setting = clone(DEFAULT_SETTING)

      try {
        Object.assign(setting, JSON.parse(values))
      } catch (e) {
        //
      }

      this.$patch(setting)
    },
    saveAll () {
      localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(this.$state))
      ;(this._callback ?? []).forEach(func => func())
    },

    onChange (func) {
      if (!this._callback) this._callback = []
      this._callback.push(func)
    }
  }
})
