<template>
	<div class="box-card-row">
		<div class="content">
			<img v-if="imgLeft" :alt="imgAlt" :src="imgSrc" class="img-left">
			<div :class="(imgLeft ? `left`: '')" class="text">
				<h2>{{ title }}</h2>
				<slot></slot>
			</div>
			<img v-if="!imgLeft" :alt="imgAlt" :src="imgSrc" class="img-right">
		</div>
	</div>
</template>

<script>
export default {
	props: {
		imgSrc: {
			type: String,
			required: true
		},
		imgAlt: {
			type: String,
			required: true
		},
		imgLeft: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			required: true
		}
	}
}
</script>

<style lang="scss">
@import "/assets/scss/main";

.box-card-row {
	@include size(height, 620px, auto, 0 0 $len-px-3 0);
	@include background-gradient($color-light-gray);
	@include border($len-px-13 $len-px-13 $len-px-10 $len-px-10, 0);
	width: 49%;
	flex: 1;

	> .content {
		@include size(height, auto, 100%, 0, 0);
		@include background-color($color-dark-gray);
		@include border($len-px-10, 0);

		display: flex;
		justify-content: center;
		align-items: center;

		> .text {
			padding: $len-px-3;
		}

		> img {
			height: 100%;

			&.img-left {
				@include border($len-px-10, 0)
			}

			&.img-right {
				@include border($len-px-10, 0)
			}
		}

		> .left * {
			text-align: right;
		}

		> .hover {
			@include background-color($color-dark-gray);
		}
	}
}
</style>