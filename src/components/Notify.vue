<template>
  <div class="wrapper">
    <vue-toastr ref="toastr"></vue-toastr>
  </div>
</template>

<script>
import Vue from 'vue'
import Toastr from 'vue-toastr'
import _ from 'lodash'

// require('../../node_modules/vue-toastr/dist/vue-toastr.css')
Vue.component('vue-toastr', Toastr)

/*
  OPTIONS
    title: "Toast Title",
    msg: "Toast Msg", 
    position: Toast position string can be  'toast-top-right', 'toast-bottom-right', 'toast-bottom-left', 'toast-top-left', 'toast-top-full-width', 'toast-bottom-full-width', 'toast-top-center', 'toast-bottom-center' ; default toast-top-right
    type: Toast type can be : info,warning,error,success ; default success
    timeout: Toast Timeout for auto close can be integer ; default 5000
    progressbar: Progress Bar option need timeout. can be boolean; default true
    closeOnHover: On mouse over stop timeout can be boolean; default true
    clickClose: On click toast close can be boolean; default false
    onCreated: On created toast event can be function
    onClicked: On clicked toast event can be function
    onClosed: On closed toast event can be function
    onMouseOver: On mouse over toast event can be function
    onMouseOut: On mouse over toast event can be function
*/
export default Vue.extend({
  name: 'notify',
  data () {
    return {
      defaults: {
        position: 'toast-bottom-right',
        progressbar: false
      }
    }
  },
  methods: {
    notify (_params) {
      const params = Object.assign(this.defaults, _params)
      console.log('->>> params:', params)
      if (_.get(this, '$refs.toastr.Add')) this.$refs.toastr.Add(params)
    }
  },
  created: function () {
    this.eventHub.$on('success', (_params) => {
      if (_.isEmpty(_params)) _params = ''
      let params = _.isString(_params) ? {msg: _params, title: 'OK'} : _params
      params.type = 'success'
      this.notify(params)
    })
    this.eventHub.$on('info', (_params) => {
      if (_.isEmpty(_params)) _params = ''
      let params = _.isString(_params) ? {msg: _params, title: 'INFO'} : _params
      params.type = 'info'
      this.notify(params)
    })
    this.eventHub.$on('warning', (_params) => {
      if (_.isEmpty(_params)) _params = ''
      let params = _.isString(_params) ? {msg: _params, title: 'WARNING!'} : _params
      params.type = 'warning'
      this.notify(params)
    })
    this.eventHub.$on('error', (_params) => {
      if (_.isEmpty(_params)) _params = ''
      let params = _.isString(_params) ? {msg: _params, title: 'ERROR'} : _params
      params.type = 'error'
      this.notify(params)
    })
  }
})
</script>
<style>
.toast-title {
  font-weight: 700
}

.toast-message {
  -ms-word-wrap: break-word;
  word-wrap: break-word
}

.toast-message a,
.toast-message label {
  color: #fff
}

.toast-message a:hover {
  color: #ccc;
  text-decoration: none
}

.toast-close-button {
  position: relative;
  right: -.3em;
  top: -.3em;
  float: right;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  -webkit-text-shadow: 0 1px 0 #fff;
  text-shadow: 0 1px 0 #fff;
  opacity: .8;
  -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=80);
  filter: alpha(opacity=80)
}

.toast-close-button:focus,
.toast-close-button:hover {
  color: #000;
  text-decoration: none;
  cursor: pointer;
  opacity: .4;
  -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=40);
  filter: alpha(opacity=40)
}

button.toast-close-button {
  padding: 0;
  cursor: pointer;
  background: transparent;
  border: 0;
  -webkit-appearance: none
}

.toast-top-center {
  top: 0;
  right: 0;
  width: 100%
}

.toast-bottom-center {
  bottom: 0;
  right: 0;
  width: 100%
}

.toast-top-full-width {
  top: 0;
  right: 0;
  width: 100%
}

.toast-bottom-full-width {
  bottom: 0;
  right: 0;
  width: 100%
}

.toast-top-left {
  top: 12px;
  left: 12px
}

.toast-top-right {
  top: 12px;
  right: 12px
}

.toast-bottom-right {
  right: 12px;
  bottom: 12px
}

