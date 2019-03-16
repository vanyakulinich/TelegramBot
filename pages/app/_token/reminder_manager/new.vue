<template>
  <v-layout>
    <v-flex align-center justify-center>
      <ContentHeader text="Add New Reminder"/>
      <div>
        <NewReminderHeader title="Enter Your Reminder"/>
        <Input label="Reminder Text" :inputCB="reminderText"/>
        <div class="pickers">
          <NewReminderHeader title="Pick Up Date"/>
          <DateTimePicker :changeDate="changeDate" :minDate="minDate" datepickerType="date"/>
        </div>
        <div class="pickers">
          <NewReminderHeader title="Pick Up Time"/>
          <DateTimePicker datepickerType="time" :changeDate="changeTime" :startDate="startTime"/>
        </div>
      </div>
      <v-card-actions class="form_buttons">
        <Button title="Add" btnColor="blue accent-1" :clickCB="addNewReminder"/>
      </v-card-actions>
    </v-flex>
  </v-layout>
</template>

<script>
import Button from "../../../../components/buttons/Button.vue";
import ContentHeader from "../../../../components/headers/ContentHeader.vue";
import Input from "../../../../components/inputs/Input.vue";
import DateTimePicker from "../../../../components/inputs/DateTimePicker.vue";
import NewReminderHeader from "../../../../components/headers/NewReminderHeader";
import { createTodayISODateWithOffset } from "../../../../utils/ISOStringsUtils";
import { createNewReminderFromInputs } from "../../../../utils/reminderUtils";
import { manageReminderMethods } from "../../../../mixins/manageReminderMethods";
import { mapActions } from "vuex";

export default {
  name: "add_new_reminder",
  components: {
    Button,
    ContentHeader,
    Input,
    DateTimePicker,
    NewReminderHeader
  },
  mixins: [manageReminderMethods],
  data() {
    return {
      text: "",
      minDate: createTodayISODateWithOffset(1000 * 60 * 60 * 2), // plus 2h due to UTC format to disable previous day
      startTime: createTodayISODateWithOffset(1000 * 60 * 5), // default time is +5min to current time
      selectedDate: null,
      selectedTime: null
    };
  },
  methods: {
    addNewReminder() {
      const newReminder = createNewReminderFromInputs({
        text: this.text,
        date: this.selectedDate,
        time: this.selectedTime
      });
      this.manager({
        method: "post",
        target: "reminder",
        payload: newReminder
      });
      this.$router.push({
        path: `/app/${this.$route.params.token}/reminder_manager`
      });
    },
    ...mapActions(["manager"])
  }
};
</script>

<style>
.form_buttons {
  display: flex;
  justify-content: flex-end;
  margin: 30px 0;
  padding-right: 20px;
  width: 100%;
}
.pickers {
  margin-bottom: 40px;
  max-width: 300px;
}
</style>


