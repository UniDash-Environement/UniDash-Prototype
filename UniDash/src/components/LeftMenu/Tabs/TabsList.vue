<template>
  <ul class="tab-list width-100 height-100 flex flex-column">
    <li class="width-100" v-for="tab in this.tabList" :key="tab.id"><Tab :tab="tab" /></li>
  </ul>
</template>

<script>
import Tab from "./Tab.vue";
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: "TabList",
  components: {
    Tab
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

.tab-list {
  overflow: scroll;
}
</style>