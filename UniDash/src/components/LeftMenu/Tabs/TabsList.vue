<template>
  <ul class="tab-list">
    <li v-for="tab in this.tabList"><Tab :tab="tab" /></li>
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

#add-tab {
  display: none;
}

.tab-list {
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