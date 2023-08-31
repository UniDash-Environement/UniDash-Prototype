<template>
	<div class="layer">
		<slot></slot>
	</div>
</template>

<style lang="scss" scoped>
@import "/assets/scss/main.scss";

.layer {
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;

	position: absolute;
	top: 0;
	left: 0;
	z-index: 100;
}
</style>