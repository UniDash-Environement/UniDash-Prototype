<script lang="ts" setup>
// import
import {usePagesStore} from '../../../stores/pages'
import {storeToRefs} from 'pinia'
import {useUserStore} from "../../../stores/user";
import {nextTick, ref, watch} from 'vue';
import {config, MdEditor, MdPreview} from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import fr_FR from '@vavt/md-editor-extension/dist/locale/fr-FR';
import {onMounted} from "../../../.nuxt/imports";

// store
const userStore = useUserStore()
const {logged, adminAccess} = storeToRefs(userStore)
const pagesStore = usePagesStore()
const {pages, reloaded} = storeToRefs(pagesStore)

// const
const route = useRoute();
const pagesUpdated = ref(pages)
const editShowed = ref(false);
const getPage = ref({
	text: '# 404\nPage not found',
	id: 'preview-only',
})

const getPages: Function = async _ => {
	pagesUpdated.value = pagesStore.getPages()
}

watch(logged, async (newValue, oldValue) => {
	await getPages()
})

let reloadedPage = false
watch(reloaded, async (newValue, oldValue) => {
	if (!reloadedPage) {
		updateGetPage()
		if (pagesUpdated.value.length !== 0) {
			reloadedPage = true
		}
	}
})
watch(route.params.uri, async (newValue, oldValue) => {
	updateGetPage()
})

onMounted(async () => {
	updateGetPage()
	pagesStore.forceWatch()
})

// function create

const updateGetPage = () => {
	getPages()
	let text = "# 404\nPage not found"

	if (pagesUpdated.value.length > 0) {
		text = pagesUpdated.value[0].markdown
	}

	const id = 'preview-only';

	getPage.value = {
		text: JSON.parse(JSON.stringify(text)),
		id: JSON.parse(JSON.stringify(id)),
	}
}

const showEdit: Function = async () => {
	editShowed.value = !editShowed.value
	await nextTick();
}

config({
	editorConfig: {
		languageUserDefined: {
			'fr-FR': fr_FR,
		},
	},
})
</script>

<template>
	<FlexRow>
		<MdPreview v-if="!editShowed"
		           :editorId="getPage.id" :modelValue="getPage.text" language="fr-FR" theme="dark"/>
		<FlexColumn v-if="adminAccess">
			<BoxButton v-if="logged" class="editButton" @click="showEdit">
				<Icon name="basil:edit-outline"/>
			</BoxButton>
			<MdEditor v-if="editShowed" v-model="getPage.text" language="fr-FR" theme="dark"/>
		</FlexColumn>
	</FlexRow>
</template>

<style lang="scss" scoped>
@import "/assets/scss/main";

#page-content > .flex-column > .flex {
	min-height: 100%;
	width: calc(100% - $len-px-10 * 2);
	padding: 0;
	margin: 0;

	> #preview-only {
		background-color: transparent;
		width: 100%;
		margin: 0;
		padding: 0;
	}

	> .flex-column {
		align-items: flex-end;
		width: min-content;
		height: 100%;
		flex: 1;

		> .editButton {
			width: min-content;
			flex: none;
		}

		#md-editor-v3 {
			background-color: transparent;
			height: 100%;

			.md-editor-catalog-dark {
				background-color: $color-middle-gray;
				border-radius: $len-px-10;
			}
		}
	}
}
</style>