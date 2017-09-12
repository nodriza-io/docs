<template>
  <div class="wrapper text-left text-white ">
  <!-- <span class="m-r-5 label"> LANGUAGES </span> -->
    <i class="fa fa-globe globle"></i>
    <template v-for="(item, index) in langs">
      <a :class="index === $route.params.lang ? 'activeLang' : ''" class="m-r-10 text-bold langs" @click="lang = index">{{ index.toUpperCase() }}</a>
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
      this.$router.push('/' + lang)
    }
  },
  data: function () {
    return {
      lang: null
    }
  },
  methods: {
    setLang (lang) {
      alert(lang)
      // this$router.push({ path: window.location, query: { plan: 'private' }})
    }
  },
  mounted () {
    this.lang = this.value
  }
}
</script>

<style scoped>

  .globle {
    font-size: 19px !important;
  }

  .langs {
    cursor: pointer;    
    font-size: 16px;
    font-weight: 100;
  }

  .activeLang {
    font-weight: 600;
    font-size: 18px;
  }

 .wrapper a {
    color: white;
  }

</style>
