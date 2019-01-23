export const path = {
  users: () => `/users`,
  user: id => `/users/${id}`,
  reminders: id => `/users/${id}/reminders`,
  reminderId: (id, remId) => `/users/${id}/reminders/${remId}`,
  nextReminder: id => `/users/${id}/nextReminder`,
  web: id => `/users/${id}/webConnect`
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

export const webConnectFactory = ({ publicToken, privateToken }) => ({
  isConnected: false,
  publicToken,
  privateToken,
  askLinkTime: Date.now(),
  linkLifeTime: 60000 // if user doesn't visit link for 1 min, it will expire
});

export const webDataFactory = user => {
  const { personal, reminders, webConnect } = user;
  const { publicToken, privateToken } = webConnect;
  return {
    personal,
    reminders,
    tokens: {
      publicToken,
      privateToken
    }
  };
};
