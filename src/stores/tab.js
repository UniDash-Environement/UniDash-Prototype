import {defineStore} from "pinia";

export const useTabStore = defineStore('tab', {
  state: () => ({
    tabList : [],
    splitTab: 1,
  }),
  actions: {
    deleteTab(id) {
      let tabIndex = this.tabList.findIndex((tabTemp) => tabTemp.id === id);
      this.tabList.splice(tabIndex, 1);
    },
    activateTab(id) {
      let tabIndex = this.tabList.findIndex((tabTemp) => tabTemp.id === id);

      let active = "hidden";
      if (this.tabList[tabIndex].active === "hidden") {
        active = "";
      }

      this.tabList[tabIndex].active = active;
    },
    updateSplitTab(number) {
      this.splitTab = number;
    },
    addTab(tab) {
      this.tabList.push(tab);
    },
    updateTabList(tabList) {
      this.tabList = tabList;
    }
  },
})