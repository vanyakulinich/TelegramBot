import { createISODate } from "./dateUtils";
import { createNewReminder as newReminder } from "./reminderUtils";

export const dbPath = {
  users: () => `/users`,
  user: id => `/users/${id}`,
  reminders: id => `/users/${id}/reminders`,
  reminderId: (id, remId) => `/users/${id}/reminders/${remId}`,
  nextReminder: id => `/users/${id}/nextReminder`,
  personal: id => `/users/${id}/personal`,
  web: id => `/users/${id}/webConnect`
};

export const createNewUser = ({ id, first_name, last_name }) => ({
  [id]: {
    personal: {
      firstName: first_name || "",
      lastName: last_name || ""
    },
    reminders: "empty",
    nextReminder: null
  }
});

export const createNewWebConnect = ({ id, publicToken, privateToken }) => ({
  id,
  publicToken,
  privateToken,
  askLinkTime: Date.now(),
  linkLifeTime: 60000 // if user doesn't visit link for 1 min, it will expire
});

export const createNewReminder = match => {
  const dateISO = createISODate(match[2], match[3]);
  return newReminder({
    text: match[1],
    date: match[2],
    time: match[3],
    dateISO
  });
};

export const createUserWebData = user => {
  const { personal, reminders, webConnect } = user;
  const { publicToken, privateToken, id } = webConnect;
  return {
    personal,
    reminders: reminders === "empty" ? null : reminders,
    tokens: {
      publicToken,
      privateToken,
      id
    }
  };
};

export const checkLinkLifeTime = data => {
  const { askLinkTime, linkLifeTime } = data;
  return askLinkTime + linkLifeTime > Date.now();
};
