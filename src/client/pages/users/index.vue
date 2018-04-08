<template>
  <div class="container">
    <h3>Users</h3>
    <div>
      <div v-for="user in $store.state.lists.users" :key="user._id">
        <hr>
        <p>Email: {{ user.email }}</p>
        <p>Name: {{ user.fullName }}</p>
      </div>
      <hr>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'app',
  middleware: 'authenticated',
  fetch ({ store }) {
    if (store.state.user.isAuthenticated) {
      return store.dispatch('fetchAllUsers')
    }
  }
}
</script>
