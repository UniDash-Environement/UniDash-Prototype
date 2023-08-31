import {createPinia, defineStore} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import {v4 as uuid} from "uuid";

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)


interface settings {
  show: boolean
  darken: boolean
  fullScreen: boolean
}

interface module {
  icon: string
  name: string
  id: string
  vueName: string
  settings: settings
  props: object
}

let modules = [] as Array<module>

export const useModulesStore = defineStore('modules', {
  state: () => ({
    modules: modules
  }),
  actions: {
    remove(id: string) {
      this.modules.splice(this.modules.findIndex(
          (module: module) => module.id === id
      ), 1);
    },

    create(vueName: string, name: string, icon: string) {
      this.modules.append({
        icon: icon,
        name: name,
        id: uuid(),
        vueName,
        settings: {
          show: true,
          darken: false,
          fullScreen: false,
        }
      })
    },

    editSettings(settings: settings, id: string) {
      this.modules = this.modules.map((module: module) => {
        if (module.id === id) {
          module.settings = settings
        }
      })
    }
  },
})


interface settings {
  show: boolean
  darken: boolean
  fullScreen: boolean
}

interface tab {
  icon: string
  name: string
  id: string
  vueName: string
  moduleId: string
  settings: settings
}

let tabs = [] as Array<tab>

export const useTabsStore = defineStore('tabs', {
  state: () => ({
    tabs: tabs
  }),
  actions: {
    remove(id: string) {
      this.tabs.splice(this.tabs.findIndex(
          (tab: tab) => tab.id === id
      ), 1);
    },

    create(moduleId: string, name: string, icon: string) {
      let tab: tab = {
        icon: "mdi:error",
        name: "Error",
        moduleId: "",
        vueName: "",
        id: uuid(),
        settings: {
          show: true,
          darken: false,
          fullScreen: false,
        },
      }

      modules.find((module: module) => {
        if (module.id === moduleId) {
          tab = {
            icon: icon,
            name: name,
            moduleId: moduleId,
            vueName: modules.find((module: module) => module.id === moduleId)?.vueName || "",
            id: uuid(),
            settings: modules.find((module: module) => module.id === moduleId)?.settings || {
              show: true,
              darken: false,
              fullScreen: false,
            },
          }
        }
      })

      this.tabs.append(tab)
    },

    editSettingsWithButton(settings: settings, id: string) {
      this.tabs = this.tabs.map((tab: tab) => {
        if (tab.id === id) {
          tab.settings = settings
        }
      })
    }
  },
  persist: true,
})