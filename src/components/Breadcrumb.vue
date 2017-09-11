<template>
  <div>
    <ol class="breadcrumb">
        <li v-if="lang" class="breadcrumb-item"><span>{{ lang | lang }}</span></li>
        <li v-if="category" class="breadcrumb-item"><span>{{ category | category }}</span></li>
        <li v-if="content" class="breadcrumb-item"><span class="active">{{ content | content }}</span></li>
    </ol>
  </div>
</template>

<script>
export default {
  data () {
    return {
      lang: null,
      category: null,
      content: null
    }
  },
  components: {
  },
  methods: {
    updateBreadcrum () {
      let params = this.$route.params
      this.lang = params.lang ? params.lang.toUpperCase() : ''
      this.category = params.category ? this.nodriza.u.kebabToText(params.category) : ''
      this.content = params.content ? this.nodriza.u.kebabToText(params.content) : ''
    }
  },
  mounted () {
    this.eventHub.$on('showPreload', () => {
      // this.show = false
    })

    this.eventHub.$on('hidePreload', () => {
      // this.show = true
      this.updateBreadcrum()
      console.log('--> trueeee___')
    })
  }
}
</script>
<style scope>
.active {
  font-size: 16px;
  line-height: 16px;
}
</style>