
import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

// Views
import QuickStart from '@/views/QuickStart'
import Page404 from '@/views/pages/Page404'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'Nodriza Manual',
      redirect: '/quick-start',
      component: Full,
      children: [
        {
          path: 'quick-start',
          name: 'QuickStart',
          component: QuickStart
        }
      ]
    },
    {
      path: '*',
      name: 'Page404',
      component: Page404
    }
  ]
})
