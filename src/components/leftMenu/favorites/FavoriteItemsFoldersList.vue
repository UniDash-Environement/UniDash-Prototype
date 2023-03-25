<template>
	<ul class="flex listNone flexColumn width100 height100">
		<li v-for="favoriteFolder in favoritesFolderList">
			<FavoriteItemsFolder :favorites-folder="favoriteFolder"/>
		</li>
		<li>
			<BoxGradient>
				<div ref="addFolder"
				     class="hover flex flexCenter"
				     @click="addFolderShowUpdater">
					<div class="hoverClickable flex flex1">
						<FolderPlusIcon class="folderIcon"/>
						<label>
							Add Folder
						</label>
					</div>
					<input type="text"
					       @keydown.enter="this.addFolder"
					       name="addFolder"
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
import FavoriteItem from "@/components/leftMenu/favorites/FavoriteItem.vue";
import FavoriteItemsFolder from "@/components/leftMenu/favorites/FavoriteItemsFolder.vue";

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
			let input = this.$refs["addFolder"].querySelector("input");
			let svg = this.$refs["addFolder"].querySelector("svg");

			input.classList.add("hidden");
			svg.classList.remove("hidden");
			input.value = "";
			input.removeEventListener("focusout", this.disableFocusOut);
		},

		addFolderShowUpdater() {
			let input = this.$refs["addFolder"].querySelector("input");
			let svg = this.$refs["addFolder"].querySelector("svg");
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

input.input[type="text"][name="addFolder"] {
	width: calc(100% - 2 * $lenMediumMin);
}
</style>