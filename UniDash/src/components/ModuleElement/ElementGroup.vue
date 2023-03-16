<template>
  <main class="width-100">
    <ul id="element-list" class="width-100 height-100 flex flex-warp list-none">
      <li v-for="tab in tabList" v-show="tab.active" class="auto-size">
        <Element :data="tab.data" />
      </li>
    </ul>
  </main>
</template>

<script>
  import Element from "./Element.vue";
  import {useStore} from "vuex";
  import {computed} from "vue";
  export default {
    name: "ElementGroup",

    components: {
      Element
    },
    setup() {
      const store = useStore();
      const tabList = computed(() => store.state.tabList);

      return { tabList };
    }
  }
</script>

<style scoped lang="scss">
@import "src/style";

main {
  overflow: scroll;
  height: calc(100vh - $light-len * 2);
  widows: calc(100vw - $light-len * 2);

  padding: $light-len;

  #element-list {
    gap: $super-light-len;
  }
}

</style>