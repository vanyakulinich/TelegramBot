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
  // // TODO: refactor personal
  // async setPersonalInfo({ commit, state }, data) {
  //   const tokens = await getTokens(state);
  //   const response = await this.$axios.$post(`/${apiEndpoints.personal}`, {
  //     tokens,
  //     data
  //   });
  //   commit(types.PERSONAL, response);
  // },

  // async manageReminder({ commit, state }, data) {
  //   const tokens = await getTokens(state);
  //   const { type, reminder } = data;
  //   const response = await this.$axios[`$${type}`](
  //     `/${apiEndpoints.reminder}`,
  //     {
  //       data: {
  //         tokens,
  //         reminder
  //       }
  //     }
  //   );
  //   commit(types.REMINDER, response);
  // },
  // universal action
  async manager({ commit, state }, data) {
    const tokens = await getTokens(state);
    const { method, target, payload } = data;
    const response = await this.$axios[`$${method}`](
      `/${apiEndpoints[target]}`,
      {
        data: {
          tokens,
          payload
        }
      }
    );
    commit(types[target.toUpperCase()], response);
  }
};
