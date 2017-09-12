import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import Nodriza from 'nodriza'

const nodriza = new Nodriza({ hostname: location.hostname })
const eventHub = new Vue()
const rx = new Vue({
  data () {
    return {
    }
  }
})

Vue.mixin({
  data: function () {
    return {
      get nodriza () {
        return nodriza
      },
      get eventHub () {
        return eventHub
      },
      get rx () {
        return rx
      }
    }
  }
})

window.nodriza = nodriza
window.eventHub = eventHub
window.rx = rx

router.beforeEach((to, from, callback) => {
  eventHub.$emit('showPreload', 'Loading Docs...')
  const fullpath = '/static/html' + to.path + '.html'
  console.log('->>> fullPath:', fullpath)
  if (to.path === '/404') return callback()
  nodriza.u.req(fullpath, (err, content) => {
    eventHub.$emit('hidePreload')
    if (err) return router.push('/404')
    eventHub.$emit('content', content)
    eventHub.$emit('updateBreadcrumb')
    eventHub.$emit('updateNav')
  })
  callback()
})

Vue.use(BootstrapVue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
