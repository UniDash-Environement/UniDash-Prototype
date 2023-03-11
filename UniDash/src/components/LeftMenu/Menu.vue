<script>
  import Tab from "./Tabs/Tab.vue";
  import Slider from "./Tabs/Slider.vue";
  export default {
    name: "Menu",
    components: {
      Tab,
      Slider
    }
  }
</script>

<template>
  <input ref="menu-hamburger-button" class="menu-hamburger" type="checkbox" id="show-menu-button" tabindex="1">
  <label class="icon-burger" for="show-menu-button" aria-label="Menu"><span></span></label>

  <nav class="left-menu-background-border">
    <div class="left-menu-background">
      <h1 class="title">UniDash</h1>

      <ul class="content">
        <li><Tab url="https://www.example.com" /></li>
        <li><Tab url="https://proxy.heurepika.com" /></li>
        <li><Tab url="https://proxmox.heurepika.com" /></li>
        <li><Tab url="https://www.example.com" /></li>
      </ul>

      <slider />
    </div>
  </nav>
  <div id="menu-right-join" @click="this.$refs['menu-hamburger-button'].checked = false"></div>
</template>

<style scoped lang="scss">
@import "../../style";

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

    .content {
      width: 100%;
      padding: $min-len 0;
      height: 100%;
      display: flex;
      justify-content: start;
      align-items: center;
      flex-direction: column;

      li {
        width: 100%;
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