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

.iframe-dark {
  filter: hue-rotate(180deg) invert(1) saturate(1.2);
  transition: filter $medium-time ease-in-out;
}

.dark-theme {
  position: absolute;
  bottom: $light-len;
  right: $light-len;
  z-index: 1;

  .checkmark {
    width: $medium-len;
    height: $medium-len;
    color: $black-gray-color;
    transition: color $medium-time ease-in-out;
  }

  .dark-iframe-button {
    display: none;
  }

  .dark-iframe-button:checked + .checkmark {
    color: $white-color;
    transition: color $medium-time ease-in-out;
  }
}
</style>
