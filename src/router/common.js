import NotFound from '@/views/NotFound.vue'

export default [
  { name: 'common-home', path: '/', redirect: '/guide/home' },
  {
    name: 'common-notfound',
    path: '/:pathMatch(.*)*',
    component: NotFound
  }
]
