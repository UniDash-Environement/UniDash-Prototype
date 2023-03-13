<script>
  import Tab from "./Tabs/Tab.vue";
  import Slider from "./Slider.vue";
  import FavorisList from "./Favoris/FavorisList.vue";
  import TabsList from "./Tabs/TabsList.vue";

  export default {
    name: "Menu",
    components: {
      TabsList,
      FavorisList,
      Tab,
      Slider
    },
    methods: {
      ifShowUpdater(event) {
        let checkboxList = document.querySelectorAll(".show-checkbox-list>input[type='checkbox']");
        checkboxList.forEach(checkbox => {
          checkbox.checked = false;
        });
        event.target.checked = true;
      }
    }
  }
</script>

<template>
  <input ref="menu-hamburger-button" class="menu-hamburger" type="checkbox" id="show-menu-button" tabindex="1">
  <label class="icon-burger" for="show-menu-button" aria-label="Menu"><span></span></label>

  <nav class="left-menu-background-border">
    <div class="left-menu-background">
      <h1 class="title hidden">UniDash</h1>

      <div class="show-checkbox-list">
        <input id="show-tab" type="checkbox" checked @click="ifShowUpdater">
        <input id="show-favoris" type="checkbox" @click="ifShowUpdater">
        <input id="show-settings" type="checkbox" @click="ifShowUpdater">

        <div class="tab-content">
          <TabsList class="hidden" />
        </div>

        <div class="favoris-content">
          <FavorisList class="hidden" />
        </div>

        <ul class="settings-content">
        </ul>
      </div>

      <Slider class="hidden"></Slider>
    </div>
  </nav>
</template>

<style scoped lang="scss">
@import "src/style";

.left-menu-background-border {
  background: $gradient-color;
  height: 100vh;
  width: 20rem;
  padding-right: $light-len;
  border-radius: 0 $default-len $default-len 0;

  .left-menu-background {
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    background-color: $gray-color;
    height: 100vh;
    width: 100%;
    border-radius: 0 $default-len $default-len 0;
    padding: $min-len;

    .show-checkbox-list {
      width: 100%;
      height: 100%;

      #show-tab:checked ~ .tab-content,
      #show-favoris:checked ~ .favoris-content,
      #show-settings:checked ~ .settings-content {
        opacity: 1;
        visibility: visible;
        position: static;
      }

      .show-checkbox-list {
        display: none;
      }

      .tab-content, .favoris-content, .settings-content {
        width: 100%;
        height: 100%;

        position: absolute;
        left: -100vw;

        opacity: 0;
        visibility: hidden;
        transition: opacity $light-time ease-in-out, visibility $light-time ease-in-out;
      }
    }
  }

  .hidden {
    visibility: hidden;
    opacity: 0;
    transition: visibility $default-time, opacity $default-time $light-time;
  }
}

.menu-hamburger {
  &+label {
    width: $max-len;
    height: $max-len;
    z-index: 9999;

    display:flex;
    align-items:center;
    justify-content: center;

    position: fixed;
    top: $min-len;
    left: $min-len;

    cursor: pointer;
    background: $white-color;
    border-radius: $medium-min-len;

    span {
      width: 100%;
      height: $super-light-len;

      background: $gradient-color;
      position: relative;

      &::before {
        top: - calc($super-light-len * 1.5);
      }

      &::after {
        top: calc($super-light-len * 1.5);
      }

      &::before, &::after {
        width: inherit;
        height: inherit;

        position: absolute;
        background: $gradient-color;
        content: "";
      }
    }
  }

  &:checked+label {
    span {
      background: transparent;

      &::before, &::after {
        top: 0;
      }

      &::before {
        transform: rotate(45deg);
      }

      &::after {
        transform: rotate(-45deg);
      }
    }

    &~ {
      nav {
        margin-left: 0;

        .hidden {
          visibility: visible;
          opacity: 1;
        }
      }
    }
  }

  &:not(:focus-visible):focus~label{
    box-shadow: 0 0 0 $super-light-len $uni-gray-color;
  }
}

nav {
  margin-left: -15.6rem;
  transition: margin-left $default-time;

  ul {
    list-style-type: none;
    padding:0;

    li {
      margin-bottom: $default-len;
    }
  }
}

*,*::before, *::after {
  box-sizing: border-box
}

input[type="checkbox"] {
  position: absolute;
  left: -100vw;
}

.menu-hamburger:focus-visible~label,
nav .hidden:focus-visible,
nav .hidden:focus {
  transition: outline-offset .25s ease;
}

@media (prefers-reduced-motion: no-preference) {
  .menu-hamburger {
    &+label span {
      transition: background 10ms 300ms;

      &::before, &::after {
        transition: top $default-time $default-time, transform $default-time 50ms;
      }
    }

    &:checked+label span {
      &::before, &::after {
        transition: top $default-time 50ms, transform $default-time $default-time
      }
    }
  }
}
</style>