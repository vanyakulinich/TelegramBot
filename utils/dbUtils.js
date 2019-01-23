export const path = {
  users: () => `/users`,
  user: id => `/users/${id}`,
  reminders: id => `/users/${id}/reminders`,
  reminderId: (id, remId) => `/users/${id}/reminders/${remId}`,
  nextReminder: id => `/users/${id}/nextReminder`
};

export const newUserFactory = ({ id, first_name, last_name }) => ({
  [id]: {
    personal: {
      firstName: first_name || "",
      lastName: last_name || ""
    },
    reminders: "empty",
    nextReminder: null
  }
});
