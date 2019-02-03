import types from "./types";
import { getters } from "./getters";
import { apiEndpoints } from "../config/api";
export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req && req.initData) {
      const { initData } = req;
      commit(types.DATA, initData);
    }
  },
  async setPersonalInfo({ commit, state }, data) {
    const tokens = await getters.tokens(state);
    const response = await this.$axios.$post(`/${apiEndpoints.personal}`, {
      tokens,
      data
    });
    commit(types.PERSONAL_INFO, response);
  }
};
