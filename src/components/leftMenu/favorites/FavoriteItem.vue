<template>
	<li class="flex flexColumn width100">
		<div class="flex width100 hover flexCenter flexBetween">
			<div class="width100 flex hoverClickable"
			     @click="addTab">
				<DocumentIcon class="paddingLeft"/>
				<span>
					{{ favorite.name }}
				</span>
			</div>
			<div class="flex flexCenter flexBetween">
				<PencilSquareIcon class="hoverClickable"
				                  @click="toggleEdit"/>
				<XMarkIcon class="hoverClickable"
				           @click="removeFavorite" />
			</div>
		</div>

		<FavoriteItemAdd class="hidden"
		                 ref="editFavorite"
		                 :favorites-folder="favoriteFolder"
		                 :favorite="favorite"/>
	</li>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useFavoriteStore } from '@/stores/favorites.js'
import { useTabStore } from '@/stores/tab.js'


import {DocumentIcon} from "@heroicons/vue/20/solid";
import { PencilSquareIcon } from "@heroicons/vue/20/solid";
import { XMarkIcon } from "@heroicons/vue/20/solid";
import FavoriteItemAdd from "@/components/leftMenu/favorites/FavoriteItemAdd.vue";

export default {
	name: "FavoriteItem",

	components: {
		FavoriteItemAdd,
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
				dark: this.favorite.dark,
				active: "",
				clicked: "clicked",
				darkClicked: this.favorite.darkClicked,
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
