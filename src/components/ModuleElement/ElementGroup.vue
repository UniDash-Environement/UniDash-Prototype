<template>
	<main class="width-100">
		<ul id="element-list" class="width-100 height-100 flex flex-warp list-none">
			<li v-for="(tab, index) in tabList" :key="tab.id" :class="tab.active"
			    ref="elementLi" class="auto-size show">
				<div class="element">
					<component ref="element" v-bind:is="tab.data.module" :data="tab.data"/>
				</div>

				<PopBox>
					<div ref="closeIcon" class="flex">
						<XMarkIcon @click="removeTab(tab.id)" />
					</div>
					<div ref="fullIcon" class="flex">
						<ArrowsPointingOutIcon @click="toggleMax(index)" />
					</div>
					<div ref="pinIcon" class="flex">
						<BookmarkIcon @click="activeToggleTab(tab.id, index)" />
					</div>
					<div ref="darkIcon" class="flex">
						<MoonIcon @click="toggleDark(index)" />
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
		const tabList = computed(() => store.state.tabList);

		function updateTabList(newList) {
			store.commit('updateTabList', newList);
		}

		return {tabList, updateTabList};
	},
	methods: {
		toggleDark(index) {
			let element = this.$refs.element[index].$el;
			element.classList.toggle("filter-dark");
			let svg = this.$refs.darkIcon[index].querySelector("svg");
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
		toggleMax(index) {
			let elementLi = this.$refs.elementLi[index];
			let svg = this.$refs.fullIcon[index].querySelector("svg");
			svg.classList.toggle("clicked");
			elementLi.classList.toggle("max");
		},

		activeToggleTab(id, index) {
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
			document.getElementById(id).querySelector("svg").classList.toggle("clicked");
			let svg = this.$refs.fullIcon[index].querySelector("svg");
			svg.classList.toggle("clicked");
		},
	}
}
</script>

<style scoped lang="scss">
@import "@/style.scss";

main {
	overflow: scroll;
	height: calc(100vh - $super-light-len * 4);
	widows: calc(100vw - $super-light-len * 2);

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
