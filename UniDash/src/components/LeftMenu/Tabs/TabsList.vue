<template>
  <ul class="tab-list">
    <li><Tab url="https://www.example.com/" /></li>
    <li><Tab url="https://www.example.com" /></li>
    <li><Tab url="https://www.example.com" /></li>
    <li><Tab url="https://www.example.com" /></li>
  </ul>
</template>

<script>
import Tab from "./Tab.vue";

export default {
  name: "TabList",
  components: {Tab}
}
</script>

<style scoped lang="scss">
@import "src/style";

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