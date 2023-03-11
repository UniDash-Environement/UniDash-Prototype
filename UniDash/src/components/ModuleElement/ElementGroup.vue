<template>
  <main>
    <ul>
      <li v-for="url in urls" :key="url">
        <Element :url="url" />
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
    },

    methods: {
      getUrls() {
        const urlList = document.querySelectorAll('.tab[data-url]');
        const urls = [];
        urlList.forEach((tab) => {
          urls.push(tab.dataset.url);
        });
        return urls;
      },

      updateUrls() {
        let urls2 = this.getUrls();
        if (this.urls !== urls2) {
          this.urls = urls2;
          this.$forceUpdate();
        }
      }
    },

    setup() {
      let urls = [];
      return {
        urls
      }
    },

    mounted() {
      setInterval(() => {
        this.updateUrls();
      }, 1000);
    }
  }
</script>

<style scoped lang="scss">
@import "../../style";

  main {
    width: calc(100vw - $min-len * 2 - 4.1vw);
    height: calc(100vh - $min-len * 2);

    padding: $min-len;
    margin: 0 0 0 4.3rem;

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