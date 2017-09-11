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

Vue.filter('lang', (str) => {
  return (typeof str !== 'string') ? str.toUpperCase() : ''
})

Vue.filter('category', (str) => {
  if (typeof str !== 'string') return ''
  return this.nodriza.u.kebabToText(str)
})

Vue.filter('content', (str) => {
  if (typeof str !== 'string') return ''
  return this.nodriza.u.kebabToText(str).slice('.html')[0]
})
// router.beforeEach((to, from, callback) => {
//   // Validate user Authentication
// })

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
