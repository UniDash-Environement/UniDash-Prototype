<template>
	<ul class="favoriteItemsList flex listNone flexColumn width100 height100">
		<li v-for="favoriteFolder in favoritesFolderList">
			<FavoriteItemsFolder :favorites-folder="favoriteFolder"/>
		</li>
		<li>
			<BoxGradient>
				<div class="hover flex flexCenter"
				     ref="addFolder"
				     @click="addFolderShowUpdater">
					<div ref="newFolderLabel" class="hoverClickable flex flex1">
						<FolderPlusIcon class="folderIcon"/>
						<label>
							Add Folder
						</label>
					</div>
					<input class="input hover show hidden"
					       type="text"
					       name="addFolder"
					       @keydown.enter="this.addFolder">
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
			let svg = this.$refs["newFolderLabel"];

			input.classList.add("hidden");
			svg.classList.remove("hidden");
			input.value = "";
			input.removeEventListener("focusout", this.disableFocusOut);
		},

		addFolderShowUpdater() {
			let input = this.$refs["addFolder"].querySelector("input");
			let svg = this.$refs["newFolderLabel"];
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

.favoriteItemsList {
	overflow-y: scroll;
	overflow-x: hidden;
}
</style>