<template>
	<div class="left-bar">
		<div class="content">
			<slot/>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import "/assets/scss/main.scss";

.right-bar {
	@include size(height, 1px, 100%, 0 0 0 $len-px-3, 0, 0);
	@include background-gradient($color-dark-gray);
	transition: min-width $time-0-2s ease-in-out;

	z-index: 10;

	> .content {
		@include size(height, 1px, calc(100% - $len-px-3 * 2), $len-px-3, 0);
		@include background-color($color-dark-primary);

		> .hover {
			@include background-color($color-middle-gray);
		}
	}
}
</style>