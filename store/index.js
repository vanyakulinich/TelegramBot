import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = () =>
  new Vuex.Store({
    state: {
      // data: null
      // mock
      data: {
        personal: {
          firstName: "Ivan",
          lastName: "Kulinich"
        },
        reminders: {
          12345: {
            text: "test reminder test",
            date: "Date format in ISO string",
            time: "Time in format hh:mm",
            dateUTC: "dateUTC",
            dateMs: "dateInMilliseconds",
            expired: false
          }
        },
        tokens: {
          publicToken: "publicToken",
          privateToken: "privateToken"
        }
      }
    },
    actions: {
      nuxtServerInit({ commit }, { req }) {
        if (req && req.initData) {
          const { initData } = req;
          commit("data", initData);
        }
      }
    },
    mutations: {
      data: (state, payload) => (state.data = { ...payload })
    }
  });

export default store;
