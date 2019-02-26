import types from "./types";
export const mutations = {
  [types.DATA]: (state, payload) => (state.data = payload),
  [types.PERSONAL]: (state, payload) => (state.data.personal = payload),
  [types.REMINDER]: (state, payload) => (state.data.reminders = payload || null)
};
