
import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

// Views
import GettingStarted from '@/views/GettingStarted'
import Page404 from '@/views/pages/Page404'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'User Manual',
      redirect: '/getting-started',
      component: Full,
      children: [
        {
          path: 'getting-started',
          name: 'GettingStarted',
          component: GettingStarted
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
