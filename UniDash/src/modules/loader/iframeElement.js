import Element from '../vue/IframeElement.vue'

export default {
    install: (app, options) => {
        app.component(Element.name, Element)
    }
}