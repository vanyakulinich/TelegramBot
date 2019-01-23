import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = () =>
  new Vuex.Store({
    state: {
      data: null
    },
    actions: {
      nuxtServerInit({ commit }, { req }) {
        if (req && req.initData) {
          const { initData } = req;
          commit("data", { ...initData });
        }
      }
    },
    mutations: {
      data: (state, payload) => (state.data = payload)
    }
  });

export default store;
