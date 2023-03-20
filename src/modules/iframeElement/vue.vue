<template>
	<iframe ref="iframeElement" :src="data.url"></iframe>
</template>

<script>
import { MoonIcon } from "@heroicons/vue/20/solid";
export default {
  name: "IframeElement",
  data() {
    return {
      isDarkTheme: false,
    }
  },
  props: {
    data: {
      type: Object,
      required: true
    },
  },
  components: {
    MoonIcon,
  },

  watch: {
    isDarkTheme(value) {
      if (value) {
        this.$refs.iframeElement.classList.add('iframe-dark');
      } else {
        this.$refs.iframeElement.classList.remove('iframe-dark');
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import "@/style.scss";

iframe {
  width: 100%;
  height: 100%;

  border: none;
  border-radius: $default-len;
  background-color: $black-gray-color;
}
</style>
