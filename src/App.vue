<script setup>
import Menu from "@/components/LeftMenu/Menu.vue";
import ElementGroup from "@/components/ModuleElement/ElementGroup.vue";
</script>

<template>
  <Menu />
  <ElementGroup ref="elementGroup" />
</template>

<style scoped lang="scss">
@import "@/style.scss";
</style>
