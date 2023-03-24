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
import { storeToRefs } from 'pinia'
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
		const { favoritesFolderList } = storeToRefs(favoriteStore)

		const tabStore = useTabStore();
		const { tabList, splitTab } = storeToRefs(tabStore)

		return {
			favoritesFolderList: favoritesFolderList,

			tabList: tabList,
			splitTab: splitTab,

			deleteFavorite: favoriteStore.deleteFavorite,

			deleteTab: tabStore.deleteTab,
			activateTab: tabStore.activateTab,
			addTab: tabStore.addTab,
		};
	},
	methods: {
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

			this.addTab(newTab);
		},
		toggleEdit() {
			this.$refs.editFavorite.$el.classList.toggle('hidden');
			this.$refs.editFavorite.$refs.favoriteName.focus();
		}
	}
}
</script>
