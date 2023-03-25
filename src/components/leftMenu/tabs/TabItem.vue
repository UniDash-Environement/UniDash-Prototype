<template>
  <BoxGradient>
	  <div class="scroll">
		  <a :href="'#' + tab.id"
		     class="hover width100 flex flexCenter flexBetween">
			  <span class="hoverClickable flex1">
				  {{ tab.name }}
			  </span>
			  <div class="tab-icons">
				  <div :id="tab.id + 'tab'"
				       class="flex">
					  <BookmarkIcon :class="tab.clicked"
					                class="hoverClickable"
					                @click="activateTab(tab.id)" />
					  <XMarkIcon @click="removeTab"
					             class="hoverClickable" />
				  </div>
			  </div>
		  </a>
	  </div>
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
  }
}
</script>

<style scoped lang="scss">
@import "@/style.scss";

a {
	margin: 0;
	padding: 0;
}

.scroll {
	overflow-y: scroll;
	overflow-x: hidden;
}

.tab-icons {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>