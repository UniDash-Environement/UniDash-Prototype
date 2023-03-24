<template>
	<ul class="flex list-none flex-column width-100 height-100">
		<li v-for="favoriteFolder in favoritesFolderList">
			<FavoriteItemsFolder :favorites-folder="favoriteFolder"/>
		</li>
		<li>
			<BoxGradient>
				<div ref="add-folder" class="hover flex flex-column flex-center"
				     @click="addFolderShowUpdater">
					<FolderPlusIcon class="folder-icon show"/>
					<input type="text" @keydown.enter="this.addFolder" name="add-folder"
					       class="input hover show hidden">
				</div>
			</BoxGradient>
		</li>
	</ul>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useFavoriteStore } from '@/stores/favorites.js'

import {FolderPlusIcon} from "@heroicons/vue/24/solid";

import BoxGradient from "@/components/utils/box/BoxGradient.vue";
import FavoriteItem from "@/components/menuLeft/favorites/FavoriteItem.vue";
import FavoriteItemsFolder from "@/components/menuLeft/favorites/FavoriteItemsFolder.vue";

export default {
	name: "FavoriteItemsFoldersList",
	components: {
		BoxGradient,
		FavoriteItemsFolder,
		FavoriteItem,
		FolderPlusIcon,
	},
	setup() {
		const favoriteStore = useFavoriteStore();
		const { favoritesFolderList } = storeToRefs(favoriteStore)

		return {
			favoritesFolderList: favoritesFolderList,
			addFavoriteFolder: favoriteStore.addFavoriteFolder,
		};
	},
	methods: {
		disableFocusOut() {
			let input = this.$refs["add-folder"].querySelector("input");
			let svg = this.$refs["add-folder"].querySelector("svg");

			input.classList.add("hidden");
			svg.classList.remove("hidden");
			input.value = "";
			input.removeEventListener("focusout", this.disableFocusOut);
		},
		addFolderShowUpdater() {
			let input = this.$refs["add-folder"].querySelector("input");
			let svg = this.$refs["add-folder"].querySelector("svg");
			svg.classList.add("hidden");
			input.classList.remove("hidden");
			input.focus();

			if (!input.classList.contains("hidden")) {
				input.addEventListener("focusout", this.disableFocusOut);
			}
		},
		addFolder(event) {
			let input = event.target;

			if (input.value !== "") {
				let newFolder = {
					"id": Date.now().toString(),
					"name": input.value,
					"list": []
				}

				this.addFavoriteFolder(newFolder);
				this.disableFocusOut();
			}
		}
	}
}
</script>

<style scoped lang="scss">
@import "@/style.scss";

.folder-icon {
	height: $default-len;
}

input.input[type="text"][name="add-folder"] {
	width: calc(100% - 2 * $min-len);
}
</style>