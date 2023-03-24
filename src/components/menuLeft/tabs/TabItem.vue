<template>
  <BoxGradient>
	  <a :href="'#' + tab.id" class="hover width-100 flex flex-center flex-between">
		  <span>{{ tab.name }}</span>
		  <div class="tab-icons">
			  <div :id="tab.id + 'tab'" class="flex">
				  <BookmarkIcon class="clicked" @click="activeToggleTab" />
				  <XMarkIcon @click="removeTab" />
			  </div>
		  </div>
	  </a>
  </BoxGradient>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useMenuStore } from '@/stores/menu.js'
import { useTabStore } from '@/stores/tab.js'

import { BookmarkIcon } from "@heroicons/vue/20/solid";
import { XMarkIcon } from "@heroicons/vue/20/solid";

import BoxGradient from "@/components/utils/box/BoxGradient.vue";

export default {
  name: "TabItem",
  components: {
    BoxGradient,
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
	  const tabStore = useTabStore()
	  const menuStore = useMenuStore()

	  const { tabList } = storeToRefs(tabStore)

    return {
	    tabList: tabList,

	    deleteTab: tabStore.deleteTab,
	    activateTab: tabStore.activateTab,
	    updateShow: menuStore.updateShow,
    };
  },
  methods: {
    removeTab() {
      this.deleteTab(this.tab.id);

			if (this.tabList.length === 0) {
				this.updateShow("favorites");
			}
    },
    activeToggleTab(event) {
			this.activateTab(this.tab.id)

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