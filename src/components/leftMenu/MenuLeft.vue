<template>
	<input type="checkbox"
	       class="hamburgerMenu"
	       id="showMenuButton"
	       v-model="showMenu">
	<label for="showMenuButton"
				 class="iconBurger"
	       aria-label="Menu">
		<span></span>
	</label>

	<nav class="leftMenuBackgroundBorder flex flexColumn gradientBorder">
		<div class="leftMenuBackground flex flexColumn flex-g height100 width100 content"
		     ref="leftMenuBackground">
			<h1 class="title"
			    ref="title">UniDash</h1>

			<div class="show-checkbox-list flex flexColumn width100 height100 padding"
			     id="menuLists"
			     ref="menuLists">
				<div class="width100 height100 show"
				     :class="showTabs"
				     ref="tabContent">
					<TabItemsList/>
				</div>

				<div class="width100 height100 show"
				     :class="showFavorites"
				     ref="favoritesContent">
					<FavoriteItemsFoldersList/>
				</div>

				<div class="width100 height100 show"
				     :class="showSettings"
				     ref="settingsContent">
				</div>
			</div>

			<div class="padding"
			     ref="slider">
				<BoxGradientWithHover class="slider">
					<div class="flex flexBetween width100"
					     ref="sliderContent">
						<div class="flex flexCenter">
							<span class="clicked hoverClickable sliderIcon"
							      ref="setSplitBy1Button"
							      @click="setSplitBy(1)">1</span>
							<span class="hoverClickable sliderIcon"
							      ref="setSplitBy2Button"
							      @click="setSplitBy(2)">2</span>
							<span class="hoverClickable sliderIcon"
							      ref="setSplitBy3Button"
							      @click="setSplitBy(3)">3</span>
							<span class="hoverClickable sliderIcon"
							      ref="setSplitBy4Button"
							      @click="setSplitBy(4)">4</span>
						</div>
						<div class="flex flexCenter">
							<bookmarkIcon class="hoverClickable sliderIcon"
							              :class="iconTabs"
							              ref="tabIcon"
							              @click="updateShow('tabs')"/>
							<StarIcon class="hoverClickable sliderIcon"
							          :class="iconFavorites"
							          ref="favoritesIcon"
							          @click="updateShow('favorites')"/>
							<Cog6ToothIcon class="hoverClickable sliderIcon"
							               :class="iconSettings"
							               ref="settingsIcon"
							               @click="updateShow('settings')"/>
						</div>
					</div>
				</BoxGradientWithHover>
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

import BoxGradientWithHover from "@/components/utils/box/BoxGradientWithHover.vue";
import FavoriteItemsFoldersList from "@/components/leftMenu/favorites/FavoriteItemsFoldersList.vue";
import TabItem from "@/components/leftMenu/tabs/TabItem.vue";
import TabItemsList from "@/components/leftMenu/tabs/TabItemsList.vue";

export default {
	name: "leftMenu",

	components: {
		ChevronLeftIcon,
		ChevronRightIcon,
		Cog6ToothIcon,
		StarIcon,
		BoxGradientWithHover,
		FavoriteItemsFoldersList,
		TabItemsList,
		TabItem,
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

	watch: {
		showMenu(value) {
			this.updateShowMenu(value)

			if (!value) {
				this.$refs["menuLists"].classList.add("hidden");
				this.$refs["title"].classList.add("hidden");

				this.$refs["slider"].classList.add("vertical");

				this.$refs["leftMenuBackground"].classList.add("closed-leftMenu");
			} else {
				this.$refs["menuLists"].classList.remove("hidden");
				this.$refs["title"].classList.remove("hidden");

				this.$refs["slider"].classList.remove("vertical");

				this.$refs["leftMenuBackground"].classList.remove("closed-leftMenu");
			}
		}
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
}
</script>

<style scoped lang="scss">
@import "@/style.scss";

.iconBurger {
	width: 30px !important;
	height: 30px !important;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 5px;
	margin: $lenMediumMin;

	span {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}
}

.chevron {
	width: $lenBig;
}

.leftMenuBackgroundBorder {
	height: 100vh;
	width: 67px !important;

	padding: 0;
	border-radius: 0;
	margin: 0;

	overflow-y: scroll;
	overflow-x: hidden;

	transition: width $timeDefault;

	ul {
		list-style-type: none;
		padding: 0;

		li {
			margin-bottom: $lenMediumMax;
		}
	}

	.leftMenuBackground {
		background-color: $colorGray;
		border-radius: 0;
		width: calc(100% - $lenMin);
		justify-content: end;

		#menuLists {
			overflow: hidden;
		}

		.title {
			overflow: hidden;
		}

		.slider {
			margin: 0;
			overflow: hidden;

			.sliderIcon {
				height: 24px;
				width: 24px;
				text-align: center;
				font-size: $lenDefault;
			}
		}

		&.closed-menu {
			align-items: end;
			justify-content: end;
		}
	}
}

.padding .gradientBorder .content {
	width: 100%;
}

.hamburgerMenu {
	& + label {
		width: $lenBig;
		height: $lenBig;
		z-index: 9999;

		display: flex;
		align-items: center;
		justify-content: center;

		position: fixed;
		top: $lenMediumMin;
		left: $lenMediumMin;

		cursor: pointer;
		background: $colorBlack;
		border-radius: $lenDefault;

		span {
			width: 100%;
			height: $lenLight;

			background: $colorGradientUni;
			position: relative;

			&::before {
				top: -6px;
			}

			&::after {
				top: 6px;
			}

			&::before, &::after {
				width: inherit;
				height: inherit;

				position: absolute;
				background: $colorGradientUni;
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
			.leftMenuBackgroundBorder {
				width: 270px !important;
				transition: width $timeDefault;
			}
		}
	}

	&:not(:focus-visible):focus ~ label {
		box-shadow: 0 0 0 $lenLight $colorGradientUni;
	}
}

*, *::before, *::after {
	box-sizing: border-box
}

input[type="checkbox"] {
	position: absolute;
	left: -100vw;
}

.hamburgerMenu:focus-visible ~ label,
nav .hidden:focus-visible,
nav .hidden:focus {
	transition: outline-offset .25s ease;
}

@media (prefers-reduced-motion: no-preference) {
	.hamburgerMenu {
		& + label span {
			transition: background 10ms 300ms;

			&::before, &::after {
				transition: top $timeDefault $timeDefault, transform $timeDefault 50ms;
			}
		}

		&:checked + label span {
			&::before, &::after {
				transition: top $timeDefault 50ms, transform $timeDefault $timeDefault
			}
		}
	}
}
</style>
