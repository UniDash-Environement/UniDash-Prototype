<template>
	<div class="card">
		<div class="content">
			<img :alt="imgAlt" :src="imgSrc">
			<div class="text">
				<h2>{{ title }}</h2>
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import {defineProps} from 'vue'

const props = defineProps({
	imgSrc: {
		type: String,
		required: true
	},
	imgAlt: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	}
})
</script>

<style lang="scss" scoped>
@import "/assets/scss/main";

.card {
	@include size(height, 15% !important, min-content, 0 0 $len-px-3 0);
	@include background-gradient($color-light-gray);
	@include border($len-px-13 $len-px-13 $len-px-10 $len-px-10, 0);
	flex: 1;
	min-width: 19% !important;

	> .content {
		@include size(height, auto, calc(100% - $len-px-3 * 2), 0, 0);
		@include background-color($color-dark-gray);
		@include border($len-px-10, 0);

		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		> .text {
			padding: $len-px-3;
		}

		> img {
			width: 100%;
			@include border($len-px-10, 0)
		}

		> .hover {
			@include background-color($color-dark-gray);
		}
	}
}
</style>