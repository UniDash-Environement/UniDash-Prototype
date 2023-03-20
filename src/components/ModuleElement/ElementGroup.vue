<template>
	<main class="width-100">
		<ul id="element-list" class="width-100 height-100 flex flex-warp list-none">
			<li :id="tab.id" v-for="(tab, index) in tabList" :key="tab.id" :class="[tab.active, `split-by-${splitTab}`]"
			    class="auto-size show">
				<div class="element">
					<component :id="tab.id + 'element'" v-bind:is="tab.data.module" :data="tab.data"/>
				</div>

				<PopBox>
					<div :id="tab.id + 'close'" class="flex">
						<XMarkIcon @click="removeTab(tab.id)" />
					</div>
					<div :id="tab.id + 'full'" class="flex">
						<ArrowsPointingOutIcon @click="toggleMax(tab.id)" />
					</div>
					<div :id="tab.id + 'pin'" class="flex">
						<BookmarkIcon class="clicked" @click="activeToggleTab(tab.id)" />
					</div>
					<div :id="tab.id + 'dark'" class="flex">
						<MoonIcon @click="toggleDark(tab.id)" />
					</div>
				</PopBox>
			</li>
		</ul>
	</main>
</template>

<script>
import {computed} from "vue";
import {useStore} from "vuex";

import { MoonIcon, XMarkIcon, ArrowsPointingOutIcon, BookmarkIcon } from "@heroicons/vue/20/solid";

import PopBox from "@/components/Custom/PopBox.vue";

export default {
	name: "ElementGroup",
	components: {
		PopBox,
		MoonIcon,
		XMarkIcon,
		ArrowsPointingOutIcon,
		BookmarkIcon
	},
	setup() {
		const store = useStore();
		const splitTab = computed(() => store.state.splitTab);
		const tabList = computed(() => store.state.tabList);

		function updateTabList(newList) {
			store.commit('updateTabList', newList);
		}

		return {tabList, updateTabList, splitTab};
	},
	methods: {
		toggleDark(id) {
			let element = document.getElementById(id + "element");
			element.classList.toggle("filter-dark");
			let svg = document.getElementById(id + "dark").querySelector("svg");
			console.log(svg);
			svg.classList.toggle("clicked");
		},
		removeTab(id) {
			let tabList = this.$store.state.tabList;

			for (let tabElement of tabList) {
				if (tabElement.id === id) {
					tabList.splice(tabList.indexOf(tabElement), 1);
				}
			}

			this.updateTabList(tabList);
		},
		toggleMax(id) {
			let elementLi = document.getElementById(id);
			let svg = document.getElementById(id + "full").querySelector("svg");
			svg.classList.toggle("clicked");
			elementLi.classList.toggle("max");
		},

		activeToggleTab(id) {
			let tabList = this.$store.state.tabList;
			for (let tabElement of tabList) {
				if (tabElement.id === id) {
					if (tabElement.active === "") {
						tabElement.active = "hidden";
					} else {
						tabElement.active = "";
					}
				}
			}

			this.updateTabList(tabList);
			document.getElementById(id + "tab").querySelector("svg").classList.toggle("clicked");
			let svg = document.getElementById(id + "pin").querySelector("svg");
			svg.classList.toggle("clicked");
		},
	}
}
</script>

<style scoped lang="scss">
@import "@/style.scss";

main {
	overflow: scroll;
	height: calc(100vh - $super-light-len * 3);
	flex: 1;

	padding: $light-len;

	#element-list li {
		margin: calc($super-light-len / 2);

		border-radius: $default-len;
		background: $black-color;

		position: relative;

		&.max {
			position: fixed;
			min-width: 100%;
			min-height: 100%;
			margin: 0;

			top: 0;
			left: 0;

			z-index: 9999;

			border-radius: 0;
			.element {
				margin: 0;
				border-radius: 0;
				height: 100vh;
				width: 100%;

				* {
					border-radius: 0;
				}
			}
		}

		&:hover {
			background: $gradient-color
		}

		svg {
			cursor: pointer;
			padding: 0;
		}

		.element {
			width: calc(100% - $super-light-len * 2);
			height: calc(100% - $super-light-len * 2);
			margin: $super-light-len;

			border-radius: $default-len;
			background-color: $black-gray-color;

			filter: none;
			transition: filter 300ms ease-in-out;

			*:not(.filter-dark) {
				filter: none;
				transition: filter $medium-time ease-in-out;
			}

			.filter-dark {
				filter: hue-rotate(180deg) invert(1) saturate(1.2);
				transition: filter $medium-time ease-in-out;
			}
		}
	}
}
</style>
