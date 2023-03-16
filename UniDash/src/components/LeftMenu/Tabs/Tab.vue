<template>
  <div class="gradient-bprder width-100" :data-url="tab.url">
    <div class="content width-100">
      <div class="hover width-100 flex flex-center flex-between">
        <span>{{ tab.name }}</span>
        <div class="tab-icons">
          <BookmarkIcon class="clicked" @click="activeToggleTab" />
          <XMarkIcon @click="removeTab" />
        </div>
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
        if (tabElement.id === this.tab.id) {
          tabList.splice(tabElement, 1);
        }
      }
      this.updateTabList(tabList);
      this.ShowFavorisIfTabListEmpty()
    },
    activeToggleTab(event) {
      let tabList = this.$store.state.tabList;
      for (let tabElement of tabList) {
        if (tabElement.id === this.tab.id) {
          tabElement.active = !tabElement.active;
        }
      }
      this.updateTabList(tabList);
      let element = event.target;
      if (element.tagName !== "svg") {
        element = event.target.parentElement;
      }
      element.classList.toggle("clicked");
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

.tab-icons {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>