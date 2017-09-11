
import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

// Views
import Content from '@/views/Content'
import Page404 from '@/views/pages/Page404'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'Getting Started',
      redirect: '/getting-started',
      component: Full,
      children: [
        {
          path: 'getting-started',
          name: 'Content',
          component: Content
        }
      ]
    },
    {
      path: '/404',
      name: 'Page404',
      component: Page404
    },
    {
      path: '*',
      name: 'Manual',
      component: Full,
      children: [
        {
          path: '/:lang/:category/:content',
          name: 'Content',
          component: Content
        }
      ]
    }
  ]
})
