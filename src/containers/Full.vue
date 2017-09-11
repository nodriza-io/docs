<template>
  <div class="app">
    <div class="app-body">
      <Sidebar/>
      <main class="main bg-pattern">
        <breadcrumb :list="list"/>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script>

import Sidebar from '../components/Sidebar'
import Breadcrumb from '../components/Breadcrumb'

export default {
  name: 'full',
  components: {
    Sidebar,
    Breadcrumb
  },
  data () {
    return {
    }
  },
  computed: {
    background () {
      return this.$route.meta.background
    },
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched
    }
  }
}
</script>

<style>

</style>
