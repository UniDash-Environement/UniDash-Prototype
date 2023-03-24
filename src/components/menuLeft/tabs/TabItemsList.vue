<template>
  <draggable v-model="this.tabList"
             group="tabs"
             item-key="id"
             class="tab-list list-none width-100 height-100 flex flex-column">
	  <template #item="{element}">
      <div class="width-100" ><TabItem :tab="element" /></div>
	  </template>
  </draggable>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useTabStore } from '@/stores/tab.js'

import draggable from 'vuedraggable'

import TabItem from "@/components/menuLeft/tabs/TabItem.vue";

export default {
  name: "TabItemsList",
  components: {
    TabItem,
    draggable
  },
	setup() {
		const tabStore = useTabStore()
		const { tabList } = storeToRefs(tabStore)

		return {
			tabList: tabList,
			updateTabList: tabStore.updateTabList,
		}
	},
	computed: {
		tabList: {
			get() {
				return this.tabList
			},
			set(value) {
				this.updateTabList(value)
			}
		}
	}
}
</script>

<style scoped lang="scss">
@import "@/style";

.tab-list {
  overflow: scroll;
}
</style>