.toast-bottom-left {
  bottom: 12px;
  left: 12px
}

.toast-container {
  position: fixed;
  z-index: 999999;
  pointer-events: none
}

.toast-container * {
  box-sizing: border-box
}

.toast-container>div {
  position: relative;
  pointer-events: auto;
  overflow: hidden;
  margin: 0 0 6px;
  padding: 15px 15px 15px 60px;
  width: 300px;
  border-radius: 0 0 0 0;
  background-position: 15px;
  background-repeat: no-repeat;
  box-shadow: 0 0 12px #999;
  color: #fff;
  opacity: .8;
  -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=80);
  filter: alpha(opacity=80)
}

.toast-container>:hover {
  box-shadow: 0 0 12px #000;
  opacity: 1;
  -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=100);
  filter: alpha(opacity=100);
  cursor: pointer
}

.toast-container>.toast-info {
  background-size: 32px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABHCAMAAACAsrFUAAACAVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9n7yP8AAAAqnRSTlMAAAECAwQFBggJCgsMDQ4PEBESFBUWFxgaHB0eICEiIyUmJygrLC0yMzQ1Nzk6PD0+P0BBQkNFRkdISktNTk9QU1ZXWFlaX2BhYmRlaGlqa2xtcHF1dneAgYKDhIaKjI6PkJKTlZaYmZqbnJ2goqOkpaeoqaqsrbW5ury/wMLDx8nKy8zNzs/Q0tPU1dbY3d/h4uPk5ebn6Onq6+zt7vDx8vP2+Pn6+/z9/uJyL8YAAANOSURBVFjD3dhXWxNBFIfxo1EQjRgENBY0YK9I7AVRwRbBAih2VLCA2BuJKFgDFpQoRFGDLRDfT+lFXNJ2Nzvmxsf/5eTMb/NsNjNnVsZkGPknANHLvOpmX28oQiTU62uunqdbYwjY3C1BEhNscdusAva6PvTSV2e3AmTVf8Ion+uz0gJrXv8pjjxp3FM6O9+RP7t0T+OTyJ/R12vMgaxT0bpf7bscCddy7Gr/Ff3oVJYJUNgFQLilWOeWu1rCAHQVGgLFvQDcc4l+XPcA6C02AFyDAENVYpyqIYBBly4wIwDgLxKzFPkBAjN0gJxuAO8UMU+uF6AnJxVoA/BmS7pkewHaUoAqgM6JSdWr/X7/raSxiZ0AVUlA3gcg6Ey+XAXgTx50BoEPeYlAM8BasQTIWoDmBGBWGGgVi4C0AuFZ8cAFIDQ1tTLf7XYvSR2eGgIuxAG534EGsZ4G4HtuDPAAXx0KgOMr4IkBHfp3wCStQMcoYA8DK/Xq9J4DERFZCYTtGrAJ+GLTqzP4FURsX4BNGnAMuCtKgNwFjmnAHeCwInAYuKMB3UC5IlAOdGvAIDBfEZgPDGrAD2CmIjAT+KEBAA5FwAEQDxQoAtPigRAwRxEoAX5qwFujB9EEWA4ENOA+sFcR8AAPNeA8cEYRaAJaNaDGsMwYeAzUaEAJQKES4ARYOLoeBIBDSkAN8C62oJwDnikBz4CmGLAIwK0AuAGWxq3Kz4EOBcALPI1f1ivR/0cbABsBKuMB2yugb7JFwP4GeGFL2NrWA1yxCFwG2JC0O98A2G9pZ6oGuJG8vU8bACJbLWwJW0aA/vyUBqNsBAhvTDu/PAwMl+n0SLUAI3vTzN83DFCj26UdB+B8jsn0CRcBOGrQJ0bb1JcrDOcv6AHghGGnWhttia/ONQDaACIHTHrlzdFOfeTmqrFGwMd1pt2606cdDs5WxDoWx6pJo0BdmnZ/bOX70ePB+47rl85evP4wCD0uDahNe2KZVN+vc9YY2moZEMne7YukEifHWQZExOm5FkgWfAUKgIhI3rKdB480HDm4Y3HBaQACj9SA+Gz7pn2PvwSk5GWGgNhvZwiI1A1nCEjpQIaATH+QISDjGzMERLZ7dID/4BVIRvkNahUvTmDixmEAAAAASUVORK5CYII=)!important
}

