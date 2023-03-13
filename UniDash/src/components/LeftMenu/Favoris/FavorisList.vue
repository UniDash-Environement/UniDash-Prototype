<template>
  <ul class="favoris-list">
    <li>
      <FavorisFolder>
        <FavoriElement />
        <FavoriElement />
        <FavoriElement />
        <FavoriElement />
      </FavorisFolder>
    </li>
    <li>
      <FavorisFolder>
        <FavoriElement />
        <FavoriElement />
        <FavoriElement />
        <FavoriElement />
      </FavorisFolder>
    </li>
  </ul>
</template>

<script>
import FavorisFolder from "./FavorisFolder.vue";
import FavoriElement from "./FavoriElement.vue";
export default {
  name: "FavorisList",
  components: {
    FavorisFolder,
    FavoriElement
  }
}
</script>

<style scoped lang="scss">
@import "src/style";

.favoris-list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: $min-len;

  li {
    width: 100%;
  }
}
</style>