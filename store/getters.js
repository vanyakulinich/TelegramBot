import { dynamicFilterReminders } from "../utils/filtersUtils";
import { checkIfReminderTimeIsAvaliable } from "../utils/reminderUtils";

export const getters = {
  personalInfo: state => state.data.personal,
  tokens: state => state.data.tokens,
  existingReminder: state => reminder => {
    const { reminders } = state.data;
    if (!reminders) return false;
    return checkIfReminderTimeIsAvaliable(reminder, reminders);
  },
  filterReminders: state => filters => {
    const { reminders } = state.data;
    const filteredReminders = dynamicFilterReminders(reminders, filters);
    return filteredReminders;
  }
};
