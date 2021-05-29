import { createStore } from 'vuex'
const server = 'http://localhost:8000/api';
const axios = require('axios').default;

export default createStore({

  state: {
    allUsers: [],
    user: {},
    addStatus: '',
    removeStatus: '',
  },
  mutations: {
    setUser(state, value) {
      state.user = {...value};
    },
    setAllUsers(state, value) {
      state.allUsers = [...value];
    },
    setRemoveUser(state, index) {
      state.allUsers.splice(index, 1);
    },
    setAddStatus(state, value) {
      state.addStatus = value;
    },
    setRemoveStatus(state, value) {
      state.removeStatus = value;
    },
    setLoginStatus(state, value) {
      state.loginStatus = value;
    }
  },
  actions: {
    async authenticateUser({commit}, data) {
      try {
        commit('setLoginStatus', 'Authenticating...');
        const response = await axios.post(`${server}/users/auth`, data);
        if (response.data[0] !== undefined) {
          commit('setUser', response.data[0])
          commit('setLoginStatus', 'Successfully authenticated!')
        } else if(response.data[0] === undefined) {
          commit('setLoginStatus', 'Invalid credentials!');
        }
      } catch(error) {
        console.log(error.response.data);
        commit('setLoginStatus', `Error while trying authenticate: Error: ${error.message}`);
      }
    },
    async logout({commit}) {
      commit('setUser', {});
    },
    async addUser({commit}, data) {
      try {
        commit('setAddStatus', 'Please wait...');
        const response = await axios.post(`${server}/users`, data);
        if(response.status === 200) commit('setAddStatus', 'User successfully added!');
      } catch(error) {
        console.log(error);
        commit('setAddStatus', `Error while trying to add: Error: ${error.message}`);
      }
    },
    async getUsers({commit}) {
      try {
        const response = await axios.get(`${server}/users`);
        commit('setAllUsers', response.data);
      } catch(error) {
        console.log(error);
      }
    },
    async updateUser(data) {
      await axios.patch(`${server}/users/${data.id}`, data);
    },
    async removeUser({commit, context}, data) {
      try {
        const id = data[0];
        const idx = data[1];
        commit('setRemoveStatus', 'Please wait...');
        await axios.delete(`${server}/users/${id}`);
        commit('setRemoveStatus', 'User successfully deleted!');
        commit('setRemoveUser', idx);
      } catch(error) {
        console.log(`%c${error}`, 'color: green');
        commit('setRemoveStatus', `Error while trying to remove: Error: ${error.message}`);
      } finally {
      }
    }
  },
  modules: {
  }
})
