import axios from '~/plugins/axios';

export const state = () => {
  return {
    connections: []
  };
};

export const mutations = {
  ADD_CONNECTION_REQUEST(state) {
    console.log('Add connection pending...');
  },
  ADD_CONNECTION_SUCCESS(state, data) {
    state.connections = [...state.connections, data.connection];
    console.log('Add connection success!');
  },
  ADD_CONNECTION_FAILURE(state, error) {
    console.log('Add connection failure.');
    console.error(error);
  },
  DELETE_CONNECTION_REQUEST(state) {
    console.log('Delete connection pending...');
  },
  DELETE_CONNECTION_SUCCESS(state, message) {
    Object.keys(state).forEach(key => {
      if (typeof key === 'string') state[key] = '';
    });
    console.log('Delete connection success!');
  },
  DELETE_CONNECTION_FAILURE(error) {
    console.log('Delete connection failure.');
    console.error(error);
  },
  FETCH_CONNECTIONS_REQUEST(state) {
    console.log('Fetch connections pending...');
  },
  FETCH_CONNECTIONS_SUCCESS(state, data) {
    state.connections = data.connections;
    console.log('Fetch connections success!');
  },
  FETCH_CONNECTIONS_FAILURE(state, error) {
    console.log('Fetch connections failure.');
    console.error(error);
  }
};

export const actions = {
  async addConnection({ commit }, payload) {
    try {
      commit('ADD_CONNECTION_REQUEST');
      let { data } = await axios.post('/connections', payload);
      commit('ADD_CONNECTION_SUCCESS', data);
      commit('notification/SUCCESS', data, { root: true });
    } catch (error) {
      commit('ADD_CONNECTION_FAILURE', error);
      commit('notification/FAILURE', error.response.data, { root: true });
    }
  },
  async deleteConnection({ state, commit }) {
    try {
      commit('DELETE_CONNECTION_REQUEST');
      let { data } = await axios.delete(`/users/${state.email}`);
      commit('DELETE_CONNECTION_SUCCESS', data);
      commit('notification/SUCCESS', data, { root: true });
    } catch (error) {
      commit('DELETE_CONNECTION_FAILURE', error);
      commit('notification/FAILURE', error.response.data, { root: true });
    }
  },
  async fetchConnections({ commit }, payload) {
    try {
      commit('FETCH_CONNECTIONS_REQUEST');
      let { data } = await axios.get('/connections');
      commit('FETCH_CONNECTIONS_SUCCESS', data);
      commit('notification/SUCCESS', data, { root: true });
    } catch (error) {
      commit('FETCH_CONNECTIONS_FAILURE', error);
      commit('notification/FAILURE', error.response.data, { root: true });
    }
  }
};
