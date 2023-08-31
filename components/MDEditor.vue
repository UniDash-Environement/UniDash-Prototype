<template>
	<MdEditor v-model="modelCopy" language="fr-FR" theme="dark"/>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import {config, MdEditor} from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import fr_FR from '@vavt/md-editor-extension/dist/locale/fr-FR';

config({
	editorConfig: {
		languageUserDefined: {
			'fr-FR': fr_FR,
		},
	},
})

const props = defineProps({
	model: {
		type: String,
		required: false
	},
})

const {model} = toRefs(props);
let modelCopy = ref(model.value)

if (!model.value) {
	modelCopy = ref("")
}
</script>

<style lang="scss" scoped>
@import "/assets/scss/main";

#md-editor-v3 {
	background-color: $color-black;
	height: 100%;
}
</style>
