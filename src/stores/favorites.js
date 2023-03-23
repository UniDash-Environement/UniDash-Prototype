import {defineStore} from "pinia";
import favoritesList from "@/settings/favorites.json";

export const useFavoriteStore = defineStore('favorite', {
  state: () => ({
    favoritesFolderList: favoritesList.favoritesFolderList,
  }),
  actions: {
    findFavoriteFolder(id) {
      return this.favoritesFolderList.find((folderTemp) => folderTemp.id === id);
    },
    deleteFavoriteFolder(id) {
      this.favoritesFolderList = this.favoritesFolderList.filter((folderTemp) => folderTemp.id !== id);
    },
    editeFavoriteFolder(id, newName) {
      this.favoritesFolderList = this.favoritesFolderList.map((folderTemp) => {
        if (folderTemp.id === id) {
          folderTemp.name = newName;
        }
        return folderTemp;
      });
    },
    findFavorite(id) {
      let favorite;
      for (const folder of this.favoritesFolderList) {
        favorite =  folder.find((favoriteTemp) => favoriteTemp.id === id);
      }

      return favorite;
    },
    deleteFavorite(id) {
      for (const folder of this.favoritesFolderList) {
        folder.favoritesList = folder.favoritesList.filter((favoriteTemp) => favoriteTemp.id !== id);
      }
    },
    editeFavorite(favorite, folderId) {
      let folder = this.findFavoriteFolder(folderId);
      folder.favoritesList = folder.favoritesList.map((favoriteTemp) => {
        if (favoriteTemp.id === favorite.id) {
          favoriteTemp = favorite;
        }
        return favoriteTemp;
      });
    }
  }
})