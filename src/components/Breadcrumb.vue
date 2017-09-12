<template>
  <div>
    <ol class="breadcrumb">
      <template v-if="lang && category && content">        
        <li class="breadcrumb-item"><span>Docs</span></li>
        <li class="breadcrumb-item"><span>{{ lang }}</span></li>
        <li class="breadcrumb-item"><span>{{ category }}</span></li>
        <li class="breadcrumb-item"><span class="active">{{ content }}</span></li>
      </template>
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
  },
  mounted () {
    this.eventHub.$on('updateBreadcrumb', () => {
      this.lang = this.$route.params.lang.toUpperCase()
      this.category = this.nodriza.u.kebabToText(this.$route.params.category).split(')')[1]
      this.content = this.nodriza.u.kebabToText(this.$route.params.content).split(')')[1]
      document.title = 'Nodriza Docs / ' + this.lang + ' / ' + this.category + ' / ' + this.content
    })
  }
}
</script>
<style scope>
.active {
  font-size: 18px;
  line-height: 18px;
  font-weight: 600;
}
</style>