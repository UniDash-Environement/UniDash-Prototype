import { createApp } from 'vue';
import Vuex from 'vuex';

import App from '@/App.vue';

import loadModules from '@/settings/loadModules.json' assert {type: 'json'};
import favoritesList from "@/settings/favorites.json" assert {type: "json"};

import '@/style.scss';

let modulesList = [];
if (loadModules.loadModules != null) {
  for (const module of loadModules.loadModules) {
    if (module != null && module.path != null && module.enabled) {
      let moduleTemp = import(`@/modules/loader/${module.path}.js`);
      modulesList.push(moduleTemp);
    }
  }
}

const store = new Vuex.Store({
  state() {
    return {
      tabList: [],
      favoritesFolderList: favoritesList.favoritesFolderList,
      loadModules: loadModules.loadModules,
    }
  },
  mutations: {
    updateTabList(state, newList) {
      state.list = newList;
    },
    updateFavoritesFolderList(state, newList) {
      state.favoritesFolderList = newList;
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
