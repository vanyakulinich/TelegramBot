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
          lastName: "Kulinich",
          extra: {
            phone: "111111111111",
            email: "test@test.test"
          }
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
      },
      setPersonalInfo({ commit }, data) {
        // TODO: implement server req
        commit("personalInfo", data);
      }
    },
    mutations: {
      data: (state, payload) => (state.data = { ...payload }),
      personalInfo: (state, payload) => {
        const { extra } = state.data.personal;
        state.data.personal = {
          ...state.data.personal,
          extra: {
            ...extra,
            ...payload
          }
        };
      }
    },
    getters: {
      personalInfo: state => state.data.personal,
      reminders: state => state.data.reminders
    }
  });

export default store;
