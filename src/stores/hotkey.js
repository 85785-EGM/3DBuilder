import { defineStore } from 'pinia'
import * as global from '@/utils/hotkey/global'
import hotkeys from 'hotkeys-js'

const HOTKEY = { global }
const HOTKEY_LIST = Object.values(HOTKEY).flatMap(Object.values).flat()
hotkeys.setScope('global')

export default defineStore({
  id: 'debug',

  state: () => ({
    lastHotkey: []
  }),

  getters: {},

  actions: {
    install (scope) {
      const hotkey = [...Object.values(HOTKEY[scope])]
      if (scope !== 'global') {
        hotkey.push(...Object.values(HOTKEY.global))
      }
      this.lastHotkey.forEach(k => k.uninstall())
      hotkey.forEach(k => k.install())
      this.lastHotkey = hotkey
    },

    getInfoList (scope) {
      return this.lastHotkey.filter(k => k.scope === scope).map(({ info }) => info)
    },

    getInfoListAll (scope) {
      return HOTKEY_LIST.filter(k => k.scope === scope).map(({ info }) => info)
    },

    getScopeList () {
      const scopes = []
      this.lastHotkey.forEach(k => {
        if (!scopes.includes(k.scope)) {
          scopes.push(k.scope)
        }
      })
      return scopes
    },

    getScopeListAll () {
      const scopes = []
      HOTKEY_LIST.forEach(k => {
        if (!scopes.includes(k.scope)) {
          scopes.push(k.scope)
        }
      })
      return scopes
    },

    replaceFunc (key, func = function () {}) {
      let k = this.queryByHotkey(key)
      if (!k) k = this.queryByInfo(key)

      k.replaceFunc(func)
    },

    queryByInfo (info) {
      return HOTKEY_LIST.find(k => k.info === info)
    },

    queryByHotkey (hotkey) {
      return HOTKEY_LIST.find(k => k.hotkey === hotkey)
    }
  }
})
