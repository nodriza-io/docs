
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
      redirect: '/en/1)-getting-started/I)-welcome'
    },
    {
      path: '/en',
      redirect: '/en/1)-getting-started/I)-welcome'
    },
    {
      path: '/es',
      redirect: '/es/1)-empecemos/I)-bienvenido'
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
