import {defineStore} from "pinia";
import favoritesList from "@/settings/favorites.json";

export const useFavoriteStore = defineStore('favorite', {
  state: () => ({
    favoritesFolderList: favoritesList.favoritesFolderList,
  }),
  actions: {
    deleteFavoriteFolder(id) {
      let folderIndex = this.favoritesFolderList.findIndex(
        (folderTemp) => folderTemp.id === id
      );
      this.favoritesFolderList.splice(folderIndex, 1);
    },
    editeFavoriteFolder(id, newName) {
      let folderIndex = this.favoritesFolderList.findIndex(
        (folderTemp) => folderTemp.id === id
      );
      this.favoritesFolderList[folderIndex].name = newName;
    },
    addFavoriteFolder(folder) {
      this.favoritesFolderList.push(folder);
    },

    deleteFavorite(id) {
      let favoriteIndex;
      let folderIndex;
      for (const folderIndexTemp in this.favoritesFolderList) {
        favoriteIndex = this.favoritesFolderList[folderIndexTemp].list.findIndex(
            (favoriteTemp) => favoriteTemp.id === id
        );
        if (favoriteIndex !== -1) {
          folderIndex = folderIndexTemp;
        }
      }

      this.favoritesFolderList[folderIndex].list.splice(favoriteIndex, 1);
    },
    editeFavorite(favorite) {
      let favoriteIndex;
      let folderIndex;
      for (const folderIndexTemp in this.favoritesFolderList) {
        favoriteIndex = this.favoritesFolderList[folderIndexTemp].list.findIndex(
            (favoriteTemp) => favoriteTemp.id === id
        );
        if (favoriteIndex !== -1) {
          folderIndex = folderIndexTemp;
        }
      }
      this.favoritesFolderList[folderIndex].list[favoriteIndex] = favorite;
    },
    addFavorite(favorite, folderId) {
      let folderIndex = this.favoritesFolderList.findIndex(
        (folderTemp) => folderTemp.id === folderId
      );
      this.favoritesFolderList[folderIndex].list.push(favorite);
    },
  }
})