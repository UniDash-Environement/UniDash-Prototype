
<template>
	<div ref="form" class="add-favorite-form content width-100 flex flex-column">
		<form @submit="getMode"
		      class="flex flex-column flex-between width-100 height-100 list-none" ref="input-list">
			<div>
				<Box>
					<label>NAME :</label>
					<input class="input hover" ref="favoriteName" type="text" :value="name">
				</Box>
				<Box>
					<label>MODULE :</label>
					<select v-bind:value="moduleName" v-model="moduleName" class="input width-100">
						<option class="input" v-for="module in loadModules" :value="module.vuePath"
						        :key="module.vuePath">{{ module.name }}
						</option>
					</select>
				</Box>
				<Box v-for="(input, index) in modules" :key="index" v-show="!input.hidden">
					<label>{{ input.label.toUpperCase() }} :</label>
					<input class="input hover" :class="input.label" :type="input.type"
					       :value="input.value">
				</Box>
			</div>
			<Box>
				<div class="flex add-close-button">
					<button class="input width-100 hover" type="submit">{{ addButtonText }}</button>
					<button class="input width-100 hover" @click="addFavoritesClose">Close</button>
				</div>
			</Box>
		</form>
	</div>
</template>

<script>
import { useFavoriteStore } from '@/stores/favorites.js'
import { useModuleStore } from '@/stores/modules.js'

import Box from "@/components/Custom/Box.vue";

export default {
	name: "FavoriteAdd",
	components: {
		Box
	},
	data() {
		let moduleName = "IframeElement";
		let modules = this.moduleConfList[moduleName];
		let name = "";
		let addButtonText = "Add";

		if (typeof(this.favorite) != "undefined") {
			name = this.favorite.name;
			addButtonText = "Update";
		}
		return {
			moduleName,
			modules,
			name,
			addButtonText
		}
	},
	setup() {
		const favoriteStore = useFavoriteStore();
		const moduleStore = useModuleStore();

		return {
			favoritesFolderList: favoriteStore.favoritesFolderList,
			findFavoriteFolder: favoriteStore.findFavoriteFolder,
			editeFavoriteFolder: favoriteStore.editeFavoriteFolder,
			findFavorite: favoriteStore.findFavorite,
			editeFavorite: favoriteStore.editeFavorite,

			moduleConfList: moduleStore.moduleConfList,
			loadModules: moduleStore.loadModules
		};
	},
	methods: {
		getParent(name) {
			let p = this.$parent;
			while (typeof p !== 'undefined') {
				if (p.$options.name == name) {
					return p;
				} else {
					p = p.$parent;
				}
			}
			return false;
		},
		getModule() {
			return this.moduleConfList[this.moduleName];
		},
		makeFavorite() {
			let newFavorite = {
				name: this.$refs["favoriteName"].value,
				id: Date.now().toString(),
				data: {
					module: this.moduleName,
				},
				moduleSave: JSON.parse(JSON.stringify(this.modules)),
			}

			if (typeof(this.favorite) !== "undefined") {
				newFavorite.id = this.favorite.id;
			}

			for (const index in newFavorite.moduleSave) {
				let input = newFavorite.moduleSave[index];
				let valueTmp = this.$refs["input-list"].getElementsByClassName(
						input.label)[0].value;

				newFavorite.data[input.label] = valueTmp;
				newFavorite.moduleSave[input.label].value = valueTmp;
			}

			return newFavorite;
		},
		addFavorites() {
			let newFavorite = this.makeFavorite();

			this.favoritesFolderList.forEach(favoritesFolder => {
				if (favoritesFolder.id === this.favoritesFolder.id) {
					favoritesFolder.list.push(newFavorite);
				}
			});

			this.$refs["form"].classList.add("hidden");
		},
		editeFavoriteButton() {
			this.editeFavorite(this.makeFavorite(), this.favoritesFolder.id);

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
		addFavoritesClose(event) {
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
			this.modules = this.getModule();
		}
	}
}
</script>

<style scoped lang="scss">
@import "@/style.scss";

.add-close-button {
	gap: $light-len;
}
.add-favorite-form {
	background-color: $gray-color !important;
	overflow: scroll;

	form * {
	}
}
</style>