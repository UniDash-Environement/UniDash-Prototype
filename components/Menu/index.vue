<template>
	<BarLeft ref="menuBar" class="menu-bar">
		<FlexRow class="middle-flex">
			<FlexColumn class="content link-zone width-pct-100-00">
				<FlexColumn class="width-pct-100-00 height-pct-100-00">
					<FlexRowBetween>
						<BoxButton class="color-click open-button" @click="toggleMenu">
							<Icon name="ic:round-menu"/>
						</BoxButton>

						<h2>{{titleUpdated}}</h2>
					</FlexRowBetween>
					<FlexColumn id="menu" class="width-pct-100-00">

						<div ref="menu" class="scroll">
							<FlexColumn ref="pagesMenu" class="width-pct-100-00">
								<MenuEntry v-for="page in pagesUpdated" :key="page.uri"
								           :icon="page.icon"
								           :link="`/${selected.mode}/${selected[selected.mode].id}/${page.id}`"
								           :title="page.name"/>
								<BoxAddPage v-if="adminAccess"
								            :role-id="selected[selected.mode].id" :mode="selected.mode"/>
							</FlexColumn>

							<FlexColumn ref="dashboardMenu" class="width-pct-100-00 hidden">
							</FlexColumn>

							<FlexColumn ref="favoritesMenu" class="width-pct-100-00 hidden">
							</FlexColumn>

							<FlexColumn ref="settingsMenu" class="width-pct-100-00 hidden">
							</FlexColumn>
						</div>

						<div id="switch-button" class="bottomScroll">
							<FlexColumn class="width-pct-100-00 bottomScrollMargin">
								<UserLogin class="user-login" @click="updatePages()"/>
							</FlexColumn>
						</div>

					</FlexColumn>
				</FlexColumn>
			</FlexColumn>
			<FlexColumn class="tab-zone">
				<FlexColumn class="scroll">
					<span class="text-center">R</span>
					<NuxtLink v-for="tabs in rolesUpdated" :key="tabs.id"
					          :to="`/roles/${tabs.id}`">
						<BoxButton
						           @mouseenter="toggleSubMenu(
												 'pagesMenu',
												 tabs,
												 'roles'
											 )"
						           @mouseleave="leave">
							<Icon :name="tabs.icon"/>
						</BoxButton>
					</NuxtLink>

					<FlexColumn class="bottomScrollMargin" v-if="logged">
						<span class="text-center">G</span>
						<NuxtLink v-for="tabs in rolesGroupsUpdated" :key="tabs.id"
						          :to="`/rolesGroups/${tabs.id}`">
							<BoxButton
									@mouseenter="toggleSubMenu(
												 'pagesMenu',
												 tabs,
												 'rolesGroups'
											 )"
									@mouseleave="leave">
								<Icon :name="tabs.icon"/>
							</BoxButton>
						</NuxtLink>
					</FlexColumn>
				</FlexColumn>

				<FlexColumn class="bottomScroll" v-if="logged">
					<FlexColumn class="bottomScrollMargin">
						<span class="text-center">P</span>
						<BoxButton @mouseenter="toggleSubMenu(
													'dashboardMenu',
													{name:'osdfjgblzq'},
													'panel',
												)"
						           @mouseleave="leave">
							<Icon name="fluent:panel-left-24-filled"/>
						</BoxButton>

						<BoxButton @mouseenter="toggleSubMenu(
													'favoritesMenu',
													{name:'qlksjbis'},
													'panel',
												)"
						           @mouseleave="leave">
							<Icon name="clarity:favorite-solid"/>
						</BoxButton>

						<BoxButton @mouseenter="toggleSubMenu(
													'settingsMenu',
													{name:'qklsjfbsf'},
													'panel',
												)"
						           @mouseleave="leave">
							<Icon name="solar:settings-bold"/>
						</BoxButton>
					</FlexColumn>
				</FlexColumn>
			</FlexColumn>
		</FlexRow>
	</BarLeft>
</template>

<script lang="ts" setup>
import {nextTick, ref, watch} from 'vue';

import {useUserStore} from '../../stores/user'
import {usePagesStore} from '../../stores/pages'
import {storeToRefs} from 'pinia'
import {onMounted} from "../../.nuxt/imports";

const userStore = useUserStore()
const {logged, roleId, adminAccess} = storeToRefs(userStore)
const pagesStore = usePagesStore()
const {pages, reloaded, rolesGroups, roles} = storeToRefs(pagesStore)

const route = useRoute();
const menuBar: any = ref(null);
const pagesMenu: any = ref(null)
const dashboardMenu: any = ref(null)
const favoritesMenu: any = ref(null)
const settingsMenu: any = ref(null)

const menusObject = {
	pagesMenu,
	dashboardMenu,
	favoritesMenu,
	settingsMenu,
}

