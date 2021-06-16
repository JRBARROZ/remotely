import { createStore } from 'vuex';
// import sha1 from 'js-sha1';
const server = 'http://localhost:8000/api/auth';
const axios = require('axios').default;
// axios.defaults.headers.common = {'Authorization': `bearer ${token}`}

const auth = {
  namespaced: true,
  state: {
    token: localStorage.getItem('user-token') ?? '',
    loggedUser: {},
    status: '',
  },
  getters: {
    isAuthenticated: state => state.token,
    authStatus: state => state.status,
  },
  mutations: {
    request: state => {
      state.status = 'loading...'
    },
    success: (state, token) => {
      state.status = 'success';
      state.token = token;
    },
    error: (state) => {
      state.status = 'error';
    },
    logout: (state) => {
      state.status = 'logged out';
    }
  },
  actions: {
    signIn: ({ commit, dispatch }, data) => {
      return new Promise((resolve, reject) => {
        commit('request');
        axios.post(`${server}/login`, data)
          .then(response => {
            const token = response.data.access_token;
            localStorage.setItem('user-token', token);
            commit('success', token);
            dispatch('userRequest')
            resolve(response);
          })
          .catch(error => {
            commit('error', error);
            localStorage.removeItem('user-token');
            reject(error);
          });
      });
    },
    signUp: ({ commit }, data) => {
      return new Promise((resolve, reject) => {
        commit('request');
        axios.post(`${server}/register`, data)
          .then(response => {
            commit('success', 'test');
            resolve(response);
          })
          .catch(error => {
            commit('error', error);
            reject(error);
          });
      });
    },
    userRequest: async ({ commit, state }) => {
      try {
        commit('request');
        const bodyParams = {
          access_token: "value",
        }
        const options = {
          headers: {
            Authorization: `Bearer ${state.token}`,
          }
        }
        const response = await axios.get(`${server}/user-profile`, bodyParams, options);
        console.log(response.data);
      } catch (error) {
        commit('error');
        console.log(error.response)
      }
    },
    logout: ({ commit, state }) => {
      return new Promise((resolve, reject) => {
        commit('logout');
        state.token = '';
        localStorage.removeItem('user-token');
        resolve();
      })
    },
  }
}

export default createStore({
  state: {
    allUsers: [],
    // status: '',
    // user: JSON.parse(sessionStorage.getItem('loggedUser')) ?? {},
  },
  mutations: {
  },
  actions: {
    async register({ commit }, data) {
      try {
        commit('setAddStatus', 'Please wait...');
        const response = await axios.post(`${server}/register`, data);
        if (response.status === 201) commit('setAddStatus', 'User successfully added!');
      } catch (error) {
        console.log(error);
        commit('setAddStatus', `Error while trying to add: Error: ${error.message}`);
      }
    },
  },
  modules: {
    auth: auth,
  }
})