.toast-container>.toast-error {
  background-size: 32px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABHCAMAAACAsrFUAAACClBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8MAqS3AAAArXRSTlMAAAECAwQFBggJCgsMDQ4PEBESExQVFhcYGhwdHiAhIiMlJicoKywtMjM1Nzk6PD0+P0BCQ0VGR0hKS01OT1BTVldYWVpbX2BhYmRlaGlqa2xtcHF1dnd4gIGCg4SGioyOj5CSk5WWmJmam5ydoKKjpKWnqKqsrbW5ury+v8DCw8fJysvMzc7P0NLT1NXW2Nzd3+Hi4+Tl5ufo6err7O3u8PHy8/T2+Pn6+/z9/hkrvuYAAAO2SURBVHgB3dftV1RVFMfxX06B4AQD8dDgQw5oz4milRaWQZoSlAIaWhGZqKFUWj44REqZIZlSTCgmCZY2cN3/Y3uP69w5c+85d+7qvmn5fXe2sz/Lddc91yUeidj/A4CpNZ2D6ck5h5y5yfRg5xqYsgKxlqEZKmxmqCUWFoj3TJGpqZ54GKCkd5Zs/dlbUhTYeJUe5Fwc2Nm8siZRs7J558BFhx50dWMwUNJPue6f3ZGAXmLH2fuUq78kAKgbIyk71Ah/qaEsSWN1VqBxkqQzKZhLnSFpstECpG4RN98Oe+3zxN1KGYGGDHHjqxDUqnHiMg0GoOwycecqEVzFOeImyvzAcG6/FMUqzQnDPqBdxhfKUbzyC8S1e4Cqm/K+JxGmpNyTm1WFwKComxCuTcQNFgAr5B05BrfK4Vp46toOt2Pytq3QgSM8mavO74/RhEfoIicvVM/x749oQMVdHvTp+1QgyD7pQh8f71bkgQ4+30nogEeQfR1I3OFzRx4YVU/ALGj7+lMYdYG4PMJ1MArmfayTxxhXwBY+3Y7BINSD2+PfR+w2z7Yo4AAfTgMG4VoD8IFvXzrNwwMKOMWHvbAI5n3s5ekpBcg9bIVZmDXvo5XHlxUgH5K1MAuWfayVD4sC7vFhOcyCZR/L+Q/uKYC4BAztJ2m6Af4SxOlALfzJ85OuGYR6HZCr8ZR53yo08fgfBfwmL6J53+kcMwsvyrdVAd/yYZd5fzsqzYLcv/MKOMyHTy37sAiH5P4pQC7LuG3fIvzAoy4FNBFXZ963CEmZPKMAZPi0x7xvEeQv/Ttc4DM+XoLb6qy2rwnH4XaJj4fywLPEtWg3JUvZbdCLjxCNlEPVIgvP5wH8JF8oaMLf3ttZPqLtQ/55+xEa0CaivvME4BWWwm0zcW06EPuFJ1OPI1zxX/nXP8d0AK+I+QXCdZy4V1EA4KQM30OYOok7CQ9Qf4OnzlYU7/VF/uX1Gi+ADTLPbkaxWuUlWdgAH4Bu4hZ3Ibh3F4jrggHAhyQdLoO9pUdJ2g8jgH6SrrwEW09PkPQRLAC6HZK+XA1zw8Q578MK4LVZkha/Xr/EBvzxMgIAJNPqPwcH36iGKrF+mQv0IBDAkrZpUk2Pnvj84NET52eIJlIK6A4EpGW918nf/NaQgFT6TtrxEx8/GhaQkh1fZbxCutYOGKt64e3d+/r27X7rudpPSMp8HxIw9OZfJP13AE1XIgKIfxMJkHoWIgJovhERwJPfRQTw2EAkQNrWYQAi9FAA/wJ8E4qUE0oJbQAAAABJRU5ErkJggg==)!important
}

