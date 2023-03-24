<template>
	<div class="gradient-border width-100 flex">
		<div class="favorites-folder content width-100 flex flex-column">
			<div class="hover width-100 flex flex-center flex-between">
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
