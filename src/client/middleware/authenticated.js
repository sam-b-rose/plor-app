export default ({ store, redirect }) => {
  if (!store.state.user.isAuthenticated) {
    return redirect('/auth/login');
  }
};
