<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-btn slot="activator" :color="buttonColor" dark>{{ buttonText }}</v-btn>
      <v-card>
        <v-card-title class="headline">
          <div class="dialog">{{ selected ? "Edit" : "Add new" }} personal inforamtion</div>
        </v-card-title>
        <v-card-text>
          <v-flex xs12 sm6 md3>
            <Input
              :disabled="!!selected"
              label="field name"
              :inputCB="changeField"
              :value="selected ? selected.name : name"
            />
          </v-flex>
          <v-flex xs12 sm6 md3>
            <Input label="info" :inputCB="changeInfo" :value="selected ? selected.value : value"/>
          </v-flex>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <Button :clickCB="closeDialog" title="cancel"/>
          <Button :clickCB="handleInfo" :title="selected ? 'save' : 'add'" btnColor="#31343b"/>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapActions } from "vuex";
import Input from "../inputs/Input.vue";
import Button from "../buttons/Button.vue";
export default {
  components: {
    Input,
    Button
  },
  name: "PersonalInfoModal",
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

    handleInfo() {
      const name = this.selected ? this.selected.name : this.name;
      const payload = {
        [name]: this.value
      };
      this.manager({
        method: this.selected ? "put" : "post",
        target: "personal",
        payload
      });
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
    ...mapActions(["manager"])
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
.v-input {
  font-size: 22px;
}
</style>
