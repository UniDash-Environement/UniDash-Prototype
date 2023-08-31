<template>
	<div>
		<BoxModal v-if="!logged" text="Login">
			<form>
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
				<BoxButton v-on:click="loginButton"><span class="width-pct-100-00">Login</span></BoxButton>
			</form>
		</BoxModal>

		<userRegister/>
		<BoxButton v-if="logged" v-on:click="logoutButton">
			<span class="width-pct-100-00">Logout</span>
		</BoxButton>
	</div>
</template>

<script lang="ts" setup>
import {useUserStore} from '../../stores/user'
import {storeToRefs} from 'pinia'

const userStore = useUserStore()
const {accessToken, logged} = storeToRefs(userStore)

let userMail: string = ""
let userPass: string = ""

const loginButton: Function = async (event) => {
	event.stopPropagation()
	event.preventDefault()
	let defineStore: boolean = false
	const result = await tokenFetch(`/api/user/login`, {
		method: 'post',
		body: {
			pass: userPass,
			mail: userMail,
		},
		onResponse({request, response, options}) {
			if (response.status === 200) {
				defineStore = true
			}
		},
	})

	const resultValue = await result['_rawValue']

	if (defineStore) {
		userStore.define({
			accessToken: resultValue.accessToken,
			refreshToken: resultValue.refreshToken,
		})
	}

	let adminAccess = false
	await tokenFetch(`/api/user/checkAdminAccess`, {
		method: 'post',
		onResponse({request, response, options}) {
			if (response.status === 204) {
				adminAccess = true
			}
		},
	})

	userStore.defineAdminAccess(adminAccess)
}

const logoutButton: Function = async (event) => {
	await tokenFetch(`/api/user/logout`, {
		method: 'post',
		onResponse({request, response, options}) {
			if (response.status === 204) {
				return navigateTo('/roles/visitor')
			}
		},
	})
	userStore.logout()
}
</script>

<style lang="scss" scoped>
</style>