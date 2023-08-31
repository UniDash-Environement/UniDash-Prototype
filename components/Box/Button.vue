<template>
	<div ref="button" class="button hover-detect hover-color" v-on:click="saveClick">
		<button class="content">
			<div class="hover">
				<FlexRow>
					<slot></slot>
				</FlexRow>
			</div>
		</button>
	</div>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const button = ref(null);

const saveClick = () => {
	if (button.value.classList.contains("color-click")) {
		button.value.classList.toggle("click-save");
	}
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/main.scss";

.button {
	@include size(height, auto, auto, 0 0 $len-px-3 0);
	@include background-gradient();
	@include border($len-px-13 $len-px-13 $len-px-10 $len-px-10, 0);
	position: relative;

	> .content {
		display: block;
		@include size(height, auto, calc(100% - $len-px-3 * 2), $len-px-3, 0);
		@include background-color($color-dark-gray);
		@include border($len-px-10, 0);
		width: 100%;

		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		> .hover {
			@include background-color($color-dark-gray);
			flex: 1;

			.flex {
				width: 100%;
				height: 100%;
				align-items: center;

				* {
					margin: 0;
					padding: 0;
				}
			}
		}
	}
}
</style>