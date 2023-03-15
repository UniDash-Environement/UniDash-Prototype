<template>
  <div class="favoris-folder">
    <div class="favoris-folder-content">
      <div class="favoris-folder-label" @click="showFolder">
        <FolderIcon class="folder-icon"/>
        <span>{{ favorisFolder.name }}</span>
      </div>
      <ul class="favoris-folder-ul">
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
      let folderItemList = event.target.parentElement.querySelector(".favoris-folder-ul");

      if (!folderItemList) {
        folderItemList = event.target.parentElement.parentElement.parentElement.querySelector(".favoris-folder-ul");
        if (event.target.parentElement.tagName === "svg") {
          folderItemList = event.target.parentElement.parentElement.parentElement.parentElement.querySelector(".favoris-folder-ul");
        }
      }

      document.querySelectorAll(".favoris-folder-ul").forEach(folder => {
        folder.classList.remove("active-ul");
      });
      document.querySelectorAll(".favoris-folder-content").forEach(folder => {
        folder.classList.remove("active-content");
      });

      folderItemList.classList.toggle("active-ul");
      let folderContent = folderItemList.parentElement;
      folderContent.classList.toggle("active-content");
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

.folder-icon {
  width: $default-len;
  color: $white-color;
  padding-left: 0;
}

.favoris-folder {
  background: $gradient-color;
  padding-bottom: $light-len;
  width: 100%;
  border-radius: $medium-min-len;

  .favoris-folder-content {
    width: calc(100% - $light-len * 2);
    height: auto;
    max-height: 20px;
    padding: $light-len;

    background-color: $black-color;
    border-radius: $medium-min-len;

    display: flex;
    flex-direction: column;
    overflow: hidden;

    transition: max-height $long-time ease-out;

    .favoris-folder-label {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      cursor: pointer;

      &:hover {
        background-color: $black-gray-color;
        border-radius: $light-len;
        filter: brightness(1.25);
      }

      span {
        user-select: none;
        padding: 0 $light-len;
        margin: 0;
        font-size: $medium-min-len;
        width: 100%;
      }

      svg {
        padding: 0;
        margin: 0;
        height: 0 $default-len;
      }
    }

    ul {
      list-style: none;
      height: 0;

      visibility: hidden;
      opacity: 0;
    }

    .active-ul {
      height: auto;

      visibility: visible;
      opacity: 1;
    }

    &.active-content {
      max-height: 1000px;
    }
  }
}
</style>