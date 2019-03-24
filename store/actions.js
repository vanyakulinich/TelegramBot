import types from "./types";
import { getters } from "./getters";
import { apiEndpoints } from "../server/config";

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
