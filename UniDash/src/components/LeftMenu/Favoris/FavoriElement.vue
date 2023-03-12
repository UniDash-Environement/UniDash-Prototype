<template>
  <li class="favori-element">
    <DocumentIcon class="favori-icon" />
    <span data-url="https://www.example.com">Favoris</span>
  </li>
</template>

<script>
import { DocumentIcon } from "@heroicons/vue/20/solid";
export default {
  name: "FavoriElement",
  components: {
    DocumentIcon
  },
}
</script>

<style scoped lang="scss">
@import "src/style";

.favori-element {
  .favori-icon {
    width: $default-len;
    color: $white-color;
    padding-left: 0;
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
}
</style>