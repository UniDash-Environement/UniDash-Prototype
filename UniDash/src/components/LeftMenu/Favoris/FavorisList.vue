<template>
  <ul class="flex list-none flex-column width-100 height-100">
    <li v-for="favoriFolder in favorisFolderList">
      <FavorisFolder :favoris-folder="favoriFolder" />
    </li>
    <li>
      <Box>
        <div ref="add-folder" class="hover flex flex-column flex-center show" @click="addFolderShowUpdater" >
          <FolderPlusIcon class="folder-icon show" />
          <input type="text" @keydown.enter="this.addFolder" name="add-folder" class="input hover show hidden">
        </div>
      </Box>
    </li>
  </ul>
</template>

<script>
import FavorisFolder from "./FavorisFolder.vue";
import FavoriElement from "./FavoriElement.vue";
import { FolderPlusIcon } from "@heroicons/vue/24/solid";
import Box from "../../Custom/Box.vue";

import favoris from '../../../settings/favoris.json' assert {type: 'json'};
import {useStore} from "vuex";
import {computed} from "vue";

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
    FolderPlusIcon,
    Box
  },
  setup() {
    const store = useStore();

    const favorisFolderList = computed(() => store.state.favorisFolderList);
    function updateFavorisFolderList(newList) {
      store.commit('updateFavorisFolderList', newList);
    }

    return {
      updateFavorisFolderList,
      favorisFolderList
    };
  },
  methods: {
    disableFocusOut() {
      let input = this.$refs["add-folder"].querySelector("input");
      let svg = this.$refs["add-folder"].querySelector("svg");

      input.classList.add("hidden");
      svg.classList.remove("hidden");
      input.value = "";
      input.removeEventListener("focusout", this.disableFocusOut);
    },
    addFolderShowUpdater() {
      let input = this.$refs["add-folder"].querySelector("input");
      let svg = this.$refs["add-folder"].querySelector("svg");
      svg.classList.add("hidden");
      input.classList.remove("hidden");
      input.focus();

      if (! input.classList.contains("hidden")) {
        input.addEventListener("focusout", this.disableFocusOut);
      }
    },
    addFolder(event) {
      let input = event.target;
      let favorisFolderList = this.favorisFolderList;

      if (input.value !== "") {
        let newFolder = {
          "id": Date.now().toString(),
          "name": input.value,
          "list": []
        }

        favorisFolderList.push(newFolder);
        this.updateFavorisFolderList(favorisFolderList);

        this.disableFocusOut();
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/style";

.folder-icon{
  height: $default-len;
}

input.input[type="text"][name="add-folder"] {
  width: calc(100% - 2 * $min-len);
}
</style>