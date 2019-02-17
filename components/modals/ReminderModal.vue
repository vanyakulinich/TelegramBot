<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="400">
      <v-icon slot="activator" medium>mdi-settings</v-icon>
      <v-card>
        <v-card-title class="headline">
          <div class="dialog">Reminder Editor</div>
        </v-card-title>
        <v-card-text>
          <v-flex xs12 sm6 md3 class="text">
            <Input
              :disabled="reminder.expired"
              label="reminder text"
              :inputCB="reminderText"
              :value="text"
            />
          </v-flex>
          <v-flex xs12 sm6 md3 class="date_pickers">
            <DateTimePicker
              :disabled="reminder.expired"
              datepickerType="date"
              :startDate="reminder.dateISO"
              :changeDate="changeDate"
            />
          </v-flex>
          <v-flex xs12 sm6 md3 class="date_pickers">
            <DateTimePicker
              :disabled="reminder.expired"
              datepickerType="time"
              :startDate="reminder.dateISO"
              :changeDate="changeTime"
              :minDate="''"
            />
          </v-flex>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <Button :clickCB="closeModal" title="cancel"/>
          <Button
            :clickCB="saveEdited"
            title="Save"
            v-if="reminder && !reminder.expired"
            btnColor="blue-grey lighten-3"
          />
          <Button :clickCB="delReminder" title="Delete" btnColor="red accent-1"/>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapActions } from "vuex";
import Input from "../inputs/Input.vue";
import Button from "../buttons/Button.vue";
import DateTimePicker from "../inputs/DateTimePicker.vue";
import { manageReminderMethods } from "../../mixins/manageReminderMethods";
import {
  createNewReminderFromInputs,
  updateReminder
} from "../../utils/reminderUtils";
export default {
  name: "reminder_modal",
  components: {
    Button,
    Input,
    DateTimePicker
  },
  mixins: [manageReminderMethods],
  data() {
    return {
      dialog: false,
      text: this.reminder.text,
      selectedDate: this.reminder.dateISO,
      selectedTime: this.reminder.dateISO
    };
  },
  methods: {
    closeModal() {
      this.dialog = false;
    },
    delReminder() {
      this.manageReminder({ type: "delete", reminder: { ...this.reminder } });
      this.closeModal();
    },
    saveEdited() {
      const editedReminder = updateReminder({
        text: this.text,
        date: this.selectedDate,
        time: this.selectedTime,
        id: this.reminder.id
      });
      this.manageReminder({
        type: "put",
        reminder: { ...editedReminder }
      });
      this.closeModal();
    },
    ...mapActions(["manageReminder"])
  },
  props: {
    reminder: {
      type: Object | null,
      default: null
    }
  }
};
</script>

<style scoped>
.v-text-field,
.dialog,
.v-btn,
.date_pickers {
  font-family: "Indie Flower", cursive;
}
.v-btn {
  font-size: 20px;
  font-weight: 600;
}
.v-card {
  min-height: 400px;
}
.text {
  width: 100%;
  max-width: 100%;
}
.v-card__actions {
  margin-top: 30px;
}
</style>

