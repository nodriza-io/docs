<template>
  <div class="wrapper text-gray-light bg-gray-lighter">
    <!-- <i class="fa fa-globe globle m-r-10 m-b-10"></i> -->
    <!-- <div class="small text-muted">LANGUAGE </div> -->
    <template v-for="(item, index) in langs">
      <a :class="index === $route.params.lang ? ['activeLang'] : ''" class="m-r-10 langs" @click="setLang(index)">{{ index.toUpperCase() }}</a>
    </template>
  </div>
</template>

<script>

export default {
  name: 'Lang',
  props: {
    langs: {
      type: Object,
      default: []
    },
    value: {
      type: String
    }
  },
  components: {
  },
  watch: {
    lang (lang) {
      this.$emit('input', this.lang)
    }
  },
  data: function () {
    return {
      lang: null
    }
  },
  methods: {
    setLang (lang) {
      this.lang = lang
      this.$router.push('/' + lang)
      // alert(lang)
      // this$router.push({ path: window.location, query: { plan: 'private' }})
    }
  },
  mounted () {
    this.lang = this.value
  }
}
</script>

<style scoped>

.small {
  font-weight: 600;
  margin-right: 10px;
  font-size: 12px;
  display: inline-block;
}

.globle {
  font-size: 19px !important;
}

.langs {
  cursor: pointer;    
  font-size: 16px;
  font-weight: 400;
}

.activeLang {
  font-weight: 500;
  font-size: 20px;
  text-decoration: underline;
  color: #1d1d1d !important;
}

.wrapper  {
  position: fixed;
  top: 0px;
  right: 0px;
  padding: 7px;
  padding-left: 20px;
  z-index: 100;
}

</style>
