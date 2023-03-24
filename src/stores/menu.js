import {defineStore} from "pinia";
import {values} from "vuedraggable/dist/vuedraggable.common.js";

export const useMenuStore = defineStore('menu', {
  state: () => ({
    showMenu: true,

    showTabs: "hidden",
    showFavorites: "",
    showSettings: "hidden",

    iconTabs: "",
    iconFavorites: "clicked",
    iconSettings: "",
  }),
  actions: {
    updateShow(elementName) {
      this.showTabs = "hidden";
      this.showFavorites = "hidden";
      this.showSettings = "hidden";

      this.iconTabs = "";
      this.iconFavorites = "";
      this.iconSettings = "";

      this.showMenu = true;

      if (elementName === "tabs") {
        this.showTabs = "";
        this.iconTabs = "clicked";
      }
      else if (elementName === "favorites") {
        this.showFavorites = "";
        this.iconFavorites = "clicked";
      }
      else if (elementName === "settings") {
        this.showSettings = "";
        this.iconSettings = "clicked";
      }
    },
    updateShowMenu(value) {
      this.showMenu = value;
    }
  }
})