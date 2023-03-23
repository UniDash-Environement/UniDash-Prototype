import {defineStore} from "pinia";
import loadModules from "@/settings/loadModules.json";

export const useModuleStore = defineStore('module', {
  state: () => ({
    moduleConfList: moduleConfList,
    loadModules: loadModules.loadModules,
  }),
})