import Router from '@/views/Router.vue'
import StepRouter from '@/views/workspace/StepRouter.vue'
import Upload from '@/views/workspace/Upload.vue'
import Coregistration from '@/views/workspace/steps/Coregistration.vue'
import Adjust from '@/views/workspace/steps/Adjust.vue'
import UploadSearchForm from '@/views/workspace/SearchForm.vue'

export default [
  {
    name: 'workspace',
    path: '/workspace',
    component: Router,
    children: [
      {
        name: 'workspace-upload',
        path: 'upload',
        component: Upload,

        // extData
        meta: {
          title: '步骤：上传',
          nextStep: 'workspace-step-coregistration'
        }
      },

      {
        name: 'workspace-search',
        path: 'search',
        component: UploadSearchForm,

        // extData
        meta: {
          title: '步骤：搜索',
          nextStep: 'workspace-step-coregistration'
        }
      },

      {
        name: 'workspace-step',
        path: 'step',
        component: StepRouter,
        children: [
          {
            name: 'workspace-step-coregistration',
            path: 'coregistration',
            component: Coregistration,

            // extData
            meta: {
              title: '步骤：配准',
              nextStep: 'workspace-step-adjust'
            }
          },
          // {
          //   name: 'workspace-step-cleanup',
          //   path: 'cleanup',
          //   component: Cleanup,

          //   // extData
          //   meta: {
          //     title: '步骤：清除',
          //     nextStep: 'workspace-step-adjust'
          //   }
          // },
          {
            name: 'workspace-step-adjust',
            path: 'adjust',
            component: Adjust,

            // extData
            meta: {
              title: '步骤：调整'
            }
          }
        ]
      }
    ]
  }
]
