<template>
  <v-layout>
    <v-flex>
      <ContentHeader text="Add New Reminder"/>
      <v-card class="card">
        <div>
          <Input label="Reminder Text" :inputCB="reminderText"/>
          <div>
            <NewReminderHeader title="Pick Up Date"/>
            <DateTimePicker :changeDate="changeDate" :minDate="minDate" datepickerType="date"/>
          </div>
          <div>
            <NewReminderHeader title="Pick Up Time"/>
            <DateTimePicker datepickerType="time" :changeDate="changeTime" :startDate="startTime"/>
          </div>
        </div>
        <v-card-actions class="form_buttons">
          <Button title="Add" btnColor="blue accent-1" :clickCB="addNewReminder"/>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Button from "../../../../components/buttons/Button.vue";
import ContentHeader from "../../../../components/headers/ContentHeader.vue";
import Input from "../../../../components/inputs/Input.vue";
import DateTimePicker from "../../../../components/inputs/DateTimePicker.vue";
import NewReminderHeader from "../../../../components/headers/NewReminderHeader";
export default {
  name: "add_new_reminder",
  components: {
    Button,
    ContentHeader,
    Input,
    DateTimePicker,
    NewReminderHeader
  },
  data() {
    return {
      text: "",
      minDate: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(), // plus 2h due to UTC format to disable previous day
      startTime: new Date(Date.now() + 1000 * 60 * 5).toISOString(), // default time is +5min to current time
      selectedDate: null,
      selectedTime: null
    };
  },
  methods: {
    reminderText(value) {
      this.text = value;
    },
    changeDate(val) {
      console.log(val);
      this.selectedDate = val;
    },
    changeTime(val) {
      console.log(val);
      this.selectedTime = val;
    },
    addNewReminder() {
      // TODO: implement action
      // split date and time strings and form new string, then use new Date
      console.log(this);
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


