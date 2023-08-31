<template>
	<div class="layer-sticky">
		<slot></slot>
	</div>
</template>

<style lang="scss" scoped>
@import "/assets/scss/main.scss";

.layer-sticky {
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;

	position: sticky;
	top: 0;
	left: 0;
	z-index: 100;

	> .flex {
		height: 100%;
	}
}
</style>