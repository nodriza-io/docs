<template>
  <div class="animated fadeIn" >
    <h1 class="m-b-25 title">{{ title }}</h1>
    <div v-html="content">
      {{ content }}
    </div>
    <div class="m-b-20"> 
      <hr>
      <span>
        
      ©2017 Nodriza
      </span>
      <span class="pull-right"><a href="http://nodriza.io" target="_blank">nodriza.io</a></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Content',
  components: {
  },
  data: function () {
    return {
      content: '',
      title: ''
    }
  },
  methods: {
    //
  },
  mounted () {
    this.eventHub.$on('content', (content) => {
      this.content = content
      this.title = this.nodriza.u.kebabToText(this.$route.params.content).split(')')[1]
    })
  }
}
</script>

<style scoped>
.logo-jumbotron {

}
.title {
  /*font-weight: 100;*/
}
</style>
