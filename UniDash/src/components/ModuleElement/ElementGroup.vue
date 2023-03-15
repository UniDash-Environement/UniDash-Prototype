<template>
  <main>
    <ul>
      <li v-for="tab in tabList" :data-show="tab.active" class="show-element">
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
    width: calc(100vw - $min-len * 2);
    height: calc(100vh - $min-len * 2);

    padding: $min-len;
    overflow: scroll;

    ul {
      width: 100%;
      height: 100%;

      padding: 0;
      margin: 0;
      list-style-type: none;

      display: flex;
      flex-wrap: wrap;
      gap: $light-len;

      li.show-element {
        height: auto;
        width: auto;
        min-height: calc(50% - $min-len / 2);
        min-width: calc(50% - $min-len / 2);
        flex: 1;

        padding: 0;
        margin: 0;
        display: flex;

        &[data-show="false"] {
          display: none;
        }
      }
    }
  }
</style>