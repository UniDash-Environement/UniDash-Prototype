<template>
	<li class="flex width-100 hover padding-left" @click="addTab">
		<DocumentIcon class=""/>
		<input type="checkbox" name="favorites-checkbox" class="" hidden="hidden">
		<span>{{ name }}</span>
	</li>
</template>

<script>
import {useStore} from "vuex";

import {DocumentIcon} from "@heroicons/vue/20/solid";
import {computed} from "vue";

export default {
	name: "FavoriteElement",
	components: {
		DocumentIcon
	},
	props: {
		data: {
			type: Object,
			required: true
		},
		name: {
			type: String,
			required: true
		}
	},
	setup() {
		const store = useStore();

		const splitTab = computed(() => store.state.splitTab);
		function updateTabList(newList) {
			store.commit('updateTabList', newList);
		}

		return {updateTabList, splitTab};
	},
	methods: {
		sleep(ms) {
			return new Promise(resolve => setTimeout(resolve, ms));
		},
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
		addTab() {
			let tabList = this.$store.state.tabList;
			let id = Date.now().toString();
			let newTab = {
				name: this.name,
				data: this.data,
				active: "",
				id: id
			};

			tabList.push(newTab);
			this.updateTabList(tabList);

			this.sleep(100).then(() => {
				let menu = this.getParent('Menu');
				menu.setSplitBy(this.splitTab);
			});
		}
	}
}
</script>
