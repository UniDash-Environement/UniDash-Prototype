<template>
	<div class="menu-entry">
		<BoxButton>
			<Icon :name="icon"/>
			<label>{{ title }}</label>
		</BoxButton>
	</div>
</template>

<script lang="ts" setup>
import {defineProps} from 'vue';

const props = defineProps({
	title: {
		type: String,
		required: true
	},
	icon: {
		type: String,
		required: true
	}
})
</script>