.toast-container>.toast-success {
  background-size: 32px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABHCAMAAACAsrFUAAACClBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8MAqS3AAAArXRSTlMAAAECAwQFBggJCgsMDQ4PEBESFBUWFxgaHB0eICEiIyUmJygrLC0yMzU3OTo8PT4/QEJDRUZHSEpLTU5PUFNVV1hZWltfYGFiZGVoaWprbG1wcXV2d3iAgYKDhIaKi4yOj5CSk5WWmJmam5ydoKKjpKWnqKmsrbK1ubq8v8DCw8THycrLzM3O0NLT1NXW2Nzd3t/h4uPk5ebn6Onq6+zt7vDx8vP2+Pn6+/z9/qX7QAIAAAOGSURBVFjD3dj7f0t3HMfxD6FdySpVlxQlwTaG0rorpsXIms3aqmJDh7q0irpNE2V1rTDXZizWkVLSxut/3A/tSc5Jvt+cE/nFY+/fknPezyQnOd/zOZEJBUY+C0BUWdTQHn4ST5KMPwm3NyxS7qMFXNUdMayJdVS7nALupgFUGWhyOwGKml+jy+vmIlug5tH4zsk7bbuq5pV7yudV7Wq7kxx/9lFNbqDo0Nh+H3t2eiyv5dnZ83Fs06GiHMDMmwAkOvyKQ+7vSABwc6YW8D8F4KpP1PFdBeCpXwP4BgGG6kWf+iGAQZ8SqIgC9FdKrlT2A0QrFEBJBCA0TXKnNAQQKckGugBCxWKX4hBAVxZQD9A3RewzpQ+gPgMoewXEvOIk3hjwqswKtAOsFmepAWi3AHMTQKc4TSeQmGsGTgLx6Y6B6XHgpAkoHQZabXvpBaEVGC5NAwHgrcf2o9+vSJ1bb4FAGuh1cgRqhnlcYT4KvSnAnQCq7PvwePb4oxVAwm0AG4A3kxz0+d34pbreABsM4ABwJa++yBXggAFcBvbm15e9wGUDiAC1+fWlFogYwCCwOL1tR9C+L4uBQQN4D8xJ95MEFf1L1jN9DvDeAAA8pj4WYazfnfEteQDMQGqpbQGLoO7LLDMQB+anNu2zCJq++IEPBvAcWCFKQdeXZUDUAK4Bu0UlaPsSAP4wgBPAb5Il7MvRl+NApwEEgX7JFjr1fbkNBA1goeVrMAn6vhfg69R6EAV+FqWg7ksQ+Cu9oBwD7olK0PTlHnA8DXwDUK0QdP1qgKWmVbkf6JUsQdeXEHDXvKzXoTqjN+n66wHqzIDrT2DgS4eXBfcz4IHLcmlbC3DWIXAGYF3G1fkiwI+O+g0AFzIv77NiQHKzg/6mUeBledaAsWoUSKy37dcmgJFVihmpEWB0t03/hxHTapExpR0E4ERJjvoXpwDYr5kTDwPwcLm2/1UEgF+0k2rj2Dh7boEG6AJI/pRjVt74LwCjF1dO1AH/rMk5rXvDxs3B0S3picWzcmoKaLIZ9yfWvUitJS96u08fPdV9IwYRnwE02t6xuJtfKu41hjY7BkSKvw8ns4lfJzkGRMQbOB/NFMIz8gBERMq+3b6npbVlz7YlM44AEL2VH2DO1nfG+/hEQBY+LBAQ96UCAZGmkQIBqfq7QEBmXy8QkMltBQIi3wUUwP/gL5CC8h8/rFt8fmK4BAAAAABJRU5ErkJggg==)!important
}

