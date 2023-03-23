import {defineStore} from "pinia";
import loadModules from "@/settings/loadModules.json";

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

export const useModuleStore = defineStore('module', {
  state: () => ({
    moduleConfList: moduleConfList,
    loadModules: loadModules.loadModules,
  }),
})