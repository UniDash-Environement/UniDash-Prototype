<template>
  <Box>
    <div class="hover flex" @click="showFolder">
      <FolderIcon class="n"/>
      <span>{{ favorisFolder.name }}</span>
    </div>
    <ul ref="favoris-folder" class="show hidden flex flex-column">
      <FavoriElement v-for="favori in favorisFolder.list" :name="favori.name" :data="favori.data"/>
    </ul>
  </Box>
</template>

<script>
import { FolderIcon } from "@heroicons/vue/24/solid";
import FavoriElement from "./FavoriElement.vue";
import Box from "../../Custom/Box.vue";
export default {
  name: "FavorisFolder",
  components: {
    Box,
    FavoriElement,
    FolderIcon
  },
  methods: {
    showFolder(event) {
      let folderItemList = this.$refs["favoris-folder"];
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