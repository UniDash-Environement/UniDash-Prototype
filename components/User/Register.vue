<template>
	<BoxModal v-if="registerAccess" text="Register">
		<form class="width-pct-100-00">
			<div>
				<label for="Name">Name:</label>
				<div class="input-border">
					<input id="Name" v-model="userName" class="hover" name="Name" type="text">
				</div>
			</div>
			<div>
				<label for="Email">Email:</label>
				<div class="input-border">
					<input id="Email" v-model="userMail" class="hover" name="Email" type="text">
				</div>
			</div>
			<div>
				<label for="Password">Password:</label>
				<div class="input-border">
					<input id="Password" v-model="userPass" class="hover" name="Password" type="password">
				</div>
			</div>
			<div>
				<label for="Repete">Repete:</label>
				<div class="input-border">
					<input id="Repete" v-model="userRepete" class="hover" name="Repete" type="password">
				</div>
			</div>
			<BoxButton @click="registerButton">
				<span class="width-pct-100-00">register</span>
			</BoxButton>
		</form>
	</BoxModal>
</template>

<script lang="ts" setup>
import {useUserStore} from "../../stores/user";
import {storeToRefs} from 'pinia'
import {watch} from "vue";

const userStore = useUserStore()
const {logged, roleId} = storeToRefs(userStore)

let userMail: string = ""
let userPass: string = ""
let userRepete: string = ""
let userName: string = ""
const registerAccess = ref(false)

const checkRegisterAccess: Function = async (event) => {
	await tokenFetch(`/api/user/register/checkAccess`, {
		method: 'post',
		onResponse({request, response, options}) {
			if (response.status === 204) {
				registerAccess.value = true
			}
			if (response.status === 401) {
				registerAccess.value = false
			}
		},
	})
}

const registerButton: Function = async (event) => {
	event.stopPropagation()
	event.preventDefault()
	if (userPass === userRepete && userName && userMail) {
		await tokenFetch(`/api/user/register`, {
			method: 'post',
			body: {
				name: userName,
				pass: userPass,
				mail: userMail,
			},
		})
	}

	checkRegisterAccess()
}

onMounted(() => {
	checkRegisterAccess()
})

watch(logged, (newValue, oldValue) => {
	checkRegisterAccess()
})
</script>