const selected = {
	roles: {
		id: 1,
		name: 'visitor',
	},
	rolesGroups: {
		id: 1,
		name: 'visitor',
	},
	store: {
		roles,
		rolesGroups
	},
	mode: 'rolesGroups'
}

const updatingFunction = {
	pages: {
		roles: pagesStore.refreshPagesByRole,
		rolesGroups: pagesStore.refreshPagesByRoleGroup,
	},
}

const rolesGroupsUpdated = ref(rolesGroups)
const rolesUpdated = ref(roles)
const pagesUpdated = ref(pages)
const titleUpdated = ref(selected[selected.mode].name)

const updateTabs: Function = async _ => {
	await nextTick();
	rolesUpdated.value = await pagesStore.refreshRoles()
	rolesGroupsUpdated.value = await pagesStore.refreshRolesGroups()
}

const getTabs: Function = async _ => {
	rolesUpdated.value = pagesStore.getRoles()
	rolesGroupsUpdated.value = pagesStore.getRolesGroups()
}
const updatePages: Function = async _ => {
	pagesUpdated.value = await updatingFunction.pages[selected.mode](selected[selected.mode].id)
	titleUpdated.value = selected[selected.mode].name
	await nextTick();
}

const getPages: Function = async _ => {
	pagesUpdated.value = pagesStore.getPages()
}

watch(logged, async (newValue, oldValue) => {
	await updateTabs()
	await updatePages()
})

watch(reloaded, async (newValue, oldValue) => {
	await getTabs()
	await getPages()
})

onMounted(async () => {
	if (route.params.mode && route.params.tab) {
		selected.mode = route.params.mode
		selected[selected.mode].id = Number(route.params.tab)
	}
	await updateTabs()
	await updatePages()
	pagesStore.forceWatch()
})

const toggleOffAll: Function = () => {
	for (const menu in menusObject) {
		if (menusObject[menu].value) {
			menusObject[menu].value.$el.classList.add("hidden")
		}
	}
}


let oldName
let hover = false
const leave: Function = async () => {
	await sleep(300)
	await (async _=> {
		if (
				selected[selected.mode].id !== Number(route.params.tab) ||
				selected.mode !== route.params.mode ||
				oldName !== selected[selected.mode].name
		) {
			selected.mode = route.params.mode
			selected[selected.mode].id = Number(route.params.tab)
			selected[selected.mode].name = oldName
			await nextTick();
		}
		await updatePages()
	})()
}

const sleep = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
}
const toggleSubMenu: Function = async (ref: string, object, mode: string) => {
	await sleep(300)
	if (selected[selected.mode].id !== object.id || selected.mode !== mode)
	await (async _=>{
		if (menusObject[ref].value) {
			oldName = JSON.parse(JSON.stringify(selected[selected.mode].name))
			selected.mode = JSON.parse(JSON.stringify(mode))
			selected[selected.mode] = JSON.parse(JSON.stringify(object))

			if (ref === 'pagesMenu') {
				await updatePages()
			}

			toggleOffAll()
			menusObject[ref].value.$el.classList.remove("hidden")
		}
	})()
}
const toggleMenu: Function = (event: Event) => {
	menuBar.value.$el.classList.toggle("open");
}
</script>

<style lang="scss">
@import "/assets/scss/main";

.menu-bar {

	.switchTabsButton {
		margin-bottom: $len-px-20;
	}

	.scroll {
		overflow: scroll;
		height: 10px;
		flex: 1
	}

	.bottomScroll {
		margin-top: auto;
	}

	.bottomScrollMargin {
		margin-top: $len-px-20;
	}

	#menu {
		height: 10px;
		flex: 1;

		#switch-button {
			margin-top: auto;
		}
	}

	.middle-flex {
		height: 100vh;
		width: 100%;

		.button {
			flex: none;
		}
	}

	.tab-zone {
		background-color: $color-dark-gray;
		padding: $len-px-3 0 $len-px-3 $len-px-3;

		.button {
			> .content, > .content > .hover {
				background-color: $color-middle-gray;
			}
		}
	}

	.link-zone {
		padding: $len-px-3;
	}

	> .content {

		.open-button {
			width: min-content;
			flex: none;
		}

		> .content {
			height: calc(100vh - $len-px-3 * 2);

			> .flex-column > * {
				margin: 0;
				padding: 0;
			}
		}

		a {
			margin: 0;
			padding: 0;
		}
	}

	&.open {
		min-width: 350px;
	}

	&:not(.open) > .content {
		> .content > .flex-equalize {
			flex-direction: column;

			> a {
				margin: 0;
				padding: 0;
			}
		}

		h2 {
			@include hidden()
		}

		.button, .entry-folder {
			label, .popup {
				@include hidden();
			}
		}

		.user-login {
			@include hidden();
		}

		#switch-button > .flex {
			flex-direction: column;
		}

		.tab-zone {
			@include hidden();
		}
	}
}
</style>