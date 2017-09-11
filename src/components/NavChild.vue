<template>
  <div>
    <li class="nav-item">
      <a :href="'/' + relativePath.split('.html')[0]" class="nav-link slim bg-gray-dark"><i class="fa fa-angle-right"></i> {{ nodriza.u.kebabToText(name.split('.html')[0]) }} </a>
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
  components: {
  },
  watch: {
    active (state) {
      console.log('->>> From parent state:', state)
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
  },
  mounted () {
    Object.assign(this, this.child)
    console.log('->>> this.name:', this.name)
  }
}
</script>

<style scoped>

  .fa-angle-right {
    padding-left: 18px;
  }

  .slim {
    padding-top: 8px !important;
    padding-bottom: 8px !important; 
    font-size: 14px;
    padding-left: 0px !important;
  }
</style>