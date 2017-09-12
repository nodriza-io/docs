<template>
  <div>
    <li class="nav-item">
      <a :class="active ? ['', 'bg-primary'] : ''" @click="goTo()" class="nav-link slim bg-gray-dark">{{ nodriza.u.kebabToText(name.split('.html')[0]) }} </a>
    </li>
  </div>
    
</template>

<script>

export default {
  name: 'NavChild',
  props: {
    child: {
      type: Object,
      default: {}
    }
  },
  data: function () {
    return {
      name: '',
      fullpath: null,
      relativePath: null,
      active: false
    }
  },
  methods: {
    getRoute (route) {
      return '/' + this.relativePath.split('.html')[0]
    },
    goTo (route) {
      this.$router.push(this.getRoute())
    },
    updateNav () {
      this.active = (this.getRoute() === window.location.pathname) || false
    }
  },
  mounted () {
    Object.assign(this, this.child)
    this.eventHub.$on('updateNav', (fullpath) => {
      this.updateNav()
    })
    this.updateNav()
  }
}
</script>

<style scoped>

  .fa-angle-right {
    padding-left: 18px;
  }

  .slim {
        /*font-family: "Roboto-Bold";*/
    cursor: pointer;
    padding-left: 20px !important;
    padding-top: 8px !important;
    padding-bottom: 8px !important; 
    font-size: 12px;
    transition: 0.5s;
    font-weight: 500;
  }

  .active {

  }

</style>