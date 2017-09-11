import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import Nodriza from 'nodriza'

const nodriza = new Nodriza({ hostname: location.hostname })
window.nodriza = nodriza

Vue.mixin({
  data: function () {
    return {
      get nodriza () {
        return nodriza
      }
    }
  }
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
