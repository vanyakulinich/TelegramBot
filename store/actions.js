import types from "./types";
import { http } from "../utils/httpUtils";
export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req && req.initData) {
      const { initData } = req;
      commit(types.DATA, initData);
    }
  },
  setPersonalInfo({ commit }, data) {
    // TODO: implement server req
    http
      .get()
      .then(data => console.log(data))
      .catch(err => {
        throw new Error(err);
      });

    commit(types.PERSONAL_INFO, data);
  }
};
