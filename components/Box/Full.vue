<template>
	<div class="box">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import "/assets/scss/main.scss";

.box {
	@include size(height, calc(100% - $len-px-3 * 2), auto, 0 0 $len-px-3 0);
	@include background-gradient($color-light-gray);
	@include border($len-px-13 $len-px-13 $len-px-10 $len-px-10, 0);
	position: relative;

	> .content {
		@include size(height, auto, calc(100% - $len-px-3 * 2), $len-px-3, 0);
		@include background-color($color-dark-gray);
		@include border($len-px-10, 0);

		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		> .hover {
			@include background-color($color-dark-gray);
		}
	}
}
</style>