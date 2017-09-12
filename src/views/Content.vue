<template>
  <div class="animated fadeIn" v-html="content">
    {{ content }}
  </div>
</template>

<script>
export default {
  name: 'Content',
  components: {
  },
  data: function () {
    return {
      content: 'Loading...'
    }
  },
  methods: {
    //
  },
  mounted () {
    this.eventHub.$on('content', (content) => {
      this.content = content
    })
  }
}
</script>

<style scoped>
.logo-jumbotron {

}
</style>
