<template>
	<div class="gradientBorder width100 flex">
		<div class="favoritesFolder content width100 flex flexColumn">
			<div class="hover width100 flex flexCenter flexBetween">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "BoxGradientWithHover"
}
</script>
