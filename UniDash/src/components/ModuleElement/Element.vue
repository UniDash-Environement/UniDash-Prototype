<template>
  <div class="element">
    <iframe src=""></iframe>
  </div>
</template>

<script>
export default {
  name: "Element"
}
</script>

<style scoped lang="scss">
   @import "../../style";

  .element {
    width: 100%;
    height: 100%;

    border-radius: $default-len;
    background-color: $black-gray-color;

    iframe {
      width: 100%;
      height: 100%;

      border: none;
      border-radius: $default-len;
    }
  }
</style>