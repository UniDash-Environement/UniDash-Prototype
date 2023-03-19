<template>
  <BoxHover>
    <span>{{ tab.name }}</span>
    <div class="tab-icons">
	    <div :id="tab.id" class="flex">
		    <BookmarkIcon class="clicked" @click="activeToggleTab" />
	    </div>
      <XMarkIcon @click="removeTab" />
    </div>
  </BoxHover>
</template>

<script>
import { useStore } from "vuex";

import { BookmarkIcon } from "@heroicons/vue/20/solid";
import { XMarkIcon } from "@heroicons/vue/20/solid";

import BoxHover from "@/components/Custom/BoxHover.vue";

export default {
  name: "Tab",
  components: {
    BoxHover,
    XMarkIcon,
    BookmarkIcon
  },
  props: {
    tab: {
      type: Object,
      required: true
    },
  },
	data() {
		let active = this.tab.active;
		return {
			active: active
		}
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
          tabList.splice(tabList.indexOf(tabElement), 1);
        }
      }

      this.updateTabList(tabList);
    },
    activeToggleTab(event) {
      let tabList = this.$store.state.tabList;
      for (let tabElement of tabList) {
        if (tabElement.id === this.tab.id) {
          if (tabElement.active === "") {
            tabElement.active = "hidden";
          } else {
            tabElement.active = "";
          }
        }
      }
      this.updateTabList(tabList);
      let element = event.target;
      if (element.tagName !== "svg") {
        element = event.target.parentElement;
      }
      element.classList.toggle("clicked");
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/style";

.tab-icons {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>