<template>
	<div class="mask-bg flex flex-center">
		<div class="add-favorite-form gradient-border flex">
			<div class="content width-100 flex flex-column">
				<form @submit="addFavorites"
				      class="flex flex-column flex-between width-100 height-100 list-none" ref="input-list">
					<div>
						<Box>
							<label>NAME :</label>
							<input class="input hover" ref="favoriteName" type="text">
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
							<button class="input width-100 hover" @click="addFavoritesClose">Close</button>
							<button class="input width-100 hover" type="submit">Add</button>
						</div>
					</Box>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import {computed} from "vue";
import {useStore} from "vuex";

import Box from "@/components/Custom/Box.vue";

export default {
	name: "AddElement",
	components: {
		Box
	},
	data() {
		let moduleName = "IframeElement";
		let modules = this.moduleConfList[moduleName];
		return {
			moduleName,
			modules
		}
	},
	setup() {
		const store = useStore();
		const favoritesFolderList = computed(() => store.state.favoritesFolderList);
		const moduleConfList = computed(() => store.state.moduleConfList);
		const loadModules = computed(() => store.state.loadModules);

		function updateFavoritesFolderList(newList) {
			store.commit('updateFavoritesFolderList', newList);
		}

		return {
			updateFavoritesFolderList,
			favoritesFolderList,
			loadModules,
			moduleConfList
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
		addFavorites(event) {
			event.preventDefault();

			let favoritesFolderList = this.favoritesFolderList;
			let favoritesFolder = favoritesFolderList.find(
					favoritesFolder => favoritesFolder.id === this.favoritesFolder.id)
			let parent = this.getParent("FavoritesFolder");

			let newFavorite = {
				name: parent.$refs["add-favorite-form"].$refs["favoriteName"].value,
				data: {
					module: this.moduleName,
				}
			}

			for (const index in this.modules) {
				const input = this.modules[index];
				newFavorite.data[input.label] = this.$refs["input-list"].getElementsByClassName(
						input.label)[0].value;
			}

			favoritesFolder.list.push(newFavorite);
			favoritesFolderList.find(
					favoritesFolder => favoritesFolder.id === this.favoritesFolder.id
			).list = favoritesFolder.list

			this.updateFavoritesFolderList(favoritesFolderList);

			let favoriteForm = this.getParent("FavoritesFolder").$refs["add-favorite-form"].$el;
			favoriteForm.classList.add("hidden");
		},
		addFavoritesClose() {
			this.getParent(
					"FavoritesFolder").$refs["add-favorite-form"].$el.classList.add("hidden");
		}
	},
	props: {
		favoritesFolder: {
			type: Object,
			required: true
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

.mask-bg {
	position: absolute;
	width: 100vw;
	height: 100vh;

	top: 0;
	left: 0;

	background-color: rgba(0, 0, 0, 0.5);
	backdrop-filter: blur(1rem);

	z-index: 99998;

	.add-favorite-form {
		width: 50vw;
		height: 75vh;

		z-index: 99999;

		.content {
			padding: $default-len;
			background-color: $gray-color;
			overflow: scroll;

			form * {
			}
		}
	}
}
</style>