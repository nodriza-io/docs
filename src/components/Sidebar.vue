<template>

<div class="sidebar">
  <nav class="sidebar-nav">
    <div>
      <img class="logo-top" src="https://s3.amazonaws.com/nodriza-io/assets/img/logos/nodriza-logo-color.svg">
    </div>
    <ul class="nav">
      <li class="nav-item">
        <span href="/app/dashboard" class="nav-link router-link-exact-active open active itm-header">
           <Lang v-if="lang" :langs="langs" v-model="lang"/>
        </span>
      </li>

      <div v-if="menu" v-for="parent in menu" :key="parent">
        <NavParent :parent="parent"/>
      </div>

      
<!--       <li class="nav-item">
        <li class="nav-item nav-dropdown open">
          <div class="category text-uppercase"><i class="fa fa-chevron-down m-r-10"></i> Directory</div>
          <ul class="nav-dropdown-items">
            <li class="nav-item  "><a href="/components/buttons" class="nav-link slim bg-gray-dark"><i class="fa fa-angle-right"></i> Users
              
              </a>
            </li>
            <li class="nav-item "><a href="/components/social-buttons" class="nav-link slim bg-gray-dark"><i class="fa fa-angle-right"></i> Companies
              
              </a>
            </li>
            <li class="nav-item "><a href="/components/social-buttons" class="nav-link slim bg-gray-dark"><i class="fa fa-angle-right"></i> Departments
              
              </a>
            </li>
            <li class="nav-item "><a href="/components/cards" class="nav-link slim bg-gray-dark"><i class="fa fa-angle-right"></i> AWS Accounts
              
              </a>
            </li>
          </ul>
        </li>
      </li>
 -->

    </ul>
    <div></div>
  </nav>
</div>
</template>

<script>
// import Vue from 'Vue'
// import Router from 'vue-router'
import Lang from '../components/Lang'
import NavParent from '../components/NavParent'
import _ from 'lodash'

export default {
  name: 'sidebar',
  components: {
    Lang,
    NavParent
  },
  watch: {
    lang (lang) {
      this.menu = _.cloneDeep(this.langs[lang])
      // console.log('->>> JSON.stringify(this.menu:)', JSON.stringify(this.menu, null, 4))
    },
    menu: {
      handler (menu) {
        this.menu = menu
      }
    }
  },
  data () {
    return {
      index: [],
      langs: {},
      lang: null,
      menu: []
    }
  },
  methods: {
    createRoutes () {
      // Vue.use(Router)
      // let routes = []
      // for (let itm in this.langs) {
      //   let lang = this.langs[itm]
      //   for (var i = 0; i < lang.length; i++) {
      //     for (var j = 0; j < lang[i].files.length; j++) {
      //       let file = lang[i].files[j]
      //       if (!_.isEmpty(file) && file.relativePath) {
      //         let route = {
      //           path: '/' + file.relativePath.split('.html')[0],
      //           name: this.nodriza.u.kebabToText(file.name.split('.html')[0]),
      //           component: Content
      //         }
      //         // this.$router.options.routes.push(route)
      //         routes.push(route)
      //       }
      //       // console.log('->>>  lang[i].files[j]:', )
      //       // es/preferencias/politicas-de-acceso.html
      //     }
      //     // console.log('->>> JSON.stringify(lang[i]))', JSON.stringify(lang[i].files))
      //   }
      // }
      // const page404 = {
      //   path: '*',
      //   name: 'Page404',
      //   component: Page404
      // }
      // routes.push(page404)
      // this.$router.options.routes.push(page404)
      // const router = new Router({ routes })
      // console.log('->>> router:', router)
      // this.$router.addRoutes(routes)
      // console.log('->>> this.$router:', this.$router.options.routes)
      /*    
      // {
      //   path: '/en/preferences',
      //   name: 'Preferences',
      //   redirect: '/en/preferences/access-policies',
      //   component: Full,
      //   children: [
      //     {
      //       path: 'access-policies',
      //       name: 'Access Policy',
      //       component: GettingStarted
      //     }
      //   ]
      // },
       */

      // this.$router.options.routes.forEach(route => {
      //   this.items.push({
      //     name: route.name,
      //     path: route.path
      //   })
      // })
    },
    handleClick (e) {
      e.preventDefault()
      e.target.parentElement.classList.toggle('open')
    }
  },
  mounted () {
    this.eventHub.$emit('showPreload', 'Loading...')
    this.nodriza.u.req('/static/index.json', (err, data) => {
      this.eventHub.$emit('hidePreload')
      if (err) return alert(err)
      for (var i = 0; i < data.length; i++) {
        this.langs[data[i].name] = data[i].files
      }
      // console.log('->>> this.langs:', this.langs)
      this.langs = _.cloneDeep(this.langs)
      this.lang = 'en'
      console.log('->>> Object.keys:', Object.keys(this.$router))
    })
  }
}
</script>

<style lang="css" scoped>

  .logo-top {
    margin-left: 73px;
    width: 43px;
  }

  .itm-header {
    font-weight: 600;
    font-size: 14px !important;
    text-align: center;
  }


</style>
