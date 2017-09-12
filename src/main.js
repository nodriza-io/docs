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

// Vue.filter('lang', (str) => {
//   return (typeof str !== 'string') ? str.toUpperCase() : ''
// })

// Vue.filter('category', (str) => {
//   if (typeof str !== 'string') return ''
//   return this.nodriza.u.kebabToText(str)
// })

// Vue.filter('content', (str) => {
//   if (typeof str !== 'string') return ''
//   return this.nodriza.u.kebabToText(str).slice('.html')[0]
// })

router.beforeEach((to, from, callback) => {
  eventHub.$emit('showPreload', 'Loading...')
  nodriza.u.req('/static/html' + to.path + '.html', (err, content) => {
    eventHub.$emit('hidePreload')
    if (err) return alert(err)
    eventHub.$emit('content', content)
    eventHub.$emit('updateBreadcrumb')
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
