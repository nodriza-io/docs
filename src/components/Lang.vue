<template>
  <div class="text-right">
  <template v-for="(lang, index) in langs">
    <a class="m-r-10" :href="'?lang=' + index">{{ lang }}</a>
  </template>
  </div>
</template>

<script>

export default {
  name: 'Lang',
  components: {
  },
  watch: {
  },
  data: function () {
    return {
      langs: {
        EN: 'ENGLISH',
        ES: 'ESPAÑOL'
      }
      
    }
  },
  methods: {
    setLang (lang) {
      alert(lang)
      // this$router.push({ path: window.location, query: { plan: 'private' }})
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
</style>
