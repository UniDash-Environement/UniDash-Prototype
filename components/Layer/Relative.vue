<template>
	<FlexRow>
		<div class="layer-relative">
			<FlexColumn>
				<slot></slot>
			</FlexColumn>
		</div>
	</FlexRow>
</template>

<style lang="scss" scoped>
@import "/assets/scss/main.scss";

.layer-relative {
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;

	position: relative;
	top: 0;
	left: 0;
	z-index: 100;
}
</style>