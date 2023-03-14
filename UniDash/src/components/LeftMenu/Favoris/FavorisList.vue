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
      favorisFolderList: [
        {
          name: "Folder 1",
          list: [
            {
              name: "Favori 1",
              url: "https://www.example.com"
            },
            {
              name: "Favori 2",
              url: "https://www.example.com"
            },
            {
              name: "Favori 3",
              url: "https://www.example.com"
            }
          ]
        },
        {
          name: "Folder 2",
          list: [
            {
              name: "Favori 1",
              url: "https://www.example.com"
            },
            {
              name: "Favori 2",
              url: "https://www.example.com"
            },
            {
              name: "Favori 3",
              url: "https://www.example.com"
            }
          ]
        },
        {
          name: "Folder 3",
          list: [
            {
              name: "Favori 1",
              url: "https://www.example.com"
            },
            {
              name: "Favori 2",
              url: "https://www.example.com"
            },
            {
              name: "Favori 3",
              url: "https://www.example.com"
            }
          ]
        }
      ]
    }
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