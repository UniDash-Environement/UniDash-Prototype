import { createApp } from 'vue';
import App from '@/App.vue';

import { createPinia } from 'pinia'
import loadModules from "@/settings/loadModules.json" assert {type: "json"};


import '@/style.scss';
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

let modulesList = [];
if (loadModules.loadModules != null) {
  for (const module of loadModules.loadModules) {
    if (module != null && module.path != null && module.enabled) {
      let moduleTemp = import(`@/modules/${module.path}/plugin.js`);
      modulesList.push(moduleTemp);
    }
  }
}

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.mount('#app')

if (modulesList.length > 0) {
  for (const moduleTemp of modulesList) {
    moduleTemp.then((module) => {
      app.use(module.default);
    });
  }
}
