<template>
  <IframeElement :url="this.url" />
</template>

<script>
import IframeElement from "../../modules/vue/IframeElement.vue";
export default {
  name: "Element",
  props: {
    url: {
      type: String,
      required: true
    },
  },
  components: {
    IframeElement,
  },
}
</script>

<style scoped lang="scss">
</style>