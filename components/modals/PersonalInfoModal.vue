<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-btn slot="activator" :color="buttonColor" dark>{{buttonText}}</v-btn>
      <v-card>
        <v-card-title class="headline">
          <div class="dialog">{{selected ? "Edit" : "Add new"}} personal inforamtion</div>
        </v-card-title>
        <v-card-text>
          <v-flex xs12 sm6 md3>
            <v-text-field
              :disabled="!!selected"
              label="field name"
              color="grey lighten-1"
              @input="changeField"
              :value="selected ? selected.name : name"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm6 md3>
            <v-text-field
              label="info"
              color="grey lighten-1"
              @input="changeInfo"
              :value="selected ? selected.value : value"
            ></v-text-field>
          </v-flex>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-grey lighten-3" flat @click="closeDialog">cancel</v-btn>
          <v-btn color="blue-grey lighten-3" flat @click="addNewInfo">{{selected ? "save" : "add"}}</v-btn>
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
      name: "",
      value: ""
    };
  },
  methods: {
    changeField(value) {
      this.name = value;
    },
    changeInfo(value) {
      this.value = value;
    },
    addNewInfo() {
      const name = this.selected ? this.selected.name : this.name;
      const payload = {
        [name]: this.value
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
    },
    selected: {
      type: Object | null,
      default: null
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
