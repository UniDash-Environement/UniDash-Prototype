<template>
	<NuxtLink :to="link" class="menu-entry">
		<BoxButton>
			<Icon :name="icon"/>
			<label>{{ title }}</label>
		</BoxButton>
	</NuxtLink>
</template>

<script lang="ts" setup>
import {defineProps} from 'vue';

defineProps({
	title: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true
	},
	icon: {
		type: String,
		required: true
	}
})
</script>

<style lang="scss">
@import "/assets/scss/main";

.menu-entry {
	width: 100%;

	label {
		font-weight: bold;
		margin: 0 calc($len-px-3 * 2) !important;
	}
}
</style>