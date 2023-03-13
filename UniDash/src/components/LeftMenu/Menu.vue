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
      <h1 class="title">UniDash</h1>

      <div class="show-checkbox-list">
        <input id="show-tab" type="checkbox" checked @click="ifShowUpdater">
        <input id="show-favoris" type="checkbox" @click="ifShowUpdater">
        <input id="show-settings" type="checkbox" @click="ifShowUpdater">

        <div class="tab-content">
          <TabsList />
        </div>

        <div class="favoris-content">
          <FavorisList />
        </div>

        <ul class="settings-content">
        </ul>
      </div>

      <Slider></Slider>
    </div>
  </nav>
  <div id="menu-right-join" @click="this.$refs['menu-hamburger-button'].checked = false"></div>
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

      #show-tab:checked ~ .tab-content, #show-favoris:checked ~ .favoris-content, #show-settings:checked ~ .settings-content {
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
        transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;

        li {
          width: 100%;
        }
      }
    }
  }
}

*,*::before, *::after {
  box-sizing: border-box
}

// ICONE HAMBURGER
input[type="checkbox"] {

  position: absolute;
  left: -100vw;

}

.menu-hamburger{
  &+label {
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    display:flex;
    align-items:center;
    justify-content: center;
    position: fixed;
    top: $min-len;
    left: $min-len;
    z-index: 9999;
    background: $white-color;
    border-radius: 0.7rem;

    span {
      background: $gradient-color;
      width: 100%;
      height: 0.2rem;
      position: relative;

      &::before {
        top: -0.3rem;
      }

      &::after {
        top: 0.3rem;
      }

      &::before, &::after {
        position: absolute;
        background: $gradient-color;
        width: inherit;
        height: inherit;
        content: "";
      }
    }
  }

  &:checked+label span {
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
}

// MENU SLIDE
nav {
  position: fixed;
  left: 0;
  top: 0;
  transform: translateX(-15.6rem);
  will-change: transform;
  z-index: 9998;

  ul {
    list-style-type: none;
    padding-left:0;
    margin: 0;

    li {
      margin-bottom: $default-len;
    }
  }
}

.menu-hamburger:checked+label~ {
  nav {
    transform: unset;

    .tab, .slider, .title {
      visibility: visible;
      opacity: 1;
    }
  }

  #menu-right-join {
    display: block;
  }
}

.tab, .slider, .title {
  visibility: hidden;
  opacity: 0;
}

#menu-right-join {
  display: none;
}

// Accessibilité

.menu-hamburger:not(:focus-visible):focus~label{
  box-shadow: 0 0 0 4px hsl(248, 78%, 58%)
}

@media (prefers-reduced-motion: no-preference) {
  .menu-hamburger {
    &+label span {
      transition: background 10ms 300ms;

      &::before, &::after {
        transition: top 300ms 350ms, transform 300ms 50ms;
      }
    }

    &:checked+label span {
      &::before, &::after {
        transition: top 300ms 50ms, transform 300ms 350ms;
      }
    }
  }
}

nav {
  transition: transform 0.5s;

  a {
    transition: visibility 500ms,opacity 500ms 300ms;
  }
}

.menu-hamburger:focus-visible~label,
nav .tab:focus-visible,
nav .title:focus-visible,
nav .slider:focus-visible,
nav .tab:focus,
nav .title:focus,
nav .slider:focus {
  transition: outline-offset .25s ease;
}

nav {
  transition: transform 0.5s;
}

.tab,
.slider,
.title {
  transition: visibility 500ms,opacity 500ms 300ms;
}

#menu-right-join {
  position: absolute;
  z-index: 9999;

  width: calc(100vw - 20rem);
  height: 100vh;

  top: 0;
  left: 20rem;
}
</style>