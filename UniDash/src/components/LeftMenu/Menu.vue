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
  <input ref="menu-hamburger-button" class="menu-hamburger" type="checkbox" id="show-menu-button" tabindex="1" checked>
  <label class="icon-burger" for="show-menu-button" aria-label="Menu"><span></span></label>

  <nav class="left-menu-background-border flex flex-column gradient-bprder">
    <div class="left-menu-background flex flex-column height-100 width-100 content">
      <h1 class="title">UniDash</h1>

      <div id="menu-lists" class="show-checkbox-list flex flex-column width-100 height-100 padding">
        <div class="width-100 height-100 show hidden" id="tab-content">
          <TabsList />
        </div>

        <div class="width-100 height-100 show" id="favoris-content">
          <FavorisList />
        </div>

        <div class="width-100 height-100 show hidden" id="settings-content">
        </div>
      </div>

      <Slider></Slider>
    </div>
  </nav>
</template>

<style scoped lang="scss">
@import "src/style";

.left-menu-background-border {
  height: 100vh;
  width: 20rem;
  padding: 0;

  .left-menu-background {
    background-color: $gray-color;

    #menu-lists {
      overflow: scroll;
    }
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
      }
    }
  }

  &:not(:focus-visible):focus~label{
    box-shadow: 0 0 0 $super-light-len $uni-gradiant-color;
  }
}

nav {
  margin-left: -14.8rem;
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