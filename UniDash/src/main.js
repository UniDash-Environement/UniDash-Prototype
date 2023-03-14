import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import Vuex from 'vuex';

const store = new Vuex.Store({
    state() {
        return {
            tabList: [],
            favorisFolderList: [
                {
                    name: "Folder 1",
                    list: [
                        {
                            name: "Favori 1",
                            url: "https://www.example.com"
                        },
                        {
                            name: "Favori 2",
                            url: "https://www.example.com"
                        },
                        {
                            name: "Favori 3",
                            url: "https://www.example.com"
                        }
                    ]
                },
                {
                    name: "Folder 2",
                    list: [
                        {
                            name: "Favori 1",
                            url: "https://www.example.com"
                        },
                        {
                            name: "Favori 2",
                            url: "https://www.example.com"
                        },
                        {
                            name: "Favori 3",
                            url: "https://www.example.com"
                        }
                    ]
                },
                {
                    name: "Folder 3",
                    list: [
                        {
                            name: "Favori 1",
                            url: "https://www.example.com"
                        },
                        {
                            name: "Favori 2",
                            url: "https://www.example.com"
                        },
                        {
                            name: "Favori 3",
                            url: "https://www.example.com"
                        }
                    ]
                }
            ]
        }
    },
    mutations: {
        updateTabList(state, newList) {
            state.list = newList;
        }
    }
});

createApp(App)
    .use(store)
    .mount('#app')
