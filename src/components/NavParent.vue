<template>
<div>
  <li class="nav-item">
    <li class="nav-item nav-dropdown open">
      <div class="category text-uppercase">{{ nodriza.u.kebabToText(name) }}<i class="fa fa-chevron-down m-r-10 pull-right"></i> </div>
      <ul class="nav-dropdown-items">
        <div v-for="child in files">
          <NavChild :child="child" :active="active"/>
        </div>
      </ul>
    </li>
  </li>
</div>
</template>

<script>
import NavChild from './NavChild'

export default {
  name: 'NavParent',
  props: {
    parent: {
      type: Object,
      default: {}
    }
  },
  components: {
    NavChild
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
      files: [],
      active: false
    }
  },
  methods: {
  },
  mounted () {
    console.log('->>> this.menu:', this.parent)
    Object.assign(this, this.parent)
  }
}
</script>

<style scoped>

  .category {
    padding: 10px;
    background: none !important;
    cursor: initial !important;
    font-weight: 600;
    font-size: 12px;
  }

  .category a:hover {
    cursor: default;
  }
</style>