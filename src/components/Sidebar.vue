<template>

<div class="sidebar">
  <nav class="sidebar-nav">
    <div>
      <img class="logo-top" src="https://s3.amazonaws.com/nodriza-io/assets/img/logos/nodriza-logo-color.svg">
    </div>
    <ul class="nav">
      <li>
        <span href="/app/dashboard" class="nav-link itm-header bg-inverted">
          <Lang v-if="lang" :langs="langs" v-model="lang"/>
        </span>
      </li>

      <div v-if="menu" v-for="parent in menu" :key="parent">
        <NavParent :parent="parent"/>
      </div>

    </ul>
    <div></div>
  </nav>
</div>
</template>

<script>
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
    //
  },
  mounted () {
    this.eventHub.$emit('showPreload', 'Loading...')
    this.nodriza.u.req('/static/index.json', (err, data) => {
      this.eventHub.$emit('hidePreload')
      if (err) return alert(err)
      for (var i = 0; i < data.length; i++) this.langs[data[i].name] = data[i].files
      this.langs = _.cloneDeep(this.langs)
      console.log('->>> this.$router.params.lang:', this.$route.params.lang)
      this.lang = this.$route.params.lang || 'en'
    })
  }
}
</script>

<style lang="css" scoped>

  .logo-top {
    margin-left: 73px;
    width: 50px;
  }

  .itm-header {
    font-weight: 600;
    font-size: 14px !important;
    text-align: center;
  }


</style>
