<template>
  <v-layout>
    <v-flex>
      <ContentHeader text="Add New Reminder"/>
      <v-card class="card">
        <div>
          <Input label="Reminder Text" :inputCB="reminderText"/>
          <div v-if="text">
            <Datepicker :todayDate="todayDate" :changeDate="changeDate" title="Pick a date"/>
          </div>
          <div v-if="date">
            <Timepicker :changeTime="changeTime" title="Pick a time" :minTimeHours="minTimeHours"/>
          </div>
        </div>

        <v-card-actions class="form_buttons" v-if="time && time.mins">
          <Button title="Add" btnColor="blue accent-1"/>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Button from "../../../../components/buttons/Button.vue";
import ContentHeader from "../../../../components/headers/ContentHeader.vue";
import Input from "../../../../components/inputs/Input.vue";
import Datepicker from "../../../../components/inputs/Datepicker.vue";
import Timepicker from "../../../../components/inputs/Timepicker.vue";

export default {
  name: "add_new_reminder",
  components: {
    Button,
    ContentHeader,
    Input,
    Datepicker,
    Timepicker
  },
  data() {
    return {
      todayDate: new Date().toISOString().split("T")[0],
      text: "",
      date: null,
      time: null,
      minTimeHours: null
    };
  },
  methods: {
    reminderText(value) {
      this.text = value;
    },
    changeDate(val) {
      this.date = val;
    },
    changeTime(val) {
      this.time = val;
    }
  },
  watch: {
    date: function() {
      const h = new Date(Date.now()).getHours();
      this.minTimeHours = h;
    }
  }
};
</script>

<style>
.form-buttons {
  display: flex;
  justify-content: flex-end;
}
.card {
  display: flex;
  flex-direction: column;
  max-width: 400px;
}
</style>


