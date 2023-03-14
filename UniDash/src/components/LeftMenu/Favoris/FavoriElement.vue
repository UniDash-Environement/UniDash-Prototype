<template>
  <li class="favori-element" @click="addTab">
    <DocumentIcon class="favori-icon" />
    <input type="checkbox" name="favoris-checkbox" class="favoris-checkbox" hidden="hidden">
    <span :data-url="url">{{ name }}</span>
  </li>
</template>

<script>
import { DocumentIcon } from "@heroicons/vue/20/solid";
import { useStore } from "vuex";
export default {
  name: "FavoriElement",
  components: {
    DocumentIcon
  },
  props: {
    url: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  setup() {
    const store = useStore();

    function updateTabList(newList) {
      store.commit('updateTabList', newList);
    }

    return { updateTabList };
  },
  methods: {
    addTab() {
      let tabList = this.$store.state.tabList;
      let newTab = {
        name: this.name,
        url: this.url,
        active: true,
        id: Date.now().toString()
      };
      tabList.push(newTab);
      this.updateTabList(tabList);
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/style";

.favori-element {
  span {
    user-select: none;
    padding: 0 $light-len;
    margin: 0;
    font-size: $medium-min-len;
  }

  svg {
    padding: 0;
    margin: 0;
    width: $default-len;
    color: $white-color;
  }
}
</style>