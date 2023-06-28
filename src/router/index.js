import { createRouter, createWebHashHistory } from 'vue-router'
import guide from './guide'
import workspace from './workspace'
import common from './common'

export default createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [...guide, ...common, ...workspace]
})
