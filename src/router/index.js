
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
      redirect: '/en/I)-getting-started/A)-overview'
    },
    {
      path: '/en',
      redirect: '/en/I)-getting-started/A)-overview'
    },
    {
      path: '/es',
      redirect: '/es/I)-inicio/A)-resumen'
    },
    {
      path: '/404',
      name: 'Page404',
      component: Page404
    },
    {
      path: '*',
      name: 'Home',
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
