import axios from '~/plugins/axios';

export const state = () => {
  return {
    connections: []
  };
};

export const mutations = {
  ADD_CONNECTION_SUCCESS(state, data) {
    state.connections = [...state.connections, data.connection];
  },
  DELETE_CONNECTION_SUCCESS(state, message) {
    Object.keys(state).forEach(key => {
      if (typeof key === 'string') state[key] = '';
    });
  },
  FETCH_CONNECTIONS_SUCCESS(state, data) {
    state.connections = data.connections;
  }
};

export const actions = {
  async addConnection({ commit }, payload) {
    try {
      let { data } = await axios.post('/connections', payload);
      commit('ADD_CONNECTION_SUCCESS', data);
      commit('notification/SUCCESS', data, { root: true });
    } catch (error) {
      console.error(error);
      commit('notification/FAILURE', error.response.data, { root: true });
    }
  },
  async deleteConnection({ state, commit }) {
    try {
      let { data } = await axios.delete(`/users/${state.email}`);
      commit('DELETE_CONNECTION_SUCCESS', data);
      commit('notification/SUCCESS', data, { root: true });
    } catch (error) {
      console.error(error);
      commit('notification/FAILURE', error.response.data, { root: true });
    }
  },
  async fetchConnections({ commit }, payload) {
    try {
      let { data } = await axios.get('/connections');
      commit('FETCH_CONNECTIONS_SUCCESS', data);
      commit('notification/SUCCESS', data, { root: true });
    } catch (error) {
      console.error(error);
      commit('notification/FAILURE', error.response.data, { root: true });
    }
  }
};
