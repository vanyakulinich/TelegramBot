<template>
  <v-app id="inspire">
    <v-toolbar color="blue-grey" dark fixed app clipped-right>
      <v-toolbar-side-icon @click.stop="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-toolbar-side-icon>
      <v-toolbar-title>Your Personal Reminder Manager</v-toolbar-title>
      <v-spacer/>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" fixed app class="menu">
      <v-list dense>
        <v-list-tile-content>
          <nuxt-link
            @click.stop="drawer = !drawer"
            :to="`/app/${token}/reminder_manager`"
            class="menu_link"
          >Reminder Manager</nuxt-link>
          <nuxt-link
            @click.stop="drawer = !drawer"
            :to="`/app/${token}/personal_info`"
            class="menu_link"
          >Personal Info</nuxt-link>
        </v-list-tile-content>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer v-model="left" temporary fixed/>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex shrink>
            <nuxt/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "layout",
  data: () => ({
    drawer: false,
    left: false
  }),
  props: {
    source: {
      default: "",
      type: String
    }
  },
  computed: {
    token() {
      return this.$route.params.token;
    }
  }
};
</script>

<style scoped>
.icon {
  z-index: 2;
}
.menu {
  top: 65px;
}
.menu_link {
  text-decoration: none;
  font-size: 30px;
  margin: 10px;
}
</style>


