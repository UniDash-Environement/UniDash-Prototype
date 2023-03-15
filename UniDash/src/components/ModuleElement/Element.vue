<template>
  <component v-bind:is="this.data.module" :data="this.data" />
</template>

<script>
export default {
  name: "Element",
  props: {
    data: {
      type: Object,
      required: true
    },
  },
}
</script>

<style scoped lang="scss">
</style>