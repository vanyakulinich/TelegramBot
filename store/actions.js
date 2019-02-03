import types from "./types";
export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req && req.initData) {
      const { initData } = req;
      commit(types.DATA, initData);
    }
  },
  async setPersonalInfo({ commit }, data) {
    console.log(data);
    const apiR = await this.$axios.$get("/");
    console.log(apiR);
    // TODO: implement server req
    commit(types.PERSONAL_INFO, data);
  }
};
