import { createApp } from 'vue';
import App from '@/App.vue';

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import loadModules from "@/settings/loadModules.json" assert {type: "json"};
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

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

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
