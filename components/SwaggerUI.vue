<script>
import {defineComponent} from 'vue'
import {SwaggerUIBundle} from 'swagger-ui-dist'

export default defineComponent({
	mounted() {
		SwaggerUIBundle({
			url: "https://petstore.swagger.io/v2/swagger.json",
			dom_id: '#swagger-ui',
			presets: [
				SwaggerUIBundle.presets.apis,
				SwaggerUIBundle.SwaggerUIStandalonePreset
			],
		})
	}
});
</script>

<template>
	<div id="swagger-ui"></div>
</template>

<style lang="scss">
@import "/assets/scss/main";
@import url("https://unpkg.com/swagger-ui-dist@3.12.1/swagger-ui.css");

#swagger-ui * {
	color: white;
	padding: $len-px-3;
	margin: $len-px-3;
	border-radius: $len-px-10;

	&.opblock-summary-control {
		width: 20%;
	}

	&.opblock-summary-control {
		background-color: $color-black;
	}

	&.models-control, &.scheme-container, select {
		background-color: $color-dark-gray;
	}

	&.models-control, &.model-box-control, &.model-ApiResponse {
		&:hover {
			background-color: $color-middle-gray;
		}

		display: flex;
		justify-content: center;
		background-color: $color-dark-gray;

		> svg {
			display: none;
		}
	}

	svg, span:not(.pointer):not(.model-toggle):not(.models-control > span) {
		fill: white;
		color: white;
		margin: 0 !important;
		padding: 0 !important;
	}

	span.model-toggle {
		display: none;
	}

	&.opblock-section-header {
		background: $color-black;
	}

	input, .responses-inner button {
		background: $color-black;
		color: white;
		border: none;
	}

	&.modal-ux {
		background-color: $color-black;
		border: none;

		input {
			background-color: $color-black;
		}

		.modal-ux-header, .user-container {
			background-color: $color-dark-gray;
		}

		*:not(button) {
			border-color: $color-middle-gray;
		}
	}
}

</style>