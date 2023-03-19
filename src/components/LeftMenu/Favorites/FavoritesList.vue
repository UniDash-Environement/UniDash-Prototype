<template>
	<ul class="flex list-none flex-column width-100 height-100">
		<li v-for="favoriteFolder in favoritesFolderList">
			<FavoritesFolder :favorites-folder="favoriteFolder"/>
		</li>
		<li>
			<Box>
				<div ref="add-folder" class="hover flex flex-column flex-center"
				     @click="addFolderShowUpdater">
					<FolderPlusIcon class="folder-icon show"/>
					<input type="text" @keydown.enter="this.addFolder" name="add-folder"
					       class="input hover show hidden">
				</div>
			</Box>
		</li>
	</ul>
</template>

<script>
import {computed} from "vue";
import {useStore} from "vuex";

import {FolderPlusIcon} from "@heroicons/vue/24/solid";

import Box from "@/components/Custom/Box.vue";
import FavoriteElement from "@/components/LeftMenu/Favorites/FavoriteElement.vue";
import FavoritesFolder from "@/components/LeftMenu/Favorites/FavoritesFolder.vue";

export default {
	name: "FavoritesList",
	computed: {},
	data() {
		return {
			addFolderShow: false
		}
	},
	components: {
		Box,
		FavoritesFolder,
		FavoriteElement,
		FolderPlusIcon,
	},
	setup() {
		const store = useStore();

		const favoritesFolderList = computed(() => store.state.favoritesFolderList);

		function updateFavoritesFolderList(newList) {
			store.commit('updateFavoritesFolderList', newList);
		}

		return {
			updateFavoritesFolderList,
			favoritesFolderList
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
			let favoritesFolderList = this.favoritesFolderList;

			if (input.value !== "") {
				let newFolder = {
					"id": Date.now().toString(),
					"name": input.value,
					"list": []
				}

				favoritesFolderList.push(newFolder);
				this.updateFavoritesFolderList(favoritesFolderList);

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