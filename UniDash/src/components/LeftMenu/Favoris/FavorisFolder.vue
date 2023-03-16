<template>
  <Box>
    <div class="hover flex" @click="showFolder">
      <FolderIcon class="n"/>
      <span>{{ favorisFolder.name }}</span>
    </div>
    <ul ref="favoris-folder" class="show hidden flex flex-column list-none">
      <FavoriElement v-for="favori in favorisFolder.list" :name="favori.name" :data="favori.data"/>
      <li>
        <div ref="add-favori" class="flex width-100 hover" @click="addFavoriShowUpdater" >
          <DocumentPlusIcon class="favori-icon show" />
          <input type="text" @keydown.enter="this.addFavori" name="add-favori" class="input hover show hidden">
        </div>
      </li>
    </ul>
  </Box>
</template>

<script>
import { FolderIcon } from "@heroicons/vue/24/solid";
import FavoriElement from "./FavoriElement.vue";
import Box from "../../Custom/Box.vue";
import favoris from "../../../settings/favoris.json";
import { DocumentPlusIcon } from "@heroicons/vue/24/solid";
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  name: "FavorisFolder",
  components: {
    Box,
    FavoriElement,
    FolderIcon,
    DocumentPlusIcon
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
    showFolder(event) {
      let folderItemList = this.$refs["favoris-folder"];
      folderItemList.classList.toggle("hidden");
    },
    addFavori() {
      let favorisFolderList = this.favorisFolderList;
      let favorisFolder = favorisFolderList.find(favorisFolder => favorisFolder.id === this.favorisFolder.id)

      let newFavori = {
        name: this.$refs["add-favori"].querySelector("input").value,
        data: {
          module: "IframeElement",
          url: "https://www.example.com"
        }
      }
      favorisFolder.list.push(newFavori);
      favorisFolderList.find(favorisFolder => favorisFolder.id === this.favorisFolder.id).list = favorisFolder.list

      this.updateFavorisFolderList(favorisFolderList);

      this.disableFocusOut();
    },
    disableFocusOut() {
      let input = this.$refs["add-favori"].querySelector("input");
      let svg = this.$refs["add-favori"].querySelector("svg");

      input.classList.add("hidden");
      svg.classList.remove("hidden");
      input.value = "";
      input.removeEventListener("focusout", this.disableFocusOut);
    },
    addFavoriShowUpdater() {
      let input = this.$refs["add-favori"].querySelector("input");
      let svg = this.$refs["add-favori"].querySelector("svg");
      svg.classList.add("hidden");
      input.classList.remove("hidden");
      input.focus();

      if (! input.classList.contains("hidden")) {
        input.addEventListener("focusout", this.disableFocusOut);
      }
    },
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

.favori-icon{
  height: $default-len;
  padding-left: calc($default-len + $min-len);
}

input.input[type="text"][name="add-favori"] {
  width: calc(100% - 2 * $min-len);
}
</style>