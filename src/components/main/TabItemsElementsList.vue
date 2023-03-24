<template>
	<main class="width100">
		<ul id="element-list" class="width100 height100 flex flexWarp listNone">
			<li :id="tab.id" v-for="tab in tabList" :key="tab.id" :class="[tab.active, `splitBy${splitTab}`]"
			    class="autoSize show">
				<div class="element">
					<component :id="tab.id + 'element'" v-bind:is="tab.data.module" :data="tab.data"/>
				</div>

				<PopBoxGradient>
					<div :id="tab.id + 'close'" class="flex">
						<XMarkIcon @click="removeTab(tab.id)" />
					</div>
					<div :id="tab.id + 'full'" class="flex">
						<ArrowsPointingOutIcon @click="toggleMax(tab.id)" />
					</div>
					<div :id="tab.id + 'pin'" class="flex">
						<BookmarkIcon class="clicked" @click="activateTab(tab.id)" />
					</div>
					<div :id="tab.id + 'dark'" class="flex">
						<MoonIcon @click="toggleDark(tab.id)" />
					</div>
				</PopBoxGradient>
			</li>
		</ul>
	</main>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useTabStore } from '@/stores/tab.js'

import { MoonIcon, XMarkIcon, ArrowsPointingOutIcon, BookmarkIcon } from "@heroicons/vue/20/solid";

import PopBoxGradient from "@/components/utils/box/PopBoxGradient.vue";
import TabItem from "@/components/leftMenu/tabs/TabItem.vue";

export default {
	name: "TabItemsElementsList",
	components: {
		PopBoxGradient,
		MoonIcon,
		XMarkIcon,
		ArrowsPointingOutIcon,
		BookmarkIcon
	},
	setup() {
		const tabStore = useTabStore()
		const { splitTab, tabList } = storeToRefs(tabStore)

		return {
			tabList: tabList,
			splitTab: splitTab,

			deleteTab: tabStore.deleteTab,
			activateTab: tabStore.activateTab,
		};
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
			this.deleteTab(id);
		},
		toggleMax(id) {
			let elementLi = document.getElementById(id);
			let svg = document.getElementById(id + "full").querySelector("svg");
			svg.classList.toggle("clicked");
			elementLi.classList.toggle("max");
		},
	}
}
</script>

<style scoped lang="scss">
@import "@/style.scss";

main {
	overflow: scroll;
	height: calc(100vh - $lenLight * 3);
	flex: 1;

	padding: $lenMin;

	#element-list li {
		margin: calc($lenLight / 2);

		border-radius: $lenMediumMax;
		background: $colorBlack;

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
			background: $colorGradient
		}

		svg {
			cursor: pointer;
			padding: 0;
		}

		.element {
			width: calc(100% - $lenLight * 2);
			height: calc(100% - $lenLight * 2);
			margin: $lenLight;

			border-radius: $lenMediumMax;
			background-color: $colorBlackGray;

			filter: none;
			transition: filter 300ms ease-in-out;

			*:not(.filter-dark) {
				filter: none;
				transition: filter $timeMediumMin ease-in-out;
			}

			.filter-dark {
				filter: hue-rotate(180deg) invert(1) saturate(1.2);
				transition: filter $timeMediumMin ease-in-out;
			}
		}
	}
}
</style>
