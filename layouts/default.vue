<template>
	<FlexColumn id="page" ref="page">
		<FlexRow ref="middlePage">
			<Menu/>
			<div id="page-content">
				<FlexColumnCenter>
					<slot/>
				</FlexColumnCenter>
			</div>
		</FlexRow>
	</FlexColumn>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
@import "/assets/scss/main.scss";

#page {
	height: 100vh;
	width: 100vw;
}

#page-content {
	width: calc(100% - $len-px-10 * 2);
	height: calc(100vh - $len-px-10 * 2);
	margin: $len-px-10;
	padding: 0;
	overflow-y: scroll;

	> * {
		width: 100%;
		height: 100%;
	}
}
</style>