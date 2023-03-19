<template>
  <Box>
    <div class="hover flex" @click="showFolder">
      <FolderIcon class="n"/>
      <span>{{ favoritesFolder.name }}</span>
    </div>
    <ul ref="favorites-folder" class="show hidden flex flex-column list-none">
      <FavoriteElement v-for="favorite in favoritesFolder.list" :name="favorite.name" :data="favorite.data"/>
      <li>
        <div ref="add-favorite" class="flex width-100 hover" @click="this.addFavorite" >
          <DocumentPlusIcon class="favorite-icon show" />
        </div>
      </li>
    </ul>
    <AddElement ref="add-favorite-form" :favorites-folder="favoritesFolder" class="hidden" />
  </Box>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

import { DocumentPlusIcon, FolderIcon } from "@heroicons/vue/24/solid";

import Box from "@/components/Custom/Box.vue";
import AddElement from "@/components/LeftMenu/Favorites/FavoriteAdd.vue";
import FavoriteElement from "@/components/LeftMenu/Favorites/FavoriteElement.vue";


export default {
  name: "FavoritesFolder",
  components: {
	  AddElement,
	  Box,
	  DocumentPlusIcon,
	  FavoriteElement,
	  FolderIcon,
  },
  setup() {
    const store = useStore();
    const favoritesFolderList = computed(() => store.state.favoritesFolderList);

    function updateFavoritesFolderList(newList) {
      store.commit('updateFavoritesFolderList', newList);
    }

    return {
      updateFavoritesFolderList,
      favoritesFolderList
    };
  },
  methods: {
    showFolder(event) {
      let folderItemList = this.$refs["favorites-folder"];
      folderItemList.classList.toggle("hidden");
    },
    addFavorite() {
      let favoriteForm = this.$refs["add-favorite-form"].$el;
      favoriteForm.classList.remove("hidden");

      let childinput = this.$refs["add-favorite-form"].$refs["input-list"].querySelector("input");
      childinput.focus();
    }
  },
  props: {
    favoritesFolder: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/style";

.favorite-icon{
  height: $default-len;
  padding-left: calc($default-len + $min-len);
}

input.input[type="text"][name="add-favorite"] {
  width: calc(100% - 2 * $min-len);
}
</style>