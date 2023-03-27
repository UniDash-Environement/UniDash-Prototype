<template>
	<main class="width100">
		<ul class="width100 height100 flex flexWarp listNone"
				id="element-list">
			<li	v-for="tab in tabList"
		      class="autoSize show"
          :class="[tab.active, `splitBy${splitTab}`]"
		      :id="tab.id"
			    :key="tab.id">
				<div class="element">
					<component :class="tab.dark"
							       :id="tab.id + 'element'"
					           v-bind:is="tab.data.module"
					           :data="tab.data"/>
				</div>

				<PopBoxGradient>
					<div class="flex flexColumn flexCenter hover">
						<div :id="tab.id + 'close'"
						     class="flex hoverClickable"
						     @click="deleteTab(tab.id)">
							<XMarkIcon />
						</div>
						<div :id="tab.id + 'full'"
						     class="flex hoverClickable"
						     @click="toggleMax(tab.id)">
							<ArrowsPointingOutIcon />
						</div>
						<div :id="tab.id + 'pin'"
						     class="flex hoverClickable"
						     @click="activateTab(tab.id)">
							<BookmarkIcon :class="tab.clicked" />
						</div>
						<div :id="tab.id + 'dark'"
						     class="flex hoverClickable"
						     @click="toggleDark(tab.id)">
							<MoonIcon :class="tab.darkClicked" />
						</div>
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
			toggleDark: tabStore.toggleDark,
		};
	},

	mounted() {
		if (this.tabList.length > 0) {
			this.sleep(1000).then(() => {
				this.$forceUpdate();
			});
		}
	},

	methods: {
		sleep(ms) {
			return new Promise(resolve => setTimeout(resolve, ms));
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
	height: calc(100vh - $lenLight * 3.5);
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
		}
	}
}
</style>
