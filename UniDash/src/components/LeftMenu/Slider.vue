<template>
  <div class="padding">
    <div class="gradient-bprder width-100">
      <div class="content width-100">
        <div class="hover flex flex-center flex-between width-100">
          <ChevronLeftIcon class="chevron" />
          <div class="flex flex-center flex-between width-100">
            <StarIcon ref="favoris-icon" class="clicked" @click="showEelement('favoris-icon', 'favoris-content')" />
            <span>Server 1</span>
            <Cog6ToothIcon ref="settings-icon" @click="showEelement('settings-icon', 'settings-content')" />
          </div>
          <ChevronRightIcon class="chevron" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronLeftIcon } from "@heroicons/vue/20/solid";
import { ChevronRightIcon } from "@heroicons/vue/20/solid";
import { StarIcon } from "@heroicons/vue/20/solid";
import { Cog6ToothIcon } from "@heroicons/vue/20/solid";

export default {
  name: "Tab",
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
    StarIcon,
    Cog6ToothIcon
  },
  methods: {
    showEelement(iconId, showElementId) {
      let showSettings = document.getElementById("settings-content");
      let showFavoris = document.getElementById("favoris-content");
      let showTab = document.getElementById("tab-content");

      let settingsIcon = this.$refs["settings-icon"];
      let favorisIcon = this.$refs["favoris-icon"];

      let showElement = document.getElementById(showElementId);
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
  }
}
</script>

<style scoped lang="scss">
@import "../../style";

.chevron {
  width: $max-len;
}
</style>