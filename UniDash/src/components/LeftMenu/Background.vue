
<script>
  import Tab from "./Tabs/Tab.vue";
  export default {
    name: "Background",
    components: {
      Tab
    }
  }
</script>

<template>
  <div class="left-menu-background-border">
    <div class="left-menu-background">
      <h1>UniDash</h1>
      <div class="content">
        <Tab />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../style";

.left-menu-background {
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  background-color: #2F393D;
  height: 100vh;
  width: 100%;
  border-radius: 0 $default-len $default-len 0;

  .content {
    width: calc(100% - $default-len);
    padding: $default-len;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
  }
}

.left-menu-background-border {
  background: linear-gradient(to bottom right, #00B2FF, #8000FF);
  height: 100vh;
  width: 20rem;
  padding-right: $light-len;
  border-radius: 0 $default-len $default-len 0;
}
</style>