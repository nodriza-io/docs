<template>
  <div>
    <li class="nav-item">
      <a @click="goTo()" class="nav-link slim bg-gray-dark">{{ nodriza.u.kebabToText(name.split('.html')[0]) }} </a>
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
    goTo (route) {
      this.$router.push('/' + this.relativePath.split('.html')[0])
    }
  },
  mounted () {
    Object.assign(this, this.child)
  }
}
</script>

<style scoped>

  .fa-angle-right {
    padding-left: 18px;
  }

  .slim {
    cursor: pointer;
    padding-left: 20px !important;
    padding-top: 8px !important;
    padding-bottom: 8px !important; 
    font-size: 14px;
  }

</style>