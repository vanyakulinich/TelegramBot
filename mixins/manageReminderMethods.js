export const manageReminderMethods = {
  methods: {
    reminderText(value) {
      this.text = value;
    },
    changeDate(val) {
      this.selectedDate = val;
    },
    changeTime(val) {
      this.selectedTime = val;
    }
  }
};
