<script>
  import Tab from "./Tabs/Tab.vue";
  import FavorisList from "./Favoris/FavorisList.vue";
  import TabsList from "./Tabs/TabsList.vue";
  import { ChevronLeftIcon } from "@heroicons/vue/20/solid";
  import { ChevronRightIcon } from "@heroicons/vue/20/solid";
  import { StarIcon } from "@heroicons/vue/20/solid";
  import { Cog6ToothIcon } from "@heroicons/vue/20/solid";
  import favorisList from "./Favoris/FavorisList.vue";
  import {useStore} from "vuex";
  import {computed} from "vue";
  import BoxHover from "../Custom/BoxHover.vue";

  export default {
    name: "Menu",
    components: {
      BoxHover,
      TabsList,
      FavorisList,
      Tab,
      ChevronLeftIcon,
      ChevronRightIcon,
      StarIcon,
      Cog6ToothIcon
    },
    setup() {
      const store = useStore();
      const tabList = computed(() => store.state.tabList);
      return {
        tabList
      };
    },
    data() {
      return {
        toggleMenu: true
      }
    },
    methods: {
      showEelement(iconId, showElementId) {
        let showSettings = this.$refs["settings-content"];
        let showFavoris = this.$refs["favoris-content"];
        let showTab = this.$refs["tab-content"];

        let settingsIcon = this.$refs["settings-icon"];
        let favorisIcon = this.$refs["favoris-icon"];

        let showElement = this.$refs[showElementId];
        let icon = this.$refs[iconId];

        const hiddenAll = () => {
          showSettings.classList.add("hidden");
          showFavoris.classList.add("hidden");
          showTab.classList.add("hidden");

          settingsIcon.classList.remove("clicked");
          favorisIcon.classList.remove("clicked");
        }

        if (showElement.classList.contains("hidden")) {
          hiddenAll();
          showElement.classList.remove("hidden");
          icon.classList.add("clicked");
        } else {
          hiddenAll();
          showTab.classList.remove("hidden");
        }
      }
    },
    watch: {
      toggleMenu() {
        this.$refs["menu-lists"].classList.toggle("show");
        this.$refs["title"].classList.toggle("hidden");
        this.$refs["tab-content"].classList.toggle("hidden");
        this.$refs["favoris-content"].classList.toggle("hidden");
        this.$refs["settings-content"].classList.toggle("hidden");
        this.$refs["slider"].classList.toggle("hidden");
      }
    }
  }
</script>

<template>
  <input v-model="toggleMenu" ref="menu-hamburger-button" class="menu-hamburger" type="checkbox" id="show-menu-button">
  <label class="icon-burger" for="show-menu-button" aria-label="Menu"><span></span></label>

  <nav class="left-menu-background-border flex flex-column gradient-bprder">
    <div class="left-menu-background flex flex-column flex-g height-100 width-100 content">
      <h1 ref="title" class="title">UniDash</h1>

      <div ref="menu-lists" class="show-checkbox-list flex flex-column width-100 height-100 padding">
        <div class="width-100 height-100 show hidden" ref="tab-content">
          <TabsList />
        </div>

        <div class="width-100 height-100 show" ref="favoris-content">
          <FavorisList />
        </div>

        <div class="width-100 height-100 show hidden" ref="settings-content">
        </div>
      </div>

      <div ref="slider" class="padding">
        <BoxHover class="slider">
          <ChevronLeftIcon class="chevron" />
          <div class="flex flex-center flex-between width-100">
            <StarIcon ref="favoris-icon" class="clicked" @click="showEelement('favoris-icon', 'favoris-content')" />
            <span>Server 1</span>
            <Cog6ToothIcon ref="settings-icon" @click="showEelement('settings-icon', 'settings-content')" />
          </div>
          <ChevronRightIcon class="chevron" />
        </BoxHover>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
@import "src/style";

.chevron {
  width: $max-len;
}

.left-menu-background-border {
  height: 100vh;
  width: 20rem;
  padding: 0;
  border-radius: 0;
  margin: 0;

  .left-menu-background {
    background-color: $gray-color;
    border-radius: 0;
    width: calc(100% - $light-len);

    #menu-lists {
      overflow: scroll;
    }

    .slider {
      margin: 0;
    }
  }
}

.padding .gradient-bprder .content {
  width: 100%;
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
    background: $black-color;
    border-radius: $medium-min-len;

    span {
      width: 100%;
      height: $super-light-len;

      background: $uni-gradiant-color;
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
        background: $uni-gradiant-color;
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
        margin-left: 0 !important;
      }
    }
  }

  &:not(:focus-visible):focus~label{
    box-shadow: 0 0 0 $super-light-len $uni-gradiant-color;
  }
}

nav {
  margin-left: -14.7rem !important;
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