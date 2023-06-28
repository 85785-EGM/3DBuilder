import { createRouter, createWebHashHistory } from 'vue-router'
import common from './common'
import workspace from './workspace'

export default createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [...common, ...workspace]
})
