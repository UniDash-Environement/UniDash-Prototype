<template>
	<iframe ref="iframeElement" :src="data.url"></iframe>
</template>

<script>
import { MoonIcon } from "@heroicons/vue/20/solid";
export default {
  name: "IframeElement",
  props: {
    data: {
      type: Object,
      required: true
    },
  },
  components: {
    MoonIcon,
  },
}
</script>

<style scoped lang="scss">
@import "@/style.scss";

iframe {
  width: 100%;
  height: 100%;

  border: none;
  border-radius: $lenMediumMax;
  background-color: $colorBlackGray;
}
</style>
