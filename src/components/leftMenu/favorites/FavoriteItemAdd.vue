
<template>
	<div class="favoriteItemAddForm content width100 flex flexColumn"
	     ref="form">
		<form class="flex flexColumn flexBetween width100 height100"
		      ref="inputList"
		      @submit="getMode">
			<div>
				<BoxGradient>
					<label class="paddingIn">NAME :</label>
					<input class="input hover"
					       ref="favoriteName"
					       type="text"
					       :value="name">
				</BoxGradient>
				<BoxGradient>
					<label class="paddingIn">MODULE :</label>
					<select class="input width100 hover"
					        v-bind:value="moduleName"
					        v-model="moduleName">
						<option v-for="module in loadModules"
						        class="input"
						        :key="module.vuePath"
						        :value="module.vuePath">{{ module.name }}
						</option>
					</select>
				</BoxGradient>
				<BoxGradient>
					<label class="paddingIn">DARK :</label>
					<input class="input hover"
					       type="checkbox"
					       ref="darkCheckbox"
								 v-bind:checked="dark">
				</BoxGradient>
				<BoxGradient v-for="(input, index) in modules"
				             :key="index">
					<label class="paddingIn">{{ input.label.toUpperCase() }} :</label>
					<input class="input hover"
					       :class="input.label"
					       :type="input.type"
					       :value="input.value">
				</BoxGradient>
			</div>
			<BoxGradient>
				<div class="flex add-close-button">
					<button class="input width100 hover"
					        type="submit">{{ addButtonText }}</button>
					<button class="input width100 hover"
					        @click="closeFavoriteAddForm">Close</button>
				</div>
			</BoxGradient>
		</form>
	</div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useFavoriteStore } from '@/stores/favorites.js'
import { useModuleStore } from '@/stores/modules.js'

import BoxGradient from "@/components/utils/box/BoxGradient.vue";

export default {
	name: "FavoriteItemAdd",

	components: {
		BoxGradient
	},

	setup() {
		const favoriteStore = useFavoriteStore();
		const { favoritesFolderList } = storeToRefs(favoriteStore)

		const moduleStore = useModuleStore();
		const { moduleConfList, loadModules } = storeToRefs(moduleStore)

		return {
			moduleConfList: moduleConfList,
			loadModules: loadModules,

			favoritesFolderList: favoritesFolderList,

			editeFavorite: favoriteStore.editeFavorite,
			addFavorite: favoriteStore.addFavorite,
		};
	},

	data() {
		let moduleName = "IframeElement";
		let modules = this.moduleConfList[moduleName];
		let name = "";
		let addButtonText = "Add";
		let dark = false;

		if (typeof(this.favorite) != "undefined") {
			name = this.favorite.name;
			addButtonText = "Update";
			moduleName = this.favorite.data.module;
			modules = this.favorite.moduleSave;

			if (this.favorite.dark === "filter-dark") {
				dark = true;
			}
		}
		return {
			moduleName,
			modules,
			name,
			addButtonText,
			dark,
		}
	},

	methods: {
		makeFavorite() {
			let newFavorite = {
				name: this.$refs["favoriteName"].value,
				dark: "",
				darkClicked: "",
				id: Date.now().toString(),
				data: {
					module: this.moduleName,
				},
				moduleSave: JSON.parse(JSON.stringify(this.modules)),
			}

			if (this.$refs["darkCheckbox"].checked) {
				newFavorite.dark = "filter-dark"
				newFavorite.darkClicked = "clicked"
			}

			if (typeof(this.favorite) !== "undefined") {
				newFavorite.id = this.favorite.id;
			}

			for (const index in newFavorite.moduleSave) {
				let input = newFavorite.moduleSave[index];
				let valueTmp = this.$refs["inputList"].getElementsByClassName(
						input.label)[0].value;

				newFavorite.data[input.label] = valueTmp;
				newFavorite.moduleSave[input.label].value = valueTmp;
			}

			return newFavorite;
		},

		addFavorites() {
			let newFavorite = this.makeFavorite();
			this.addFavorite(newFavorite, this.favoritesFolder.id);

			this.$refs["form"].classList.add("hidden");
		},

		editeFavoriteButton() {
			this.editeFavorite(this.makeFavorite());

			this.$refs["form"].classList.add("hidden");
		},

		getMode(event) {
			event.preventDefault();

			if (typeof(this.favorite) != "undefined") {
				this.moduleName = this.favorite.data.module;
				this.modules = this.favorite.moduleSave;

				this.editeFavoriteButton();
			}
			else {
				this.addFavorites();
			}
		},

		closeFavoriteAddForm(event) {
			event.preventDefault();
			this.$refs["form"].classList.add("hidden");
		}
	},

	props: {
		favoritesFolder: {
			type: Object,
			required: true
		},
		favorite: {
			type: Object,
			required: false
		}
	},

	watch: {
		moduleName() {
			this.modules = this.moduleConfList[this.moduleName];
		}
	}
}
</script>

<style scoped lang="scss">
@import "@/style.scss";

.add-close-button {
	gap: $lenMin;
}
.favoriteItemAddForm {
	background-color: $colorGray !important;
	overflow: scroll;

	form * {
	}
}
</style>