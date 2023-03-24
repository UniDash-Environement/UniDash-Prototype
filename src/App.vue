<script setup>
import MenuLeft from "@/components/leftMenu/MenuLeft.vue";
import TabItemsElementsList from "@/components/main/TabItemsElementsList.vue";
</script>

<template>
  <MenuLeft />
  <TabItemsElementsList ref="elementGroup" />
</template>

<style scoped lang="scss">
@import "@/style.scss";
</style>
