<template>
  <div class="tab" :data-url="url">
    <div class="tab-content">
      <span>Tab</span>
      <div class="tab-icons">
        <BookmarkIcon />
        <XMarkIcon />
      </div>
    </div>
  </div>
</template>

<script>
import { XMarkIcon } from "@heroicons/vue/20/solid";
import { BookmarkIcon } from "@heroicons/vue/20/solid";

export default {
  name: "Tab",
  components: {
    XMarkIcon,
    BookmarkIcon
  },
  props: ['url'],
}
</script>

<style scoped lang="scss">
@import "src/style";

  .tab {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: $gradient-color;
    padding-bottom: $light-len;
    width: 100%;
    border-radius: $medium-min-len;

    .tab-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      background-color: $black-color;
      border-radius: $medium-min-len;

      span {
        font-size: $medium-min-len;
        margin: $light-len
      }

      .tab-icons {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: $min-len;

        svg {
          height: $default-len;
          margin: 0;
          padding: 0;
        }
      }
    }
  }
</style>