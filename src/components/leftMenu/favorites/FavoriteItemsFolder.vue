<template>
	<BoxGradient>
		<div class="hover flex">
			<div class="flex folderName" @click="showFolder">
				<FolderIcon class="hiddenOnRename"/>
				<span ref="folderName" class="hiddenOnRename folderName">{{ favoritesFolder.name }}</span>
				<input ref="renameFolderInput" type="text" name="addFolder"
				       class="input hover show hidden" @keypress.enter="renameFolderEnd">
			</div>
			<div class="hiddenOnRename flex flexCenter flexBetween">
				<PencilSquareIcon @click="renameFolder"/>
				<XMarkIcon @click="deleteFavoriteFolder" />
			</div>
		</div>
		<ul ref="favoritesFolder" class="show hidden flex flexColumn listNone">
			<FavoriteItem v-for="favorite in favoritesFolder.list" :favoriteFolder="favoritesFolder"
			                 :favorite="favorite"/>
			<li>
				<div ref="addFavorite" class="flex width100 hover" @click="this.addFavorite">
					<DocumentPlusIcon class="favorite-icon show"/>
				</div>
			</li>
		</ul>
		<FavoriteItemAdd ref="addFavoriteForm" :favoritesFolder="favoritesFolder" class="hidden"/>
	</BoxGradient>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useFavoriteStore } from '@/stores/favorites.js'

import {DocumentPlusIcon, FolderIcon} from "@heroicons/vue/24/solid";
import { PencilSquareIcon } from "@heroicons/vue/20/solid";
import { XMarkIcon } from "@heroicons/vue/20/solid";

import BoxGradient from "@/components/utils/box/BoxGradient.vue";
import FavoriteItemAdd from "@/components/leftMenu/favorites/FavoriteItemAdd.vue";
import FavoriteItem from "@/components/leftMenu/favorites/FavoriteItem.vue";


export default {
	name: "FavoriteItemsFolder",
	components: {
		FavoriteItemAdd,
		BoxGradient,
		DocumentPlusIcon,
		FavoriteItem,
		FolderIcon,
		PencilSquareIcon,
		XMarkIcon,
	},
	setup() {
		const favoriteStore = useFavoriteStore();
		const { favoritesFolderList } = storeToRefs(favoriteStore)

		return {
			favoritesFolderList: favoritesFolderList,
			deleteFavoriteFolder: favoriteStore.deleteFavoriteFolder,
			editeFavoriteFolder: favoriteStore.editeFavoriteFolder,
		};
	},
	methods: {
		showFolder() {
			let folderItemList = this.$refs["favoritesFolder"];
			folderItemList.classList.toggle("hidden");
		},
		addFavorite() {
			let favoriteForm = this.$refs["addFavoriteForm"].$el;
			favoriteForm.classList.toggle("hidden");
			this.$refs["addFavoriteForm"].$refs.favoriteName.focus();
		},
		renameFolder() {
			let listHiddenOnRename = this.$el.querySelectorAll(".hiddenOnRename");
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
		deleteFavoriteFolder() {
			this.deleteFavoriteFolder(this.favoritesFolder.id);
		},
		renameFolderEnd() {
			let listHiddenOnRename = this.$el.querySelectorAll(".hiddenOnRename");
			let input = this.$refs["renameFolderInput"];

			let folderName = this.$refs["folderName"];
			folderName.innerText = input.value;

			input.classList.add("hidden");
			listHiddenOnRename.forEach((element) => {
				element.classList.remove("hidden");
			});

			this.editeFavoriteFolder(this.favoritesFolder.id, folderName.innerText);
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
	height: $lenMediumMax;
	padding-left: $lenMediumMax;
}

.folderName {
	flex: 1;
}

input.input[type="text"][name="addFavorite"] {
	width: calc(100% - 2 * $lenMediumMin);
}
</style>