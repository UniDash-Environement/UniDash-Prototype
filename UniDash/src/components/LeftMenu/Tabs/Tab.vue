<template>
  <div class="tab" :data-url="tab.url">
    <div class="tab-content">
      <span>{{ tab.name }}</span>
      <div class="tab-icons">
        <BookmarkIcon class="checked" @click="activeToggleTab" />
        <XMarkIcon @click="removeTab" />
      </div>
    </div>
  </div>
</template>

<script>
import { XMarkIcon } from "@heroicons/vue/20/solid";
import { BookmarkIcon } from "@heroicons/vue/20/solid";
import {useStore} from "vuex";

export default {
  name: "Tab",
  components: {
    XMarkIcon,
    BookmarkIcon
  },
  props: {
    tab: {
      type: Object,
      required: true
    },
  },
  setup() {
    const store = useStore();

    function updateTabList(newList) {
      store.commit('updateTabList', newList);
    }

    return { updateTabList };
  },
  methods: {
    removeTab() {
      let tabList = this.$store.state.tabList;
      for (let tabElement of tabList) {
        if (tabElement.id ===this.tab.id) {
          tabList.splice(tabElement, 1);
        }
      }
      this.updateTabList(tabList);
      this.ShowFavorisIfTabListEmpty()
    },
    activeToggleTab(event) {
      let tabList = this.$store.state.tabList;
      for (let tabElement of tabList) {
        if (tabElement.id ===this.tab.id) {
          tabElement.active = !tabElement.active;
        }
      }
      this.updateTabList(tabList);
      let element = event.target;
      if (element.tagName !== "svg") {
        element = event.target.parentElement;
      }
      element.classList.toggle("checked");
    },
    ShowFavorisIfTabListEmpty() {
      let tabList = this.$store.state.tabList;
      if (tabList.length === 0) {
        document.getElementById("show-favoris").click();
      }
    }
  }
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

          color: $white-color;
          transition: color $medium-time ease-out;

          &.checked {
            color: $uni-gray-color;
          }
        }
      }
    }
  }
</style>