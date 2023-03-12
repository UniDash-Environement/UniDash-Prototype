<template>
  <div class="favoris-folder" @click="showFolder">
    <div class="favoris-folder-content">
      <div class="favoris-folder-label">
        <FolderIcon class="folder-icon" />
        <span>Folder</span>
      </div>
      <ul class="favoris-folder-ul">
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<script>
import { FolderIcon } from "@heroicons/vue/24/solid";
export default {
  name: "FavorisFolder",
  components: {
    FolderIcon
  },
  methods: {
    showFolder(event) {
      let folderItemList = event.target.querySelector(".favoris-folder-ul");

      if (!folderItemList) {
        folderItemList = event.target.parentElement.parentElement.querySelector(".favoris-folder-ul");
        if (event.target.parentElement.tagName === "svg") {
          folderItemList = event.target.parentElement.parentElement.parentElement.querySelector(".favoris-folder-ul");
        }
      }

      folderItemList.classList.toggle("active");
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
  border-radius: $default-len;

  .favoris-folder-content {
    width: calc(100% - $light-len * 2);
    height: calc(100% - $light-len * 2);
    padding: $light-len;
    background-color: $black-color;
    border-radius: $default-len;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .favoris-folder-label {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      cursor: pointer;
    }

    span {
      user-select: none;
      padding: 0 $light-len;
      margin: 0;
      font-size: $medium-min-len;
    }

    svg {
      padding: 0;
      margin: 0;
      height: 0 $default-len;
    }

    ul {
      display: none;
    }

    .active {
      display: block;
    }
  }
}
</style>