<template>
  <div class="gradient-bprder width-100 flex">
    <div class="favoris-folder content width-100 flex flex-column">
      <div class="hover flex" @click="showFolder">
        <FolderIcon class="n"/>
        <span>{{ favorisFolder.name }}</span>
      </div>
      <ul class="favoris-folder show hidden flex flex-column">
        <FavoriElement v-for="favori in favorisFolder.list" :name="favori.name" :data="favori.data"/>
      </ul>
    </div>
  </div>
</template>

<script>
import { FolderIcon } from "@heroicons/vue/24/solid";
import FavoriElement from "./FavoriElement.vue";
export default {
  name: "FavorisFolder",
  components: {
    FavoriElement,
    FolderIcon
  },
  methods: {
    showFolder(event) {
      let folderItemList = event.target.parentElement.querySelector("ul.favoris-folder");

      if (!folderItemList) {
        folderItemList = event.target.parentElement.parentElement.parentElement.querySelector("ul.favoris-folder");
        if (event.target.parentElement.tagName === "svg") {
          folderItemList = event.target.parentElement.parentElement.parentElement.parentElement.querySelector("ul.favoris-folder");
        }
      }

      document.querySelectorAll("ul.favoris-folder").forEach(folder => {
        folder.classList.add("hidden");
      });

      folderItemList.classList.toggle("hidden");
    }
  },
  props: {
    favorisFolder: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/style";
</style>