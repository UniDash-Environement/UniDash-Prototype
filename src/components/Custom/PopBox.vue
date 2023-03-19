<template>
	<div class="pop-box gradient-border flex">
		<div class="pop-box-content favorites-folder content flex" @mouseenter="showPopBoxMenu" @mouseleave="showPopBoxMenu">

			<div ref="popBoxMenu" class="flex hidden">
				<slot></slot>
			</div>

			<div ref="plusIcon" class="flex">
				<PlusIcon class="plus-icon" />
			</div>
		</div>
	</div>
</template>

<script>
import { PlusIcon } from "@heroicons/vue/20/solid";

export default {
	name: "PopBox",
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

.pop-box {
	position: absolute;
	bottom: $light-len;
	right: calc($light-len * 2);
	z-index: 1;

	max-width: calc(100% - $light-len * 4);

	.pop-box-content {
		align-items: end;
	}

	.plus-icon {
		cursor: pointer;
		padding: 0;
	}
}
</style>
