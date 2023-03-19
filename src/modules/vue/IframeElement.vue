<template>
  <div class="iframe-element">
    <iframe ref="myIframe" :src="data.url"></iframe>
    <label class="dark-theme">
      <input class="dark-iframe-button" type="checkbox" v-model="isDarkTheme">
      <MoonIcon class="checkmark"></MoonIcon>
    </label>
  </div>
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
        this.$refs.myIframe.classList.add('iframe-dark');
      } else {
        this.$refs.myIframe.classList.remove('iframe-dark');
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import "@/style.scss";

.iframe-element {
  width: 100%;
  height: 100%;

  border-radius: $default-len;
  background: $black-color;

  position: relative;

  iframe {
    width: calc(100% - $super-light-len * 2);
    height: calc(100% - $super-light-len * 2);
    margin: $super-light-len;

    border: none;
    border-radius: $default-len;
    background-color: $black-gray-color;

    filter: none;
    transition: filter 300ms ease-in-out;
  }

  &:hover {
     background: $gradient-color
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
}
</style>