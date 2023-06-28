import Editor from '@/views/workspace/editor/index.vue'
import Workspace from '@/views/workspace/index.vue'
import Home from '@/views/workspace/home.vue'
// import Router from '@/views/Router.vue'

export default [
  {
    name: 'home',
    path: '/home',
    component: Home
  },
  {
    name: 'workspace',
    path: '/workspace',
    component: Workspace,
    children: [
      {
        name: 'workspace-editor',
        path: '',
        component: Editor
      }
    ]
  }
]
