<template>
	<div class="pop-box gradient-border flex">
		<div class="pop-box-content favorites-folder content flex">

			<div ref="popBoxMenu" class="flex width-100 hidden">
				<slot></slot>
			</div>

			<PlusIcon class="plus-icon" @click="showPopBoxMenu" />
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
