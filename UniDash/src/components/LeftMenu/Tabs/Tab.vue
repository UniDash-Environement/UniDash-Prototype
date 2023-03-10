<template>
  <div class="tab">
    <div class="tab-content">
      <p>Tab</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tab"
}
</script>

<style scoped lang="scss">
  @import "../../../style";

  .tab {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: $gradient-color;
    padding-bottom: $light-len;
    width: 100%;
    border-radius: $default-len;
  }
  .tab-content {
    width: 100%;
    background-color: $black-color;
    border-radius: $default-len;
  }
</style>