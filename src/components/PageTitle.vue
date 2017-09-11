<template>
  <div class="m-b-10">

      <h2>{{ title ? title : nodriza.u.unCammel($route.name) }}</h2>
      <p class="m-b-20 text-gray-light" v-if="$slots.description">
        <slot name="description"></slot>
      </p>

  </div>
</template>

<script>
export default {
  name: 'PageTitle',
  props: {
    title: {
      type: String
    },
    iconClass: {
      type: String
    }
  }
}
</script>

<style lang="css" scoped>
</style>