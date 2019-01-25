<template>
  <v-app id="sandbox" dark>
    <v-navigation-drawer
      class="menu_wrap"
      v-model="primaryDrawer.model"
      :permanent="primaryDrawer.type === 'permanent'"
      :temporary="primaryDrawer.type === 'temporary'"
      :clipped="primaryDrawer.clipped"
      :floating="primaryDrawer.floating"
      :mini-variant="primaryDrawer.mini"
      absolute
      overflow
      app
    >
      <v-container fluid class="menu">
        <v-layout align-center justify-center>
          <v-flex xs10>
            <v-card-title class="menu_title">Menu</v-card-title>
            <div class="close_icon" @click.stop="primaryDrawer.model = !primaryDrawer.model">
              <v-icon x-large>mdi-close</v-icon>
            </div>
            <v-card class="menu_items_wrap">
              <v-card-title class="menu_item_subtitle">Reminder Manager</v-card-title>
              <v-card-text class="menu_link_wrap">
                <nuxt-link :to="`/app/${token}/reminder_manager/all`" class="menu_link">My Reminders</nuxt-link>
              </v-card-text>
              <v-card-text class="menu_link_wrap">
                <nuxt-link
                  :to="`/app/${token}/reminder_manager/new`"
                  class="menu_link"
                >Add New Reminder</nuxt-link>
              </v-card-text>
            </v-card>
            <v-card class="menu_items_wrap">
              <v-card-title class="menu_item_subtitle">Personal Info</v-card-title>
              <v-card-text class="menu_link_wrap">
                <nuxt-link
                  :to="`/app/${token}/personal_info`"
                  class="menu_link"
                >Manage Personal Info</nuxt-link>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="primaryDrawer.clipped" app absolute>
      <div v-if="!error">
        <v-toolbar-side-icon
          v-if="primaryDrawer.type !== 'permanent'"
          @click.stop="primaryDrawer.model = !primaryDrawer.model"
        ></v-toolbar-side-icon>
      </div>
      <v-toolbar-title>
        <span class="toolbar_title">Reminder Manager</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs10>
            <v-card>
              <v-card-text class="content_wrap">
                <nuxt/>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    dark: true,
    drawers: ["Default (no property)", "Permanent", "Temporary"],
    primaryDrawer: {
      model: null,
      type: "default (no property)",
      clipped: false,
      floating: false,
      mini: false
    },
    isError: false
  }),
  computed: {
    token() {
      return this.$route.params.token;
    },
    error() {
      return this.$nuxt.nuxt.err;
    }
  }
};
</script>

<style>
.menu_wrap {
  height: 200px;
}
.menu .menu_items_wrap {
  padding: 0;
}
.menu_items_wrap {
  text-align: center;
  margin: 25px 0;
}
.menu_title {
  font-family: "Permanent Marker", cursive;
  font-size: 35px;
  justify-content: center;
}
.menu_item_subtitle {
  font-family: "Indie Flower", cursive;
  font-weight: 500;
  font-size: 25px;
  color: rgba(191, 191, 191, 0.6);
}
.menu_link {
  text-decoration: none;
  color: inherit;
  font-size: 20px;
  margin: 5px auto;
  font-family: "Indie Flower", cursive;
}
.menu_link_wrap {
  text-align: right;
}
.toolbar_title {
  font-family: "Indie Flower", cursive;
  font-size: 30px;
}
.content_wrap {
  font-family: "Gloria Hallelujah", cursive;
}
.close_icon {
  position: absolute;
  top: 15px;
  right: 8px;
  cursor: pointer;
}
</style>



