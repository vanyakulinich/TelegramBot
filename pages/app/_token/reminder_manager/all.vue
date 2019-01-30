<template>
  <v-list>
    <template v-for="(item, itemKey) in reminders">
      <v-subheader :key="itemKey">{{ item.text }}</v-subheader>
    </template>
  </v-list>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "all_reminders",
  computed: {
    ...mapGetters(["reminders"])
  }
};
</script>

<style>
</style>


