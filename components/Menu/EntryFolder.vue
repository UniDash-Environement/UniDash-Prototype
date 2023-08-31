<template>
	<div class="entry-folder hover-detect" v-on:click="toggleOpen">
		<div class="content flex-column">
			<div class="hover hover-color">
				<Icon name="material-symbols:folder"/>
				<label>{{ page.name }}</label>
			</div>
			<div class="popup popup-detect">
				<ul>
					<li v-for="subPage in page.content" :key="subPage.path">
						<NuxtLink :to="subPage.path" class="no-margin">
							<BoxHover>
								<BoxHoverColor>
									<Icon name="material-symbols:find-in-page-rounded"/>
									<label>{{ subPage.name }}</label>
								</BoxHoverColor>
							</BoxHover>
						</NuxtLink>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import {defineProps} from 'vue'

interface Page {
	name: string
	path: string
	file: boolean
	content: Page[]
}

const props = defineProps({
	page: {
		type: Object as () => Page,
		required: true
	}
})

const toggleOpen: Function = (event: Event) => {
	const entryFolder = event.currentTarget as HTMLElement
	entryFolder.classList.toggle("open")
}
</script>

<style lang="scss" scoped>
@import "/assets/scss/main.scss";

.entry-folder {
	@include size(height, auto, auto, 0 0 $len-px-3 0);
	@include background-gradient();
	@include border($len-px-13 $len-px-13 $len-px-10 $len-px-10, 0);

	> .content {
		@include size(height, auto, calc(100% - $len-px-3 * 2), $len-px-3, 0);
		@include background-color($color-dark-gray);
		@include border($len-px-10, 0);

		display: flex;
		justify-content: center;
		align-items: center;

		.hover {
			@include background-color($color-dark-gray);
			display: flex;
			align-items: center;

			> label {
				font-weight: bold !important;
				margin-left: calc($len-px-3 * 2);
				padding: 0;
			}
		}
	}

	&.open > .content {
		> .hover {
			display: flex;
			align-items: center;
		}

		> .popup {
			@include size(height, $len-pct-100-00, $len-pct-100-00, 0, 0);
			display: flex;
			flex-direction: column;
			justify-content: center;

			ul {
				list-style: none;
				padding: 0;
				margin: 0;

				li {
					margin-left: 0;
					padding: 0;

					.icon {
						margin-left: $len-px-10;
						padding: 0;
					}

					label {
						margin-left: calc($len-px-3 * 2);
						padding: 0;
						font-weight: bold;
					}
				}
			}
		}
	}

	&:not(.open) > .content > .popup {
		@include hidden();
	}

	.no-margin {
		margin: 0;
		padding: 0;
	}
}
</style>