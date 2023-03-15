import { createApp } from 'vue';
import './style.scss';
import App from './App.vue';
import Vuex from 'vuex';
import parameters from './settings/parameters.json' assert {type: 'json'};
import loadModules from './settings/loadModules.json' assert {type: 'json'};

let modulesList = [];
if (loadModules.loadModules != null) {
    for (const module of loadModules.loadModules) {
        if (module != null && module.path != null && module.enabled) {
            let moduleTemp = import(/* @vite-ignore */"./modules/loader/" + module.path);
            modulesList.push(moduleTemp);
        }
    }
}

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

let app = createApp(App)
app.use(store)
app.mount('#app')

if (modulesList.length > 0) {
    for (const moduleTemp of modulesList) {
        moduleTemp.then((module) => {
            app.use(module.default);
        });
    }
}
