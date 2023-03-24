<template>
	<input v-model="showMenu" ref="menu-hamburger-button" class="menu-hamburger" type="checkbox"
	       id="show-menu-button">
	<label class="icon-burger" for="show-menu-button" aria-label="Menu"><span></span></label>

	<nav class="left-menu-background-border flex flex-column gradient-border">
		<div ref="left-menu-background" class="left-menu-background flex flex-column flex-g height-100 width-100 content">
			<h1 ref="title" class="title">UniDash</h1>

			<div ref="menu-lists" id="menu-lists"
			     class="show-checkbox-list flex flex-column width-100 height-100 padding">
				<div class="width-100 height-100 show" :class="showTabs" ref="tab-content">
					<TabsList/>
				</div>

				<div class="width-100 height-100 show" :class="showFavorites" ref="favorites-content">
					<FavoritesList/>
				</div>

				<div class="width-100 height-100 show" :class="showSettings" ref="settings-content">
				</div>
			</div>

			<div ref="slider" class="padding">
				<BoxHover class="slider">
					<div ref="sliderContent" class="flex flex-between width-100">
						<div class="flex flex-center">
							<span ref="setSplitBy1Button" @click="setSplitBy(1)" class="clicked">1</span>
							<span ref="setSplitBy2Button" @click="setSplitBy(2)">2</span>
							<span ref="setSplitBy3Button" @click="setSplitBy(3)">3</span>
							<span ref="setSplitBy4Button" @click="setSplitBy(4)">4</span>
						</div>
						<div class="flex">
							<bookmark-icon ref="tab-icon" @click="updateShow('tabs')"
								:class="iconTabs"/>
							<StarIcon ref="favorites-icon" @click="updateShow('favorites')"
								:class="iconFavorites"/>
							<Cog6ToothIcon ref="settings-icon" @click="updateShow('settings')"
								:class="iconSettings"/>
						</div>
					</div>
				</BoxHover>
			</div>
		</div>
	</nav>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useTabStore } from '@/stores/tab.js'
import { useMenuStore } from '@/stores/menu.js'

import {
	ChevronLeftIcon,
	ChevronRightIcon,
	BookmarkIcon,
	Cog6ToothIcon,
	StarIcon
} from "@heroicons/vue/20/solid";

import BoxHover from "@/components/Custom/BoxHover.vue";
import FavoritesList from "@/components/LeftMenu/Favorites/FavoritesList.vue";
import Tab from "@/components/LeftMenu/Tabs/Tab.vue";
import TabsList from "@/components/LeftMenu/Tabs/TabsList.vue";

export default {
	name: "Menu",
	components: {
		ChevronLeftIcon,
		ChevronRightIcon,
		Cog6ToothIcon,
		StarIcon,
		BoxHover,
		FavoritesList,
		TabsList,
		Tab,
		BookmarkIcon,
	},
	setup() {
		const tabStore = useTabStore()
		const { splitTab } = storeToRefs(tabStore)

		const menuStore = useMenuStore()
		const {
			showMenu,

			showFavorites,
			showTabs,
			showSettings,

			iconFavorites,
			iconTabs,
			iconSettings,
		} = storeToRefs(menuStore)

		return {
			splitTab: splitTab,
			updateSplitTab: tabStore.updateSplitTab,

			showMenu: showMenu,

			showFavorites: showFavorites,
			showTabs: showTabs,
			showSettings: showSettings,

			iconFavorites: iconFavorites,
			iconTabs: iconTabs,
			iconSettings: iconSettings,

			updateShow: menuStore.updateShow,
			updateShowMenu: menuStore.updateShowMenu,
		};
	},
	methods: {
		setSplitBy(number) {
			this.$refs["setSplitBy1Button"].classList.remove("clicked");
			this.$refs["setSplitBy2Button"].classList.remove("clicked");
			this.$refs["setSplitBy3Button"].classList.remove("clicked");
			this.$refs["setSplitBy4Button"].classList.remove("clicked");

			let svg = this.$refs["setSplitBy" + number + "Button"]
			svg.classList.add("clicked");

			this.updateSplitTab(number)
		},
	},
	watch: {
		showMenu(value) {
			this.updateShowMenu(value)

			if (!value) {
				this.$refs["menu-lists"].classList.add("hidden");
				this.$refs["title"].classList.add("hidden");

				this.$refs["slider"].classList.add("vertical");

				this.$refs["left-menu-background"].classList.add("closed-menu");
			} else {
				this.$refs["menu-lists"].classList.remove("hidden");
				this.$refs["title"].classList.remove("hidden");

				this.$refs["slider"].classList.remove("vertical");

				this.$refs["left-menu-background"].classList.remove("closed-menu");
			}
		}
	}
}
</script>

<style scoped lang="scss">
@import "@/style.scss";

.chevron {
	width: $max-len;
}

.left-menu-background-border {
	height: 100vh;
	width: 73px !important;

	padding: 0;
	border-radius: 0;
	margin: 0;

	transition: width $default-time;

	span {
		padding: $min-len;
		margin: 0;
	}

	ul {
		list-style-type: none;
		padding: 0;

		li {
			margin-bottom: $default-len;
		}
	}

	.left-menu-background {
		background-color: $gray-color;
		border-radius: 0;
		width: calc(100% - $light-len);

		#menu-lists {
			overflow: scroll;
		}

		.slider {
			margin: 0;
			overflow: scroll;
		}

		&.closed-menu {
			align-items: end;
			justify-content: end;
		}
	}
}

.padding .gradient-border .content {
	width: 100%;
}

.menu-hamburger {
	& + label {
		width: $max-len;
		height: $max-len;
		z-index: 9999;

		display: flex;
		align-items: center;
		justify-content: center;

		position: fixed;
		top: $min-len;
		left: $min-len;

		cursor: pointer;
		background: $black-color;
		border-radius: $medium-min-len;

		span {
			width: 100%;
			height: $super-light-len;

			background: $uni-gradiant-color;
			position: relative;

			&::before {
				top: - calc($super-light-len * 1.5);
			}

			&::after {
				top: calc($super-light-len * 1.5);
			}

			&::before, &::after {
				width: inherit;
				height: inherit;

				position: absolute;
				background: $uni-gradiant-color;
				content: "";
			}
		}
	}

	&:checked + label {
		span {
			background: transparent;

			&::before, &::after {
				top: 0;
			}

			&::before {
				transform: rotate(45deg);
			}

			&::after {
				transform: rotate(-45deg);
			}
		}

		& ~ {
			.left-menu-background-border {
				width: 270px !important;
				transition: width $default-time;
			}
		}
	}

	&:not(:focus-visible):focus ~ label {
		box-shadow: 0 0 0 $super-light-len $uni-gradiant-color;
	}
}

*, *::before, *::after {
	box-sizing: border-box
}

input[type="checkbox"] {
	position: absolute;
	left: -100vw;
}

.menu-hamburger:focus-visible ~ label,
nav .hidden:focus-visible,
nav .hidden:focus {
	transition: outline-offset .25s ease;
}

@media (prefers-reduced-motion: no-preference) {
	.menu-hamburger {
		& + label span {
			transition: background 10ms 300ms;

			&::before, &::after {
				transition: top $default-time $default-time, transform $default-time 50ms;
			}
		}

		&:checked + label span {
			&::before, &::after {
				transition: top $default-time 50ms, transform $default-time $default-time
			}
		}
	}
}
</style>
