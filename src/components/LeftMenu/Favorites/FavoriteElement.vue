<template>
	<li class="flex flex-column width-100">
		<div class="flex width-100 hover padding-left flex-center flex-between">
			<div @click="addTab" class="width-100 flex">
				<DocumentIcon class=""/>
				<span>{{ favorite.name }}</span>
			</div>
			<div class="flex flex-center flex-between">
				<PencilSquareIcon @click="toggleEdit"/>
				<XMarkIcon @click="removeFavorite" />
			</div>
		</div>

		<FavoriteAdd ref="editFavorite" class="hidden" :favorites-folder="favoriteFolder" :favorite="favorite"/>
	</li>
</template>

<script>
import { useFavoriteStore } from '@/stores/favorites.js'
import { useTabStore } from '@/stores/tab.js'


import {DocumentIcon} from "@heroicons/vue/20/solid";
import { PencilSquareIcon } from "@heroicons/vue/20/solid";
import { XMarkIcon } from "@heroicons/vue/20/solid";
import FavoriteAdd from "@/components/LeftMenu/Favorites/FavoriteAdd.vue";

export default {
	name: "FavoriteElement",
	components: {
		FavoriteAdd,
		DocumentIcon,
		PencilSquareIcon,
		XMarkIcon,
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
		const favoriteStore = useFavoriteStore();
		const tabStore = useTabStore();

		return {
			favoritesFolderList: favoriteStore.favoritesFolderList,
			deleteFavorite: favoriteStore.deleteFavorite,

			tabList: tabStore.tabList,
			splitTab: tabStore.splitTab,
			deleteTab: tabStore.deleteTab,
			activateTab: tabStore.activateTab
		};
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
		removeFavorite() {
			this.deleteFavorite(this.favorite.id);
		},
		addTab() {
			let id = Date.now().toString();
			let newTab = {
				name: this.favorite.name,
				data: this.favorite.data,
				active: "",
				id: id
			};

			this.tabList.push(newTab);
		},
		toggleEdit() {
			this.$refs.editFavorite.$el.classList.toggle('hidden');
			this.$refs.editFavorite.$refs.favoriteName.focus();
		}
	}
}
</script>
