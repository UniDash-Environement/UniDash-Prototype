<template>
	<div class="popBox gradientBorder flex">
		<div class="popBoxContent favoritesFolder content flex" @mouseenter="showPopBoxMenu" @mouseleave="showPopBoxMenu">

			<div ref="popBoxMenu" class="flex hidden">
				<slot></slot>
			</div>

			<div ref="plusIcon" class="flex flexColumn flexCenter hover">
				<PlusIcon class="plusIcon hoverClickable" />
			</div>
		</div>
	</div>
</template>

<script>
import { PlusIcon } from "@heroicons/vue/20/solid";

export default {
	name: "PopBoxGradient",

	components: {
		PlusIcon
	},

	methods: {
		showPopBoxMenu() {
			this.$refs.popBoxMenu.classList.toggle("hidden");
			this.$refs.plusIcon.classList.toggle("hidden");
		}
	}
}
</script>

<style scoped lang="scss">
@import "@/style.scss";

.popBox {
	position: absolute;
	bottom: $lenMin;
	right: calc($lenMin * 2);
	z-index: 1;

	.popBoxContent {
		align-items: end;
	}

	.plusIcon {
		cursor: pointer;
	}
}
</style>
