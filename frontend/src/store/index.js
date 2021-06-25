import { createStore } from 'vuex';
// import sha1 from 'js-sha1';
const server = 'http://localhost:8000/api/auth';
const axios = require('axios').default;
// axios.defaults.headers.common = {'Authorization': `bearer ${token}`}

const auth = {
  namespaced: true,
  state: {
    token: localStorage.getItem('user-token') ?? '',
    loggedUser: JSON.parse(localStorage.getItem('logged-user')) ?? {},
    status: [],
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
  },
  mutations: {
    request: state => {
      state.status = [null, 'loading...']
    },
    success: (state, payload) => {
      state.status = ['success', payload[1]];
      state.token = payload[0];
    },
    error: (state, message) => {
      state.status = ['error', message];
    },
    logout: (state, message) => {
      state.status = ['success', message];
    },
    resetStatus: (state) => {
      state.status = []
    },
    setLoggedUser: (state, user) => {
      state.loggedUser = { ...user }
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
            commit('success', [token]);
            dispatch('userRequest')
              .then(() => {
                resolve(response)
              });
          })
          .catch(error => {
            if (error.response.status < 500) commit('error', 'Invalid credentials');
            else commit('error', 'We could not validate your credentials. Try again later');
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
            commit('success', ['', 'Registered successfully']);
            resolve(response);
          })
          .catch(error => {
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
            commit('error', stat);
            reject(error);
          });
      });
    },
    userRequest: async ({ commit, state }) => {
      try {
        commit('request');
        const options = {
          headers: {
            Authorization: `Bearer ${state.token}`,
          }
        }
        const response = await axios.get(`${server}/user-profile`, options);
        if (response.status === 200) {
          commit('setLoggedUser', response.data);
          localStorage.setItem('logged-user', JSON.stringify(response.data));
        }
      } catch (error) {
        commit('error');
      }
    },
    logout: ({ commit, state }) => {
      return new Promise((resolve, reject) => {
        commit('logout', 'Logged out successfully');
        state.token = '';
        localStorage.removeItem('user-token');
        localStorage.removeItem('logged-user');
        commit('setLoggedUser', {});
        resolve();
      })
    },
  }
}

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth: auth,
  }
})
