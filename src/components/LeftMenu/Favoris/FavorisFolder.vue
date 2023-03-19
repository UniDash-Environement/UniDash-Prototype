<template>
  <Box>
    <div class="hover flex" @click="showFolder">
      <FolderIcon class="n"/>
      <span>{{ favorisFolder.name }}</span>
    </div>
    <ul ref="favoris-folder" class="show hidden flex flex-column list-none">
      <FavoriElement v-for="favori in favorisFolder.list" :name="favori.name" :data="favori.data"/>
      <li>
        <div ref="add-favori" class="flex width-100 hover" @click="this.addFavori" >
          <DocumentPlusIcon class="favori-icon show" />
        </div>
      </li>
    </ul>
    <AddElement ref="add-favori-form" :favoris-folder="favorisFolder" class="hidden" />
  </Box>
</template>

<script>
import { FolderIcon } from "@heroicons/vue/24/solid";
import FavoriElement from "./FavoriElement.vue";
import Box from "../../Custom/Box.vue";
import AddElement from "./AddElement.vue";
import { DocumentPlusIcon } from "@heroicons/vue/24/solid";
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  name: "FavorisFolder",
  components: {
    Box,
    FavoriElement,
    FolderIcon,
    DocumentPlusIcon,
    AddElement
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
      let favoriForm = this.$refs["add-favori-form"].$el;
      favoriForm.classList.remove("hidden");

      let childinput = this.$refs["add-favori-form"].$refs["input-list"].querySelector("input");
      childinput.focus();
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
@import "@/style";

.favori-icon{
  height: $default-len;
  padding-left: calc($default-len + $min-len);
}

input.input[type="text"][name="add-favori"] {
  width: calc(100% - 2 * $min-len);
}
</style>