<template>
  <ul class="flex flex-column width-100 height-100">
    <li v-for="favoriFolder in favorisFolderList">
      <FavorisFolder :favoris-folder="favoriFolder" />
    </li>
    <li class="gradient-bprder width-100">
      <div class="content width-100">
        <div ref="add-folder" class="hover flex flex-column flex-center show" @click="addFolderShowUpdater" >
          <FolderPlusIcon class="folder-icon show" />
          <input type="text" name="add-folder" class="input hover show hidden">
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
      let input = this.$refs["add-folder"].querySelector("input");
      let svg = this.$refs["add-folder"].querySelector("svg");
      svg.classList.add("hidden");
      input.classList.remove("hidden");
      input.focus();

      let disableFocusOut = () => {
        input.classList.add("hidden");
        svg.classList.remove("hidden");
        input.value = "";
        input.removeEventListener("focusout", disableFocusOut);
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

.folder-icon{
  height: $default-len !important;
}

input.input[type="text"][name="add-folder"] {
  width: calc(100% - 2 * $min-len);
}
</style>