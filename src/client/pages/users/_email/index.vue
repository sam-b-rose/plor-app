<template>
  <section class="section">
    <nav
      class="navbar"
      role="navigation"
      ria-label="secondary navigation">
      <div class="navbar-start">
        <h3 class="title is-4">Profile</h3>
      </div>
      <div class="navbar-end" />
    </nav>
    <div class="columns">
      <div class="column is-half">
        <form @submit.prevent @keyup.enter="save">
          <div class="field">
            <label class="label">Full Name</label>
            <div class="control">
              <input
                v-if="isEditing"
                class="input"
                v-model="fullName"
                type="text">
              <p v-else>{{ fullName }}</p>
            </div>
          </div>
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input
                v-if="isEditing"
                class="input"
                type="text"
                v-model="email">
              <p v-else>{{ email }}</p>
            </div>
          </div>
          <div
            v-if="isEditing"
            class="field is-grouped">
            <div class="control">
              <button
                class="button is-link"
                @click="updateUser">
                Save
              </button>
            </div>
            <div class="control">
              <button
                class="button is-text"
                @click="isEditing = false">
                Cancel
              </button>
            </div>
          </div>
          <div
            v-else
            class="field">
            <div class="control">
              <button
                class="button"
                @click="isEditing = true">
                Edit
              </button>
            </div>
          </div>
        </form>

        <hr>
        <form @submit.prevent @keyup.enter="updatePassword">
          <div class="field">
            <label class="label">Current password</label>
            <div class="control">
              <input
                class="input"
                v-model="password"
                type="password">
            </div>
          </div>
          <div class="field">
            <label class="label">New Password</label>
            <div class="control">
              <input
                class="input"
                type="password"
                v-model="password1">
            </div>
          </div>
          <div class="field">
            <label class="label">Confirm Password</label>
            <div class="control">
              <input
                class="input"
                type="password"
                v-model="password2">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button
                class="button"
                @click="updatePassword">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import Cookies from 'js-cookie';
export default {
  name: 'Profile',
  middleware: 'authenticated',
  layout: 'app',
  data() {
    return {
      isEditing: false,
      fullName: this.$store.state.fetchedUser.fullName,
      email: this.$store.state.fetchedUser.email,
      password: '',
      password1: '',
      password2: ''
    };
  },
  fetch({ store, params, req }) {
    const email = params.email;
    const token = process.SERVER_BUILD
      ? req.cookies.token
      : Cookies.get('token');
    return store.dispatch('fetchedUser/fetchUser', { email, token });
  },
  methods: {
    deleteUser() {
      this.$store.dispatch('user/deleteUser').then(() => {
        this.$router.replace({ path: '/' });
      });
    },
    updateUser() {
      const { email, fullName } = this;
      this.$store.dispatch('user/updateUser', { email, fullName }).then(() => {
        this.isEditing = false;
      });
    },
    updatePassword() {
      const { password, password1, password2 } = this;
      this.$store
        .dispatch('user/updatePassword', {
          password,
          password1,
          password2
        })
        .then(() => {
          this.password = '';
          this.password1 = '';
          this.password2 = '';
        });
    }
  }
};
</script>
