<template>
  <li class="flex width-100 hover padding-left" @click="addTab">
    <DocumentIcon class="" />
    <input type="checkbox" name="favoris-checkbox" class="" hidden="hidden">
    <span>{{ name }}</span>
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
    data: {
      type: Object,
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
      let id = Date.now().toString();
      let newTab = {
        name: this.name,
        data: this.data,
        active: "",
        id: id
      };

      tabList.push(newTab);
      this.updateTabList(tabList);
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/style";
</style>