.toast-container>.toast-warning {
  background-size: 32px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABHCAMAAACAsrFUAAACAVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9n7yP8AAAAqnRSTlMAAAECAwQFBggJCgsMDQ4PEBESFBUWFxgaHB0eICEiIyUmJygrLC0yMzQ1Nzk6PD0+P0BBQkNFRkdISktNTk9QU1ZXWFlaX2BhYmRlaGlqa2xtcHF1dneAgYKDhIaKjI6PkJKTlZaYmZqbnJ2goqOkpaeoqaqsrbW5ury/wMLDx8nKy8zNzs/Q0tPU1dbY3d/h4uPk5ebn6Onq6+zt7vDx8vP2+Pn6+/z9/uJyL8YAAANLSURBVFjD3dhXWxNBFIfxo1EQjBgENPaAvaKxF2xgi2ChiB1RLCD2mohiD4igxBJFDbZAfD+lF2FJYTbZMTc+/i93z/w2z+5m5szKqAwj/wQgqsypbPL1hCJEQj2+pso5yhpTwOZuDpKYYLPbZhWw1/SiSm+N3QqQVfsZs3ypzUoLrO4eKo48bdhTOqPAUTCjdE/D08jQ0e7VqYGsk9G63/d2ORKu5dh173f01MmsFEDRIwDCzcWKW+5qDgPwqMgUKO4B4K5L1HHdBaCn2ARw9QH0V4h5KvoB+lxKYGoAwD9TUmWmHyAwVQHkdAB4J0rq5HkBOnNGAq0A3mxJl2wvQOsIoAKgPTepepXf77+ZdCy3HaAiCcj/CASdyZfbCviTDzqDwMf8RKAJYI1YAmQNQFMCMD0MtIhFQFqA8PR44DwQmmQZmBQCzscBeT+AerEMSD3wIy8GeIBvDg3A8Q3wxIA29R0wB6QFaBsG7GFguRawHAjbDWAj8NWmBdi+AhsN4ChwR7QAuQMcNYDbQJ0mUAfcNoAOoEwTKAM6DKAPmKsJzAX6DOAnME0TmAb8NAAAhybgAIgHCjWByfFACJilCZQAvwzgjdmLmAJYCgQM4D6wVxPwAA8N4BxwWhM4C7QYQJVpmTnwBKgygBKAIlVZgdvtXqQ64QSYPzwfBIBDopMq4G1sQjkDPNcCngNnY8ACALfGeDfA4rhZ+QXQpihUrUwiIl7gWfy0Xo76H23yFDYAlMcDtldA7wSLgP018NKWsLStA7hsEbgEsD5pdb4OsN/Se1AJcD15eZ/8AYhssfAENg8C7wtGNBgrB4HwhrTjy8LAwEpFj1QNMLg3zfh9AwBVyi7tGADnclIMH3cBgCMmfWK0Te1aZjp+XicAx0071epoS3xltgnQChA5kKJX3hTt1AdvrBhtBnxam7Jbd/qMzUHj1ljH4lgxfhioSdPujy5/N7w9eNd27WLjhWsPg9DpMoDqtDuW8bXvFXuN/i2WAZHs3b7ISOLEGMuAiDg9VwPJgq9QAxARyV+y8+Dh+sMHdywsPAVA4LEeEJ9t343f8ZeAlHRlCIj9VoaASM1AhoCUfsgQkCkPMgRkbEOGgMh2jwL4Dz6BZJQ/rnIvTtjyZQ8AAAAASUVORK5CYII=)!important
}

.toast-container.toast-bottom-center>div,
.toast-container.toast-top-center>div {
  width: 300px;
  margin-left: auto;
  margin-right: auto
}

.toast-container.toast-bottom-full-width>div,
.toast-container.toast-top-full-width>div {
  width: 96%;
  margin-left: auto;
  margin-right: auto
}

.toast {
  background-color: #030303
}

.toast-success {
  background-color: #51a351
}

.toast-error {
  background-color: #bd362f
}

.toast-info {
  background-color: #2f96b4
}

.toast-warning {
  background-color: #f89406
}

.toast-progress {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 4px;
  background-color: #000;
  opacity: .4;
  -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=40);
  filter: alpha(opacity=40)
}

@media (max-width:240px) {
  .toast-container>div {
    padding: 8px 8px 8px 50px;
    width: 11em
  }
  .toast-container .toast-close-button {
    right: -.2em;
    top: -.2em
  }
}

@media (min-width:241px) and (max-width:480px) {
  .toast-container>div {
    padding: 8px 8px 8px 50px;
    width: 18em
  }
  .toast-container .toast-close-button {
    right: -.2em;
    top: -.2em
  }
}

@media (min-width:481px) and (max-width:768px) {
  .toast-container>div {
    padding: 15px 15px 15px 50px;
    width: 25em
  }
}


/*# sourceMappingURL=vue-toastr.css.map*/

</style>
