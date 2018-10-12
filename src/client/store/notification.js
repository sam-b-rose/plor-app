import { actions } from './posts';

export const state = () => {
  return {
    uid: 0,
    pending: false,
    success: false,
    failure: false,
    toaster: []
  };
};
export const mutations = {
  ADD_TOAST(state, data) {
    const toast = { id: state.uid++, status: 'success', text: data.message };
    state.toaster = [toast, ...state.toaster];
  },
  DELETE_TOAST(state, data) {
    const toast = { id: state.uid++, status: 'error', text: data.message };
    state.toaster = [toast, ...state.toaster];
  },
  PENDING(state) {
    state.pending = true;
  },
  SUCCESS(state) {
    state.failure = false;
    state.success = true;
    state.pending = false;
  },
  FAILURE(state) {
    state.success = false;
    state.failure = true;
    state.pending = false;
  },
  UPDATE_TOASTER(state, id) {
    state.toaster = state.toaster.filter(t => t.id !== id);
  }
};
