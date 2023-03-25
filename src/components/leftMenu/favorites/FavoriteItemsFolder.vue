<template>
	<BoxGradient>
		<div class="hover flex">
			<div class="flex folderName hoverClickable"
			     @click="showFolder">
				<FolderIcon class="hiddenOnRename"/>
				<span class="hiddenOnRename folderName"
				      ref="folderName">
					{{ favoritesFolder.name }}
				</span>
				<input class="input hover show hidden"
				       ref="renameFolderInput"
				       type="text"
				       name="addFolder"
				       @keypress.enter="renameFolderEnd">
			</div>
			<div class="hiddenOnRename flex flexCenter flexBetween">
				<PencilSquareIcon class="hoverClickable"
				                  @click="renameFolder"/>
				<XMarkIcon class="hoverClickable"
				           @click="deleteFavoriteFolder" />
			</div>
		</div>
		<ul class="show hidden flex flexColumn listNone"
		    ref="favoritesFolder">
			<FavoriteItem v-for="favorite in favoritesFolder.list"
			              :favoriteFolder="favoritesFolder"
			              :favorite="favorite"/>
			<li class="hover">
				<div class="flex hoverClickable"
				     ref="addFavorite"
				     @click="this.addFavorite">
					<DocumentPlusIcon class="favorite-icon paddingLeft"/>
					<span>Add Favorite</span>
				</div>
			</li>
		</ul>
		<FavoriteItemAdd class="hidden"
		                 :favoritesFolder="favoritesFolder"
		                 ref="addFavoriteForm"/>
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

	props: {
		favoritesFolder: {
			type: Object,
			required: true
		}
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
}
</script>

<style lang="scss" scoped>
@import "@/style.scss";

.folderName {
	flex: 1;
}

input.input[type="text"][name="addFavorite"] {
	width: calc(100% - 2 * $lenMediumMin);
}
</style>