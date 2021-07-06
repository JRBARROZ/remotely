import { createStore } from "vuex";
// import sha1 from 'js-sha1';
const server = "http://localhost:8000/api";
const axios = require("axios").default;
// axios.defaults.headers.common = {'Authorization': `bearer ${state.token}`};

const auth = {
  namespaced: true,
  state: {
    // token: localStorage.getItem("user-token") ?? "",
    loggedUser: JSON.parse(localStorage.getItem("logged-user")) ?? {},
  },
  mutations: {
    setLoggedUser: (state, user) => {
      state.loggedUser = { ...user };
    }
  },
  actions: {
    signIn: ({ commit, dispatch }, data) => {
      return new Promise((resolve, reject) => {
        commit("request", null, { root: true });
        axios
          .post(`${server}/auth/login`, data)
          .then((response) => {
            const token = response.data.access_token;
            localStorage.setItem("user-token", token);
            commit("success", [token], { root: true });
            dispatch("userRequest").then(() => {
              resolve(response);
            });
          })
          .catch((error) => {
            if (error.response.status < 500)
              commit("error", "Invalid credentials", { root: true });
            else
              commit(
                "error",
                "We could not validate your credentials. Try again later",
                { root: true }
              );
            localStorage.removeItem("user-token");
            reject(error);
          });
      });
    },
    signUp: ({ commit }, data) => {
      return new Promise((resolve, reject) => {
        commit("request", null, { root: true });
        axios
          .post(`${server}/auth/register`, data)
          .then((response) => {
            commit("success", ["", "Registered successfully"], { root: true });
            resolve(response);
          })
          .catch((error) => {
            const stat = [];
            if (error.response.status < 500) {
              const data = JSON.parse(error.response.data);
              if (data.password) {
                if (data.password.length > 1) {
                  stat.push(data.password[0]);
                  stat.push(data.password[1]);
                } else {
                  stat.push(data.password[0]);
                }
              }
              if (data.email) stat.push(data.email[0]);
              if (data.error) stat.push(data.error[0]);
            }
            commit("error", stat, { root: true });
            reject(error);
          });
      });
    },
    userRequest: async ({ commit, rootState }) => {
      try {
        commit("request", null, { root: true });
        const options = {
          headers: {
            Authorization: `Bearer ${rootState.token}`,
          },
        };
        const response = await axios.get(`${server}/auth/user-profile`, options);
        if (response.status === 200) {
          commit("setLoggedUser", response.data);
          localStorage.setItem("logged-user", JSON.stringify(response.data));
        }
      } catch (error) {
        commit("error", null, { root: true });
      }
    },
    logout: ({ commit, rootState }) => {
      return new Promise((resolve, reject) => {
        commit("logout", "Logged out successfully", { root: true });
        rootState.token = "";
        localStorage.removeItem("user-token");
        localStorage.removeItem("logged-user");
        localStorage.removeItem("orgList")
        commit("setLoggedUser", {});
        resolve();
      });
    },
  },
};

const organization = {
  namespaced: true,
  state: {
    orgList: JSON.parse(localStorage.getItem('orgList')) ?? []
  },
  mutations: {
    changeOrgList: (state, payload) => {
      state.orgList = payload;
      localStorage.setItem('orgList', JSON.stringify(state.orgList));
    }
  },
  actions: {
    add: ({dispatch, rootState}, rawData) => {     
      const data = {
        name: rawData,
      };
      axios.post(`${server}/organization/add`, data, {
          headers: { Authorization: `Bearer ${rootState.token}`}}).then((response) => console.log(response));
      dispatch("setList");
    },
    setList: async ({state, commit, rootState}) => {
      const options = {
        headers: {
          Authorization: `Bearer ${rootState.token}`,
        },
      };
      const response = await axios.get(`${server}/organization/list`, options);
      commit('changeOrgList', response.data)
    },
    update: ({dispatch, rootState}, data) => {
      const options = {
        headers: {
          Authorization: `Bearer ${rootState.token}`,
        },
      };
      axios.put(`${server}/organization/update`, data, options);
      dispatch("setList");
    },
    remove: ({dispatch, rootState}, index) => {
      axios.delete(`${server}/organization/${index}`, {
        headers: { Authorization: `Bearer ${rootState.token}`}})
      dispatch("setList");
    }
  },
};

export default createStore({
  state: {
    token: localStorage.getItem("user-token") ?? "",
    status: [],
  },
  getters: {
    isAuthenticated: (state) => state.token,
    authStatus: (state) => state.status,
  },
  mutations: {
    request: (state) => {
      state.status = [null, "loading..."];
    },
    success: (state, payload) => {
      state.status = ["success", payload[1]];
      state.token = payload[0];
    },
    error: (state, message) => {
      state.status = ["error", message];
    },
    logout: (state, message) => {
      state.status = ["success", message];
    },
    resetStatus: (state) => {
      state.status = [];
    },
  }, 
  actions: {},
  modules: {
    auth: auth,
    organization: organization,
  },
});
