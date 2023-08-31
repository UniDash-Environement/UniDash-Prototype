<template>
	<div class="transparent-box">
		<slot></slot>
	</div>
</template>

<style lang="scss" scoped>
@import "/assets/scss/main.scss";

.transparent-box {
	@include size(height, max-content, max-content, 0 0 $len-px-3 0);
	position: relative;
}
</style>
