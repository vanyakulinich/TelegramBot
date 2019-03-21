import { dynamicFilterReminders } from "../utils/filtersUtils";

export const getters = {
  personalInfo: state => state.data.personal,
  tokens: state => state.data.tokens,
  filterReminders: state => filters => {
    const { reminders } = state.data;
    const filteredReminders = dynamicFilterReminders(reminders, filters);
    return filteredReminders;
  }
};
