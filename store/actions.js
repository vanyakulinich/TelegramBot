import types from "./types";
import { getters } from "./getters";
import { apiEndpoints } from "../config/api";

const getTokens = state => {
  const { id, privateToken, publicToken } = getters.tokens(state);
  return {
    id,
    privateToken,
    publicToken
  };
};

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req && req.initData) {
      const { initData } = req;
      commit(types.DATA, initData);
    }
  },
  async setPersonalInfo({ commit, state }, data) {
    const tokens = await getTokens(state);
    const response = await this.$axios.$post(`/${apiEndpoints.personal}`, {
      tokens,
      data
    });
    commit(types.PERSONAL_INFO, response);
  },
  async createReminder({ commit, state }, data) {
    const tokens = await getTokens(state);
    const response = await this.$axios.$post(`/${apiEndpoints.reminder}`, {
      tokens,
      data
    });
    commit(types.REMINDERS, response);
  },
  async updateReminder({ commit, state }, data) {
    const tokens = await getTokens(state);
    const response = await this.$axios.$put(`/${apiEndpoints.reminder}`, {
      tokens,
      data
    });
    commit(types.REMINDERS, response);
  }
};
