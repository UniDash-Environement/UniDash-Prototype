import { createApp } from 'vue';
import './style.scss';
import App from './App.vue';
import Vuex from 'vuex';
import parameters from './settings/parameters.json' assert {type: 'json'};
import loadModules from './settings/loadModules.json' assert {type: 'json'};


const store = new Vuex.Store({
    state() {
        return {
            tabList: [],
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
