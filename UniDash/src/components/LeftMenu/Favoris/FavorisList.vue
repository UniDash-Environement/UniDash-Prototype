<template>
  <ul class="favoris-list">
    <li v-for="favoriFolder in favorisFolderList">
      <FavorisFolder :favoris-folder="favoriFolder" />
    </li>
    <li class="favoris-folder">
      <div class="favoris-folder-content">
        <FolderPlusIcon class="folder-icon"></FolderPlusIcon>
      </div>
    </li>
  </ul>
</template>

<script>
import FavorisFolder from "./FavorisFolder.vue";
import FavoriElement from "./FavoriElement.vue";
import favorisFolder from "./FavorisFolder.vue";
import { FolderPlusIcon } from "@heroicons/vue/24/solid";

import favoris from '../../../settings/favoris.json' assert {type: 'json'};

export default {
  name: "FavorisList",
  computed: {
    favorisFolder() {
      return favorisFolder
    }
  },
  components: {
    FavorisFolder,
    FavoriElement,
    FolderPlusIcon
  },
  setup() {
    return {
      favorisFolderList: favoris.favorisFolderList
    };
  }
}
</script>

<style scoped lang="scss">
@import "src/style";

.favoris-list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: $min-len;

  li {
    width: 100%;
  }

  .favoris-folder {
    background: $gradient-color;
    padding-bottom: $light-len;
    width: 100%;
    border-radius: $medium-min-len;

    .favoris-folder-content {
      width: calc(100% - $light-len * 2);
      height: auto;
      padding: $light-len;

      background-color: $black-color;
      border-radius: $medium-min-len;

      display: flex;
      flex-direction: column;
      overflow: hidden;

      svg {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        cursor: pointer;
        height: $default-len;
        padding: $super-light-len;


        &:hover {
          background-color: $black-gray-color;
          border-radius: $min-len;
          filter: brightness(1.25);
        }
      }
    }
  }
}
</style>