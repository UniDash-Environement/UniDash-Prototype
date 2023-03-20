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
      let moduleTemp = import(`@/modules/${module.path}/plugin.js`);
      modulesList.push(moduleTemp);
    }
  }
}

let moduleConfList = {};
if (loadModules.loadModules != null) {
  for (const module of loadModules.loadModules) {
    if (module != null && module.path != null && module.enabled) {
      let moduleTemp = import(`@/modules/${module.path}/config.json`);
      moduleTemp.then((moduleTemp) => {
        moduleConfList[module.vuePath] = moduleTemp.default;
      });
    }
  }
}

const store = new Vuex.Store({
  state() {
    return {
      tabList: [],
      favoritesFolderList: favoritesList.favoritesFolderList,
      loadModules: loadModules.loadModules,
      splitTab: 1,
      moduleConfList: moduleConfList
    }
  },
  mutations: {
    updateTabList(state, newList) {
      state.tabList = newList;
    },
    updateFavoritesFolderList(state, newList) {
      state.favoritesFolderList = newList;
    },
    updateSplitTab(state, newSplitTab) {
      state.splitTab = newSplitTab;
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
