<template>
  <v-app id="inspire">
    <v-toolbar
      color="blue-grey"
      dark
      fixed
      app
      clipped-right
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer">
        <v-icon x-large>home</v-icon>
      </v-toolbar-side-icon>
      <v-toolbar-title>Your Personal Reminder Manager</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile @click.stop="drawer = !drawer">
          <v-list-tile-content>
            <v-list-tile-title>
              <router-link 
                :to="`/app/${token}/reminder_manager`"
              >
                Reminder Manager
              </router-link>
            </v-list-tile-title>
            <v-list-tile-title>
              <router-link 
                :to="`/app/${token}/personal_info`"
              >
                Personal Info
              </router-link>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer
      v-model="left"
      temporary
      fixed
    ></v-navigation-drawer>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex shrink>
            <transition name="fade" mode="out-in">
              <router-view class="view"></router-view>
            </transition>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'layout',
  data: () => ({
    drawer: null,
    drawerRight: null,
    right: false,
    left: false,
  }),
  props: {
    source: String
  },
  computed: {
    token () {
      return this.$route.params.token;
    }
  }
}
</script>

