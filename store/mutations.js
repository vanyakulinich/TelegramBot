import types from "./types";
export const mutations = {
  [types.DATA]: (state, payload) => (state.data = { ...payload }),
  [types.PERSONAL_INFO]: (state, payload) => {
    state.data.personal = {
      ...payload
    };
  },
  [types.REMINDERS]: (state, payload) =>
    (state.data.reminders =
      typeof payload === "object" ? { ...payload } : payload)
};
