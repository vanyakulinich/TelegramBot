<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-btn slot="activator" :color="buttonColor" dark>{{buttonText}}</v-btn>
      <v-card>
        <v-card-title class="headline">
          <div class="dialog">Add new personal inforamtion</div>
        </v-card-title>
        <v-card-text>
          <v-flex xs12 sm6 md3>
            <v-text-field
              label="field name"
              color="grey lighten-1"
              @input="changeField"
              :value="field"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm6 md3>
            <v-text-field label="info" color="grey lighten-1" @input="changeInfo" :value="info"></v-text-field>
          </v-flex>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-grey lighten-3" flat @click="closeDialog">cancel</v-btn>
          <v-btn color="blue-grey lighten-3" flat @click="addNewInfo">add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "personalInfoModal",
  data() {
    return {
      dialog: false,
      field: "",
      info: ""
    };
  },
  methods: {
    changeField(value) {
      this.field = value;
    },
    changeInfo(value) {
      this.info = value;
    },
    addNewInfo() {
      const payload = {
        [this.field]: this.info
      };
      this.setPersonalInfo(payload);
      this.clear();
    },
    closeDialog() {
      this.clear();
    },
    clear() {
      this.field = "";
      this.info = "";
      this.dialog = false;
    },
    ...mapActions(["setPersonalInfo"])
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

<style scoped>
.v-text-field,
.dialog,
.v-btn {
  font-family: "Indie Flower", cursive;
}
.v-btn {
  font-size: 20px;
  font-weight: 600;
}
</style>
