<template>
	<div class="bottom-bar">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import "/assets/scss/main.scss";

.bottom-bar {
	@include size(height, 100vw, auto, $len-px-3 0 0 0, 0, 0);
	@include background-gradient($color-dark-primary);

	z-index: 9;

	> .content {
		@include size(height, auto, calc(100% - $len-px-3 * 2), $len-px-3, 0);
		@include background-color(black);

		display: flex;
		justify-content: space-between;
		align-items: center;

		> .hover {
			@include background-color($color-dark-gray);
		}
	}

	.box, .box-popup {
		flex: none;
	}
}
</style>