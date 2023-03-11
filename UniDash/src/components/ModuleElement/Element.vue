<template>
  <div class="element">
    <iframe class="my-iframe" ref="myIframe" :src="url"></iframe>
    <label class="dark-theme">
      <input class="dark-iframe-button" type="checkbox" v-model="isDarkTheme">
      <MoonIcon class="checkmark"></MoonIcon>
    </label>
  </div>
</template>

<script>
import { MoonIcon } from "@heroicons/vue/20/solid";
export default {
  name: "Element",
  data() {
    return {
      isDarkTheme: false,
    }
  },
  props: ['url'],
  components: {
    MoonIcon,
  },

  watch: {
    isDarkTheme(value) {
      if (value) {
        this.$refs.myIframe.classList.add('my-iframe-dark');
      } else {
        this.$refs.myIframe.classList.remove('my-iframe-dark');
      }
    },
  },
}
</script>

<style scoped lang="scss">
   @import "../../style";

  .element {
    width: 100%;
    height: 100%;

    border-radius: $default-len;
    background: $gradient-color;

    position: relative;

    .my-iframe {
      width: 100%;
      height: 100%;

      border: none;
      border-radius: $default-len;
      background-color: $black-gray-color;

      filter: none;
      transition: filter 100ms ease-in-out;

      &:hover {
        width: calc(100% - 0.2rem * 2);
        height: calc(100% - 0.2rem * 2);
        margin: 0.2rem;
      }
    }

    .my-iframe-dark {
      filter: hue-rotate(180deg) invert(0.9) saturate(1.2);
      transition: filter 100ms ease-in-out;
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
        transition: color 100ms ease-in-out;
      }

      .dark-iframe-button {
        display: none;
      }

      .dark-iframe-button:checked + .checkmark {
        color: $white-color;
        transition: color 100ms ease-in-out;
      }
    }
  }
</style>