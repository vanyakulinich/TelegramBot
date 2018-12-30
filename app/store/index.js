import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const createStore = (initData) => {
  return new Vuex.Store({
    state: {
      initData
    },
    actions: {
      // TODO
    },
    mutations: {
      // TODO
    }
  })
}
