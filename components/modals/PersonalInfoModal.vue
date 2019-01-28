<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-btn slot="activator" :color="buttonColor" dark>{{buttonText}}</v-btn>
      <v-card>
        <v-card-title class="headline">Use Google's location service?</v-card-title>
        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="dialog = false">cancel</v-btn>
          <v-btn color="green darken-1" flat @click="dialog = false">add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: "personalInfoModal",
  data() {
    return {
      dialog: false
    };
  },
  props: {
    buttonText: {
      type: String,
      default: ""
    },
    buttonColor: {
      type: String,
      default: ""
    }
  }
};
</script>