import MyComponent from './test.vue'

export default {
    install: (app, options) => {
        app.component("Test", MyComponent)
    }
}