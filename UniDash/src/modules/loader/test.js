import MyComponent from '../vue/test.vue'

export default {
    install: (app, options) => {
        app.component("Test", MyComponent)
    }
}