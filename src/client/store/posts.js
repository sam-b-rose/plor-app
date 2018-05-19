import axios from '~/plugins/axios';

export const state = () => {
  return {
    deck: []
  };
};

export const mutations = {
  ADD_POST_REQUEST(state) {
    console.log('Add post pending...');
  },
  ADD_POST_SUCCESS(state, data) {
    state.deck = [...state.deck, data.post];
    console.log('Add post success!');
  },
  ADD_POST_FAILURE(state, error) {
    console.log('Add post failure.');
    console.error(error);
  },
  DELETE_POST_REQUEST(state) {
    console.log('Delete post pending...');
  },
  DELETE_POST_SUCCESS(state, message) {
    Object.keys(state).forEach(key => {
      if (typeof key === 'string') state[key] = '';
    });
    console.log('Delete post success!');
  },
  DELETE_POST_FAILURE(error) {
    console.log('Delete post failure.');
    console.error(error);
  },
  FETCH_POSTS_REQUEST(state) {
    console.log('Fetch posts pending...');
  },
  FETCH_POSTS_SUCCESS(state, data) {
    state.deck = data.posts;
    console.log('Fetch posts success!');
  },
  FETCH_POSTS_FAILURE(state, error) {
    console.log('Fetch posts failure.');
    console.error(error);
  }
};

export const actions = {
  async addPost({ commit }, payload) {
    try {
      commit('ADD_POST_REQUEST');
      let { data } = await axios.post('/posts', payload);
      commit('ADD_POST_SUCCESS', data);
      commit('notification/SUCCESS', data, { root: true });
    } catch (error) {
      commit('ADD_POST_FAILURE', error);
      commit('notification/FAILURE', error.response.data, { root: true });
    }
  },
  async deletePost({ state, commit }) {
    try {
      commit('DELETE_POST_REQUEST');
      let { data } = await axios.delete(`/users/${state.email}`);
      commit('DELETE_POST_SUCCESS', data);
      commit('notification/SUCCESS', data, { root: true });
    } catch (error) {
      commit('DELETE_POST_FAILURE', error);
      commit('notification/FAILURE', error.response.data, { root: true });
    }
  },
  async fetchPosts({ commit }) {
    try {
      commit('FETCH_POSTS_REQUEST');
      debugger;
      let { data } = await axios.get('/posts');
      commit('FETCH_POSTS_SUCCESS', data);
      commit('notification/SUCCESS', data, { root: true });
    } catch (error) {
      commit('FETCH_POSTS_FAILURE', error);
      commit('notification/FAILURE', error.response.data, { root: true });
    }
  }
};
