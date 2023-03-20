<template>
  <draggable v-model="this.tabList"
             group="tabs"
             item-key="id"
             class="tab-list list-none width-100 height-100 flex flex-column">
	  <template #item="{element}">
      <div class="width-100" ><Tab :tab="element" /></div>
	  </template>
  </draggable>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

import draggable from 'vuedraggable'

import Tab from "@/components/LeftMenu/Tabs/Tab.vue";

export default {
  name: "TabList",
  components: {
    Tab,
    draggable
  },
	computed: {
		tabList: {
			get() {
				return this.$store.state.tabList
			},
			set(value) {
				this.$store.commit('updateTabList', value)
				console.log(this.tabList)
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