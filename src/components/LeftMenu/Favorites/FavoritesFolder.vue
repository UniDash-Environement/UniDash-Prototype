<template>
	<Box>
		<div class="hover flex">
			<div class="flex folderName" @click="showFolder">
				<FolderIcon class="hidden-on-rename"/>
				<span ref="folderName" class="hidden-on-rename folderName">{{ favoritesFolder.name }}</span>
				<input ref="renameFolderInput" type="text" name="add-folder"
				       class="input hover show hidden" @keypress.enter="renameFolderEnd">
			</div>
			<div class="hidden-on-rename flex flex-center flex-between">
				<PencilSquareIcon @click="renameFolder"/>
			</div>
		</div>
		<ul ref="favorites-folder" class="show hidden flex flex-column list-none">
			<FavoriteElement v-for="favorite in favoritesFolder.list" :favoriteFolder="favoritesFolder"
			                 :favorite="favorite"/>
			<li>
				<div ref="add-favorite" class="flex width-100 hover" @click="this.addFavorite">
					<DocumentPlusIcon class="favorite-icon show"/>
				</div>
			</li>
		</ul>
		<FavoriteAdd ref="add-favorite-form" :favorites-folder="favoritesFolder" class="hidden"/>
	</Box>
</template>

<script>
import {computed} from "vue";
import {useStore} from "vuex";

import {DocumentPlusIcon, FolderIcon} from "@heroicons/vue/24/solid";
import { PencilSquareIcon } from "@heroicons/vue/20/solid";

import Box from "@/components/Custom/Box.vue";
import FavoriteAdd from "@/components/LeftMenu/Favorites/FavoriteAdd.vue";
import FavoriteElement from "@/components/LeftMenu/Favorites/FavoriteElement.vue";


export default {
	name: "FavoritesFolder",
	components: {
		FavoriteAdd,
		Box,
		DocumentPlusIcon,
		FavoriteElement,
		FolderIcon,
		PencilSquareIcon,
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
		sleep(ms) {
			return new Promise(resolve => setTimeout(resolve, ms));
		},
		showFolder(event) {
			let folderItemList = this.$refs["favorites-folder"];
			folderItemList.classList.toggle("hidden");
		},
		addFavorite() {
			let favoriteForm = this.$refs["add-favorite-form"].$el;
			favoriteForm.classList.toggle("hidden");
		},
		renameFolder() {
			let listHiddenOnRename = this.$el.querySelectorAll(".hidden-on-rename");
			let input = this.$refs["renameFolderInput"];

			input.classList.remove("hidden");
			listHiddenOnRename.forEach((element) => {
				element.classList.add("hidden");
			});

			input.addEventListener("focusout", () => {
				input.classList.add("hidden");
				listHiddenOnRename.forEach((element) => {
					element.classList.remove("hidden");
				});
			});

			input.focus();
		},
		renameFolderEnd() {
			let listHiddenOnRename = this.$el.querySelectorAll(".hidden-on-rename");
			let input = this.$refs["renameFolderInput"];

			let folderName = this.$refs["folderName"];
			folderName.innerText = input.value;
			input.value = "";

			input.classList.add("hidden");
			listHiddenOnRename.forEach((element) => {
				element.classList.remove("hidden");
			});
		}
	},
	props: {
		favoritesFolder: {
			type: Object,
			required: true
		}
	}
}
</script>

<style lang="scss" scoped>
@import "@/style.scss";

.favorite-icon {
	height: $default-len;
	padding-left: calc($default-len);
}

.folderName {
	flex: 1;
}

input.input[type="text"][name="add-favorite"] {
	width: calc(100% - 2 * $min-len);
}
</style>