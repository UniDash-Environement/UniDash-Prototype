<template>
	<BoxButton v-on:click="showModal"><span class="width-pct-100-00">{{ text }}</span></BoxButton>
	<div v-if="modalShowed" class="modal">
		<div class="content">
			<BoxButton v-on:click="showModal">
				<Icon name="octicon:x-12"></Icon>
			</BoxButton>
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts" setup>
import {nextTick, ref} from 'vue';

const modalShowed = ref(false);
const showModal: Function = async () => {
	modalShowed.value = !modalShowed.value;
	await nextTick();
};

defineProps({
	text: {
		type: String,
		required: true
	},
})
</script>


<style lang="scss">
@import "/assets/scss/main.scss";

.modal {
	position: absolute;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 99999;
	background-color: rgba($color-black, 0.8);

	> .content {
		width: 20vw;
		display: flex;
		flex-direction: column;
		align-items: flex-end;

		> .button {
			flex: none;
			min-width: min-content;
			width: min-content;
		}

		> *:not(.button) {
			width: 100%;
		}
	}
}
</style>
