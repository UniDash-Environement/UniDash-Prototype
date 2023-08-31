<template>
	<div ref="topBar" class="top-bar">
		<div class="content">
			<h1>Wilink CMS</h1>
			<BoxButton>
				<Icon name="solar:pen-bold"/>
			</BoxButton>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import "/assets/scss/main.scss";

.top-bar {
	@include size(height, 100vw !important, auto, 0 0 $len-px-3 0, 0, 0);
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

		p, span, label, div, h1, h2, h3, h4, h5, h6 {
			@include color($color-white-gray);
		}
	}

	.box, .button, .box-popup {
		flex: none;
	}
}
</style>