<template>
  <ul class="flex flex-column width-100 height-100">
    <li v-for="favoriFolder in favorisFolderList">
      <FavorisFolder :favoris-folder="favoriFolder" />
    </li>
    <li class="gradient-bprder width-100">
      <div class="content width-100">
        <div class="hover flex flex-column flex-center" @click="addFolderShowUpdater" >
          <FolderPlusIcon class="folder-icon show" />
          <input type="text" name="add-folder" class="input hover show hidden" id="add-folder">
        </div>
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
  },
  data() {
    return {
      addFolderShow: false
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
  },
  methods: {
    addFolderShowUpdater(event) {
      let svg = event.target.querySelector("svg");
      if (event.target.tagName === "svg") {
        svg = event.target;
      } else if (event.target.tagName === "path") {
        svg = event.target.parentElement;
      }
      svg.classList.toggle("hidden");
      let input = document.getElementById("add-folder")
      input.classList.toggle("hidden");
      input.focus();

      let disableFocusOut = () => {
        input.classList.toggle("hidden");
        svg.classList.toggle("hidden");
        input.removeEventListener("focusout", disableFocusOut);
        input.value = "";
      }

      if (! input.classList.contains("hidden")) {
        input.addEventListener("focusout", disableFocusOut);
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/style";
</style>