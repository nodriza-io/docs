<template>
  <div v-if="visible" class="wrapper fadeIn">
    <div class="loader-main-bar">
      <div class="loader-bar"></div>
      <div class="loader-bar"></div>
      <div class="loader-bar"></div>
    </div>
    <div class="message text-uppercase">{{ this.message }}</div>
    <div class="loader-bg"></div>
  </div>
</template>


<script>
export default {
  name: 'Preload',
  data () {
    return {
      visible: false,
      message: ''
    }
  },
  mounted () {
    this.eventHub.$on('showPreload', (params) => {
      this.show(params)
    })
    this.eventHub.$on('hidePreload', () => {
      this.hide()
    })
  },
  methods: {
    show: function (params) {
      if (typeof params === 'string') this.message = params
      this.visible = true
    },
    hide: function () {
      this.visible = false
      this.message = ''
    }
  }
}
</script>

<style scoped>
.wrapper {
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100000;
}
.loader-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.5;
}
.message {
  position: absolute;
  width: 320px;
  height: 60px;
  top: 50%;
  left: 50%;
  margin-left: -50px;
  margin-top: -50px;
  color: #FFF;
  z-index: 100001;
  opacity: 0.8;
}​

.loader-bar {
  content: "";
  display: inline;
  position: absolute;
  width: 0;
  height: 100%;
  left: 50%;
  text-align: center;

}
@keyframes loading {
    from {left: 50%; width: 0;z-index:100;}
    33.3333% {left: 0; width: 100%;z-index: 10;}
    to {left: 0; width: 100%;}
}
</style>
