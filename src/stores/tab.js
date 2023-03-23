import {defineStore} from "pinia";

export const useTabStore = defineStore('tab', {
  state: () => ({
    tabList : [],
    splitTab: 1,
  }),
  actions: {
    deleteTab(id) {
      this.tabList = this.tabList.filter((tabTemp) => tabTemp.id !== id);
    },
    activateTab(id) {
      this.tabList = this.tabList.map((tab) => {
        if (tab.id === id) {
          if (tab.active === "hidden") {
            tab.active = "";
          } else {
            tab.active = "hidden";
          }
          return tab;
        }
      });
    }
  }
})