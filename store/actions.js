import types from "./types";
export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req && req.initData) {
      const { initData } = req;
      commit(types.DATA, initData);
    }
  },
  setPersonalInfo({ commit }, data) {
    // TODO: implement server req
    commit(types.PERSONAL_INFO, data);
  }
};
