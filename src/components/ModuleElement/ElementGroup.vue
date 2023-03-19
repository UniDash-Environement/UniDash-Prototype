<template>
  <main class="width-100">
    <ul id="element-list" class="width-100 height-100 flex flex-warp list-none">
      <li v-for="tab in tabList" :key="tab.id" :class="tab.active" class="auto-size show">
        <component v-bind:is="tab.data.module" :data="tab.data" />
      </li>
    </ul>
  </main>
</template>

<script>
  import {useStore} from "vuex";
  import {computed} from "vue";
  export default {
    name: "ElementGroup",
    setup() {
      const store = useStore();
      const tabList = computed(() => store.state.tabList);

      return { tabList };
    },
    methods: {
      toggleHidden(event) {
        event.target.classList.toggle("hidden");
      }
    }
  }
</script>

<style scoped lang="scss">
@import "@/style.scss";

main {
  overflow: scroll;
  height: calc(100vh - $super-light-len * 4);
  widows: calc(100vw - $super-light-len * 2);

  padding: $light-len;

  #element-list li {
    margin: calc($super-light-len / 2);
  }
}

</style>