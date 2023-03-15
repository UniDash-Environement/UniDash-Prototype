<template>
  <ul class="favoris-list">
    <li v-for="favoriFolder in favorisFolderList">
      <FavorisFolder :favoris-folder="favoriFolder" />
    </li>
  </ul>
</template>

<script>
import FavorisFolder from "./FavorisFolder.vue";
import FavoriElement from "./FavoriElement.vue";
import favorisFolder from "./FavorisFolder.vue";

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
    FavoriElement
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
}
</style>