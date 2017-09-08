
<template>
  <span class="clearfix">

    <!-- Text case -->

    <span v-if="show && type === 'text'">
      {{ message + points }}
    </span>

    <!-- Lines case -->

    <div v-if="show && type === 'lines'" class="loader-main-bar">
      <div class="loader-bar"></div>
      <div class="loader-bar"></div>
      <div class="loader-bar"></div>
    </div>

    <!-- Balls case -->

    <span v-if="show && type === 'balls'" class="container">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </span>


  </span>
</template>

<script>

export default {
  name: 'Loading',
  props: {
    type: {
      type: String,
      default: 'lines'
    },
    show: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: 'Loading'
    }
  },
  data () {
    return {
      points: ''
    }
  },
  mounted () {
    if (this.type === 'text') {
      setInterval(() => {
        this.points += '.'
        if (this.points.length === 4) this.points = ''
      }, 250)
    }
  }
}
</script>

<style scoped>

/* Lines */

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

/* Balls */

h1 {
  font-family: $font;
  font-size: 4em;
  text-align: center;
  letter-spacing: -10px;
  font-weight: lighter;
}

h1 span:first-child {
  color: #4285f4;
}

h1 span:nth-child(2) {
  color: #db4437;
}

h1 span:nth-child(3) {
  color: #f4b400;
}

h1 span:nth-child(4) {
  color: #4285f4;
}

h1 span:nth-child(5) {
  color: #0f9d58;
}

h1 span:nth-child(6) {
  color: #db4437;
  -ms-transform: rotate(-20deg);
  -webkit-transform: rotatee(-20deg);
  transform: rotate(-20deg);
  display: inline-block;
}

.container {

}

div {
  height: 20px;
  width: 20px;
  position: absolute;
  border-radius: 50%;
  background: #000;
  display: inline-block;
}

div:first-child {
  animation: move 1s ease-in-out infinite alternate;
  background: #4285f4;
  margin-left: 0;
}

div:nth-child(2) {
  animation: move 0.5s ease-in-out -0.25s infinite alternate;
  margin-left: 35px;
  background: #db4437;
}

div:nth-child(3) {
  animation: move 0.5s ease-in-out -0.5s infinite alternate;
  margin-left: 70px;
  background: #f4b400;
}

div:nth-child(4) {
  animation: move 0.5s ease-in-out -0.75s infinite alternate;
  margin-left: 105px;
  background: #0f9d58;
}

@-moz-keyframes move {
  0% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(5px);
  }
}

@-webkit-keyframes move {
  0% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(5px);
  }
}

@-o-keyframes move {
  0% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(5px);
  }
}

@keyframes move {
  0% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(5px);
  }
}
</style>
