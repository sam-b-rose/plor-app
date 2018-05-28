import axios from '~/plugins/axios';

export const state = () => {
  return {
    clip: false,
    position: 0
  };
};
export const getters = {
  scrollOffset(state) {
    console.log(state);
    return `translateY(-${state.clip ? state.position : 0}px)`;
  }
};
export const mutations = {
  SET_CLIP(state, clip) {
    state.clip = clip;
  },
  SET_POS(state, position) {
    state.position = position;
  },
  SET_USER(state, data) {
    state.user.isAuthenticated = true;
    state.user.name = data.name;
    state.user.email = data.email;
    state.user.gravatar = data.gravatar;
    state.connections.connections = data.connections;
  }
};
export const actions = {
  nuxtServerInit({ commit, state }, { req }) {
    const { user } = req;
    if (user) commit('SET_USER', user);
  }
};
