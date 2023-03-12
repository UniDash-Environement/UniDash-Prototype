<template>
  <div class="slider">
    <div class="slider-content">
      <ChevronLeftIcon />
      <div class="slider-element">
        <StarIcon @click="showFavorites" />
        <span>Server 1</span>
        <Cog6ToothIcon @click="showSettings" />
      </div>
      <ChevronRightIcon />
    </div>
  </div>
</template>

<script>
import { ChevronLeftIcon } from "@heroicons/vue/20/solid";
import { ChevronRightIcon } from "@heroicons/vue/20/solid";
import { StarIcon } from "@heroicons/vue/20/solid";
import { Cog6ToothIcon } from "@heroicons/vue/20/solid";

export default {
  name: "Tab",
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
    StarIcon,
    Cog6ToothIcon
  },
  methods: {
    showSettings() {
      let settings = document.getElementById("show-settings");
      if (settings.checked) {
        document.getElementById("show-tab").click();
      }
      else {
        settings.click()
      }
    },
    showFavorites() {
      let favoris = document.getElementById("show-favoris");
      if (favoris.checked) {
        document.getElementById("show-tab").click();
      }
      else {
        favoris.click()
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../../style";

  .slider {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: $gradient-color;
    padding-bottom: $light-len;
    width: 100%;
    border-radius: $default-len;

    .slider-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      background-color: $black-color;
      border-radius: $default-len;

      .slider-element {
        display: flex;
        align-items: center;
        justify-content: space-between;

        span {
          font-size: $medium-min-len;
          margin: $light-len
        }
        svg {
          height: $default-len;
          margin: 0;
          padding: 0;
        }
      }

      svg {
        height: $medium-len;
        margin: 0;
        padding: 0;
      }
    }
  }
</style>