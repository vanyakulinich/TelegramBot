import types from "./types";
const mutations = {
  [types.DATA]: (state, payload) => (state.data = { ...payload }),
  [types.PERSONAL_INFO]: (state, payload) => {
    const { extra } = state.data.personal;
    state.data.personal = {
      ...state.data.personal,
      extra: {
        ...extra,
        ...payload
      }
    };
  }
};

export default mutations;
