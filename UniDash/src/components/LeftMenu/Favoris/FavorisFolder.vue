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
    height: auto;
    max-height: 20px;
    padding: $light-len;

    background-color: $black-color;
    border-radius: $default-len;

    display: flex;
    flex-direction: column;

    transition: max-height 0.5s ease-out;

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
      list-style: none;
      height: 0;

      visibility: hidden;
      opacity: 0;
      transition-delay: 0.5s;
      transition: opacity 0.3s ease-in-out;
    }

    .active-ul {
      height: auto;

      visibility: visible;
      opacity: 1;
      transition-delay: 0.3s;
      transition: opacity 0.3s ease-in-out;
    }

    &.active-content {
      max-height: 1000px;
      transition: max-height 0.5s ease-out;
    }
  }
}
</style>