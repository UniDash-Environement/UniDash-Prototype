<template>
	<div class="box-popup hover-detect">
		<div class="content">
			<div class="hover">
				<Icon name="material-symbols:add"/>
			</div>
			<div class="popup">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
@import "/assets/scss/main.scss";

.box-popup {
	@include size(height, auto, auto, 0 0 $len-px-3 0);
	@include background-gradient();
	@include border($len-px-13 $len-px-13 $len-px-10 $len-px-10, 0);

	position: absolute;
	bottom: calc($len-px-10 + $len-px-3);
	right: $len-px-10;

	> .content {
		@include size(height, auto, calc(100% - $len-px-3 * 2), $len-px-3, 0);
		@include background-color();
		@include border($len-px-10, 0);

		display: flex;
		justify-content: center;
		align-items: center;

		.hover {
			@include background-color();
		}
	}

	&:hover > .content {
		> .hover {
			@include hidden();
		}

		> .popup {
			@include size(height, $len-pct-100-00, $len-pct-100-00, 0, 0);
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
	}

	&:not(:hover) > .content > .popup {
		@include hidden();
	}
}
</style>