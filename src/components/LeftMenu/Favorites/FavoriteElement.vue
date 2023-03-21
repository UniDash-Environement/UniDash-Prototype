<template>
	<li class="flex flex-column width-100">
		<div class="flex width-100 hover padding-left flex-center flex-between">
			<div @click="addTab" class="width-100 flex">
				<DocumentIcon class=""/>
				<span>{{ favorite.name }}</span>
			</div>
			<div class="flex flex-center flex-between">
				<PencilSquareIcon @click="toggleEdit"/>
			</div>
		</div>

		<FavoriteAdd ref="editFavorite" class="hidden" :favorites-folder="favoriteFolder" :favorite="favorite"/>
	</li>
</template>

<script>
import {computed} from "vue";
import {useStore} from "vuex";

import {DocumentIcon} from "@heroicons/vue/20/solid";
import { PencilSquareIcon } from "@heroicons/vue/20/solid";
import FavoriteAdd from "@/components/LeftMenu/Favorites/FavoriteAdd.vue";

export default {
	name: "FavoriteElement",
	components: {
		FavoriteAdd,
		DocumentIcon,
		PencilSquareIcon
	},
	props: {
		favorite: {
			type: Object,
			required: true
		},
		favoriteFolder: {
			type: Object,
			required: true
		},
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
				name: this.favorite.name,
				data: this.favorite.data,
				active: "",
				id: id
			};

			tabList.push(newTab);
			this.updateTabList(tabList);

			this.sleep(100).then(() => {
				let menu = this.getParent('Menu');
				menu.setSplitBy(this.splitTab);
			});
		},
		toggleEdit() {
			this.$refs.editFavorite.$el.classList.toggle('hidden');
		}
	}
}
</script>
