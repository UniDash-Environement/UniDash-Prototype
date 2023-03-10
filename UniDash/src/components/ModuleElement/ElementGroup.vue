<template>
  <main>
    <ul>
      <li>
        <Element></Element>
      </li>
      <li>
        <Element></Element>
      </li>
      <li>
        <Element></Element>
      </li>
    </ul>
  </main>
</template>

<script>
  import Element from "./Element.vue";
  export default {
    name: "ElementGroup",
    components: {
      Element
    }
  }
</script>

<style scoped lang="scss">
@import "../../style";

  main {
    width: calc(100vw - $min-len * 2 - 3.8vw);
    height: calc(100vh - $min-len * 2);

    padding: $min-len;
    margin: 0 0 0 3.8vw;

    ul {
      width: 100%;
      height: 100%;

      padding: 0;
      margin: 0;

      display: flex;
      flex-wrap: wrap;
      gap: $min-len;

      li {
        width: auto;
        height: auto;
        min-height: calc(50% - $min-len / 2);
        min-width: calc(50% - $min-len / 2);
        flex: 1;

        display: block;
      }
    }
  }
</style>