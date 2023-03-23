<template>
  <Box>
	  <a :href="tabLink" class="hover width-100 flex flex-center flex-between">
		  <span>{{ tab.name }}</span>
		  <div class="tab-icons">
			  <div :id="tabId" class="flex">
				  <BookmarkIcon class="clicked" @click="activeToggleTab" />
				  <XMarkIcon @click="removeTab" />
			  </div>
		  </div>
	  </a>
  </Box>
</template>

<script>
import { useTabStore } from '@/stores/tab.js'

import { BookmarkIcon } from "@heroicons/vue/20/solid";
import { XMarkIcon } from "@heroicons/vue/20/solid";

import Box from "@/components/Custom/Box.vue";
import {computed} from "vue";

export default {
  name: "Tab",
  components: {
    Box,
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
		let tabId = this.tab.id + "tab";
		let tabLink = "#" + this.tab.id;

		return {
			active: active,
			tabId: tabId,
			tabLink: tabLink
		}
	},
  setup() {
	  const tabStore = useTabStore()
	  const { tabList, deleteTab, activateTab, splitTab } = tabStore

    function updateTabList(newList) {
      store.commit('updateTabList', newList);
    }

    return { tabList, deleteTab, activateTab, splitTab };
  },
  methods: {
	  getParent(name) {
		  let p = this.$parent;
		  while (typeof p !== 'undefined') {
			  if (p.$options.name == name) {
				  return p;
			  } else {
				  p = p.$parent;
			  }
		  }
		  return false;
	  },
    removeTab() {
      deleteTab(this.tab.id);
    },
    activeToggleTab(event) {
			activeTab(this.tab.id)

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
@import "@/style.scss";

a {
	margin: 0;
	padding: 0;
}

.tab-icons {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>