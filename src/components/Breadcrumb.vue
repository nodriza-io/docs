<template>
  <div>  
    <ol class="breadcrumb">
      <li class="breadcrumb-item" v-for="(item, index) in list"><span class="active" v-if="isLast(index)">{{ showName(item) | unCammel }}</span>
        <router-link :to="item.path" v-else>{{ showName(item) | unCammel }}</router-link>
      </li>
      <Lang/>
    </ol>
  </div>
</template>

<script>
import Lang from '../components/Lang'
export default {
  props: {
    list: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  components: {
    Lang
  },
  methods: {
    isLast (index) {
      return index === this.list.length - 1
    },
    showName (item) {
      if (item.meta && item.meta.label) {
        item = item.meta && item.meta.label
      }
      if (item.name) {
        item = item.name
      }
      return item
    }
  }
}
</script>
<style scope>
.active {
  font-size: 16px;
  line-height: 16px;
}
</style>