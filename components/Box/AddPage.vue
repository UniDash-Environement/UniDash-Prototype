<script lang="ts" setup>
import {defineProps, nextTick, ref} from 'vue';
import {usePagesStore} from '../../stores/pages'

const pagesStore = usePagesStore()

const props = defineProps({
	roleId: {
		type: Number,
		required: true
	},
	mode: {
		type: String,
		required: true
	}
})

const inputShowed = ref(false);
const pageNameInput = ref(null)
const showInput: Function = async (event) => {
	inputShowed.value = !inputShowed.value;
	await nextTick();

	if (pageNameInput.value) {
		pageNameInput.value.focus()
	}
};
const validInput: Function = async (event) => {
	event.stopPropagation()
	event.preventDefault()

	const updatingFunction = {
		pages: {
			roles: pagesStore.refreshPagesByRole,
			rolesGroups: pagesStore.refreshPagesByRoleGroup,
		},
	}

	if (pageNameInput.value) {
		await tokenFetch(`/api/pages/create`, {
			method: 'post',
			body: {
				name: pageNameInput.value.value,
				roleId: props.roleId,
				mode: props.mode,
			},
			async onResponse({request, response, options}) {
				if (response.status === 204) {
					await updatingFunction.pages[props.mode](props.roleId)
				}
			}
		})
	}

	showInput()
};
</script>

<template>
	<BoxButton>
		<FlexRowCenter v-if="!inputShowed" @click="showInput">
			<Icon name="mingcute:add-fill"/>
		</FlexRowCenter>
		<form v-else @submit="validInput">
			<FlexRowCenter>
				<input ref="pageNameInput" type="text">
				<Icon name="octicon:check-16" @click="validInput"/>
			</FlexRowCenter>
		</form>
	</BoxButton>
</template>

<style lang="scss" scoped>
@import "assets/scss/main";

.button > .content > .hover > .flex {
	> .flex {
		width: 100%;

		svg {
			width: 100%;
		}
	}

	> form {
		width: 100%;
		height: 100%;

		> .flex {
			width: 100%;

			svg {
				margin-left: calc($len-px-3 * 2);
			}
		}
	}
}

input {
	@include background-color($color-middle-gray);
	height: 100%;
	width: 100%;
	border-radius: calc($len-px-3 * 2);
	padding: $len-px-3;
	margin: 0 !important;

	.flex {
		width: 100%;
		height: 100%;
		align-items: center;

		* {
			margin: 0;
			padding: 0;
		}
	}
}
</style>